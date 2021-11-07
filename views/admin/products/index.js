const layout = require("../layout");

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
            <div>
            ${product.title}
            </div>
        `;
    })
    .join("");
  return layout({
    content: `
        <h1 class="products">Products</h1>
        ${renderedProducts}

        `,
  });
}; // products should be an array of all the different products
