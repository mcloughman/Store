module.exports = ({ req }) => {
  // destructure out the req object
  return `
    <div>
    Your id is: ${req.session.userId}
    <form method="POST">
      <input type="email" placeholder="email" name="email"/>
      <input type="password" placeholder="password" name="password"/>
      <input type="password" placeholder="password confirmation" name="passwordConfirmation"/>
      <button>Submit</button>
    </form>
    </div>
    `;
};
