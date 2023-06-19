import { Route, Routes, Link } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoutes from "./components/PrivateRoutes";
import LoginPage from "./pages/LoginPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import SearchResultsComponent from './components/SearchResultsComponent';

function App() {
  return (
    <>
      <Header /> {/* Componente de encabezado */}
      <Toaster position="top-right" /> {/* Componente para mostrar notificaciones */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Ruta para la página de inicio */}
          <Route path="/search-results" element={<SearchResultsComponent />} /> {/* Ruta para los resultados de búsqueda */}
          <Route path="/register" element={<RegisterPage />} /> {/* Ruta para la página de registro */}
          <Route path="/login" element={<LoginPage />} /> {/* Ruta para la página de inicio de sesión */}
          <Route path="/activate/:token" element={<LoginPage />} /> {/* Ruta para activar la cuenta con un token */}
          <Route element={<PrivateRoutes />}> {/* Rutas privadas */}
            <Route path="/accounts/myprofile" element={<User />} /> {/* Ruta para el perfil del usuario */}
          </Route>
          <Route path="*" element={<NotFound />} /> {/* Ruta para páginas no encontradas */}
        </Routes>
      </main>
      <Footer /> {/* Componente de pie de página */}
    </>
  );
}

const NotFound = () => {
  return (
    <>
      <h1>Page Not Found</h1>
      <Link to="/">Back Home</Link> {/* Enlace para volver a la página de inicio */}
    </>
  );
};

const User = () => {
  const { userData } = useContext(AuthContext); // Obtiene los datos de usuario del contexto de autenticación
  const { userEmail, userUsername, firstName, lastName, userId } = userData; // Extrae los datos de usuario
  return (
    <>
      <h1>Ruta Private del perfil del usuario</h1>
      <p>Email: {userEmail}</p>
      <p>Username: {userUsername}</p>
      <p>Name: {firstName}</p>
      <p>Lastname: {lastName}</p>
      <p>User ID: {userId}</p>
    </>
  );
};

export default App;
