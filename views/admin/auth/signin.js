const layout = require("../layout");
const { getError } = require("../../helpers.js");

module.exports = ({ errors }) => {
  return layout({
    content: `
    <form method="POST">
      <input type="email" name="email" placeholder="Email" />
      ${getError(errors, "email")}
      <input type="password" name="password" placeholder="Password" />
      ${getError(errors, "password")}
      <button>Sign In</button>
    </form>
    `,
  });
};
