import React, { useEffect, useState } from "react";
import axios from "axios";
import { ConfigProvider, Form, Button, Table, Modal, DatePicker } from "antd";
import esES from "antd/lib/locale/es_ES";

import moment from "moment";
import Layout from "../../components/Layout";
import "../../styles/InventarioCitas.css";
import "moment/locale/es";

moment.locale("es");

const { Item } = Form;

const InventarioCitas = () => {
  const [citasDisponibles, setCitasDisponibles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [horaSeleccionada, setHoraSeleccionada] = useState("");

  useEffect(() => {
    axios.get("/api/v1/cita/citas-disponibles").then((response) => {
      if (response.data.success) {
        setCitasDisponibles(response.data.data);
      } else {
        console.error("Error al obtener las citas disponibles");
      }
    });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (text, record) => moment.utc(text).format("DD-MM-YYYY"),
    },
    {
      title: "Hora",
      dataIndex: "hora",
      key: "hora",
      render: (text, record) => moment(text, "HH:mm:ss").format("HH:mm"),
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            className="btn btn-danger"
            onClick={() => handleDeleteCita(record.id)}
          >
            Eliminar Hora
          </Button>
        </div>
      ),
    },
  ];

  const showAddCitaModal = () => {
    setModalVisible(true);
  };

  const disabledDate = (current) => {
    return (
      (current && current.day() === 0) || // Domingo
      (current && current.day() === 6) || // Sábado
      current < moment().endOf("day")
    );
  };

  const addCita = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const fechaFormateada = fecha
        ? moment(fecha, "DD-MM-YYYY").format("YYYY-MM-DD")
        : null;
      const horaFormateada = hora;

      axios
        .post(
          "/api/v1/cita/agregar-cita",
          {
            fecha: fechaFormateada,
            hora: horaFormateada,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setCitasDisponibles([...citasDisponibles, response.data.data]);
            setModalVisible(false);
            form.resetFields();
          } else {
            console.error("Error al agregar hora de agendamiento");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.error(
              "Error de autenticación. Redirigir al usuario a la página de inicio de sesión."
            );
          } else {
            console.error("Error al agregar la cita:", error);
          }
        });
    } else {
      console.error(
        "El token de autenticación no está presente en el almacenamiento local."
      );
    }
  };

  const handleDeleteCita = (citaId) => {
    try {
      axios
        .delete(`/api/v1/cita/eliminar-cita/${citaId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setCitasDisponibles(
              citasDisponibles.filter((cita) => cita.id !== citaId)
            );
          } else {
            console.error("Error al eliminar la cita");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la cita:", error);
        });
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };

  const handleHoraClick = (hora) => {
    setHora(hora);
    setHoraSeleccionada(hora);
  };

  const isSelected = (hora) => horaSeleccionada === hora;

  return (
    <ConfigProvider locale={esES}>
      <Layout>
        <h1>Inventario de Agendamientos</h1>
        <Button type="primary" onClick={showAddCitaModal}>
          Agregar Hora
        </Button>
        <Table columns={columns} dataSource={citasDisponibles} />
        <Modal
          title="Agregar Nueva Hora"
          visible={modalVisible}
          onOk={addCita}
          onCancel={() => setModalVisible(false)}
        >
          <Form form={form}>
            <Item
              label="Fecha"
              name="fecha"
              rules={[{ required: true, message: "Selecciona una fecha" }]}
            >
              <DatePicker
                format="DD-MM-YYYY"
                disabledDate={disabledDate}
                value={fecha ? moment(fecha, "DD-MM-YYYY") : null}
                onChange={(date, dateString) => setFecha(dateString)}
                locale={esES}
              />
            </Item>
            <Item
              label="Hora"
              name="hora"
              rules={[{ required: true, message: "Selecciona una hora" }]}
            >
              <div>
                <Button
                  onClick={() => handleHoraClick("08:30")}
                  className={isSelected("08:30") ? "selected" : ""}
                  enabled={
                    !citasDisponibles.some((cita) => cita.hora === "08:30")
                  }
                >
                  08:30
                </Button>
                <Button
                  onClick={() => handleHoraClick("12:00")}
                  className={isSelected("12:00") ? "selected" : ""}
                  enabled={
                    !citasDisponibles.some((cita) => cita.hora === "12:00")
                  }
                >
                  12:00
                </Button>
                <Button
                  onClick={() => handleHoraClick("14:30")}
                  className={isSelected("14:30") ? "selected" : ""}
                  enabled={
                    !citasDisponibles.some((cita) => cita.hora === "14:30")
                  }
                >
                  14:30
                </Button>
                <Button
                  onClick={() => handleHoraClick("17:00")}
                  className={isSelected("17:00") ? "selected" : ""}
                  enabled={
                    !citasDisponibles.some((cita) => cita.hora === "17:00")
                  }
                >
                  17:00
                </Button>
              </div>
            </Item>
          </Form>
        </Modal>
      </Layout>
    </ConfigProvider>
  );
};

export default InventarioCitas;
