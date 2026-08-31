import { MODELS, DEFAULT_MODEL } from './models';

export async function requestAiMove(fen: string, model: string, apiKey: string, baseUrl: string) {
  const response = await fetch(`${baseUrl}/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 400,
      system: 'You are a grandmaster chess engine. Respond only with the best legal move in Algebraic Notation (e.g., "e4", "Nf3"). Do not explain.',
      messages: [{ role: 'user', content: `Current board FEN: ${fen}` }],
    }),
  });

  if (!response.ok) throw new Error(`AI API error: ${response.status}`);
  const data = await response.json();
  return data.content[0].text;
}
