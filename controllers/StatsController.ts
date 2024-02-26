import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

var prisma = new PrismaClient();

exports.getAllStats = async (req: Request, res: Response) => {
  try {
    const bookCount = await prisma.tb_book.count();
    const memberCount = await prisma.tb_member.count();
    const borrowCount = await prisma.tb_borrow_book.count();
    const borrowNotCompelete = await prisma.tb_borrow_book.count({
      where: {
        br_date_rt: null,
      },
    });

    res.json({
        book: bookCount,
        member: memberCount,
        borrow: borrowCount,
        borrowNotCompelete: borrowNotCompelete,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error can't Get Data" });
  }
};
