// ============================================================
// Gemini AI Service — "Ask Gadfly" Literary Tutor
// With RAG grounding, CEFR adaptation, and fallback engine
// ============================================================

import { GoogleGenerativeAI } from '@google/generative-ai';
import { StorageService } from './storageService';
import { AIMessage, CEFRLevel } from '../types';

interface AskContext {
  paragraphId?: string;
  selectedQuote?: string;
  chapterTitle?: string;
  cefrLevel: CEFRLevel;
  interfaceLang?: 'uz' | 'en' | 'ru';
}

const CORPUS_SYSTEM_PROMPT = `
Siz — "Linguo-Literary Bridge" platformasining "Ask Gadfly" nomli adabiy va lingvistik AI-tutorisiz.
Asosiy bazangiz: E.L. Voynichning "The Gadfly" ("Ovdosh") asari, 1-bob (Pizadagi seminariya bog'i va kutubxonadagi suhbat).

Qoidalaringiz:
1. RAG qoidasi: Faqat ushbu bob va asar kontekstiga tayanib javob bering. Manba keltiring (masalan: [gf-p1-c01-p002]).
2. CEFR darajasi moslashuvi:
   - A2: Qisqa, sodda jumlalar, asosiy so'zlar tushuntirilishi.
   - B1: O'rta murakkablik, ravon izoh, so'z turkumlari.
   - B2/C1: Chuqur poetik, stilistik va falsafiy tahlil (metafora, antiteza, gumanizm).
3. Spoiler nazorati: Foydalanuvchi hali o'qimagan keyingi boblar voqealarini fosh qilmang ("Bu sir keyingi boblarda ochiladi").
4. Mavzudan tashqari so'rovlar: Agar adabiyot, til yoki asarga aloqador bo'lmagan narsalar so'ralsa, muloyimlik bilan rad eting.
5. Javob tili: O'zbek tilida (agar foydalanuvchi ingliz yoki rus tilida so'ramasa).
`;

