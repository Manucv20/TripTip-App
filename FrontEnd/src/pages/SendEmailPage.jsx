const SendEmailPage = () => {
  return (
    <>
      <section>
        <h2>Gracias por crear una cuenta en TripTip.</h2>
        <img
          className="emailconfirm"
          src="registroconfirmar.svg"
          alt="confirmar email"
        />
        <h3>Estás casi listo.</h3>
        <p>
          Acabamos de enviarte un correo electrónico para activar tu cuenta y tu
          email.
        </p>
        <p>
          Ve a tu bandeja de entrada y haz clic en el enlace de activación para
          confirmar tu dirección de correo electrónico. Si no lo recibiste en
          los próximos 10 minutos, revisa tu carpeta de spam.
        </p>
      </section>
    </>
  );
};

export default SendEmailPage;
