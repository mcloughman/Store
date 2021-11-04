const layout = require("../layout");

module.exports = () => {
  return layout({
    content: `
    <form method="POST">
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button>Sign In</button>
    </form>
    `,
  });
};
