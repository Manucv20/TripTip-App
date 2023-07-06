import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <section
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
          gap: "1rem",
          margin: "2rem",
          minHeight: "100vh",
        }}
      >
        <h2>Uups ... Página no encontrada</h2>
        <img
          style={{
            width: "500px",
          }}
          src="page-not-found.png"
          alt="404"
        />
        <Link style={{ color: "#d93030" }} to="/">
          Ir a la página de inicio.
        </Link>
      </section>
    </>
  );
};

export default NotFoundPage;
