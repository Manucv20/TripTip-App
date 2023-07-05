import TravelCard from "../components/cards/TravelCard";
import SearchComponent from "../components/search/SearchComponent";

const HomePage = () => {
  return (
    <>
      <SearchComponent />
      <section style={pageContainerStyle}>
        <div style={contentContainerStyle}>
          <h2 style={titleStyle}>Viajar mejor: ¿dónde, cuándo y cómo?</h2>
          <p style={textStyle}>
            ¿Quieres explorar el mundo de manera auténtica y responsable?
            Descubre Triptip, una plataforma donde podrás encontrar
            experiencias públicas recomendadas por nuestros viajeros.
            Sumérgete en las recomendaciones y consejos de aquellos que han
            vivido aventuras únicas en destinos fascinantes. En Triptip, te
            ofrecemos una selección cuidadosamente curada de experiencias
            recomendadas por viajeros como tú. Explora destinos exóticos,
            descubre rincones escondidos y sumérgete en la cultura local a
            través de nuestras recomendaciones auténticas. Además, te
            brindamos valiosos consejos para viajar de manera respetuosa con
            el entorno y la cultura local, promoviendo un turismo sostenible.
            Aquí tienen algunos ejemplos:
          </p>
          <div style={cardsContainerStyle1}>
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
            <TravelCard
              categoria="Compras"
              backgroundImage="/viaje_compras.jpg"
              title="Compras"
            />
          </div>
          <h3 style={titleStyle}>
            Atrévete a descubrir el mundo de una forma diferente viviendo
            experiencias únicas e inusuales
          </h3>
          <p style={textStyle}>
            Nuestra comunidad de viajeros está comprometida en compartir sus
            experiencias de manera responsable, fomentando el respeto por el
            medio ambiente y las comunidades locales. Únete a Triptip y
            descubre un mundo de posibilidades para viajar de forma consciente
            y enriquecedora. Embárcate en una nueva aventura con Triptip,
            donde la autenticidad y la responsabilidad van de la mano.
            ¡Descubre nuevas culturas, amplía tus horizontes y haz del mundo
            tu hogar!"
          </p>
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

    </>
  );
};

const pageContainerStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  margin: 0,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  padding: "30px 0",
  background: "#f6f6f6",
};



const contentContainerStyle = {
  margin: 0,
  maxWidth: "1200px", // Ancho máximo del contenido para evitar que se estire demasiado en pantallas grandes
  padding: "20px",
  width: "100%",
};

const cardsContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const cardsContainerStyle1 = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
};

const textStyle = {
  textAlign: "center",
  margin: "30px",
  fontSize: "20px",
};

const titleStyle = {
  textAlign: "center",
  margin: "30px",
  fontSize: "25px",
  textDecoration: "underline",
  textDecorationColor: "gray",
};

export default HomePage;
