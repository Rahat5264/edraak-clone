"use server";

import { n8nRequest } from "../n8n";

export async function subscriber(data: {
  email: string;
}) {
  return await n8nRequest({
    n8nSlug: "/subscriber",
    method: "POST",
    body: data,
  });
}
