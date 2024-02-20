import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

var prisma = new PrismaClient();

exports.getBooks = async (req: Request, res: Response) => {
  const bookData = await prisma.book.findMany({
    include: {
      type: true,
    },
  });

  res.json({
    data: bookData,
  });
};

exports.getBookOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bookData = await prisma.book.findUnique({
    where: {
      id: id,
    },
    include: {
      type: true,
    },
  });

  res.json({
    data: bookData,
  });
};

exports.createBook = async (req: Request, res: Response) => {
  const id = req.body.id;
  const name = req.body.name;
  const author = req.body.author;
  const type = req.body.type;

  try {
    const bookData = await prisma.book.create({
      data: {
        id: id,
        name: name,
        author: author,
        typeId: type,
      },
    });

    res.json({
      data: bookData,
      status: true,
      message: "Create Success !",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error Can't Create" });
  }
};

exports.updateBook = async (req: Request, res: Response) => {
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

exports.deleteBook = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const bookDelete = await prisma.book.delete({
      where: {
        id: id,
      },
    });

    res.json({
      data: bookDelete,
      stauts: true,
      message: "Delete Success",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error can't Delete" });
  }
};
