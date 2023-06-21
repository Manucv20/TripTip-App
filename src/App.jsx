import { Route, Routes } from "react-router-dom";
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
import SendEmailPage from "./pages/SendEmailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Header /> {/* Componente de encabezado */}
      <Toaster position="top-right" /> {/* Componente para mostrar notificaciones */}
      <main>
        <Routes>
          {/* Ruta que se puede modificar por la buena */}
          <Route path="/" element={<HomePage />} /> {/* Ruta para la página de inicio */}
          <Route path="/search-results" element={<SearchResultsComponent />} /> {/* Ruta para los resultados de búsqueda */}
          {/* Ruta de Paginas creadas por mi (Jose Carmona) */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registered" element={<SendEmailPage />} />
          <Route path="/activate/:token" element={<LoginPage />} />

          {/* Ruta Privada a tener en cuenta para el Dashboard del Usuario */}
          <Route element={<PrivateRoutes />}>
            <Route path="/account/myprofile" element={<User />} />
            {/*    <Route
            path="/account/myrecomendations"
            element={<UserRecomendations />}
            />
          <Route path="/account/favourites" element={<UserFavorites />} /> */}
          </Route>
          {/* Ruta para cuando el usuario pone una ruta que no existe falta por crear un componente para que se muestre el mensaje */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer /> {/* Componente de pie de página */}
    </>
  );
}

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
