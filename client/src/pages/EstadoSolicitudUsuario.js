import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Table, Typography, Card, Button } from "antd";

const { Text } = Typography;

const EstadoSolicitudUsuario = () => {
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
      {solicitante ? (
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
          <Card title="">
            <Text>
              {solicitante.status === "pendiente" ? (
                <span style={{ fontWeight: "bold" }}>
                  Aun está en proceso tu solicitud, luego de ser aceptado podrás
                  agendar una hora para tu obtención o renovación de licencia de
                  la clase solicitada. Te notificaremos por el portal y por
                  correo electrónico una vez hayas sido aprobado.
                </span>
              ) : null}
            </Text>
          </Card>
        </>
      ) : (
        <Card title="">
          <Text>
            <span style={{ fontWeight: "bold", fontSize: "17px" }}>
              Aun no has enviado solicitud, hazlo{" "}
              <Link to="http://localhost:3000/apply-solicitante">aquí</Link>
            </span>
            <br />
          </Text>
        </Card>
      )}
    </Layout>
  );
};

export default EstadoSolicitudUsuario;
