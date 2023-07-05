import { useParams } from "react-router-dom";
import useTrip from "../hooks/useTrip";
import { DetailedTrip } from "../components/detailedTrip/DetailedTrip";
import useComments from "../hooks/useComments";
import ErrorMessage from "../components/tools/ErrorMessage";

const TripPage = () => {
  const { id } = useParams();
  const { comments, addComment, removeComment } = useComments(id);
  const { trip, loading, error } = useTrip(id);

  if (loading) return <p>cargando trip</p>;
  if (error) return <NotFoundPage />;

  return (
    <DetailedTrip
      trip={trip}
      addComment={addComment}
      comments={comments}
      removeComment={removeComment}
    />
  );
};

export default TripPage;
