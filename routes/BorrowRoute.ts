import express from "express";

const route = express.Router();

const {
  createBorrow,
  returnBorrow,
  getAllBorrows,
  updateBorrow,
} = require("./../controllers/BorrowController");

route.post("/borrow/return", returnBorrow);

route.post("/borrow", createBorrow);

route.get("/borrows", getAllBorrows);

route.patch("/borrow/:id", updateBorrow);

module.exports = route;
