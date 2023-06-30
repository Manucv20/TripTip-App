import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoutes from "./components/PrivateRoutes";
import LoginPage from "./pages/LoginPage";

import HomePage from "./pages/HomePage";
import SearchResultsComponent from "./components/SearchResultsComponent";
import SendEmailPage from "./pages/SendEmailPage";
import NotFoundPage from "./pages/NotFoundPage";
import LikesPage from "./pages/LikePages";
import ProfilePage from "./pages/ProfilePage.jsx";
import MyRecommendationsPage from "./pages/MyRecommendationsPage.jsx";
import TripPage from "./pages/TripPage.jsx";

function App() {
  return (
    <>
      <Layout>
        <Toaster position="top-left" richColors />{" "}
        {/* Componente para mostrar notificaciones */}
        <main>
          <Routes>
            {/* Ruta que se puede modificar por la buena */}
            <Route path="/" element={<HomePage />} />{" "}
            {/* Ruta para la página de inicio */}
            <Route
              path="/search-results"
              element={<SearchResultsComponent />}
            />{" "}
            {/* Ruta para los resultados de búsqueda */}
            <Route path="/recommendation/:id" element={<TripPage />} />
            {/* Ruta para recomendación en detalle */}
            {/* Ruta de Paginas creadas por mi (Jose Carmona) */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registered/:token" element={<SendEmailPage />} />
            {/* Ruta para activar las cuentas de usuario */}
            <Route path="/acount/:token" element={<LoginPage />} />
            {/* Rutas Privadas a tener en cuenta para el Dashboard del Usuario */}
            <Route element={<PrivateRoutes />}>
              <Route path="/account/myprofile" element={<ProfilePage />} />
              <Route path="/mylikes" element={<LikesPage />} />
              <Route
                path="/myRecommendations"
                element={<MyRecommendationsPage />}
              />
            </Route>
            {/* Ruta para cuando el usuario pone una ruta que no existe falta por crear un componente para que se muestre el mensaje */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Layout>
    </>
  );
}

export default App;
