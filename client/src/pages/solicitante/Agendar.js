import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Card, Col, Button, Row, Modal } from "antd";
import moment from "moment";

const Agendar = () => {
  const [citasDisponibles, setCitasDisponibles] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [citaAgendada, setCitaAgendada] = useState(null);
  const [showCitasDisponibles, setShowCitasDisponibles] = useState(true);
  const [transaction, setTransaction] = useState({
    amount: 5000,
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedCitaId, setSelectedCitaId] = useState(null);

  const handleCreateTransaction = async () => {
    try {
      const res = await axios.post("/create", transaction);

      if (res.data && res.data.url) {
        window.open(res.data.url, "_blank");
      } else {
        console.error("Error al obtener la URL de WebPay.");
      }
    } catch (error) {
      console.error("Error al crear la transacción de WebPay:", error);
    }
  };

  useEffect(() => {
    const storedCitaAgendada = JSON.parse(localStorage.getItem("citaAgendada"));

    if (storedCitaAgendada) {
      setCitaAgendada(storedCitaAgendada);
      setShowCitasDisponibles(false);
    } else {
      setShowCitasDisponibles(true);
    }

    const fetchCitasDisponibles = async () => {
      try {
        const res = await axios.get("/api/v1/cita/citas-disponibles");
        if (res.data.success) {
          const citasFormateadas = res.data.data.map((cita) => ({
            ...cita,
            fecha: moment(cita.fecha).format("DD-MM-YYYY"),
            hora: moment(cita.hora, "HH:mm:ss").format("HH:mm"),
          }));
          setCitasDisponibles(citasFormateadas);
        } else {
          setMessageText("No se pudieron obtener las horas disponibles.");
        }
      } catch (error) {
        console.error(error);
        setMessageText("Error al obtener las horas disponibles.");
      }
    };

    fetchCitasDisponibles();
  }, []);

  const handleReservarCita = async (citaId) => {
    setSelectedCitaId(citaId);
    setShowConfirmationModal(true);
  };

  const handleConfirmationModal = async (confirmed) => {
    setShowConfirmationModal(false);
    if (confirmed) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.post(
            `/api/v1/cita/reservar-cita/${selectedCitaId}`,
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data.success) {
            const updatedCitasDisponibles = citasDisponibles.filter(
              (cita) => cita.id !== selectedCitaId
            );

            const citaReservada = citasDisponibles.find(
              (cita) => cita.id === selectedCitaId
            );

            setCitasDisponibles(updatedCitasDisponibles);
            setCitaAgendada(citaReservada);
            setShowCitasDisponibles(false);
            setMessageText("");

            localStorage.setItem("citaAgendada", JSON.stringify(citaReservada));
          }
        } else {
          console.error("No se encontró ningún token en el localStorage.");
        }
      } catch (error) {
        console.error("Error al reservar la cita:", error);
      }
      handleCreateTransaction();
    }
  };

  return (
    <Layout>
      <h1>Horas Disponibles</h1>
      <div>
        {messageText && <p>{messageText}</p>}
        {citaAgendada && (
          <Card
            title="Hora Agendada Exitosamente"
            style={{ width: 300, margin: "16px 0" }}
          >
            <p>ID: {citaAgendada.id}</p>
            <p>Fecha: {citaAgendada.fecha}</p>
            <p>Hora: {citaAgendada.hora}</p>
            <p>
              Ya has agendado una hora, para ver la información de esta, pincha
              aquí: <a href="/solicitante/horasagendadas">Ver Información</a>
            </p>
          </Card>
        )}
        {!showCitasDisponibles && !citaAgendada && (
          <p>Ya has agendado una cita</p>
        )}
        {showCitasDisponibles && citasDisponibles.length > 0 && (
          <>
            <Row gutter={[16, 16]}>
              {/* Renderizar citas disponibles */}
              {citasDisponibles.map((cita) => (
                <Col span={8} key={cita.id}>
                  <Card
                    title={`ID: ${cita.id}`}
                    style={{ height: "100%" }}
                    extra={
                      cita.disponible ? (
                        <Button onClick={() => handleReservarCita(cita.id)}>
                          Agendar y Pagar
                        </Button>
                      ) : (
                        "Hora Reservada"
                      )
                    }
                  >
                    <p>Fecha: {cita.fecha}</p>
                    <p>Hora: {cita.hora}</p>
                  </Card>
                </Col>
              ))}
            </Row>
            {/* Modal de confirmación */}
            <Modal
              title="Confirmación"
              visible={showConfirmationModal}
              onCancel={() => setShowConfirmationModal(false)}
              footer={[
                <Button
                  key="cancel"
                  onClick={() => handleConfirmationModal(false)}
                >
                  No estoy seguro
                </Button>,
                <Button
                  key="confirm"
                  type="primary"
                  onClick={() => handleConfirmationModal(true)}
                >
                  Confirmar
                </Button>,
              ]}
            >
              <p>¿Estás seguro que deseas agendar?</p>
            </Modal>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Agendar;
