// Import express and the file containing our route definitions
const express = require("express");
const app = express();
const routes = require("./src/routes");

// Configure the express application
const port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

// Start the server
app.listen(port, () => {
  /*
  This is an example of string interpolation via Template Literals.
  This is an easier way of building strings than we've seen in the JS Test Lab. Read more: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  */
  console.log(`Your Express application is running on port ${port}`);
});
