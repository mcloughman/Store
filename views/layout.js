module.exports = ({ content }) => {
  return `
      <!DOCTYPE html>
          <html>
              <head>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
              <link href="/css/main.css" rel="stylesheet">
              </head>
              <body>
              <div class="container">
              <div class="d-flex panel justify-content-around">
              <h1>Products</h1>
              </div>
              
              ${content}
              </div>
              <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
              </body>
          </html>
      `;
};
