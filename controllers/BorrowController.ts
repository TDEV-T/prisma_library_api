import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

var prisma = new PrismaClient();

exports.createBorrow = async (req: Request, res: Response) => {
  const m_user = req.body.user;
  const b_id = req.body.book;

  try {
    const borrow = await prisma.tb_borrow_book.create({
      data: {
        br_date_br: new Date(),
        br_date_rt: "",
        book: b_id,
        user: m_user,
        br_fine: 0,
      },
    });

    res.json({
      data: borrow,
      status: true,
      message: "Create Success !",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error Can't Create Borrow" });
  }
};

exports.returnBorrow = async (req: Request, res: Response) => {
  const br_fine = req.body.br_find;
  const br_id = req.body.br_date_br;

  try {
    const borrow = await prisma.tb_borrow_book.update({
      where: {
        br_date_br: br_id,
      },
      data: {
        br_date_rt: new Date(),
        br_fine: br_fine,
      },
    });

    res.json({
      data: borrow,
      status: true,
      message: "Update Success!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error: Cannot Update Borrow" });
  }
};

exports.getAllBorrows = async (req: Request, res: Response) => {
  try {
    const data = await prisma.tb_borrow_book.findMany({
      include: {
        user: true,
        book: true,
      },
    });

    res.json({
      data: data,
      status: true,
      message: "Get Data Success",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error: Cannot Get Borrow List" });
  }
};

exports.updateBorrow = async (req: Request, res: Response) => {
  const id = req.params.id;

  const br_date_br = req.body.br_date_br;
  const br_date_rt = req.body.br_date_rt;
  const m_user = req.body.m_user;
  const b_id = req.body.b_id;
  const br_fine = req.body.br_fine;

  try {
    const borrow = await prisma.tb_borrow_book.update({
      where: {
        br_date_br: id,
      },
      data: {
        br_date_br: br_date_br,
        br_date_rt: br_date_rt,
        m_user: m_user,
        b_id: b_id,
        br_fine: br_fine,
      },
    });

    res.json({
      data: borrow,
      status: true,
      message: "Update Success!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error: Cannot Update List" });
  }
};
