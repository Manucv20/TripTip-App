
import TravelCard from "../components/cards/TravelCard";

import SearchComponent from "../components/search/SearchComponent";

const HomePage = () => {
  return (
    <>
      <SearchComponent />
      <div style={pageContainerStyle}>
        <section style={sectionStyle}>
          <div style={contentContainerStyle}>
            <h3 style={textStyle}>Viajar mejor: ¿dónde, cuándo y cómo?</h3>
            <p style={textStyle}>
              ¿Quieres viajar de forma más auténtica y responsable? Vive
              experiencias únicas junto con nuestros expertos y expertas
              locales, y descubre nuestros consejos y recomendaciones para
              viajar de forma respetuosa con el entorno y la cultura local. Aquí
              tienes algunos ejemplos:
            </p>
            <div style={cardsContainerStyle}>
              <TravelCard
                categoria="Safari"
                backgroundImage="/viaje_safari.jpg"
                title="Safari"
              />
              <TravelCard
                categoria="Senderismo"
                backgroundImage="/viaje_senderismo.jpg"
                title="Senderismo"
              />
              <TravelCard
                categoria="Deportes"
                backgroundImage="/viaje_deportes.jpg"
                title="Deportes"
              />
            </div>
            <h4 style={textStyle}>
              Atrévete a descubrir el mundo de una forma diferente viviendo
              experiencias únicas e inusuales
            </h4>
            <p style={textStyle}>
              ¿En pareja o en familia? ¿Un trekking o un safari? ¿Cultura o
              aventura? Descubre ideas de viaje recomendadas por nuestros
              usuarios.
            </p>
            <div style={cardsContainerStyle}>
              <TravelCard
                categoria="Aventura"
                backgroundImage="/viaje_aventura.jpg"
                title="Aventuras"
              />
              <TravelCard
                categoria="Playa"
                backgroundImage="/viaje_playa.jpg"
                title="Playas"
              />
              <TravelCard
                categoria="Coche"
                backgroundImage="/viaje_coche.jpg"
                title="Viaje en coche"
              />
              <TravelCard
                categoria="Familia"
                backgroundImage="/viaje_familia.jpg"
                title="Viaje en familia"
              />
              <TravelCard
                categoria="Amor"
                backgroundImage="/viaje_novios.jpg"
                title="Viaje en pareja"
              />
              <TravelCard
                categoria="Naturaleza"
                backgroundImage="/viajes_naturaleza.jpg"
                title="Natura"
              />
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
    </>
  );
};

const pageContainerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

const sectionStyle = {
  margin: 0,
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
};

const contentContainerStyle = {
  margin: 0,
  maxWidth: "100%", // Ancho máximo del contenido para evitar que se estire demasiado en pantallas grandes
  padding: "20px",
  width: "100%",
};

const cardsContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const textStyle = {
  textAlign: "center",
  margin: "30px",
};

export default HomePage;
