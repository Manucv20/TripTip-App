import { useParams } from "react-router-dom";
import useTrip from "../hooks/useTrip";
import { DetailedTrip } from "../components/DetailedTrip";
import { CommentForm } from "../components/CommentForm";
import useComments from "../hooks/useComments";
import { CommentsList } from "../components/TripComments";
import { useEffect } from "react";

const TripPage = () => {
  const { id } = useParams();
  const { trip, loading, error } = useTrip(id);
  const { comments } = useComments(id);

  if (loading) return <p>cargando trip</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="detailedTrip">
      <DetailedTrip trip={trip} />
      <CommentForm trip={trip} />
      <CommentsList comments={comments} />
    </section>
  );
};

export default TripPage;
