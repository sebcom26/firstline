import { NextResponse } from "next/server";
import { z } from "zod";

const BodySchema = z.object({
  role: z.string().min(2).max(80),
  companyType: z.string().min(2).max(80),
  context: z.string().optional().default(""),
});

function buildPrompt(role: string, companyType: string, context: string) {
  return `
You are an expert cold email copywriter.

Generate 10 cold email opening sentences.

Rules:
- Each opener must be ONE sentence
- Maximum 20 words
- Natural, human, non-salesy
- No buzzwords
- No emojis
- No questions like “Hope you’re well”
- No exclamation marks
- No mentioning “I came across”
- No pitching
- No greetings

Context:
Prospect role: ${role}
Company type: ${companyType}
Context: ${context || "No context"}

Return only the 10 lines.
`.trim();
}

export async function POST(req: Request) {
  try {
    const body = BodySchema.parse(await req.json());

    const baseUrl = (process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
    const apiKey = process.env.AI_API_KEY;
    const model = process.env.AI_MODEL || "gpt-4o-mini";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing AI_API_KEY env var. Add it in Vercel (and locally in .env.local)." },
        { status: 500 }
      );
    }

    const prompt = buildPrompt(body.role, body.companyType, body.context);

    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You write short, high-performing outbound copy." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      return NextResponse.json(
        { error: `AI error ${res.status}: ${txt}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "";

    const openers = content
      .split("\n")
      .map((l: string) => l.trim())
      .filter(Boolean)
      .map((l: string) => l.replace(/^(\d+[\).\s-]+|[-•]\s+)/, "").trim())
      .filter(Boolean)
      .slice(0, 10);

    if (openers.length === 0) {
      return NextResponse.json({ error: "Empty AI response" }, { status: 500 });
    }

    return NextResponse.json({ openers });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Bad request" }, { status: 400 });
  }
}
