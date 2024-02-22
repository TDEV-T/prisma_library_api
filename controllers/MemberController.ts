import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

var prisma = new PrismaClient();

exports.getMembers = async (req: Request, res: Response) => {
  const memberData = await prisma.tb_member.findMany();

  res.json({
    data: memberData,
  });
};

exports.getMemberOne = async (req: Request, res: Response) => {
  const username = req.params.username;
  const memberData = await prisma.tb_member.findUnique({
    where: {
      m_user: username,
    },
  });

  res.json({
    data: memberData,
  });
};

exports.updateMember = async (req: Request, res: Response) => {
  const userReq = req.params.user;

  const user = req.body.user;
  const name = req.body.name;
  const pass = req.body.pass;
  const phone = req.body.phone;

  try {
    const bookData = await prisma.tb_member.update({
      where: {
        m_user: userReq,
      },
      data: {
        m_user: user,
        m_name: name,
        m_pass: pass,
        m_phone: phone,
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
    const memberDelete = await prisma.tb_member.delete({
      where: {
        m_user: username,
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
