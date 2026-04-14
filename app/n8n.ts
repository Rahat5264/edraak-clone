const n8nRequest = async ({
  n8nSlug,
  method,
  headers,
  queryParam,
  body,
}: {
  n8nSlug: string;
  method?: "POST" | "GET" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  queryParam?: Record<string, string>;
  body?: any;
}) => {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const secret = process.env.N8N_WEBHOOK_SECRET;

  if (webhookUrl && secret) {
    const responst = await fetch(
      webhookUrl + n8nSlug + `?${new URLSearchParams(queryParam)}`,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          secret: secret,
          ...headers,
        },
        body: body ? JSON.stringify({ ...body }) : undefined,
      },
    );
    if (!responst.ok) {
      console.error(
        `Failed to send data to n8n at ${n8nSlug}`,
        await responst.text(),
      );
      // throw new Error(`Failed to send data to n8n at ${n8nSlug}`);
      return false
    }
  } else {
    console.warn("N8N webhook URL or secret is not configured");
    return false
  }

  return true;
};

export { n8nRequest };
