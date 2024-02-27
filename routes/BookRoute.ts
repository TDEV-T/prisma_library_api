import express from "express";

const route = express.Router();

const {
  getBooks,
  getBookOne,
  updateBook,
  deleteBook,
  createBook,
  getBooksByName
} = require("./../controllers/BookController");

route.get("/books", getBooks);

route.get("/book/:id", getBookOne);

route.post("/book", createBook);

route.patch("/book/:id", updateBook);

route.delete("/book/:id", deleteBook);

route.get("/books/:name",getBooksByName);

module.exports = route;
