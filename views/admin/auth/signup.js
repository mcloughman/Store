const layout = require("../layout.js");

const getError = (errors, prop) => {
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return "";
  }
};

module.exports = ({ req, errors }) => {
  //the errors object will only be passed in potentially on the post route
  // destructure out the req object
  return layout({
    content: `
    <div>
    Your id is: ${req.session.userId}
    <form method="POST">
      <input type="email" placeholder="email" name="email"/>
      ${getError(errors, "email")}
      <input type="password" placeholder="password" name="password"/>
      ${getError(errors, "password")}
      <input type="password" placeholder="password confirmation" name="passwordConfirmation"/>
      ${getError(errors, "passwordConfirmation")}
      <button>Submit</button>
    </form>
    </div>
    `,
  });
};
