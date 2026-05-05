import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(req) {
  const { ingredients } = await req.json();

  if (!ingredients || ingredients.length === 0) {
    return new Response(JSON.stringify({ error: "No ingredients provided." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system:
      "You are a recipe suggestion assistant. Always respond with a JSON array of exactly 3 recipe objects. Each object must have: \"name\" (string), \"description\" (one sentence), and \"steps\" (array of 3–5 strings). Assume the user has common pantry staples (salt, pepper, oil, water). Return only the JSON array — no markdown, no explanation.",
    messages: [
      {
        role: "user",
        content: `I have these ingredients: ${ingredients.join(", ")}.`
      }
    ]
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    }
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
