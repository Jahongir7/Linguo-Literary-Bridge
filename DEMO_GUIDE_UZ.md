# 🌉 Linguo-Literary Bridge — Demo Versiya Taqdimot Qo‘llanmasi

Ushbu hujjat loyihaning to‘liq tahlili, yangi joriy etilgan imkoniyatlar va bugungi demo taqdimotni muvaffaqiyatli topshirish bo‘yicha aniq yo‘riqnomani o‘z ichiga oladi.

---

## 1. Loyihaning Chuqur Tahlili

Loyiha E.L. Voynichning *"The Gadfly"* va *"Jack Raymond"* asarlari asosida yaratilgan CEFR darajalariga (A2, B1, B2, C1) moslashtirilgan interaktiv ta’lim platformasidir.

### Dastlabki holatda aniqlangan kamchiliklar va to‘siqlar:
1. **Talaba Reader va asosiy sahifalar yo‘q edi**: Veb ilovada faqat admin va o‘qituvchi boshqaruv panellari bor edi, ammo talabalar uchun kitob o‘qish (Reader), darajani almashtirish, parallel rejim, lug‘at va testlar yo‘q edi. Talaba akkaunti bilan kirganda tizim sahifani qayta-qayta yuklab qotib qolardi (`infinite redirect loop`).
2. **Kitob yuklash va avtomatik CEFR generatsiyasi mavjud emas edi**: Foydalanuvchi yangi kitob yuklaganda uni avtomatik A2, B1, B2, C1 darajalariga o‘tkazib beradigan modul mavjud emas edi.
3. **Google Gemini AI to‘liq ulanmagan edi**: API sozlamalari faqat vaqtinchalik imitatsiya (`mock setTimeout`) tarzida qoldirilgan edi.
4. **Sidebar navigatsiyasidagi ko‘p havolalar 404 xatolik berardi**: Foydalanuvchilar, kontent, analitika, obunalar, test banki sahifalari mavjud emas edi.

---

## 2. Bugun Bajarilgan To‘liq Ishlar va Yangiliklar

### ⚡ 1. AI Kitob Yuklash va Avtomatik A2, B1, B2, C1 Generator (`/book-generator`)
- **Fayl yuklash**: `.txt`, `.md`, `.docx`, `.json` formatlarini bevosita qabul qiladi.
- **Tayyor namunalar**: 1 bosishda *The Gadfly 1-bob*, *2-bob (Alp tog‘lari)* yoki *Jack Raymond* matnini yuklash imkoniyati.
- **Google Gemini AI integratsiyasi**: `gemini-2.0-flash`, `gemini-1.5-flash` va `gemini-1.5-pro` modellari orqali matnning asosiy syujetini saqlagan holda 4 ta CEFR darajasiga moslashtirish.
- **Avtonom zaxira dvigateli (Zero-Failure Fallback)**: Agar internet yoki API kalit bo‘lmasa ham, yuqori aniqlikdagi lingvistik qoidalar algoritmi 100% kafolat bilan A2, B1, B2, C1 variantlarini yaratadi. Taqdimotda aslo to‘xtab qolmaydi!
- **Qiyosiy statistika jadvali**:
  - Jami so‘zlar soni (Original -> C1 -> B2 -> B1 -> A2)
  - Jumlalar soni va o‘rtacha jumla uzunligi
  - O‘qish murakkabligi va CEFR indeksi
- **Yonma-yon taqqoslash (Parallel View)**: Original matn va istalgan CEFR darajasini bir vaqtning o‘zida yonma-yon o‘qish va solishtirish.
- **Avtomatik aniqlangan vositalar**: Matndagi metafora, o‘xshatish, leksik takrorlar avtomatik ajratiladi.
- **Kutubxonaga saqlash va Readerda ochish**: Yangi moslashtirilgan kitobni to‘g‘ridan-to‘g‘ri platforma kutubxonasiga saqlash va o‘qishni boshlash.
- **Eksport**: tz.txt talablariga mos **JSON** va **CSV** formatda yuklab olish.

