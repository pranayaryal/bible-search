export const EmailTemplate = ({ email, message }) => (
  <div>
    <p>Hello, {email} 👋</p>

    <p>
      Thank you for contacting me through my website! I'm excited to work with
      you.
    </p>

    <p>Message body: </p>
    <p>{message} </p>
  </div>
);
