import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const hashPasswords = async () => {

    const users = await prisma.user.findMany();

    for(const user of users){
        if(user.password.length < 60){

            const hashedPassword = await bcrypt.hash(user.password,10);

            await prisma.user.update({
                where:{
                    id:user.id,
                },
                data:{
                    password:hashedPassword,
                }
            });
        }
    }
}

hashPasswords();