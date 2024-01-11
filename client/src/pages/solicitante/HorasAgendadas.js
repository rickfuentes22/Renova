import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import { useParams } from "react-router-dom";

const HorasAgendadas = () => {
  const [citasReservadas, setCitasReservadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const columns = [
    {
      title: "ID Hora",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
    {
      title: "Hora",
      dataIndex: "hora",
      key: "hora",
    },
    {
      title: "ID Usuario",
      dataIndex: "userId",
      key: "userId",
    },
  ];

  const getcitaReservada = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const userId = params.id;

        const res = await axios.post(
          "/api/v1/cita/getcitaReservada",
          { userId: params.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          const citasReservadasData = res.data.data.map((cita) => ({
            ...cita,
            fecha: moment(cita.fecha).format("DD-MM-YYYY"),
            hora: moment(cita.hora, "HH:mm:ss").format("HH:mm"),
          }));
          setCitasReservadas(citasReservadasData);
        } else {
          console.error("No se pudieron obtener las citas reservadas.");
        }
      }
    } catch (error) {
      console.error("Error al obtener las citas reservadas.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getcitaReservada();
  }, []);

  return (
    <Layout>
      <h2>Citas Reservadas</h2>
      <Table
        columns={columns}
        dataSource={citasReservadas}
        rowKey="id"
        pagination={false}
        showHeader={true}
        size="middle"
        loading={loading}
      />
    </Layout>
  );
};

export default HorasAgendadas;
