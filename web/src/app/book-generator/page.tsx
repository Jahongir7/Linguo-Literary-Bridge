'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StudentNavbar } from '@/components/layout/StudentNavbar';
import styles from './book-generator.module.css';
import { GeminiAdapterService } from '@/services/geminiAdapterService';
import { useBookStore } from '@/store/bookStore';
import type { CEFRLevel, GeneratedBookAdaptation } from '@/types';

// Clean modern SVG icons (zero emojis)
const Icons = {
  Sparkle: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Upload: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  BookOpen: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Bookmark: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Compare: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <line x1="6" y1="9" x2="6" y2="21" />
    </svg>
  ),
};

const SAMPLE_TEXTS = {
  gadfly_ch1: {
    bookTitle: 'The Gadfly',
    chapterTitle: '1-bob: Kutubxona va bog‘ suhbati',
    author: 'E.L. Voynich',
    text: `Arthur sat in the library of the theological seminary at Pisa, looking through a manuscript of sacred music. It was a hot evening in June, and the study was filled with the heavy scent of magnolias and roses from the cloister garden outside.

Father Montanelli came out of the inner study, carrying some papers. His voice was singularly low and sweet, and its note was always that of a caress. He laid his hand tenderly upon the young man’s shoulder as he approached.

"Fragola! fragola!" a vendor shouted outside in the street, hawking fresh wild strawberries in the twilight, his melodic chant floating through the open casement into the hushed quiet of the library.

Arthur was a slender little creature, looking more like an Italian in a sixteenth-century portrait than a middle-class English lad, with dreamy, mystical eyes, deep blue under black lashes, like a tame panther without the claws.

"What should I do without you, Arthur?" Montanelli murmured, resting his hand affectionately upon the lad's shoulder, while looking upon him with boundless solicitude.

The old vine above them rustled in the faint breeze, shaking a leafy head mournfully in the dusk, as if conscious of the heavy shadows waiting across their future pathway.

Arthur was unconsciously tearing the purple foxglove bells into shreds, scattering the bruised petals across the stone flags with agitated, trembling fingers.`,
  },

  gadfly_ch2: {
    bookTitle: 'The Gadfly',
    chapterTitle: '2-bob: Alp tog‘lari sayohati',
    author: 'E.L. Voynich',
    text: `The mountain torrent roared and howled through the granite chasm with everlasting despair. Dense pine forests clung tenaciously to the precipitous crags, while cold alpine mists drifted across the rocky defile.

Montanelli stood gazing into the abyss, his dark mantle fluttering in the icy gale. "It is like hell," Arthur whispered in awe, clutching the priest's arm.

"No, Arthur," the Padre replied with deep solemnity, "it is only like a human soul that has lost its way in the dark. To-morrow, to-morrow we must descend again to the troubled world."

High above the mountain pass, the solitary eagle wheeled against the leaden sky, a silent sentinel over their fleeting peace.`,
  },

  jack_raymond: {
    bookTitle: 'Jack Raymond',
    chapterTitle: '1-bob: Kornuoll qirg‘oqlari',
    author: 'E.L. Voynich',
    text: `The wild Atlantic surf pounded ceaselessly against the jagged black cliffs of Cornwall. Gulls wheeled and screamed over the frothing spray, diving into the turbulent green swells.

Jack stood at the promontory edge, his bare feet gripping the cold granite boulders. The fierce salt wind whipped through his unkempt hair. He watched the caged hawk in the fisherman's shack with fierce, unyielding sorrow.

"A bird of the moors has no business behind iron wires," Jack muttered under his breath. With deliberate courage, he reached out his hands to untie the crude twine fastening the cage door, ignoring the sharp lacerations upon his wrists.`,
  },
};

