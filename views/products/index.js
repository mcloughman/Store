const layout = require("../layout");

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
      <div class="card" style="width: 18rem">
      <img src="data:image/png;base64, ${product.image}" class="card-img-top" style="height: 20rem"/>
        <div class="card-body>
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.price}</p>
          
        </div>
        <form method="POST" action="/cart/products">
            <input hidden value="${product.id}" name="productId" />
            <button type="submit" class="btn btn-primary">Add to cart</button>
          </form>
      </div>
      
        `;
    })
    .join("");

  return layout({
    content: `
    <div class="container">
      <div class="row">
        
            ${renderedProducts}
      </div>
    </div>
    `,
  });
};
