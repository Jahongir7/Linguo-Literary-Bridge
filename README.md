# Linguo-Literary Bridge

> **CEFR Multi-level Literary Adaptation Platform (E.L. Voynich Corpus & Google Gemini AI)**
> 
> Ingliz tili badiiy adabiyoti (E.L. Voynich korpusi) matnlarini CEFR (A2, B1, B2, C1) darajalariga sun'iy intellekt (Google Gemini) yordamida avtomatik moslashtiruvchi, parallel o‘qish, poetik vositalar tezaurusi va RAG asosidagi adabiy AI-tutor ("Ask Gadfly") platformasi.

---

## Asosiy Imkoniyatlar

1. **AI Kitob Moslashtirish (CEFR A2, B1, B2, C1)**:
   - Istalgan ingliz tili asarini matn yoki `.txt` fayl ko‘rinishida yuklash;
   - Google Gemini AI (`gemini-2.0-flash`) orqali 4 ta CEFR darajasiga avtomatik adaptatsiya;
   - Leksik murakkablik (CEFR), o‘rtacha gap uzunligi va Flesch-Kincaid indekslari bo‘yicha avtomatik tahlil jadvali;
   - Parallel (yonma-yon) taqqoslash rejimi.

2. **Interaktiv Reader & Audio Karaoke**:
   - Boblar bo‘yicha sinxron karaoke audio narratsiya;
   - Matn ichidagi so‘zni bosganda interaktiv tarjima va shaxsiy lug‘atga saqlash (+10 XP);
   - Poetik va madaniy izohlar darchasi;
   - **Ask Gadfly (AI-Tutor)**: Matn, personajlar va poetik vositalar bo‘yicha real vaqtda kontekstli savol-javob.

3. **Kognitiv Tezaurus (150 birlik)**:
   - Voynich korpusidagi troplar, metaforalar, epitetlar va stilistik figuralar;
   - 3 darajali ta’riflar (Oddiy, Standart, Filologik) va asardan olingan misollar;
   - SRS (Spaced Repetition System) kartochkalari.

4. **Adabiy Testlar va Gamifikatsiya**:
   - CEFR Placement Test (boshlang‘ich darajani aniqlash);
   - Bob tushunish testlari va tahliliy izohlar;
   - "Figurani top" adabiy o‘yini, streak va XP tizimi.

5. **Zamonaviy Dizayn (White & Blue Liquid Glass)**:
   - Oq va ko‘k ranglar palitrasi, liquid glass (glassmorphism) effektlari;
   - `Plus Jakarta Sans` va `Source Serif 4` tipografiyasi;
   - Zero-emoji siyosati: 100% toza SVG ikonkalari.

---

## O‘rnatish va Ishga tushirish

### Web Ilova (Next.js 16 + React 19)

```bash
cd web
npm install
```

`.env.local` faylini yarating:
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash
```

Development rejimida ishga tushirish:
```bash
npm run dev
```

Production versiyani yig‘ish va ishga tushirish:
```bash
npm run build
npm start
```
Brauzerda `http://localhost:3000` manzilini oching.

---

## Loyiha Tuzilmasi

```
Linguo-Literary-Bridge/
├── web/                     # Next.js 16 Web ilovasi
│   ├── src/
│   │   ├── app/             # App Router (reader, library, book-generator, etc.)
│   │   ├── components/      # UI komponentlar (StudentNavbar, DashboardLayout, etc.)
│   │   ├── data/            # Adabiy korpus, tezaurus, savollar
│   │   ├── services/        # GeminiAdapterService (AI engine + rule fallback)
│   │   ├── store/           # Zustand store (bookStore, authStore)
│   │   └── types/           # TypeScript interfeyslari
├── mobile-app/              # React Native / Expo mobil ilova
├── server/                  # Backend xizmatlari
└── DEMO_GUIDE_UZ.md         # Demo ssenariysi va ko‘rsatmalar
```

---

## Muallif & Litsenziya
Linguo-Literary Bridge jamoasi. Barcha huquqlar himoyalangan.
