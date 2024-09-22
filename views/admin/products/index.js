import layout from "../layout.js";
export default function productsIndexTemplate({ products }) {
  const renderedProducts = products
    .map((product) => {
      return `
    <tr>
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>
        <a href="/admin/products/${product.id}/edit">
          <button class="button is-link">
            Edit
          </button>
        </a>
      </td>
      <td>
      <form method="POST" action="/admin/products/${product.id}/delete">
           <button class="button is-danger" href="">Delete</button>
      </form>
      </td>
    </tr>
  `;
    })
    .join("");

  return layout({
    content: `
    <div class="control" style="
    display: flex;
    justify-content: space-between;
    margin-top:20px;
    ">
      <h1 class="subtitle">Products</h1>  
      <a href="/admin/products/new" class="button is-primary">New Product</a>
    </div>
    <table class="table" style="width:90%;">
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
}
