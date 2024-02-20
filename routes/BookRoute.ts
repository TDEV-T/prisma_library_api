import express from "express";

const route = express.Router();

const {
  getBooks,
  getBookOne,
  updateBook,
  deleteBook,
  createBook,
} = require("./../controllers/BookController");

route.get("/books", getBooks);

route.get("/book/:id", getBookOne);

route.post("/book", createBook);

route.patch("/book/:id", updateBook);

route.delete("/book/:id", deleteBook);

module.exports = route;
