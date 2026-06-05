import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { FASTAPI_URL } from '@/lib/constants';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch resumes directly from the shared DB
  try {
    const db = getDb();
    const user = db.prepare('SELECT id FROM users WHERE telegram_id = ?').get(session.telegramId) as { id: number } | undefined;
    if (!user) {
      return NextResponse.json({ resumes: [] });
    }

    const rows = db
      .prepare(
        "SELECT id, original_filename, role, experience_level, company_name, analysis_result, fixed_content, created_at FROM user_resumes WHERE user_id = ? ORDER BY created_at DESC"
      )
      .all(user.id) as any[];

    const resumes = rows.map((r: any) => {
      let analysis = null;
      try {
        analysis = r.analysis_result ? JSON.parse(r.analysis_result) : null;
      } catch {}
      return {
        id: r.id,
        original_filename: r.original_filename,
        role: r.role,
        experience_level: r.experience_level,
        company_name: r.company_name || '',
        analysis,
        created_at: r.created_at,
      };
    });

    return NextResponse.json({ resumes });
  } catch (err) {
    console.error('Failed to fetch resumes:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const targetRole = formData.get('target_role') as string || '';
    const experienceLevel = formData.get('experience_level') as string || '';
    const companyContext = formData.get('company_context') as string || '';

    if (!targetRole || !experienceLevel) {
      return NextResponse.json({ error: 'Role and experience level are required' }, { status: 400 });
    }

    // Forward to FastAPI
    const fastForm = new FormData();
    fastForm.append('file', file, file.name);
    fastForm.append('target_role', targetRole);
    fastForm.append('experience_level', experienceLevel);
    fastForm.append('company_context', companyContext);

    const resp = await fetch(`${FASTAPI_URL}/user-resumes/upload`, {
      method: 'POST',
      headers: {
        'X-User-ID': String(session.telegramId),
      },
      body: fastForm,
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return NextResponse.json({ error: `Backend error: ${errText}` }, { status: 502 });
    }

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: `Failed to upload: ${err}` }, { status: 502 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const resumeId = searchParams.get('id');
  if (!resumeId) {
    return NextResponse.json({ error: 'Resume ID required' }, { status: 400 });
  }

  try {
    const resp = await fetch(`${FASTAPI_URL}/user-resumes/${resumeId}`, {
      method: 'DELETE',
      headers: { 'X-User-ID': String(session.telegramId) },
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return NextResponse.json({ error: `Backend error: ${errText}` }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: `Failed to connect to backend: ${err}` }, { status: 502 });
  }
}