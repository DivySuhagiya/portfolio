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

		// 2. Define Email to YOU (The Admin Notification)
		const mailOptionsAdmin = {
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_USER,
			replyTo: email,
			subject: `New Lead: ${name}`,
			text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
			html: `
                <h3>New Portfolio Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <div style="background:#f4f4f5; padding:20px; border-radius:10px;">
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, "<br>")}</p>
                </div>
            `,
		};

		// 3. Define Auto-Reply to USER (The Unique "Digital Twin" Response)
		const mailOptionsUser = {
			from: `"Divy's AI Agent" <${process.env.EMAIL_USER}>`, // Custom Display Name
			to: email,
			subject: "Handshake Successful: Message Received 🚀",
			html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden;">
                    <div style="background-color: #18181b; padding: 24px; text-align: center;">
                        <h2 style="color: #ffffff; margin: 0;">Transmission Received</h2>
                    </div>
                    <div style="padding: 24px; background-color: #ffffff; color: #3f3f46; line-height: 1.6;">
                        <p>Hi ${name},</p>
                        <p>This is an automated acknowledgment from <strong>Divy's Digital Twin</strong>.</p>
                        <p>My systems have successfully processed your message packet. I've placed it in the high-priority queue for the <em>human</em> Divy to review.</p>
                        
                        <p style="background-color: #f4f4f5; padding: 12px; border-radius: 6px; font-style: italic; border-left: 4px solid #8b5cf6;">
                            "I usually respond within 24 hours—unless I'm deep in a debugging session or training a new model."
                        </p>

                        <p>While you wait, feel free to continue exploring the agentic AI demos on the portfolio.</p>
                        
                        <p style="margin-top: 30px;">Best regards,<br/>
                        <strong>Divy Suhagiya</strong><br/>
                        <span style="font-size: 12px; color: #71717a;">Full Stack Developer</span>
                        </p>
                    </div>
                    <div style="background-color: #f4f4f5; padding: 12px; text-align: center; font-size: 12px; color: #71717a;">
                        &copy; ${new Date().getFullYear()} Divy.dev
                    </div>
                </div>
            `,
		};

		// 4. Send Both Emails concurrently (Faster)
		await Promise.all([
			transporter.sendMail(mailOptionsAdmin),
			transporter.sendMail(mailOptionsUser),
		]);

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
