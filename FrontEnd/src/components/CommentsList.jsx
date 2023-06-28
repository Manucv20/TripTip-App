import { Comment } from "./Comment";

export const CommentsList = ({ comments, removeComment }) => {
  return comments.length ? (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <Comment comment={comment} removeComment={removeComment} />
        </li>
      ))}
    </ul>
  ) : (
    <p>No hay comentarios aún</p>
  );
};
