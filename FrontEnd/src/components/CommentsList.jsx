import { Comment } from "./Comment";
import moment from "moment";

export const CommentsList = ({ comments, removeComment }) => {
  const reversedComments = [...comments].reverse();

  return (
    <section className="CommentsList">
      {reversedComments.length ? (
        <ul>
          {reversedComments.map((comment) => {
            // Obtener la fecha actual
            const currentDate = moment();
            // Obtener la fecha del comentario
            const commentDate = moment(comment.date);
            // Calcular la diferencia en tiempo transcurrido
            const timeDiff = commentDate.from(currentDate);

            return (
              <li key={comment.id}>
                <Comment
                  comment={comment}
                  removeComment={removeComment}
                  timeDiff={timeDiff}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No hay comentarios aún</p>
      )}
    </section>
  );
};
