import nodemailer from "nodemailer";

export async function sendResetEmail(to:string,code:string) {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

  const mailOptions = {
    from: `"RiseBit Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Password Reset - Your Code",
    text: `Your reset code is: ${code}`,
    html: `
        <div style="font-family:sans-serif; line-height:1.4">
            <h2>Hi!</h2>
            <p>You have requested a password reset. Your code is:</p>
            <h1 style="color:#007bff">${code}</h1>
            <p>Code expires in 10 minutes.</p>
            <p>If you didn't ask for this, ignore this message.</p>
        </div>`,
    };

    await transporter.sendMail(mailOptions);

}