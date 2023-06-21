const SendEmailPage = () => {
  return (
    <>
      <section>
        <h2>Thank you for creating an account with TripTip</h2>
        <img
          className="emailconfirm"
          src="registroconfirmar.svg"
          alt="confirmar email"
        />
        <h3>You{`'`}re almost done.</h3>
        <p>We just sent you an email to activate your account</p>
        <p>
          Go to your inbox and click on the activation link to confirm your
          email address. If you haven{`'`}t received it within 10 minutes, check
          your spam folder.
        </p>
      </section>
    </>
  );
};

export default SendEmailPage;
