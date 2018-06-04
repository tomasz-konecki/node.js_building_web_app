const express = require("express");

const bookRouter = express.Router();
const sql = require("mssql");
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
    (async function query() {
      const request = new sql.Request();
      const { recordset } = await request.query("select * from books");
      // debug(result);

      res.render("bookListView", {
        title: "The Library",
        nav,
        books: recordset
      });
    }());
  });

  bookRouter.route("/:id").get((req, res) => {
    (async function query() {
      const { id } = req.params;
      const request = new sql.Request();
      const { recordset } = await request
        .input("id", sql.Int, id)
        .query("select * from books where id = @id");
      // debug(result);
      res.render("bookView", {
        title: "Library",
        nav,
        book: recordset[0]
      });
    }());
  });
  return bookRouter;
}

module.exports = router;
