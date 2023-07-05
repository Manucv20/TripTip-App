import { AuthContext } from "../../context/AuthContext";
import { deleteCommentService } from "../../services";
import Avatar from "../user/Avatar";
import React, { useState, useContext, useEffect, useRef } from "react";
import Modal from "react-modal";

export const Comment = ({ comment, removeComment, timeDiff }) => {
  const { auth, userData, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textareaRef = useRef(null);

  const handleDeleteConfirmation = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteCommentService({ id: comment.id, token });
      removeComment(comment.id);
      setIsModalOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          <button className="trashcan" onClick={handleDeleteConfirmation}>
            <img
              src="/trash-can.png"
              className="trashcan-img"
              alt="Trash Can"
            />
          </button>
        ) : null}
        {error ? <p>{error}</p> : null}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
          content: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            maxWidth: "400px",
            maxHeight: "200px",
            margin: "0 auto",
            marginTop: "15rem",
          },
        }}
      >
        <h2>Confirmar eliminación</h2>
        <p>¿Estás seguro de que quieres borrar el comentario?</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              backgroundColor: "#D93030",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              marginRight: "10px",
              width: "100px",
            }}
            onClick={handleDelete}
          >
            Borrar
          </button>
          <button
            style={{
              backgroundColor: "gray",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              width: "100px",
            }}
            onClick={handleCloseModal}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </>
  );
};
