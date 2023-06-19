import AdventureCard from "../components/Cards/AdventureCard";
import BeachCard from "../components/Cards/BeachCard";
import CarCard from "../components/Cards/CarCard";
import FamilyCard from "../components/Cards/FamilyCard";
import LoveCard from "../components/Cards/LoveCard";
import NaturaCard from "../components/Cards/NaturaCard";
import SafariCard from "../components/Cards/SafariCard";
import SenderismoCard from "../components/Cards/SenderismoCard";
import SportCard from "../components/Cards/SportCard";
import SearchComponent from "../components/SearchComponent";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <header
        style={{
          backgroundImage: `url("/foto_header.jpg")`,
          backgroundSize: "cover",
          width: "100%",
          height: "200px", // Ajusta la altura deseada
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "black", margin: 0 }}>
          Miles de recomendaciones para tus viajes favoritos
        </h2>
        <Link to="/"></Link>
        <SearchComponent />
      </header>
      <section style={{ textAlign: "center" }}>
        <h3>Viajar mejor: ¿dónde, cuándo y cómo?</h3>
        <p>
          ¿Quieres viajar de forma más auténtica y responsable? Vive
          experiencias únicas junto con nuestros expertos y expertas locales, y
          descubre nuestros consejos y recomendaciones para viajar de forma
          respetuosa con el entorno y la cultural local. Aquí tienes algunos
          ejemplos:
        </p>
        <div style={cardsContainerStyle}>
          <SafariCard />
          <SenderismoCard />
          <SportCard />
        </div>
        <h4>
          Atrévete a descubrir el mundo de una forma diferente viviendo
          experiencias únicas e inusuales
        </h4>
        <p>
          ¿En pareja o en familia? ¿Un trekking o un safari? ¿Cultura o
          aventura? Descubre ideas de viaje recomendadas por nuestros usuarios.
        </p>
        <div style={cardsContainerStyle}>
          <AdventureCard />
          <BeachCard />
          <CarCard />
          <FamilyCard />
          <LoveCard />
          <NaturaCard />
        </div>
      </section>
    </>
  );
};

const cardsContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

export default HomePage;
