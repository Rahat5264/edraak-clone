"use server";

import { n8nRequest } from "../n8n";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function contactUs(data: any) {
  // Extract the Turnstile token from the payload
  const turnstileToken = data?.turnstileToken;

  // Optional: Enforce Turnstile verification
  // Set to true to make it required, false to make it optional
  const isTurnstileRequired = false;

  // Verify Turnstile token if provided
  if (turnstileToken) {
    const verification = await verifyTurnstileToken(turnstileToken);

    if (!verification.success) {
      console.error("Turnstile verification failed:", verification.error);
      
      if (isTurnstileRequired) {
        throw new Error("Verification failed. Please try again.");
      }
      // If not required, log but continue
      console.warn("Turnstile verification failed but continuing (optional mode)");
    }
  } else {
    if (isTurnstileRequired) {
      throw new Error("Turnstile verification token is missing.");
    }
    console.warn("No Turnstile token provided");
  }

  // Remove the token from the payload before sending to n8n
  const { turnstileToken: _, ...cleanedData } = data;

  return await n8nRequest({
    n8nSlug: "/contact-us",
    method: "POST",
    body: cleanedData,
  });
}
