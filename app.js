const express = require("express");
const exphbs = require("express-handlebars");
const port = 3000;
//資料庫連線
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restaurant-list");
const db = mongoose.connection;
db.on("error", () => console.log(error));
db.once("open", () => console.log("Database connecting"));
//匯入資料庫模組
const Todo = require("./models/todo");
//執行express
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//設置樣板引擎
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");
//基礎路由-首頁
app.get("/", (req, res) => {
	Todo.find()
		.lean()
		.then((todos) => {
			res.render("index", { todos });
		})
		.catch((error) => console.log(error));
});

//瀏覽單筆資料
app.get("/todos/:id", (req, res) => {
	const id = req.params.id;
	Todo.findById(id)
		.lean()
		.then((todos) => res.render("show", { todos }))
		.catch((error) => console.log(error));
});

//監聽app.js
app.listen(port, () => {
	console.log("app.js is listening");
});
