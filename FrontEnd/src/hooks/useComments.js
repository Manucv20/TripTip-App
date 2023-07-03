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

        const data = await tripCommentsService({ id });
        setComments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, []);

  const addComment = (comment) => {
    setComments([...comments, comment]);
  };

  const removeComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return { comments, loading, error, addComment, removeComment };
};

export default useComments;