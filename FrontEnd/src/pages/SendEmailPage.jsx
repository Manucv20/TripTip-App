const SendEmailPage = () => {
  return (
    <>
      <section>
        <figure>
          <img
            className="emailconfirm"
            src="registroconfirmar.svg"
            alt="confirmar email"
          />
        </figure>
        <h2>Estas a un paso de Activar tu cuenta.</h2>
        <p>
          Acabamos de enviarte un correo electrónico para activar tu cuenta y tu
          email, a la dirección que proporcionaste con instrucciones detalladas
          para activar tu cuenta.
        </p>
        <p>
          Por favor, revisa tu bandeja de entrada y también asegúrate de
          verificar la carpeta de correo no deseado o spam, ya que
          ocasionalmente los mensajes pueden terminar ahí.
        </p>
        <p>
          En el correo electrónico encontrarás un enlace de activación. Al hacer
          clic en ese enlace, confirmarás tu registro y podrás disfrutar de
          todos los beneficios de ser parte de nuestra comunidad.
        </p>
        <p>
          ¡Esperamos verte pronto en nuestro sitio y que disfrutes de una
          experiencia increíble!
        </p>
      </section>
    </>
  );
};

export default SendEmailPage;
