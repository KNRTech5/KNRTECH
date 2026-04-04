import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

interface ContactRequest {
  name: string;
  email: string;
  company: string;
  message: string;
}

// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

if (process.env.NODE_ENV === "development") {
  transporter.verify((error) => {
    if (error) {
      console.warn("Email service not configured properly:", error.message);
    }
  });
}

export async function POST(req: Request) {
  try {
    const body: ContactRequest = await req.json();

    // Validation
    if (!body.name || !body.email || !body.message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return Response.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Save to MongoDB
    await connectDB();
    await ContactMessage.create({
      name: body.name,
      email: body.email,
      company: body.company,
      message: body.message,
    });

    // Log submission
    console.log("Contact Form Submission saved to DB:", {
      name: body.name,
      email: body.email,
      company: body.company,
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    // Try to send email if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        // Send email to admin
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `New Contact Form Submission from ${body.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
            <p><strong>Company:</strong> ${escapeHtml(body.company || "Not provided")}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(body.message).replace(/\n/g, "<br>")}</p>
            <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
          `,
          replyTo: body.email,
        });

        // Send confirmation email to user
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: body.email,
          subject: "We received your message - KNR Tech",
          html: `
            <h2>Thank you for reaching out!</h2>
            <p>Hi ${escapeHtml(body.name)},</p>
            <p>We've received your message and will get back to you shortly.</p>
            <p>Our team typically responds within 24 hours.</p>
            <p>Best regards,<br>The KNR Tech Team</p>
          `,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    return Response.json(
      { success: true, message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

