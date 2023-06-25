import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export const CommentsList = ({ comments }) => {
  const reversedComments = comments.slice().reverse(); // Invertir el orden de los comentarios

  return (
    <ul>
      {reversedComments.map((comment) => {
        const currentDate = new Date(); // Obtener la fecha y hora actuales
        const relativeTime = formatDistanceToNow(currentDate, {
          locale: es,
          addSuffix: true,
        });

        return (
          <div key={comment.id}>
            <p>
              {comment.username} --- {relativeTime}
            </p>
            <p>{comment.comment}</p>
          </div>
        );
      })}
    </ul>
  );
};
