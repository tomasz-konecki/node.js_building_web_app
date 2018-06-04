const express = require("express");
const bookRouter = express.Router();
const debug = require("debug")("app:bookRoutes");

function router(nav) {
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
    res.render("bookListView", {
      title: "The Library",
      nav,
      books: recordset
    });

  });

  bookRouter.route("/:id").get((req, res) => {
    res.render("bookView", {
      title: "Library",
      nav,
      book: recordset[0]
    });

  });
  return bookRouter;
}

module.exports = router;
