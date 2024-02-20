import { PrismaClient } from "@prisma/client";
import { NextFunction } from "express";
import express, { Application, Request, Response } from "express";
import cors from "cors";
var app = express();
var prisma = new PrismaClient();


app.use(cors());

app.get("/books", async function (req: Request, res: any, next: NextFunction) {
  const bookData = await prisma.book.findMany(); //"SELECT * FROM BOOK"

  res.json({
    data: bookData,
    status: true,
  });
});

app.get(
  "/books/:id",
  async function (req: Request, res: any, next: NextFunction) {
    const id = req.params.id;

    const book = await prisma.book.findUnique({
      where: {
        id: id,
      },
      include: {
        type: true,
      },
    });

    res.json({
      data: book,
    });
  }
);

app.post("/book", async function (req: Request, res: any, next: NextFunction) {
  const updatedata: RequestBookUpdate = req.body;

  res.json({
    msg: updatedata,
  });
});

app.listen(process.env.PORT, function () {
  console.log("CORS-enable web server listen on port 80");
  console.log(process.env.PORT);
});
