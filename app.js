const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const sql = require("mssql");

const app = express();
const port = process.env.PORT || 5000;

const config = {
  user: "library",
  password: "Qwerty1234%",
  server: "pslibraryserver.database.windows.net", // You can use 'localhost\\instance' to connect to named instance
  database: "PSLibrary",

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

sql.connect(config).catch((err) => debug(err));

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/jquery/dist"))
);
app.use("/js", express.static(path.join(__dirname, "/node_modules/popper")));
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);

app.set("views", "./src/views");
app.set("view engine", "ejs");

const nav = [
  { link: "/books", title: "Book" },
  { link: "/authors", title: "Author" }
];
const bookRouter = require("./src/routes/bookRoutes")(nav);

app.use("/books", bookRouter);

app.get("/", (req, res) => {
  res.render("index", {
    title: "The Library",
    nav
  });
});

app.listen(port, () => {
  debug(`listening at port ${chalk.blue(port)} `);
});
