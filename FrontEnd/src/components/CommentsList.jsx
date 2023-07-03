import { Comment } from "./Comment";
import { useState } from "react";

export const CommentsList = ({ comments, removeComment }) => {
  const [visibleComments, setVisibleComments] = useState(5);
  const reversedComments = [...comments].reverse();

  const calculateTimeDiff = (commentDate) => {
    const currentDate = new Date();

    const fecha1Partes = currentDate.toString().split(" ");
    const fecha1Formateada = `${fecha1Partes[2]} ${fecha1Partes[1]} ${fecha1Partes[3]} ${fecha1Partes[4]}`;

    const fecha2Partes = commentDate.split(" ");
    const fecha2Formateada = `${fecha2Partes[1]} ${fecha2Partes[2]} ${fecha2Partes[3]} ${fecha2Partes[4]}`;

    // Restar las fechas
    const diff = new Date(fecha1Formateada) - new Date(fecha2Formateada);

    // Cálculo de la diferencia de tiempo en segundos, minutos, horas, etc.
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return `hace pocos segundos`;
    } else if (minutes < 60) {
      return `hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
    } else if (hours < 24) {
      return `hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
    } else if (days < 365) {
      return `hace ${days} ${days === 1 ? "dia" : "dias"}`;
    } else {
      return `hace ${years} ${years === 1 ? "año" : "años"}`;
    }
  };

  return (
    <section className="CommentsList">
      {reversedComments.length ? (
        <ul className="ul-comments">
          <h3 id="titulo">Comentarios</h3>

          {reversedComments.slice(0, visibleComments).map((comment) => {
            const commentDate = new Date(comment.created_at);
            const utcDateString = commentDate.toUTCString();
            const timeDiff = calculateTimeDiff(utcDateString);

            return (
              <li className="Comment" key={comment.id}>
                <Comment
                  comment={comment}
                  removeComment={removeComment}
                  timeDiff={timeDiff}
                />
              </li>
            );
          })}
          {reversedComments.length > visibleComments && (
            <button
              className="mas-comentarios"
              onClick={() => setVisibleComments(visibleComments + 5)}
            >
              Ver más
            </button>
          )}
        </ul>
      ) : (
        <p>No hay comentarios aún</p>
      )}
    </section>
  );
};