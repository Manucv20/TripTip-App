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
    <>
      <div className="namedate-container">
        <Avatar />
        <p className="c-username">@{comment.username} </p>&nbsp;
        <p className="c-created_at">{timeDiff}</p>
      </div>
      <div>
        <div>{comment.comment}</div>
        {auth && userData.userId === comment.user_id ? (
          <button
            className="trashcan"
            onClick={() => deleteComment(comment.id)}
          >
            <img
              className="trashcan-img"
              src="/trash-can.png"
              alt="eliminar-comentario"
            />
          </button>
        ) : null}
        {error ? <p>{error}</p> : null}
      </div>
    </>
  );
};
