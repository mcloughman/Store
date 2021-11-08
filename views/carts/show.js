const layout = require("../layout");

module.exports = ({ items }) => {
  let totalPrice = 0;
  for (let item of items) {
    totalPrice += item.product.price * item.quantity;
  }
  const renderedItems = items
    .map((item) => {
      return `
         <tr>
            <td>${item.product.title}</td>
            <td class="m-3">${item.quantity}</td>
            <td>$${item.product.price}</td>
            
            <td>$${item.quantity * item.product.price}
            <td>
              <form action="/cart/products/delete" method="POST">
              <input hidden value="${item.id}" name="itemId" />
                <button class="btn btn-danger">Delete</button>
              </form>
            </td>
        </tr>
        `;
    })
    .join("");

  return layout({
    content: `
    <div class="container pink">
    </div>
      <table class="table">
        <thead>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Q*P</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
        
            ${renderedItems}
        </tbody>
    </table>
    <div class="total">
    <h2>Cart Total Price: $${totalPrice}
        `,
  });
};
