import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplySolicitante from "./pages/ApplySolicitante";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Solicitantes from "./pages/admin/Solicitantes";
import EstadoSolicitud from "./pages/solicitante/EstadoSolicitud";
import AdminPerfil from "./pages/admin/AdminPerfil";
import SolicitantePerfil from "./pages/solicitante/SolicitantePerfil";
import UsuarioPerfil from "./pages/usuario/UsuarioPerfil";
import InventarioCitas from "./pages/admin/InventarioCitas";
import Agendar from "./pages/solicitante/Agendar";
import HorasAgendadas from "./pages/solicitante/HorasAgendadas";
import EstadoSolicitudUsuario from "./pages/EstadoSolicitudUsuario";

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/apply-solicitante"
              element={
                <ProtectedRoute>
                  <ApplySolicitante />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/solicitantes"
              element={
                <ProtectedRoute>
                  <Solicitantes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/solicitante/estadosolicitud/:id"
              element={
                <ProtectedRoute>
                  <EstadoSolicitud />
                </ProtectedRoute>
              }
            />

            <Route
              path="/usuario/estadosolicitud/:id"
              element={
                <ProtectedRoute>
                  <EstadoSolicitudUsuario />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/perfil/:id"
              element={
                <ProtectedRoute>
                  <AdminPerfil />
                </ProtectedRoute>
              }
            />

            <Route
              path="/solicitante/perfil/:id"
              element={
                <ProtectedRoute>
                  <SolicitantePerfil />
                </ProtectedRoute>
              }
            />

            <Route
              path="/usuario/perfil/:id"
              element={
                <ProtectedRoute>
                  <UsuarioPerfil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/inventario-citas"
              element={
                <ProtectedRoute>
                  <InventarioCitas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/solicitante/reservar-cita"
              element={
                <ProtectedRoute>
                  <Agendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/solicitante/horasagendadas"
              element={
                <ProtectedRoute>
                  <HorasAgendadas />
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
