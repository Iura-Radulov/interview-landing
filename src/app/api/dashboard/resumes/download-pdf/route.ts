import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { FASTAPI_URL } from '@/lib/constants';

export async function GET(request: NextRequest) {
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
    const resp = await fetch(`${FASTAPI_URL}/api/user-resumes/${resumeId}/download-pdf`, {
      headers: { 'X-User-ID': String(session.telegramId) },
    });

    if (!resp.ok) {
      const errorBody = await resp.text();
      console.error('FastAPI download-pdf error:', resp.status, errorBody);
      return NextResponse.json(
        { error: `Backend error: ${resp.status}` },
        { status: resp.status },
      );
    }

    const blob = await resp.blob();
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': resp.headers.get('Content-Disposition') || 'attachment; filename="resume_improved.pdf"',
      },
    });
  } catch (err) {
    console.error('Download PDF resume error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
