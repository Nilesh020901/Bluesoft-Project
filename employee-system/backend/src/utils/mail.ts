import nodemailer from "nodemailer";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "[FOUND]" : "[MISSING]");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

export const sendPasswordEmail = async (to: string, password: string) => {
    await transporter.sendMail({
      from: `"Company HR" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your Employee System Password",
      text: `Hello! Your system password is: ${password}`,
    });
};