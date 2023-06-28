import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <h1 style={styles.title}>®2023 TripTip</h1>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "rgb(194, 178, 128)",
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
    fontSize: "15px",
    color: "white",
    marginBottom: "10px",
  },
};

export default Footer;
