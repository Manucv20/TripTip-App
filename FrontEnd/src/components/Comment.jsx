import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";
import { deleteCommentService } from "../services";
import Avatar from "./Avatar";

export const Comment = ({ comment, removeComment, timeDiff }) => {
  const { auth, userData, token } = useContext(AuthContext);
  const [error, setError] = useState("");

  const deleteComment = async (id) => {
    try {
      await deleteCommentService({ id, token });
      removeComment(id);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <p>
        {
          <Avatar
            imagen={comment.avatar}
            estilo={{ width: "40px", height: "40px" }}
          />
        }
        {comment.username} {timeDiff}
      </p>
      <div>
        <div>{comment.comment}</div>
        {auth && userData.userId === comment.user_id ? (
          <button onClick={() => deleteComment(comment.id)}>
            Delete comment
          </button>
        ) : null}
        {error ? <p>{error}</p> : null}
      </div>
    </section>
  );
};
