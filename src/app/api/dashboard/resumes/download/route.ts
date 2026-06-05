import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getDb } from '@/lib/db';

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
    const db = getDb();
    const user = db
      .prepare('SELECT id FROM users WHERE telegram_id = ?')
      .get(session.telegramId) as { id: number } | undefined;
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const row = db
      .prepare(
        'SELECT original_filename, fixed_content FROM user_resumes WHERE id = ? AND user_id = ?'
      )
      .get(resumeId, user.id) as { original_filename: string; fixed_content: string } | undefined;
    if (!row) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    const filename = (row.original_filename || 'resume').replace(/\.pdf$/i, '') + '_improved.txt';
    return new NextResponse(row.fixed_content || '', {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error('Download resume error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}