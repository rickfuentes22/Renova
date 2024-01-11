import React from "react";
import { Tabs, message, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = ({ visible, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Algo va mal");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("algo va mal con Notificaciones");
    }
  };

  return (
    <Modal
      title="Notificaciones"
      visible={visible}
      onCancel={handleClose}
      footer={null}
    >
      <h4 className="p-3 text-center">Notificaciones</h4>
      <Tabs centered>
        <Tabs.TabPane tab="No leídos" key={0}>
          <div className="d-flex justify-content-end">
            <h5 className="btn btn-info" onClick={handleMarkAllRead}>
              Marcar todas como leídas
            </h5>
          </div>
          {Object.keys(user?.notification || {}).map((key) => (
            <div
              className="card text-white bg-secondary"
              style={{ cursor: "pointer" }}
              key={key}
            >
              <div
                className="card-body"
                onClick={() => navigate(user.notification[key].onClickPath)}
              >
                {user.notification[key].message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Leídos" key={1}>
          <div className="d-flex justify-content-end">
            <h4
              className="btn btn-danger"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}
            >
              Borrar todo
            </h4>
          </div>
          {Object.keys(user?.seennotification || {}).map((key) => (
            <div
              className="card text-white bg-secondary"
              style={{ cursor: "pointer" }}
              key={key}
            >
              <div
                className="card-body"
                onClick={() => navigate(user.seennotification[key].onClickPath)}
              >
                {user.seennotification[key].message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default NotificationPage;
