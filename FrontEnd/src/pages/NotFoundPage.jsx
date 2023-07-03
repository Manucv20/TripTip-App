import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <h2>Uups ... Página no encontrada</h2>
        <img src="page-not-found.png" alt="404" />
        <Link to="/">Ir a la página de inicio.</Link>
      </section>
    </>
  );
};

export default NotFoundPage;
