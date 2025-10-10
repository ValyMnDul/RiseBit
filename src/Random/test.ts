import prisma from "@/lib/prisma";

async function main() {
  const user = await prisma.user.create({
    data: {
      firstName: "Vali",
      lastName: "Mnd",
      email: "vali@example.com",
      password: "123456", // necriptat acum, o să rezolvăm asta mai târziu
      birthDate: new Date("2007-01-01"),
    },
  });

  console.log("User creat:", user);
}

main();
//   .then(() => process.exit(0))
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   });