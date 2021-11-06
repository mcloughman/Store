const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ errors }) => {
  return layout({
    content: `
            <form method="POST" enctype="multipart/form-data">
            <input type="text" name="title" placeholder="Title" />
            <input type="text" name="price" placeholder="Price" />
            <input type="file" name="image" />
            <button>Submit</button>
            </form>
        `,
  });
};
