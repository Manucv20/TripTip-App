import { useParams } from "react-router-dom";
import useTrip from "../hooks/useTrip";
import { DetailedTrip } from "../components/DetailedTripMain";
import { DetailedTripComments } from "../components/DetailedTripComments";

const TripPage = () => {
  const { id } = useParams();
  const { trip, loading, error } = useTrip(id);

  if (loading) return <p>cargando trip</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="detailedTrip">
      <DetailedTrip trip={trip} />
      <DetailedTripComments trip={trip} />
    </section>
  );
};

export default TripPage;
