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
      b_id: id,
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
        b_category: parseInt(type),
        b_price: parseInt(price),
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

  const idupdate = req.body.b_id;
  const name = req.body.b_name;
  const author = req.body.b_writer;
  const type = req.body.b_category;
  const price = req.body.b_price;

  try {
    const bookData = await prisma.tb_book.update({
      where: {
        b_id: id,
      },
      data: {
        b_id: idupdate,
        b_name: name,
        b_writer: author,
        b_category: type,
        b_price: parseInt(price),
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
        b_id: id,
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

exports.getBooksByName = async (req: Request, res: Response) =>{
  const search = req.params.name;

  try {
    const bookData = await prisma.tb_book.findMany({
      where: {
        OR: [
          {
            b_name: {
              contains: search,
            },
          },
          {
            b_id: {
              contains: search,
            },
          },
        ],
      },
    });

      res.json({
      data: bookData,
      status: true,
      message: "Get Data Success !",
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error Can't Get Username" });
  }
}
