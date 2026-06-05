import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getCompanySets, getUserCompanies } from '@/lib/db';
import { FASTAPI_URL } from '@/lib/constants';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const companySets = getCompanySets();
  const userCompanies = getUserCompanies(session.telegramId);

  return NextResponse.json({
    companySets,
    userCompanies,
  });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { company_name?: string; vacancy_url?: string; position?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.company_name || body.company_name.trim().length === 0) {
    return NextResponse.json({ error: 'Company name is required' }, { status: 400 });
  }
  if (!body.position || body.position.trim().length === 0) {
    return NextResponse.json({ error: 'Position is required' }, { status: 400 });
  }
  if (!body.vacancy_url || body.vacancy_url.trim().length === 0) {
    return NextResponse.json({ error: 'Vacancy URL is required' }, { status: 400 });
  }

  // Call FastAPI backend to create with AI context
  try {
    const resp = await fetch(`${FASTAPI_URL}/api/user-companies/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        telegram_id: session.telegramId,
        company_name: body.company_name.trim(),
        vacancy_url: (body.vacancy_url || '').trim(),
        position: (body.position || '').trim(),
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return NextResponse.json({ error: `Backend error: ${errText}` }, { status: 502 });
    }

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: `Failed to connect to backend: ${err}` }, { status: 502 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('id');
  if (!companyId) {
    return NextResponse.json({ error: 'Company ID required' }, { status: 400 });
  }

  try {
    const resp = await fetch(
      `${FASTAPI_URL}/api/user-companies/${companyId}`,
      {
        method: 'DELETE',
        headers: { 'X-User-ID': String(session.telegramId) },
      },
    );

    if (!resp.ok) {
      const errText = await resp.text();
      return NextResponse.json({ error: `Backend error: ${errText}` }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: `Failed to connect to backend: ${err}` }, { status: 502 });
  }
}
