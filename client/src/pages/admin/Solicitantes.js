import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { message, Table, Button } from "antd";

const Solicitantes = () => {
  const [solicitantes, setSolicitantes] = useState([]);
  const getSolicitantes = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllSolicitantes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setSolicitantes(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //////////////////////////////////////////////

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { solicitanteId: record.id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSolicitantes();
      } catch (error) {
        console.error("Error fetching solicitantes:", error);
      }
    };

    fetchData();
  }, []);

  const viewPDF = async (pdfPath, index) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `/api/v1/admin/getPDF?pdfPath=${pdfPath}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      window.open(fileURL, "_blank");
    } catch (error) {
      console.error("Error al obtener el archivo PDF:", error);
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Tipo obtención",
      dataIndex: "tipoObtencion",
    },
    {
      title: "Tipo de clase",
      dataIndex: "tipoclase",
    },

    {
      title: "Certificado de educación",
      dataIndex: "certificado",
    },
    {
      title: "Cedula de identidad",
      dataIndex: "pdfPath",
      render: (text, record, index) => (
        <span>
          {record.pdfPath ? (
            <Button onClick={() => viewPDF(record.pdfPath, index)}>
              Ver PDF
            </Button>
          ) : (
            "No PDF"
          )}
        </span>
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pendiente" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "aprobado")}
            >
              Aprobar
            </button>
          ) : (
            <button className="btn btn-danger">Retractar</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">Solicitantes</h1>
      <Table columns={columns} dataSource={solicitantes} />
    </Layout>
  );
};

export default Solicitantes;
