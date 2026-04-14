import { n8nRequest } from "@/app/n8n";
import { NextResponse } from "next/server";

const n8nSlug = "/inquiry";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product, name, address, company, message } = body || {};
    if (!product || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
