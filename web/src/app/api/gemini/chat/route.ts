import { NextResponse } from 'next/server';
import { GeminiAdapterService } from '@/services/geminiAdapterService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, cefrLevel = 'B1', chapterTitle, quote, paragraphId, apiKey } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Savol kiritilmadi' }, { status: 400 });
    }

    const message = await GeminiAdapterService.askGadfly(prompt, {
      cefrLevel,
      chapterTitle,
      quote,
      paragraphId,
      apiKey,
    });

    return NextResponse.json({ success: true, message });
  } catch (error: any) {
    console.error('API /api/gemini/chat error:', error);
    return NextResponse.json(
      { error: error?.message || 'Server xatoligi yuz berdi' },
      { status: 500 }
    );
  }
}
