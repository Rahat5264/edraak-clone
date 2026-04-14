"use server";

import { n8nRequest } from "../n8n";

export async function sendInquiry(data: {
  product: string;
  name: string;
  address?: string;
  company?: string;
  message?: string;
}) {
  return await n8nRequest({
    n8nSlug: "/inquiry",
    method: "POST",
    body: data,
  });
}
