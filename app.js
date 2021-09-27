const express = require("express");
const exphbs = require("express-handlebars");
const port = 3000;
const app = express();
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");
app.get("/", (req, res) => res.render("index"));
app.listen(port, () => {
	console.log("app.js is listening");
});