export default function BookGeneratorPage() {
  const router = useRouter();
  const { addGeneratedBook, setActiveChapterId } = useBookStore();

  const [bookTitle, setBookTitle] = useState('The Gadfly');
  const [chapterTitle, setChapterTitle] = useState('1-bob: Kutubxona va bog‘ suhbati');
  const [author, setAuthor] = useState('E.L. Voynich');
  const [sourceText, setSourceText] = useState(SAMPLE_TEXTS.gadfly_ch1.text);
  const [engine, setEngine] = useState<'gemini' | 'algorithmic'>('gemini');
  const [customApiKey, setCustomApiKey] = useState('');
  const [geminiModel, setGeminiModel] = useState('gemini-2.0-flash');

  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [generatedResult, setGeneratedResult] = useState<GeneratedBookAdaptation | null>(null);
  const [activeTab, setActiveTab] = useState<'A2' | 'B1' | 'B2' | 'C1' | 'original'>('B1');
  const [isParallelView, setIsParallelView] = useState(false);
  const [parallelCompareLevel, setParallelCompareLevel] = useState<CEFRLevel>('A2');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load sample text
  const loadPreset = (key: keyof typeof SAMPLE_TEXTS) => {
    const s = SAMPLE_TEXTS[key];
    setBookTitle(s.bookTitle);
    setChapterTitle(s.chapterTitle);
    setAuthor(s.author);
    setSourceText(s.text);
  };

  // Handle File Upload (.txt, .md, .docx, .json)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setSourceText(content);
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
        setChapterTitle(nameWithoutExt);
      }
    };
    reader.readAsText(file);
  };

  // Run AI adaptation
  const handleGenerate = async () => {
    if (!sourceText.trim()) return;

    setIsGenerating(true);
    setProgressStep(1);

    try {
      await new Promise((r) => setTimeout(r, 400));
      setProgressStep(2);
      await new Promise((r) => setTimeout(r, 500));
      setProgressStep(3);

      const result = await GeminiAdapterService.adaptBook({
        bookTitle,
        chapterTitle,
        author,
        sourceText,
        apiKey: engine === 'gemini' ? customApiKey : undefined,
        modelName: geminiModel,
      });

      setProgressStep(4);
      await new Promise((r) => setTimeout(r, 400));
      setProgressStep(5);
      await new Promise((r) => setTimeout(r, 300));

      setGeneratedResult(result);
    } catch (err) {
      console.error('Adaptation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Save to platform library
  const handleSaveToLibrary = () => {
    if (!generatedResult) return;
    addGeneratedBook(generatedResult);
    setActiveChapterId(`${generatedResult.id}-c01`);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Direct open in reader
  const handleOpenInReader = () => {
    if (!generatedResult) return;
    addGeneratedBook(generatedResult);
    const targetChapterId = `${generatedResult.id}-c01`;
    setActiveChapterId(targetChapterId);
    router.push(`/reader/${targetChapterId}`);
  };

  // Export JSON
  const handleDownloadJSON = () => {
    if (!generatedResult) return;
    const blob = new Blob([JSON.stringify(generatedResult, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${bookTitle.toLowerCase().replace(/\s+/g, '_')}_cefr_levels.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export CSV
  const handleDownloadCSV = () => {
    if (!generatedResult) return;
    const rows = [
      ['paragraph_id', 'source_paragraph_id', 'level', 'text'],
      ...generatedResult.variants.A2.paragraphs.map((p) => [p.id, p.sourceParagraphId, 'A2', `"${p.text.replace(/"/g, '""')}"`]),
      ...generatedResult.variants.B1.paragraphs.map((p) => [p.id, p.sourceParagraphId, 'B1', `"${p.text.replace(/"/g, '""')}"`]),
      ...generatedResult.variants.B2.paragraphs.map((p) => [p.id, p.sourceParagraphId, 'B2', `"${p.text.replace(/"/g, '""')}"`]),
      ...generatedResult.variants.C1.paragraphs.map((p) => [p.id, p.sourceParagraphId, 'C1', `"${p.text.replace(/"/g, '""')}"`]),
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encodedUri;
    a.download = `${bookTitle.toLowerCase().replace(/\s+/g, '_')}_cms_import.csv`;
    a.click();
  };

  const currentVariant = generatedResult ? generatedResult.variants[activeTab] : null;

  return (
    <div className={styles.pageWrapper}>
      <StudentNavbar />

      <main className={styles.mainContent}>
        {/* Header */}
        <section className={styles.heroSection}>
          <div className={styles.heroBadge}>
            <Icons.Sparkle />
            <span>CEFR Multi-Level AI Generator</span>
          </div>
          <h1 className={styles.heroTitle}>
            Kitob Yuklash va <span className={styles.gradientText}>A2, B1, B2, C1</span> Moslashtirish
          </h1>
          <p className={styles.heroSubtitle}>
            Istalgan mumtoz ingliz adabiyoti matnini yuklang. Google Gemini AI tili va uslubini yo‘qotmagan holda uni
            bir zumda 4 ta CEFR darajasiga avtomatik moslashtirib beradi.
          </p>
        </section>

        {/* Input & Config Section */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>1. Asar ma’lumotlari va Matnni kiritish</h3>
            <div className={styles.presets}>
              <span className={styles.presetLabel}>Namunalar:</span>
              <button onClick={() => loadPreset('gadfly_ch1')} className={styles.presetBtn}>
                Gadfly 1-bob
              </button>
              <button onClick={() => loadPreset('gadfly_ch2')} className={styles.presetBtn}>
                Gadfly 2-bob
              </button>
              <button onClick={() => loadPreset('jack_raymond')} className={styles.presetBtn}>
                Jack Raymond
              </button>
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>Kitob / Asar nomi</label>
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="The Gadfly"
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Bob / Qism nomi</label>
              <input
                type="text"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                placeholder="1-bob: Kutubxona suhbati"
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Muallif</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="E.L. Voynich"
                className={styles.inputField}
              />
            </div>
          </div>

          {/* File Upload / Drag & Drop */}
          <div className={styles.uploadArea}>
            <input
              type="file"
              id="book-file"
              accept=".txt,.md,.docx,.json"
              onChange={handleFileUpload}
              className={styles.fileInput}
            />
            <label htmlFor="book-file" className={styles.uploadLabel}>
              <div className={styles.uploadIcon}>
                <Icons.Upload />
              </div>
              <div>
                <p className={styles.uploadPrimary}>Faylni tanlang yoki shu yerga tashlang</p>
                <p className={styles.uploadSecondary}>Qo‘llab-quvvatlanadi: .TXT, .MD, .DOCX, .JSON</p>
              </div>
            </label>
          </div>

          {/* Source Text Area */}
          <div className={styles.textareaWrapper}>
            <div className={styles.textareaHeader}>
              <span>Original Matn (Ingliz tilida)</span>
              <span>
                {sourceText.split(/\s+/).filter(Boolean).length} so‘z | {sourceText.length} belgi
              </span>
            </div>
            <textarea
              rows={9}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Asar matnini shu yerga qo‘ying..."
              className={styles.textareaField}
            />
          </div>

          {/* AI Settings Bar */}
          <div className={styles.aiConfigRow}>
            <div className={styles.engineSelect}>
              <label>AI Dvigateli:</label>
              <select
                value={engine}
                onChange={(e) => setEngine(e.target.value as any)}
                className={styles.selectField}
              >
                <option value="gemini">Google Gemini AI (Jonli ulanish)</option>
                <option value="algorithmic">Antigravity Rule-Based CEFR (Avtonom)</option>
              </select>
            </div>

            {engine === 'gemini' && (
              <div className={styles.engineSelect}>
                <label>Gemini Modeli:</label>
                <select
                  value={geminiModel}
                  onChange={(e) => setGeminiModel(e.target.value)}
                  className={styles.selectField}
                >
                  <option value="gemini-2.0-flash">gemini-2.0-flash (Tezkor va aniq)</option>
                  <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                  <option value="gemini-1.5-pro">gemini-1.5-pro (Keng qamrovli)</option>
                </select>
              </div>
            )}

            <div className={styles.apiKeyInput}>
              <label>Gemini API Key (Ixtiyoriy):</label>
              <input
                type="password"
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                placeholder="Kalit kiritilmasa tizim ulanishi ishlaydi"
                className={styles.inputField}
              />
            </div>
          </div>

          {/* Generate Button */}
          <div className={styles.actionRow}>
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !sourceText.trim()}
              className={styles.generateBtn}
            >
              {isGenerating ? (
                <>
                  <span className={styles.spinner} /> Moslashtirilmoqda...
                </>
              ) : (
                <>
                  <Icons.Sparkle />
                  <span>Kitobni A2, B1, B2, C1 Ga Moslashtirish</span>
                </>
              )}
            </button>
          </div>

          {/* Progress Steps */}
          {isGenerating && (
            <div className={styles.progressContainer}>
              <div className={styles.stepsList}>
                <span className={progressStep >= 1 ? styles.stepDone : ''}>1. Segmentatsiya</span>
                <span className={progressStep >= 2 ? styles.stepDone : ''}>2. Leksik tahlil</span>
                <span className={progressStep >= 3 ? styles.stepDone : ''}>3. CEFR generatsiya</span>
                <span className={progressStep >= 4 ? styles.stepDone : ''}>4. Poetik vositalar</span>
                <span className={progressStep >= 5 ? styles.stepDone : ''}>5. Yakunlash</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progressStep * 20}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {generatedResult && (
          <div className={`${styles.card} ${styles.resultCard}`}>
            <div className={styles.resultHeader}>
              <div>
                <span className={styles.resultBadge}>Muvaffaqiyatli Moslashtirildi</span>
                <h2 className={styles.resultTitle}>
                  {generatedResult.bookTitle} — {generatedResult.chapterTitle}
                </h2>
                <p className={styles.resultMeta}>Muallif: {generatedResult.author} · 4 ta CEFR varianti tayyor</p>
              </div>

              <div className={styles.headerBtnGroup}>
                <button onClick={handleSaveToLibrary} className={styles.saveBtn}>
                  {savedSuccess ? (
                    <>
                      <Icons.Check />
                      <span>Kutubxonaga saqlandi</span>
                    </>
                  ) : (
                    <>
                      <Icons.Bookmark />
                      <span>Kutubxonaga Saqlash</span>
                    </>
                  )}
                </button>
                <button onClick={handleOpenInReader} className={styles.readNowBtn}>
                  <Icons.BookOpen />
                  <span>Readerda Ochish</span>
                </button>
                <button onClick={handleDownloadJSON} className={styles.ghostBtn} title="JSON formatda yuklab olish">
                  Eksport: JSON
                </button>
                <button onClick={handleDownloadCSV} className={styles.ghostBtn} title="CMS uchun CSV yuklab olish">
                  Eksport: CSV
                </button>
              </div>
            </div>

            {/* Metrics Comparison Table */}
            <div className={styles.metricsCard}>
              <h4 className={styles.metricsTitle}>CEFR Darajalari Bo‘yicha Qiyosiy Ko‘rsatkichlar</h4>
              <div className={styles.tableWrapper}>
                <table className={styles.metricsTable}>
                  <thead>
                    <tr>
                      <th>Ko‘rsatkich</th>
                      <th>Original (Asl)</th>
                      <th style={{ color: 'var(--color-c1)' }}>C1 (Ilg‘or)</th>
                      <th style={{ color: 'var(--color-b2)' }}>B2 (Yuqori o‘rta)</th>
                      <th style={{ color: 'var(--color-b1)' }}>B1 (O‘rta)</th>
                      <th style={{ color: 'var(--color-a2)' }}>A2 (Boshlang‘ich)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Jami so‘zlar soni</td>
                      <td>{generatedResult.variants.original.wordCount}</td>
                      <td>{generatedResult.variants.C1.wordCount}</td>
                      <td>{generatedResult.variants.B2.wordCount}</td>
                      <td>{generatedResult.variants.B1.wordCount}</td>
                      <td>{generatedResult.variants.A2.wordCount}</td>
                    </tr>
                    <tr>
                      <td>Jumla soni</td>
                      <td>{generatedResult.variants.original.sentenceCount}</td>
                      <td>{generatedResult.variants.C1.sentenceCount}</td>
                      <td>{generatedResult.variants.B2.sentenceCount}</td>
                      <td>{generatedResult.variants.B1.sentenceCount}</td>
                      <td>{generatedResult.variants.A2.sentenceCount}</td>
                    </tr>
                    <tr>
                      <td>O‘rtacha jumla uzunligi</td>
                      <td>{generatedResult.variants.original.avgSentenceLength} so‘z</td>
                      <td>{generatedResult.variants.C1.avgSentenceLength} so‘z</td>
                      <td>{generatedResult.variants.B2.avgSentenceLength} so‘z</td>
                      <td>{generatedResult.variants.B1.avgSentenceLength} so‘z</td>
                      <td>{generatedResult.variants.A2.avgSentenceLength} so‘z</td>
                    </tr>
                    <tr>
                      <td>Tavsiya etilgan daraja</td>
                      <td>Mumtoz / Filologiya</td>
                      <td>Universitet (C1)</td>
                      <td>Litsey / 10-11 sinf (B2)</td>
                      <td>Maktab / 7-9 sinf (B1)</td>
                      <td>Boshlang‘ich (A2)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* View Mode Switcher: Tabs vs Parallel Mode */}
            <div className={styles.viewControls}>
              <div className={styles.levelTabs}>
                {(['A2', 'B1', 'B2', 'C1', 'original'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setActiveTab(lvl);
                      setIsParallelView(false);
                    }}
                    className={`${styles.tabBtn} ${!isParallelView && activeTab === lvl ? styles.tabBtnActive : ''}`}
                    style={{
                      '--c':
                        lvl === 'A2'
                          ? 'var(--color-a2)'
                          : lvl === 'B1'
                          ? 'var(--color-b1)'
                          : lvl === 'B2'
                          ? 'var(--color-b2)'
                          : lvl === 'C1'
                          ? 'var(--color-c1)'
                          : 'var(--color-primary)',
                    } as React.CSSProperties}
                  >
                    {lvl === 'original' ? 'Mumtoz Original' : `${lvl} Daraja`}
                  </button>
                ))}
              </div>

              <div className={styles.parallelToggleWrapper}>
                <button
                  onClick={() => setIsParallelView(!isParallelView)}
                  className={`${styles.parallelBtn} ${isParallelView ? styles.parallelBtnActive : ''}`}
                >
                  <Icons.Compare />
                  <span>Yonma-yon Taqqoslash (Parallel)</span>
                </button>
                {isParallelView && (
                  <select
                    value={parallelCompareLevel}
                    onChange={(e) => setParallelCompareLevel(e.target.value as CEFRLevel)}
                    className={styles.compareSelect}
                  >
                    <option value="A2">Original vs A2</option>
                    <option value="B1">Original vs B1</option>
                    <option value="B2">Original vs B2</option>
                    <option value="C1">Original vs C1</option>
                  </select>
                )}
              </div>
            </div>

            {/* Text Presentation */}
            {!isParallelView ? (
              <div className={styles.readingArea}>
                <div className={styles.readingHeader}>
                  <span className={styles.readingLevelBadge}>
                    Ko‘rilayotgan variant: <strong>{activeTab.toUpperCase()}</strong>
                  </span>
                  <span className={styles.readingStat}>
                    {currentVariant?.wordCount} so‘z · {currentVariant?.paragraphs.length} paragraf
                  </span>
                </div>

                <div className={styles.paragraphsList}>
                  {currentVariant?.paragraphs.map((p, idx) => (
                    <div key={p.id} className={styles.paragraphRow}>
                      <span className={styles.paragraphId}>{p.sourceParagraphId}</span>
                      <p className={styles.paragraphText}>{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Parallel Mode: Side-by-Side */
              <div className={styles.parallelGrid}>
                <div className={styles.parallelCol}>
                  <div className={styles.parallelHeader}>
                    <h4>Original Asl Matn</h4>
                    <span>Mumtoz adabiy manba</span>
                  </div>
                  {generatedResult.variants.original.paragraphs.map((p) => (
                    <div key={p.id} className={styles.parallelBox}>
                      <span className={styles.paragraphId}>{p.sourceParagraphId}</span>
                      <p className={styles.paragraphText}>{p.text}</p>
                    </div>
                  ))}
                </div>

                <div className={styles.parallelCol}>
                  <div className={styles.parallelHeader} style={{ borderColor: 'var(--color-primary)' }}>
                    <h4>{parallelCompareLevel} Moslashtirilgan Varianti</h4>
                    <span style={{ color: 'var(--color-primary)' }}>Avtomatik AI adaptatsiyasi</span>
                  </div>
                  {generatedResult.variants[parallelCompareLevel].paragraphs.map((p) => (
                    <div key={p.id} className={styles.parallelBox}>
                      <span className={styles.paragraphId}>{p.sourceParagraphId}</span>
                      <p className={styles.paragraphText}>{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detected Stylistic Devices & Vocabulary */}
            <div className={styles.extrasGrid}>
              <div className={styles.extraBox}>
                <h4>Aniqlangan Badiiy Vositalar ({generatedResult.detectedAnnotations.length})</h4>
                <div className={styles.annList}>
                  {generatedResult.detectedAnnotations.map((ann) => (
                    <div key={ann.id} className={styles.annItem}>
                      <div className={styles.annHeader}>
                        <span className={styles.annQuote}>&ldquo;{ann.quote}&rdquo;</span>
                        <span className={styles.annBadge}>{ann.typeLabel}</span>
                      </div>
                      <p className={styles.annNote}>{ann.noteUz}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.extraBox}>
                <h4>Ajratilgan Asosiy Lug‘at ({generatedResult.extractedVocabulary.length} so‘z)</h4>
                <div className={styles.vocabList}>
                  {generatedResult.extractedVocabulary.map((vw) => (
                    <div key={vw.id} className={styles.vocabItem}>
                      <div className={styles.vocabTop}>
                        <span className={styles.vocabWord}>{vw.word}</span>
                        <span className={styles.vocabIpa}>{vw.ipa}</span>
                        <span className={`badge badge--${vw.cefr.toLowerCase()}`}>{vw.cefr}</span>
                      </div>
                      <p className={styles.vocabUz}>{vw.translation.uz}</p>
                      <p className={styles.vocabEx}>&ldquo;{vw.example}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
