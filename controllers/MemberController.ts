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

exports.createMember = async (req: Request, res: Response) => {
  const username = req.body.m_user;
  const name = req.body.m_name;
  const pass = req.body.m_pass;
  const phone = req.body.m_phone;

  try {
    const bookData = await prisma.tb_member.create({
      data: {
        m_user: username,
        m_name: name,
        m_pass: pass,
        m_phone: phone,
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

exports.getMemberByName = async (req: Request, res: Response) => {
  const username = req.params.name;
  try {
    const memberData = await prisma.tb_member.findMany({
      where: {
        OR: [
          {
            m_user: {
              contains: username,
            },
          },
          {
            m_name: {
              contains: username,
            },
          },
        ],
      },
    });

      res.json({
      data: memberData,
      status: true,
      message: "Get Data Success !",
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error Can't Get Username" });
  }
};

exports.updateMember = async (req: Request, res: Response) => {
  const user = req.params.id;

  const username = req.body.m_user;
  const name = req.body.m_name;
  const pass = req.body.m_pass;
  const phone = req.body.m_phone;

  try {
    const bookData = await prisma.tb_member.update({
      where: {
        m_user: user,
      },
      data: {
        m_user: username,
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
  const username = req.params.id;

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
