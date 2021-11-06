const layout = require("../layout.js");
const { getError } = require("../../helpers.js");

module.exports = ({ req, errors }) => {
  //the errors object will only be passed in potentially on the post route
  // destructure out the req object
  return layout({
    content: `
    
    Your id is: ${req.session.userId}
    <div class="container">
      <div class="row">
        <div class="col">
        </div>
        <div class="col-lg-8">

          <form method="POST">
            <div class="mb-3">
            <h1 class="text-center h1">Admin Sign Up</h1>
              <input type="email" class="form-control" placeholder="email" name="email"/>
              ${getError(errors, "email")}
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" placeholder="password" name="password"/>
              ${getError(errors, "password")}
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" placeholder="password confirmation" name="passwordConfirmation"/>
              ${getError(errors, "passwordConfirmation")}
            </div>
            <button>Submit</button>
          </form>
        </div>
        <div class="col">
        </div>
      </div>
    </div>
    `,
  });
};
