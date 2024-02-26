import express from "express";

const route = express.Router();

const { getAllStats } = require("./../controllers/StatsController");

route.get("/stats",getAllStats)

module.exports = route;