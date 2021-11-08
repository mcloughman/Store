const layout = require("../layout");

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
          <tr>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>
              <a class="btn btn-info" href="/admin/products/${product.id}/edit">Edit</a> 
            </td>
            <td>
              <button class="btn btn-danger">Delete</btn>
            </btn>
          </tr>
        `;
    })
    .join("");
  return layout({
    content: `
    <div class="container pink">
    <h1 class="subtitle text-center">Products</h1>  
    <a href="/admin/products/new" class="btn btn-primary float-end">New Product</a>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Price</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      ${renderedProducts}
    </tbody>
  </table>
        
            
      
          
         
        `,
  });
}; // products should be an array of all the different products
