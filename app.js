const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("tiny"));

app.use(express.static(path.join(__dirname, "/public")));
app.use("/css", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/jquery/dist")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/popper")));
app.use("/js", express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js")));

app.set("views", "./src/views");
app.set("view engine", "ejs");

const nav = [
  { link: "/books", title: "Book" },
  { link: "/authors", title: "Author" }
];
const bookRouter = require("./src/routes/bookRoutes")(nav);
const adminRouter = require("./src/routes/adminRoutes")(nav);

app.use("/books", bookRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.render("index", {
    title: "The Library",
    nav
  });
});

app.listen(port, () => {
  debug(`listening at port ${chalk.blue(port)} `);
});
