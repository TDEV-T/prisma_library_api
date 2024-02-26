import express from "express";

const route = express.Router();

const {
  createBorrow,
  returnBorrow,
  getAllBorrows,
  updateBorrow,
  getBorrowDataWithSearch
} = require("./../controllers/BorrowController");

route.post("/borrow/return", returnBorrow);

route.post("/borrow", createBorrow);

route.get("/borrows", getAllBorrows);

route.patch("/borrow", updateBorrow);

route.get("/borrows/:search",getBorrowDataWithSearch)

module.exports = route;
