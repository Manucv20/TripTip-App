import { useParams } from "react-router-dom";
import useTrip from "../hooks/useTrip";
import { DetailedTrip } from "../components/DetailedTrip";
import useComments from "../hooks/useComments";
import { CommentsList } from "../components/CommentsList";
import ErrorMessage from "../components/ErrorMessage";
import NewComment from "../components/NewComment";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const TripPage = () => {
  const { id } = useParams();
  const { comments, addComment, removeComment } = useComments(id);
  const { trip, loading, error } = useTrip(id);
  const { userData } = useContext(AuthContext);

  if (loading) return <p>cargando trip</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="detailedTrip">
      <DetailedTrip trip={trip} />
      {userData ? <NewComment trip={trip} addComment={addComment} /> : null}
      <CommentsList comments={comments} removeComment={removeComment} />
    </section>
  );
};

export default TripPage;
