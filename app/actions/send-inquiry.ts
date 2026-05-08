"use server";

import { n8nRequest } from "../n8n";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function sendInquiry(data: {
  product: string;
  name: string;
  address?: string;
  company?: string;
  message?: string;
  turnstileToken?: string;
}) {
  const turnstileToken = data?.turnstileToken;
  const isTurnstileRequired = false;

  if (turnstileToken) {
    const verification = await verifyTurnstileToken(turnstileToken);

    if (!verification.success) {
      console.error("Turnstile verification failed:", verification.error);

      if (isTurnstileRequired) {
        throw new Error("Verification failed. Please try again.");
      }

      console.warn("Turnstile verification failed but continuing (optional mode)");
    }
  } else if (isTurnstileRequired) {
    throw new Error("Turnstile verification token is missing.");
  }

  const { turnstileToken: _, ...cleanedData } = data;

  return await n8nRequest({
    n8nSlug: "/inquiry",
    method: "POST",
    body: cleanedData,
  });
}
