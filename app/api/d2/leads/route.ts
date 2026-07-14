import { NextResponse } from 'next/server';

const DEFAULT_D2_LEADS_URL = 'https://d2-labs.vercel.app/api/leads';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nome e e-mail são obrigatórios para subir o lead no D2.' },
        { status: 400 },
      );
    }

    const target =
      process.env.D2_LEADS_API_URL ||
      (process.env.D2_SITE_URL ? `${process.env.D2_SITE_URL.replace(/\/$/, '')}/api/leads` : DEFAULT_D2_LEADS_URL);

    const response = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        whatsapp: String(body.whatsapp ?? '').trim(),
        businessDesc: String(body.businessDesc ?? '').trim(),
        wants: String(body.wants ?? '').trim(),
        templateId: body.templateId || null,
        source: body.source || 'fatorq-fluxo-rapido',
      }),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { error: payload?.error ?? 'Não foi possível enviar o lead para o D2.' },
        { status: response.status },
      );
    }

    return NextResponse.json({ ok: true, d2: payload });
  } catch (err) {
    console.error('D2 lead proxy error:', err);
    return NextResponse.json({ error: 'Erro interno ao enviar lead para o D2.' }, { status: 500 });
  }
}
