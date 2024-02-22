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
  const m_user = req.body.user;
  const b_id = req.body.book;
  const br_fine = req.body.fine;
  const br_id = req.body.brid;

  try {
    const borrow = await prisma.tb_borrow_book.update({
      where: {
        book: {
          b_id: b_id,
        },
        user: {
          m_user: m_user,
        },
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
