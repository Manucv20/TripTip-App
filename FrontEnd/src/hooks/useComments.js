import { useEffect, useState } from "react";
import { tripCommentsService } from "../services";

const useComments = (id) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);

        const data = await tripCommentsService(id);
        setComments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [id]);

  return { comments, loading, error };
};

export default useComments;
