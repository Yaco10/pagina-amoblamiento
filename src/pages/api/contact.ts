import type { APIRoute } from "astro";
import nodemailer from "nodemailer"

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const asunto = String(formData.get("asunto") ?? "");
    const email = String(formData.get("email") ?? "");
    const mensaje = String(formData.get("mensaje") ?? "");

    if (!asunto || !email || !mensaje) {
      return new Response(JSON.stringify({ ok: false, error: "Faltan campos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Savia Mobel - Contacto" <${import.meta.env.SMTP_USER}>`,
      to: import.meta.env.TO_EMAIL,
      replyTo: email,
      subject: `Asunto: ${asunto}`,
      text: `Asunto: ${asunto}\nEmail: ${email}\n\nMensaje:\n${mensaje}`,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ ok: false, error: "Error al enviar" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
