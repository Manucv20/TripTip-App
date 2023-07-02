const SendEmailPage = () => {
  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <figure>
          <img
            className="emailconfirm"
            src="registroconfirmar.svg"
            alt="confirmar email"
          />
        </figure>
        <h2
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          Estas a un paso de Activar tu cuenta. Revisa tu Email.
        </h2>
        <p>
          <strong>
            {" "}
            Acabamos de enviarte un correo electrónico para activar tu cuenta y
            tu email,{" "}
          </strong>{" "}
          a la dirección que proporcionaste con instrucciones detalladas para
          activar tu cuenta.
        </p>
        <p>
          Por favor, <strong>revisa tu bandeja de entrada y</strong> también
          asegúrate de verificar
          <strong> la carpeta de correo no deseado o spam,</strong> ya que
          ocasionalmente los mensajes pueden terminar ahí.
        </p>
        <p>
          En el correo electrónico encontrarás un{" "}
          <strong>enlace de activación</strong>. Al hacer clic en ese enlace,
          confirmarás tu registro y podrás disfrutar de todos los beneficios de
          ser parte de nuestra comunidad.
        </p>
        <p
          style={{
            fontSize: "1.5rem",
            color: "blueviolet",
          }}
        >
          ¡Esperamos verte pronto en nuestro sitio y que disfrutes de una
          experiencia increíble!
        </p>
      </section>
    </>
  );
};

export default SendEmailPage;
