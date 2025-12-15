import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
	try {
		const { name, email, message } = await req.json();

		// 1. Create a Transporter
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		// 2. Define Email Options
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_USER,
			replyTo: email,
			subject: `New Contact Form Submission from ${name}`,
			text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
			html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
		};

		// 3. Send Email
		await transporter.sendMail(mailOptions);

		return NextResponse.json({
			success: true,
			message: "Email sent successfully",
		});
	} catch (error) {
		console.error("Error sending email:", error);
		return NextResponse.json(
			{ success: false, message: "Failed to send email" },
			{ status: 500 }
		);
	}
}
