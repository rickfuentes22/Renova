import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Table, Typography, Card } from "antd";

const { Text } = Typography;

const EstadoSolicitud = () => {
  const [solicitante, setSolicitante] = useState(null);
  const params = useParams();
  const [solicitanteData, setSolicitanteData] = useState({
    Nombre: "",
    Apellido: "",
    "Tipo de clase": "",
    Estado: "",
  });

  const columns = [
    {
      title: "Nombre",
      dataIndex: "Nombre",
      key: "Nombre",
    },
    {
      title: "Apellido",
      dataIndex: "Apellido",
      key: "Apellido",
    },
    {
      title: "Tipo de clase",
      dataIndex: "Tipo de clase",
      key: "Tipo de clase",
    },
    {
      title: "Estado",
      dataIndex: "Estado",
      key: "Estado",
    },
  ];

  const data = [solicitanteData];

  const getSolicitanteInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/solicitante/getSolicitanteInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        const solicitanteData = res.data.data;
        setSolicitante(solicitanteData);
        setSolicitanteData({
          Nombre: solicitanteData.firstName,
          Apellido: solicitanteData.lastName,
          "Tipo de clase": solicitanteData.tipoclase,
          Estado: solicitanteData.status,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSolicitanteInfo();
  }, []);

  return (
    <Layout>
      <h1>Estado solicitud</h1>
      {solicitante && (
        <>
          <Card title="">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              showHeader={true}
              size="middle"
            />
          </Card>
          <Card title="" style={{ backgroundColor: "green" }}>
            <Text>
              {solicitante.status === "aprobado" && (
                <span style={{ color: "white", fontWeight: "bold" }}>
                  ✔ Hemos revisado tu solicitud, y cuentas con todos los
                  requisitos para inicializar el trámite. Ya te encuentras
                  habilitado para agendar hora en nuestro departamento. Ingresa
                  a la sección "Agendar" para proseguir con el proceso{" "}
                  <Link to="http://localhost:3000/solicitante/reservar-cita">
                    aquí
                  </Link>
                </span>
              )}
            </Text>
          </Card>
        </>
      )}
    </Layout>
  );
};

export default EstadoSolicitud;