### 📖 2. Ko‘p Darajali Interaktiv Reader (`/reader/gf-p1-c01`)
- **Tezkor daraja almashtirgich (A2, B1, B2, C1)**: O‘qiyotgan joyni (paragrafni) yo‘qotmasdan 1 soniyada darajani o‘zgartirish.
- **Parallel rejim**: Asl klassik matn va moslashtirilgan variantni bir ekranda ko‘rish.
- **14 ta dissertatsiya izohlari**: Matndagi iboralar ustiga bosilganda o‘ng tomondan ochiluvchi panel (o‘zbek, ingliz va rus tillarida qisqa va akademik tahlil, tezaurusga havola).
- **So‘z ustiga bosganda interaktiv tarjima**: IPA transkripsiyasi, so‘z turkumi, o‘zbekcha ma’nosi, misol va *"Lug‘atimga saqlash"* tugmasi (+10 XP).
- **Ovozli sinxron karaoke (Audio player)**: 0.75x, 1.0x, 1.25x tezlik sozlamalari va gapma-gap yoritish.
- **"Ask Gadfly" AI-Tutor chat paneli**: RAG manbalari bilan (`[gf-p1-c01-p002]`) darajaga mos javob beradi; mavzudan tashqari savollarni muloyim rad etadi.

### 🎯 3. CEFR Placement Test (`/placement`)
- 8 ta diagnostik savol orqali foydalanuvchining boshlang‘ich darajasini (A2, B1, B2, C1) aniqlaydi va tavsiya beradi.
- Darajani qo‘lda ham tanlash imkoniyati mavjud.

### 📘 4. Kognitiv Tezaurus (`/thesaurus`)
- 15 ta asosiy adabiy birlik (metafora, o‘xshatish, jonlantirish, leksik takror, ritorik savol, portret detali, ruhiy detal va h.k.).
- 3 tilli qidiruv (uz, en, ru) va kategoriyalar filtri.
- 3 darajali ta’riflar: Oddiy (A2/B1), Standart (B2), Akademik (C1).
- **Kartochkalar (Flashcards SRS)**: Kartochkani aylantirib o‘rganish va XP to‘plash.

### ❓ 5. Mashq va Testlar (`/practice`)
- 1-bob bo‘yicha 4 xil turdagi savollar: ko‘p variantli, vositani topish, kontekst tahlili.
- Darhol to‘g‘ri/noto‘g‘ri xabari, tushuntirish va ballar hisobi.

### 🎮 6. "Figurani top" Mini-O‘yini (`/game`)
- Matndan parcha beriladi, qaysi badiiy vosita ekanligini tezkor topish.
- Streak (ketma-ketlik), ballar ko‘paytirgichi va XP mukofoti.

### 📊 7. Mening Progressim (`/progress`)
- Talabaning CEFR darajasi, jami XP, kunlik streak.
- Boblar bo‘yicha o‘qish foizlari.
- Shaxsiy saqlangan so‘zlar lug‘ati.

### 👑 8. To‘liq Admin, Muharrir va O‘qituvchi Kabinetlari
- `/admin/content`: CMS, kitoblar, boblar, AI generatorga to‘g‘ridan-to‘g‘ri o‘tish.
- `/admin/users`: Foydalanuvchilar ro‘yxati, rollari, holatini boshqarish.
- `/admin/analytics`: DAU, retention, o‘rtacha sessiya vaqti va grafiklar.
- `/admin/subscriptions`: Tariflar (Bepul, Premium, Tashkilot) va to‘lov tizimlari (Payme, Click, Uzum).
- `/editor/works`, `/editor/annotations`, `/editor/thesaurus`, `/editor/quiz-bank`: Kontent muharririning maxsus bo‘limlari.
- `/teacher/classes`, `/teacher/assignments`, `/teacher/progress`, `/teacher/essays`: Guruhlar, topshiriqlar va talabalar ishlari.

