import { sendBrevoTransactionalEmail } from "@/lib/brevo";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const payloadAsArray = Object.entries(payload).map(([key, value]) => {
      const newValue = Array.isArray(value) ? value.join(", ") : value;
      return { key, value: newValue }
    })

    await sendBrevoTransactionalEmail(payloadAsArray);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to send email.";
    console.error("Email sending failed:", message);
    return NextResponse.json(
      {
        error:
          "We couldn't submit your response right now. Please refresh the page and try again.",
      },
      { status: 422 },
    );
  }
}
