const { getError } = require("../../helpers");
const layout = require("../layout");

module.exports = ({ product, errors }) => {
  return layout({
    content: `
    <div class="container">
    <div class="row">
      <div class="col">
      </div>
      <div class="col-lg-8"> 
        <form method="POST" enctype="multipart/form-data">
          <div class="mb-3">
          <h1 class="text-center h1">Admin Edit Product</h1>
            <input class="form-control" type="text" name="title" placeholder="Title" value="${
              product.title
            }" />
            ${getError(errors, "title")}
          </div>  
          <div class="mb-3">             
            <input class="form-control" type="text" name="price" placeholder="Price" value="${
              product.price
            }" />
            ${getError(errors, "price")}
          </div>
          <div class="mb-3">
            <input class="form-control" type="file" name="image" />
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
