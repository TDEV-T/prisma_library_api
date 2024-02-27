import express from "express";

const route = express.Router();

const {
    getMembers,
    getMemberOne,
    updateMember,
    deleteMember,
    createMember,
    getMemberByName
} = require("./../controllers/MemberController");

route.get("/members", getMembers);

route.get("/member/:id", getMemberOne);

route.post("/member", createMember);

route.patch("/member/:id", updateMember);

route.delete("/member/:id", deleteMember);

route.get("/members/:name",getMemberByName)

module.exports = route;
