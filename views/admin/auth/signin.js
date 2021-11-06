const layout = require("../layout");
const { getError } = require("../../helpers.js");

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div class="container">
      <div class="row">
        <div class="col">
        </div>
        <div class="col-lg-8">
          <form method="POST">
            <div class="mb-3">
            <h1 class="text-center h1">Admin Login</h1>
            
             <input class="form-control mt-5" type="email" name="email" placeholder="Email" />
             ${getError(errors, "email")}
             
           </div>
           <div class="mb-3">
            <input class="form-control" type="password" name="password" placeholder="Password" />
             ${getError(errors, "password")}
            <button class="mt-3 text-center">Sign In</button>
           </div>
         </form>
        </div>
        <div class="col">
        </div>
      </div>
    </div>`,
  });
};
