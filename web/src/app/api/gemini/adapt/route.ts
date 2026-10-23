import { NextResponse } from 'next/server';
import { GeminiAdapterService } from '@/services/geminiAdapterService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      sourceText,
      bookTitle = 'Uploaded Book',
      chapterTitle = 'Chapter 1',
      author = 'Author',
      apiKey,
      modelName,
    } = body;

    if (!sourceText || typeof sourceText !== 'string' || sourceText.trim().length === 0) {
      return NextResponse.json({ error: 'Matn kiritilmadi (Text is required)' }, { status: 400 });
    }

    const result = await GeminiAdapterService.adaptBook({
      sourceText,
      bookTitle,
      chapterTitle,
      author,
      apiKey,
      modelName,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('API /api/gemini/adapt error:', error);
    return NextResponse.json(
      { error: error?.message || 'Server xatoligi yuz berdi' },
      { status: 500 }
    );
  }
}