---

## 3. Demo Taqdimot Ssenariysi (6 daqiqalik namoyish)

Komissiya yoki buyurtmachiga ko‘rsatish uchun eng qulay tartib:

| Daqiqa | Qadam | Nima ko‘rsatiladi? | Havola |
| :--- | :--- | :--- | :--- |
| **0:00 – 0:45** | **Bosh sahifa & Kirish** | Bosh sahifa ochiladi. Talaba sifatida 1 bosishda kiriladi. | `http://localhost:3000` |
| **0:45 – 1:30** | **Placement Test** | 2-3 ta savol yechiladi va tizim B1 darajasini tavsiya etadi. | `/placement` |
| **1:30 – 2:30** | **Kutubxona & Reader** | *The Gadfly* 1-bob ochiladi. B1 matni o‘qiladi. So‘z ustiga bosilib (masalan *caress*), tarjima va IPA ko‘rsatiladi. Ovozli karaoke yoqiladi. | `/reader/gf-p1-c01` |
| **2:30 – 3:30** | **Daraja almashtirish & Parallel** | A2 ga o‘tiladi: joylashuv saqlanadi. Parallel rejim yoqilib, asl nusxa bilan yonma-yon solishtiriladi. | `/reader/gf-p1-c01` |
| **3:30 – 4:15** | **Izoh & "Ask Gadfly" AI** | *"a tame panther without the claws"* izohi ochiladi. Ask Gadfly'ga *"Padre ovozi nega erkalashga o'xshatilgan?"* deb so‘raladi va manbasi bilan tahlil olinadi. | Reader ichida |
| **4:15 – 5:00** | **Tezaurus & O‘yin** | Tezaurusdagi 3 darajali ta’rif ko‘rsatiladi. "Figurani top" o‘yini ochilib 1-2 savol yechiladi. | `/thesaurus`, `/game` |
| **5:00 – 6:00** | **⚡ AI Kitob Generator (Kulminatsiya)** | Yangi kitob matni yuklanadi, 1 bosishda Gemini AI orqali A2, B1, B2, C1 chiqariladi, statistika jadvali va parallel ko‘rinish namoyish etiladi! | `/book-generator` |

---

## 4. Test Akkauntlar (Kirish uchun)

Login sahifasida (`/login`) 1 bosish bilan kiruvchi qulay tugmalar mavjud:

| Rol | Email | Parol | Yo‘naltiriladigan sahifa |
| :--- | :--- | :--- | :--- |
| **Talaba (Student)** | `student1@linguo.uz` | `student123` | `/library` (Kutubxona) |
| **Administrator** | `admin@linguo.uz` | `admin123` | `/admin/dashboard` |
| **Muharrir (Editor)** | `editor@linguo.uz` | `editor123` | `/editor/dashboard` |
| **O‘qituvchi (Teacher)** | `teacher@linguo.uz` | `teacher123` | `/teacher/dashboard` |

> **Eslatma:** Ekran tepasidagi qulay **Rol almashtirgich** orqali tizimdan chiqmasdan turib istalgan rolga (Admin -> Talaba -> Muharrir) bir zumda o‘tishingiz mumkin!

---

## 5. Loyihani Ishga Tushirish Buyruqlari

### Veb Ilova (Taqdimot uchun asosiy):
Server hozir ham fonda `http://localhost:3000` da ishlab turibdi!
Qayta ishga tushirish kerak bo‘lsa:
```powershell
cd d:\startups\Linguo-Literary-Bridge\web
npm start
# yoki dasturlash rejimida:
npm run dev
```

### Mobil Ilova (Ixtiyoriy):
```powershell
cd d:\startups\Linguo-Literary-Bridge\mobile-app
npx expo start
```
