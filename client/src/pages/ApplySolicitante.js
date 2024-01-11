import React, { useState } from "react";
import Layout from "../components/Layout";
import { Col, Select, Form, Input, Row, message, Upload, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";

const ApplySolicitante = () => {
  const { user } = useSelector((state) => state.user);
  const [fileList, setFileList] = useState([]);
  const { Option } = Select;
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileProps = {
    name: "pdfFile",
    multiple: false,
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
  };

  //
  // PREFIX +56 FORMATO NUMERO
  //
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="56">+56</Option>
        <Option value="57">+57</Option>
      </Select>
    </Form.Item>
  );

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  // HANDLE MANEJO FORMULARIO INICIAL
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const formData = new FormData();

      formData.append("pdfFile", fileList[0]);

      formData.append("userId", user.id);
      formData.append("tipoObtencion", values.tipoObtencion);

      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("direccion", values.direccion);
      formData.append("tipoclase", values.tipoclase);
      formData.append("certificado", values.certificado);
      formData.append("status", "pendiente");

      const res = await axios.post("/api/v1/user/apply-solicitante", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", // Importante para el envío de archivos
        },
      });

      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Algo salió mal");
    }
  };

  const handleTipoObtencionChange = (value) => {
    if (value === "Primaria") {
      setShowAdditionalFields(true);
    } else {
      setShowAdditionalFields(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Layout>
      <h1 className="text-center">Agendar trámite</h1>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        className="m-3"
        initialValues={{
          prefix: "56",
        }}
      >
        <h4 className="">Detalles personales : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Tipo de obtencion"
              name="tipoObtencion"
              required
              rules={[{ required: true }]}
            >
              <Select
                defaultValue=""
                style={{
                  width: 190,
                }}
                onChange={handleTipoObtencionChange}
                options={[
                  {
                    value: "Primaria",
                    label: "Obtención Primaria",
                  },
                  {
                    value: "Renovacion",
                    label: "Renovación",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Tipo de clase"
              name="tipoclase"
              required
              rules={[{ required: true }]}
            >
              <Select
                defaultValue="A"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "A",
                    label: "A",
                  },
                  {
                    value: "B",
                    label: "B",
                  },
                  {
                    value: "C",
                    label: "C",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Nombre"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Tu nombre" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Apellido"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Tu apellido" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Numero"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="Tu dirección de correo" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Dirección"
              name="direccion"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Tu dirección de residencia" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="PDF Foto copia cedula (Sube el archivo con tu rut como nombre)"
              name="pdfFile"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true }]}
            >
              <Upload {...fileProps} fileList={fileList}>
                <Button icon={<UploadOutlined />}>
                  Seleccionar archivo PDF
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        {showAdditionalFields && (
          <div>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Certificado de educación PDF"
                  name="certificado"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="Tu certificado" />
                </Form.Item>
              </Col>
            </Row>
          </div>
        )}
        <button className="btn btn-primary form-btn" type="submit">
          Enviar
        </button>
      </Form>
    </Layout>
  );
};

export default ApplySolicitante;
