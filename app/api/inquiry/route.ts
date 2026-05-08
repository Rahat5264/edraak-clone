import { n8nRequest } from "@/app/n8n";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { NextResponse } from "next/server";

const n8nSlug = "/inquiry";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product, name, address, company, message, turnstileToken } = body || {};
    if (!product || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const isTurnstileRequired = false;

    if (turnstileToken) {
      const verification = await verifyTurnstileToken(turnstileToken);
      if (!verification.success) {
        if (isTurnstileRequired) {
          return NextResponse.json(
            { error: "Turnstile verification failed" },
            { status: 400 },
          );
        }
        console.warn("Turnstile verification failed but continuing (optional mode)");
      }
    } else if (isTurnstileRequired) {
      return NextResponse.json(
        { error: "Turnstile verification token is missing" },
        { status: 400 },
      );
    }

    n8nRequest({
      n8nSlug,
      method: "POST",
      body: { product, name, address, company, message },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error("Inquiry API error", err);
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 },
    );
  }
}
