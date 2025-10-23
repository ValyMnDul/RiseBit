import nodemailer from "nodemailer";

export async function sendVerifyEmailCode(to:string,code:string) {

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
    subject: "Verify Your Email - RiseBit",
    text: `
    Hi,

    You requested to verify your email address.
    Your verification code is: ${code}

    The code will expire in 10 minutes.

    If you didn't request this, you can safely ignore this email.

    — The RiseBit Team
    `,
    html: `
    <body style="margin:0; padding:0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #ffffff;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 0;">
            
            <!-- Main Container -->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 800px; background-color: #ffffff; border-collapse: collapse;">
                
                <!-- Header -->
                <tr>
                <td align="center" style="background-color: #007bff; padding: 24px 0;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">RiseBit</h1>
                </td>
                </tr>

                <!-- Content -->
                <tr>
                <td style="padding: 40px 60px;">
                    <h2 style="color: #333; font-size: 22px; margin-bottom: 16px;">Hello!</h2>
                    <p style="font-size: 16px; color: #555; line-height: 1.7; margin: 0 0 24px;">
                    You requested to verify your email address. Please use the verification code below:
                    </p>

                    <div style="text-align: center; margin: 40px 0;">
                    <div style="display: inline-block; background-color: #f0f4ff; color: #007bff; font-size: 36px; font-weight: bold; padding: 16px 40px; border-radius: 10px; letter-spacing: 4px;">
                        ${code}
                    </div>
                    </div>

                    <p style="font-size: 16px; color: #555;">
                    This code will expire in <strong>10 minutes</strong>.
                    </p>

                    <p style="font-size: 15px; color: #777; margin-top: 24px;">
                    If you didn’t request this verification, you can safely ignore this message.
                    </p>
                </td>
                </tr>

                <!-- Footer -->
                <tr>
                <td align="center" style="background-color: #f3f4f6; padding: 20px; color: #888; font-size: 13px;">
                    © ${new Date().getFullYear()} RiseBit. All rights reserved.
                </td>
                </tr>

            </table>
            </td>
        </tr>
        </table>
    </body>
    `,
    };

    await transporter.sendMail(mailOptions);

}