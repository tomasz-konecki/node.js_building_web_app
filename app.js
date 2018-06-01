const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;
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
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { list: ["a", "b"] });

  // res.sendFile(path.join(__dirname, "views/index.html"));
  // this also works:
  //   res.sendFile(path.join(__dirname, "/views/", "/index.html/"));
});

app.listen(port, () => {
  debug(`listening at port ${chalk.blue(port)} `);
});