export const GeminiService = {
  async askGadfly(userPrompt: string, context: AskContext): Promise<AIMessage> {
    const apiKey = await StorageService.getGeminiApiKey();

    if (apiKey && apiKey.trim().length > 10 && !apiKey.includes('your_gemini_api_key')) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const promptContext = `
Kontekst:
- Foydalanuvchi CEFR darajasi: ${context.cefrLevel}
- Bob: ${context.chapterTitle || 'The Library and Garden Conversation'}
- Tanlangan iqtibos/paragraf: ${context.selectedQuote || context.paragraphId || 'Umumiy bob matni'}

Foydalanuvchi savoli:
"${userPrompt}"

Yuqoridagi qoidalarga to'liq rioya qilgan holda javob bering.
`;

        const result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: CORPUS_SYSTEM_PROMPT + '\n' + promptContext }] }],
        });

        const responseText = result.response.text();

        return {
          id: 'msg-' + Date.now(),
          sender: 'gadfly',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sourceCitation: context.paragraphId
            ? {
                paragraphId: context.paragraphId,
                chapterTitle: context.chapterTitle || 'The Gadfly, 1-bob',
                quote: context.selectedQuote || '',
              }
            : undefined,
          suggestedFollowUps: [
            'Bu epizoddagi metafora qanday ma’no beradi?',
            'Artur nega foxglove gulini ezg‘ilaydi?',
            'Ushbu parchadagi grammatikani tushuntir',
          ],
        };
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local engine:', err);
      }
    }

    // Local offline knowledge engine (matches tz.txt questions)
    return this.generateOfflineResponse(userPrompt, context);
  },

  generateOfflineResponse(userPrompt: string, context: AskContext): AIMessage {
    const lower = userPrompt.toLowerCase();
    let text = '';
    let citationQuote = context.selectedQuote || 'its note was always that of a caress';
    let citationId = context.paragraphId || 'gf-p1-c01-p002';

    // Off-topic guard
    if (
      lower.includes('ob-havo') ||
      lower.includes('dasturlash') ||
      lower.includes('bitcoin') ||
      lower.includes('matematika') ||
      lower.includes('ovqat')
    ) {
      text =
        'Kechirasiz, men E.L. Voynichning "The Gadfly" asari bo‘yicha adabiy va lingvistik AI-tutorman. Faqat asar, uning poetik vositalari va CEFR darajangizga mos til savollaringizga yordam bera olaman!';
      return {
        id: 'msg-' + Date.now(),
        sender: 'gadfly',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    // Literary queries
    if (lower.includes('caress') || lower.includes('erkalash') || lower.includes('ovoz')) {
      citationQuote = 'its note was always that of a caress';
      citationId = 'gf-p1-c01-p002';
      if (context.cefrLevel === 'A2') {
        text =
          '[gf-p1-c01-p002] Padre Montanellining ovozi juda muloyim edi. "Caress" — bu mehr bilan silash yoki erkalash degani. Muallif uning ovozini shunday erkalashga qiyoslaydi, chunki u Arturni juda yaxshi ko‘radi.';
      } else if (context.cefrLevel === 'B1') {
        text =
          '[gf-p1-c01-p002] Ushbu parchada muallif metafora ishlatgan: "its note was always that of a caress". Montanellining ovozi oddiy tovush emas, balki jismoniy mehr va mehrli silash kabi his etiladi. Bu ota va o‘g‘il o‘rtasidagi iliq rishtani bildiradi.';
      } else {
        text =
          '[gf-p1-c01-p002] Bu yerda sinestetik metafora qo‘llangan. Akustik idrok (ovoz mayinligi) taktil-sensor hissiyot (caress / erkalash) bilan uyg‘unlashtirilgan. Bu Montanellining yosh Artirga nisbatan shunchaki murabbiy emas, balki chuqur ota mehrini tuyishini ochib beruvchi vositadir.';
      }
    } else if (lower.includes('panter') || lower.includes('panther') || lower.includes('tirnoq')) {
      citationQuote = 'like a tame panther without the claws';
      citationId = 'gf-p1-c01-p004';
      text =
        '[gf-p1-c01-p004] "A tame panther without the claws" — bu o‘xshatish (simile). Artur hozircha beozor va itoatkor, ammo uning ichida qudratli yirtqich kuchi bor. Kelajakda u aynan o‘tkir so‘zli inqilobchi Gadflyga aylanadi.';
    } else if (lower.includes('foxglove') || lower.includes('gul') || lower.includes('ezg‘ila')) {
      citationQuote = 'unconsciously tearing the purple foxglove bells into shreds';
      citationId = 'gf-p1-c01-p007';
      text =
        '[gf-p1-c01-p007] Bu psixologik (ruhiy) detaldir. Artur o‘zining hayajoni va sirini Padre oldida e’tirof qilishdan oldingi ichki qo‘rquvini gul barglarini bilmasdan ezg‘ilash orqali jismoniy harakatda ko‘rsatadi.';
    } else if (lower.includes('tok') || lower.includes('vine') || lower.includes('bosh chayq')) {
      citationQuote = 'the old vine... shaking a leafy head mournfully';
      citationId = 'gf-p1-c01-p006';
      text =
        '[gf-p1-c01-p006] Bu personifikatsiya (jonlantirish). Qari tok daraxti go‘yo insondek g‘amgin bosh chayqaydi — bu romantik adabiyotda kelajakdagi fojiali voqealardan darak beruvchi ramziy belgi.';
    } else {
      text = `[${citationId}] Tanlangan parcha bo‘yicha tahlil: E.L. Voynich 1-bobda qahramonlarning nozik psixologik portretini chizadi. Sizning CEFR ${context.cefrLevel} darajangizda ushbu matn leksikasi klassik ingliz tili uchun ajoyib namuna hisoblanadi. Matndan qaysi ibora yoki so‘z haqida batafsilroq bilishni xohlaysiz?`;
    }

    return {
      id: 'msg-' + Date.now(),
      sender: 'gadfly',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceCitation: {
        paragraphId: citationId,
        chapterTitle: 'The Gadfly, 1-bob',
        quote: citationQuote,
      },
      suggestedFollowUps: [
        'Ushbu iboraning sinonimlarini aytib ber',
        'Bu qahramonning xarakterini qanday ochadi?',
        'Boshqa CEFR darajasida qanday bo‘lar edi?',
      ],
    };
  },
};
