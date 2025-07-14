import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordEmail = async (
  to: string,
  password: string,
  name: string
) => {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
      <h2 style="color: #333;">Welcome to the Company, ${name}!</h2>
      <p>We're excited to have you on board as an <strong>Employee</strong>.</p>

      <p>Here are your login details:</p>

      <ul style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${to}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>

      <p>Please keep this information secure and do not share it with anyone.</p>

      <p>We recommend that you change your password after your first login.</p>

      <br />

      <p>Best regards,</p>
      <p><strong>HR Team</strong></p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Company HR" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome! Your Login Credentials",
    html: emailHtml,
  });
};
