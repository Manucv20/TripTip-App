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
import SearchComponent from "./components/SearchComponent";


function App() {
  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <main>
        <Routes>
          {/* Ruta que se puede modificar por la buena */}
          <Route path="/" element={<Home />} />
          {/* Ruta de Paginas creadas por mi (Jose Carmona) */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Ruta Privada a tener en cuenta para el Dashboard del Usuario */}
          <Route element={<PrivateRoutes />}>
            <Route path="/accounts/myprofile" element={<User />} />
            {/*    <Route
            path="/accounts/myrecomendations"
            element={<UserRecomendations />}
            />
          <Route path="/accounts/favourites" element={<UserFavorites />} /> */}
          </Route>
          {/* Ruta para cuando el usuario pone una ruta que no existe falta por crear un componente para que se muestre el mensaje */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

/* Componentes para interactuar y que se pueden borrar una vez se hayan creado los componentes verdaderos */

const Home = () => {

  return (
    <div>
      <h1>Inicio</h1>
      <SearchComponent />
    </div>
  );

};

const NotFound = () => {
  return (
    <>
      <h1>Page Not Found</h1>
      <Link to="/">Back Home</Link>
    </>
  );
};

const User = () => {
  const { userData } = useContext(AuthContext);
  // Accede a los datos del usuario, por ejemplo:
  const { userEmail, userUsername, firstName, lastName, userId } = userData;
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
