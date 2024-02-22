import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

var prisma = new PrismaClient();

exports.getBooks = async (req: Request, res: Response) => {
  const bookData = await prisma.tb_book.findMany();

  res.json({
    data: bookData,
  });
};

exports.getBookOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bookData = await prisma.tb_book.findUnique({
    where: {
<<<<<<< HEAD
      b_id: id,
=======
      b_id: id
>>>>>>> d5f2c2f83820b701f7bf4e270d168ef46edc4ae2
    },
  });

  res.json({
    data: bookData,
  });
};

exports.createBook = async (req: Request, res: Response) => {
  const id = req.body.b_id;
  const name = req.body.b_name;
  const author = req.body.b_writer;
  const type = req.body.b_category;
  const price = req.body.b_price;
  try {
    const bookData = await prisma.tb_book.create({
      data: {
        b_id: id,
        b_name: name,
        b_writer: author,
        b_category: type,
<<<<<<< HEAD
=======
        b_price: price
>>>>>>> d5f2c2f83820b701f7bf4e270d168ef46edc4ae2
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
  const price = req.body.price;

  try {
    const bookData = await prisma.tb_book.update({
      where: {
        b_id: id,
      },
      data: {
<<<<<<< HEAD
        b_id: idupdate,
        b_name: name,
        b_writer: author,
        b_category: type,
=======
        b_id: id,
        b_name: name,
        b_writer: author,
        b_category: type,
        b_price: price
>>>>>>> d5f2c2f83820b701f7bf4e270d168ef46edc4ae2
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
    const bookDelete = await prisma.tb_book.delete({
      where: {
<<<<<<< HEAD
        b_id: id,
=======
        b_id: id
>>>>>>> d5f2c2f83820b701f7bf4e270d168ef46edc4ae2
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
