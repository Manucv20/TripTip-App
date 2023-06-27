import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoutes from "./components/PrivateRoutes";
import LoginPage from "./pages/LoginPage";

import HomePage from "./pages/HomePage";
import SearchResultsComponent from "./components/SearchResultsComponent";
<<<<<<< HEAD
import TripPage from "./pages/TripPage.jsx";
=======
>>>>>>> origin/dev
import SendEmailPage from "./pages/SendEmailPage";
import NotFoundPage from "./pages/NotFoundPage";
import LikesPage from "./pages/LikePages";
import ProfilePage from "./pages/ProfilePage.jsx";
<<<<<<< HEAD
=======
import MyRecommendationsPage from "./pages/MyRecommendationsPage.jsx";
>>>>>>> origin/dev

function App() {
  return (
    <>
      <Header /> {/* Componente de encabezado */}
      <Toaster position="top-left" />{" "}
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
<<<<<<< HEAD
          {/* Ruta para recomendación en detalle */}
          <Route path="/recommendation/:id" element={<TripPage />} />
=======
>>>>>>> origin/dev
          {/* Ruta para los resultados de búsqueda */}
          {/* Ruta de Paginas creadas por mi (Jose Carmona) */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registered" element={<SendEmailPage />} />
<<<<<<< HEAD
          <Route path="/activate/:token" element={<LoginPage />} />
          {/* Ruta Privada a tener en cuenta para el Dashboard del Usuario */}
          <Route element={<PrivateRoutes />}>
            <Route path="/myprofile" element={<ProfilePage />} />
            <Route path="/likes" element={<LikesPage />} />
            {/*    <Route
            path="/account/myrecomendations"
            element={<UserRecomendations />}
            />
          <Route path="/account/favourites" element={<UserFavorites />} /> */}
=======
          <Route path="/acount/:token" element={<LoginPage />} />
          {/* Rutas Privadas a tener en cuenta para el Dashboard del Usuario */}
          <Route element={<PrivateRoutes />}>
            <Route path="/myprofile" element={<ProfilePage />} />
            <Route path="/mylikes" element={<LikesPage />} />
            <Route
              path="/myRecommendations"
              element={<MyRecommendationsPage />}
            />
>>>>>>> origin/dev
          </Route>
          {/* Ruta para cuando el usuario pone una ruta que no existe falta por crear un componente para que se muestre el mensaje */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer /> {/* Componente de pie de página */}
    </>
  );
}

export default App;
