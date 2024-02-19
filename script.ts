import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.book.create({
        data:{
            id : "B1234",
            name: "Programming with C++",
            author: "TDEV",
            type:{
                create:{
                    name:"Learning"
                }
            }
        }
    })

}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
