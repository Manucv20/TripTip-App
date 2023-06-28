import { Comment } from "./Comment";

export const CommentsList = ({ comments, removeComment }) => {
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
      return `Hace pocos segundos`;
    } else if (minutes < 60) {
      return `Hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
    } else if (hours < 24) {
      return `Hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
    } else if (days < 365) {
      return `Hace ${days} ${days === 1 ? "dia" : "dias"}`;
    } else {
      return `Hace ${years} ${years === 1 ? "año" : "años"}`;
    }
  };

  return (
    <section className="CommentsList">
      {reversedComments.length ? (
        <ul>
          {reversedComments.map((comment) => {
            const commentDate = new Date(comment.created_at);
            const utcDateString = commentDate.toUTCString();
            const timeDiff = calculateTimeDiff(utcDateString);

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
