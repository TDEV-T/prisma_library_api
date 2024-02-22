import express from "express";

const route = express.Router();

const {
    createBorrow,
    returnBorrow
} = require("./../controllers/BorrowController");

route.post("/borrow", createBorrow);

route.patch("/borrow/return", returnBorrow);


module.exports = route;