import { Link } from 'react-router-dom';

const linkData = [
  { text: "Política de privacidad", url: "/politica-privacidad" },
  { text: "Política de Cookies", url: "/politica-cookies" },
  { text: "Condiciones del servicio", url: "/condiciones-servicio" },
  { text: "Aviso legal", url: "/aviso-legal" },
  { text: "Contacto", url: "/contacto" },
];

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <h1 style={styles.title}>TripTip</h1>
      <div style={styles.linksContainer}>
        {linkData.map(({ text, url }) => (
          <Link key={url} to={url} style={styles.link}>
            {text}
          </Link>
        ))}
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "gray",
    width: "100%",
    padding: "10px",
    position: "fixed",
    bottom: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "24px",
    color: "white",
    marginBottom: "10px",
  },
  linksContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    margin: "5px",
    padding: "5px 10px",
  },
};

export default Footer;