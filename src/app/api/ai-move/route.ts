import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_MODEL } from '@/lib/models';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fen, model, apiKey, baseUrl } = body;

    const FALLBACK_MODEL = DEFAULT_MODEL;

    const callProvider = async (mdl: string) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 28000);
      try {
        return await fetch(`${baseUrl}/v1/messages`, {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: mdl,
            max_tokens: 400,
            system: 'You are a grandmaster chess engine. Respond only with the best legal move in Algebraic Notation (e.g., "e4", "Nf3"). Do not explain.',
            messages: [{ role: 'user', content: `Current board FEN: ${fen}` }],
          }),
        });
      } finally {
        clearTimeout(timeout);
      }
    };

    let resp = await callProvider(model);
    let modelUsed = model;

    if (!resp.ok && model !== FALLBACK_MODEL) {
      modelUsed = FALLBACK_MODEL;
      resp = await callProvider(FALLBACK_MODEL);
    }

    if (!resp.ok) {
      return NextResponse.json({
        move: 'random', // Handled by client as fallback
        model: modelUsed,
        fallback: true,
        error: `Provider error: ${resp.status}`,
      }, { status: 500 });
    }

    const data = await resp.json();
    const move = data.content[0].text.trim();

    return NextResponse.json({
      move,
      model: modelUsed,
      fallback: modelUsed !== model,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
