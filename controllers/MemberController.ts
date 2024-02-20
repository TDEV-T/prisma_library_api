import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

var prisma = new PrismaClient();

exports.getMembers = async (req: Request, res: Response) => {
  const memberData = await prisma.member.findMany();

  res.json({
    data: memberData,
  });
};

exports.getMemberOne = async (req: Request, res: Response) => {
  const username = req.params.username;
  const memberData = await prisma.member.findUnique({
    where: {
      username: username,
    },
  });

  res.json({
    data: memberData,
  });
};

exports.updateMember = async (req: Request, res: Response) => {
  const id = req.params.id;

  const idupdate = req.body.id;
  const name = req.body.name;
  const author = req.body.author;
  const type = req.body.type;

  try {
    const bookData = await prisma.book.update({
      where: {
        id: id,
      },
      data: {
        id: idupdate,
        name: name,
        author: author,
        typeId: type,
      },
    });

    res.json({
      data: bookData,
      status: true,
      message: "Update Success !",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error Can't Update" });
  }
};

exports.deleteMember = async (req: Request, res: Response) => {
  const username = req.params.username;

  try {
    const memberDelete = await prisma.member.delete({
      where: {
        username: username,
      },
    });

    res.json({
      data: memberDelete,
      stauts: true,
      message: "Delete Success",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error can't Delete" });
  }
};
