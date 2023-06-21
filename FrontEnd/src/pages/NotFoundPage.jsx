import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <section>
        <h2>Uups ... Page Not Found</h2>
        <img src="page-not-found.png" alt="404" />
        <Link to="/">Go to Home Page</Link>
      </section>
    </>
  );
};

export default NotFoundPage;
