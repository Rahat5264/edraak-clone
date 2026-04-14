"use server";

import { n8nRequest } from "../n8n";

export async function contactUs(data: any) {
  return await n8nRequest({
    n8nSlug: "/contact-us",
    method: "POST",
    body: data,
  });
}
