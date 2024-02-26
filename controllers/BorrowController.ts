import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

var prisma = new PrismaClient();

exports.createBorrow = async (req: Request, res: Response) => {
  const m_user = req.body.m_user;
  const b_id = req.body.b_id;
  const br_date_br = req.body.br_date_br;

  try {
    const borrow = await prisma.tb_borrow_book.create({
      data: {
        br_date_br: new Date(br_date_br),
        br_date_rt: null,
        book: {
          connect: {
            b_id: b_id,
          },
        },
        user: {
          connect: {
            m_user: m_user,
          },
        },
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
  const br_fine = req.body.br_fine;
  const br_date_rt = req.body.br_date_rt;

  const br_id = req.body.br_date_br_old;
  const mid = req.body.m_user_old;
  const bid = req.body.b_id_old;

  try {
    const borrow = await prisma.tb_borrow_book.update({
      where: {
        br_date_br_m_user_b_id: {
          br_date_br: new Date(br_id),
          m_user: mid,
          b_id: bid,
        },
      },

      data: {
        br_date_rt: new Date(br_date_rt),
        br_fine: parseInt(br_fine),
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
  const id = req.body.br_date_rt_old;
  const mid = req.body.m_user_old;
  const bid = req.body.b_id_old;

  const br_date_br = new Date(req.body.br_date_br);
  const br_date_rt = new Date(req.body.br_date_rt);
  const m_user = req.body.m_user;
  const b_id = req.body.b_id;
  const br_fine = req.body.br_fine;

  try {
    const borrow = await prisma.tb_borrow_book.update({
      where: {
        br_date_br_m_user_b_id: {
          br_date_br: id,
          m_user: mid,
          b_id: bid,
        },
      },
      data: {
        br_date_br: br_date_br,
        br_date_rt: br_date_rt,
        m_user: m_user,
        b_id: b_id,
        br_fine: parseInt(br_fine),
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


exports.getBorrowDataWithSearch = async (req: Request, res: Response) => {
  try {

    const searchText = req.params.search;
    

    console.log(searchText);


    const data = await prisma.tb_borrow_book.findMany({
      where: {
        OR:[
          {
            m_user : {
              contains:searchText
            }
          },
          {
            b_id : {
              contains:searchText
            }
          }
        ]
      },
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
