import { Route, Routes, Link } from "react-router-dom";

import "./App.css";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoutes from "./components/PrivateRoutes";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Ruta Privada */}
        <Route element={<PrivateRoutes />}>
          <Route path="/userprivate" element={<User />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

const Home = () => {
  return <h1>Home</h1>;
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
  return (
    <>
      <h1>Ruta Private</h1>
      <Link to="/">Back Home</Link>
    </>
  );
};

export default App;
