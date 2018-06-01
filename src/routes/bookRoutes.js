const express = require("express");
const bookRouter = express.Router();

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
		nav: [ { link: "/books", title: "Books" }, { link: "/authors", title: "Authors" } ],
		books
	});
});

bookRouter.route("/single").get((req, res) => {
	res.send("hello single book");
});

module.exports = bookRouter;
