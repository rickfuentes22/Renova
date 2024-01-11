import React, { useState } from "react";
import "../styles/LayoutStyles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
import NotificationPage from "../pages/NotificationPage";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout con exito");
    navigate("/login");
  };

  const adminMenu = [
    {
      name: "Inicio",
      path: "/",
      icon: "fa-solid fa-house",
    },

    {
      name: "Perfil",
      path: `/admin/perfil/${user?.id}`,
      icon: "fa-solid fa-user",
    },

    {
      name: "Solicitudes",
      path: "/admin/solicitantes",
      icon: "fa-solid fa-user",
    },
    {
      name: "Usuarios",
      path: "/admin/users",
      icon: "fa-solid fa-user",
    },
    {
      name: "Inventario Horas",
      path: "/admin/inventario-citas",
      icon: "fa-solid fa-calendar",
    },
  ];

  const userMenu = [
    {
      name: "Inicio",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Perfil",
      path: `/usuario/perfil/${user?.id}`,
      icon: "fa-solid fa-user",
    },
    {
      name: "Estado Solicitud",
      path: `/usuario/estadosolicitud/${user?.id}`,
      icon: "fa-solid fa-clipboard-check",
    },
    {
      name: "Hacer solicitud",
      path: "/apply-solicitante",
      icon: "fa-solid fa-user",
    },
  ];

  // =========== solicitante menu ===============
  const solicitanteMenu = [
    {
      name: "Inicio",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Perfil",
      path: `/solicitante/perfil/${user?.id}`,
      icon: "fa-solid fa-user",
    },
    {
      name: "Estado Solicitud",
      path: `/solicitante/estadosolicitud/${user?.id}`,
      icon: "fa-solid fa-clipboard-check",
    },
    {
      name: "Agendar",
      path: "/solicitante/reservar-cita",
      icon: "fa-solid fa-calendar",
    },
    {
      name: "Horas Agendadas",
      path: "/solicitante/horasagendadas",
      icon: "fa-solid fa-calendar",
    },
  ];

  // =========== solicitante menu ===============

  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isSolicitante
    ? solicitanteMenu
    : userMenu;

  const userId = user ? user.id : null;

  let perfilURL = "";

  if (user?.isAdmin) {
    perfilURL = `/admin/perfil/${userId}`;
  } else if (user?.isSolicitante) {
    perfilURL = `/solicitante/perfil/${userId}`;
  } else {
    perfilURL = `/usuario/perfil/${userId}`;
  }

  const handleNotificationClick = () => {
    setShowNotificationModal(true);
  };

  const handleCloseNotificationModal = () => {
    setShowNotificationModal(false);
  };

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6 className="text-light">RENOVA+</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={menu.path}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className="menu-item" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Cerrar sesión</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="breadcrumb">
                <div className="breadcrumb-text">
                  <a href="/" className="breadcrumb-text">
                    Inicio
                  </a>
                </div>
                <div className="breadcrumb-text">
                  <a
                    href="https://mejoresconductores.conaset.cl/#/"
                    className="breadcrumb-text"
                  >
                    Clases de licencia
                  </a>
                </div>
                <div className="breadcrumb-text">
                  <a
                    href="https://www.chileatiende.gob.cl/fichas/20592-licencias-de-conducir"
                    className="breadcrumb-text"
                  >
                    Requisitos
                  </a>
                </div>
              </div>
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification && user.notification.length}
                  onClick={handleNotificationClick}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                <Link to={perfilURL}>{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
      {showNotificationModal && (
        <NotificationPage
          visible={showNotificationModal}
          handleClose={handleCloseNotificationModal}
        />
      )}
    </>
  );
};

export default Layout;
