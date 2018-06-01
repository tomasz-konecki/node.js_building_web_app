const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;
const bookRouter = express.Router();

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

const books = [
  {
    title: "War and Peace",
    genre: "Historical Fiction",
    author: "Lev Tolstoy",
    read: false
  },
  {
    title: "Les Miserables",
    genre: "Historical Fiction",
    author: "Victor Hugo",
    read: false
  },
  {
    title: "The Time Machine",
    genre: "Science Fiction",
    author: "H. G. Wells",
    read: false
  },
  {
    title: "The Dark World",
    genre: "Fantasy",
    author: "Kenneth Grahame",
    read: false
  }
];

bookRouter.route("/").get((req, res) => {
  res.render("books", {
    title: "The Library",
    nav: [
      { link: "/books", title: "Books" },
      { link: "/authors", title: "Authors" }
    ],
    books
  });
});

bookRouter.route("/single").get((req, res) => {
  res.send("hello single book");
});

app.use("/books", bookRouter);

app.get("/", (req, res) => {
  res.render("index", {
    title: "The Library",
    nav: [
      { link: "/books", title: "Books" },
      { link: "/authors", title: "Authors" }
    ]
  });

  // res.sendFile(path.join(__dirname, "views/index.html"));
  // this also works:
  //   res.sendFile(path.join(__dirname, "/views/", "/index.html/"));
});

app.listen(port, () => {
  debug(`listening at port ${chalk.blue(port)} `);
});
