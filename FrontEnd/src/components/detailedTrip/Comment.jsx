import { AuthContext } from "../../context/AuthContext";
import { deleteCommentService } from "../../services";
import Avatar from "../user/Avatar";
import React, { useState, useContext, useEffect, useRef } from "react";

export const Comment = ({ comment, removeComment, timeDiff }) => {
  const { auth, userData, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const textareaRef = useRef(null);

  const deleteComment = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "¿Estás seguro de que quieres borrar el comentario?"
      );
      if (confirmDelete) {
        await deleteCommentService({ id, token });
        removeComment(id);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [comment.comment]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <>
      <div className="namedate-container">
        <Avatar
          imagen={comment.avatar}
          estilo={{ width: "30px", height: "30px" }}
        />
        <p className="c-username">@{comment.username} </p>&nbsp;
        <p className="c-created_at">{timeDiff}</p>
      </div>
      <div>
        <textarea
          ref={textareaRef}
          rows={1}
          className="comment-content"
          value={comment.comment}
          onChange={adjustTextareaHeight}
        />
        {auth && userData.userId === comment.user_id ? (
          <button
            className="trashcan"
            onClick={() => deleteComment(comment.id)}
          >
            <img
              src="/trash-can.png"
              className="trashcan-img"
              alt="Trash Can"
            />
          </button>
        ) : null}
        {error ? <p>{error}</p> : null}
      </div>
    </>
  );
};
