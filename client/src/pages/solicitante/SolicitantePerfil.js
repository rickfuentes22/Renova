import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Table } from "antd";

const SolicitantePerfil = () => {
  const params = useParams();
  const [user, setUser] = useState(null);

  const getDatosUsuario = async () => {
    try {
      const res = await axios.get(`/api/v1/user/getdatosusuario/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDatosUsuario();
  }, [params.id]);

  const columns = [
    {
      title: "Detalle",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Valor",
      dataIndex: "value",
      key: "value",
    },
  ];

  const data = [
    {
      key: "1",
      detail: "Nombre",
      value: user?.name,
    },
    {
      key: "2",
      detail: "Email",
      value: user?.email,
    },
  ];

  return (
    <Layout>
      <h1>Perfil</h1>
      {user && (
        <div className="m-3">
          <h4>Datos personales:</h4>
          <Table columns={columns} dataSource={data} pagination={false} />
        </div>
      )}
    </Layout>
  );
};

export default SolicitantePerfil;
