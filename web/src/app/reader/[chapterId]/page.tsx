'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { StudentNavbar } from '@/components/layout/StudentNavbar';
import styles from './reader.module.css';
import { useBookStore } from '@/store/bookStore';
import type { CEFRLevel, Annotation, VocabWord, AIMessage } from '@/types';

// Professional SVG Icons (Zero Emojis)
const Icons = {
  Sparkle: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Columns: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="12" y1="3" x2="12" y2="21" />
    </svg>
  ),
  MessageSquare: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Play: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Pause: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
  Close: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Check: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Bookmark: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Bot: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  ),
  Send: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
};

export default function ReaderPage() {
  return (
    <React.Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: '#1d4ed8' }}>Kitob yuklanmoqda...</div>}>
      <ReaderContent />
    </React.Suspense>
  );
}

function ReaderContent() {
  const params = useParams();
  const router = useRouter();
  const chapterId = (params?.chapterId as string) || 'gf-p1-c01';

  const {
    chapters,
    activeLevel,
    setActiveLevel,
    getChapterParagraphs,
    annotations,
    vocabulary,
    savedWordIds,
    toggleSavedWord,
    audioPlaying,
    setAudioPlaying,
    audioCurrentSentence,
    setAudioCurrentSentence,
    setReadProgress,
    addXP,
  } = useBookStore();

  const chapter = chapters.find((c) => c.id === chapterId) || chapters[0];
  const paragraphs = getChapterParagraphs(chapterId, activeLevel);
  const originalParagraphs = getChapterParagraphs(chapterId, 'original');

  // Reader UI States - default to 'light' (white & blue theme)
  const [isParallel, setIsParallel] = useState(false);
  const [fontSize, setFontSize] = useState<number>(18);
  const [readerTheme, setReaderTheme] = useState<'light' | 'sepia' | 'soft'>('light');
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(null);
  const [selectedWord, setSelectedWord] = useState<VocabWord | null>(null);

  // Audio State
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const audioIntervalRef = useRef<any>(null);

  // Ask Gadfly AI State
  const [gadflyOpen, setGadflyOpen] = useState(false);
  const [gadflyMessages, setGadflyMessages] = useState<AIMessage[]>([
    {
      id: 'm1',
      sender: 'gadfly',
      text: 'Salom! Men "Ask Gadfly" adabiy AI-tutoriman. 1-bob matni, undagi poetik vositalar va CEFR darajangiz bo‘yicha istalgan savolingizni bering!',
      timestamp: '10:00',
    },
  ]);
  const [gadflyInput, setGadflyInput] = useState('');
  const [gadflyLoading, setGadflyLoading] = useState(false);

  // Reading progress tracking
  useEffect(() => {
    setReadProgress(chapterId, 100);
  }, [chapterId, setReadProgress]);

  // Audio playback simulation with synchronous text highlighting
  useEffect(() => {
    if (audioPlaying) {
      audioIntervalRef.current = setInterval(() => {
        const next = audioCurrentSentence >= paragraphs.length - 1 ? 0 : audioCurrentSentence + 1;
        if (next === 0) {
          setAudioPlaying(false);
        }
        setAudioCurrentSentence(next);
      }, 4500 / audioSpeed);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [audioPlaying, audioSpeed, paragraphs.length, audioCurrentSentence, setAudioPlaying, setAudioCurrentSentence]);

  // Handle word click
  const handleWordClick = (wordText: string) => {
    const clean = wordText.toLowerCase().replace(/[^a-z]/g, '');
    const found = vocabulary.find((v) => v.word.toLowerCase() === clean);
    if (found) {
      setSelectedWord(found);
    } else {
      // Create quick temporary lookup
      setSelectedWord({
        id: 'temp-' + clean,
        word: clean,
        ipa: `/${clean}/`,
        pos: 'word',
        cefr: activeLevel,
        translation: {
          uz: `"${clean}" so‘zining adabiy kontekstdagi ma’nosi`,
          ru: `Значение слова "${clean}" в контексте`,
        },
        example: `From chapter 1 text: "...${clean}..."`,
      });
    }
  };

  // Ask Gadfly AI submission
  const handleSendGadfly = async (queryText?: string) => {
    const q = (queryText || gadflyInput).trim();
    if (!q) return;

    const userMsg: AIMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setGadflyMessages((prev) => [...prev, userMsg]);
    setGadflyInput('');
    setGadflyLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: q,
          cefrLevel: activeLevel,
          chapterTitle: chapter.title,
          quote: activeAnnotation?.quote,
          paragraphId: activeAnnotation?.paragraphId,
        }),
      });

      const data = await res.json();
      if (data?.message) {
        setGadflyMessages((prev) => [...prev, data.message]);
        addXP(15);
      }
    } catch {
      // Fallback response
      setGadflyMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'gadfly',
          text: `[gf-p1-c01-p002] CEFR ${activeLevel} darajasidagi tahlil: E.L. Voynich ushbu parchada Montanellining samimiy ovozini "caress" (erkalash) deb tasvirlaydi. Bu ota va o‘g‘il o‘rtasidagi nozik bog‘lanishni ifodalovchi metaforadir.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setGadflyLoading(false);
    }
  };

  // Render text with interactive words and annotation highlights
  const renderParagraphContent = (text: string, pId: string) => {
    const relevantAnn = showAnnotations
      ? annotations.filter((a) => a.paragraphId === pId || pId.startsWith(a.paragraphId))
      : [];

    const words = text.split(' ');

    return (
      <span>
        {words.map((w, idx) => {
          const cleanW = w.toLowerCase().replace(/[^a-z]/g, '');
          const matchedAnn = relevantAnn.find((a) =>
            a.quote.toLowerCase().includes(cleanW) && cleanW.length > 3
          );

          if (matchedAnn) {
            return (
              <span
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveAnnotation(matchedAnn);
                }}
                className={styles.annotationHighlight}
                title={`Badiiy vosita: ${matchedAnn.type}`}
              >
                {w}{' '}
              </span>
            );
          }

          return (
            <span
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                handleWordClick(w);
              }}
              className={styles.clickableWord}
            >
              {w}{' '}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div
      className={`${styles.pageWrapper} ${
        readerTheme === 'sepia' ? styles.themeSepia : readerTheme === 'soft' ? styles.themeSoft : styles.themeLight
      }`}
    >
      <StudentNavbar />

      {/* Reader Floating Toolbar */}
      <div className={styles.readerToolbar}>
        <div className={styles.toolbarContainer}>
          {/* Breadcrumb & Chapter Title */}
          <div className={styles.tbLeft}>
            <Link href="/library" className={styles.backLink}>
              Kutubxona
            </Link>
            <span className={styles.tbDivider}>/</span>
            <span className={styles.tbChapterName}>{chapter.title}</span>
          </div>

          {/* Level Switcher */}
          <div className={styles.levelSwitcherGroup}>
            <span className={styles.tbLabel}>Daraja:</span>
            {(['A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setActiveLevel(lvl)}
                className={`${styles.lvlBtn} ${activeLevel === lvl ? styles.lvlBtnActive : ''}`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Tools: Parallel, Font size, Theme, Annotations Toggle */}
          <div className={styles.tbRight}>
            <button
              onClick={() => setIsParallel(!isParallel)}
              className={`${styles.toolBtn} ${isParallel ? styles.toolBtnActive : ''}`}
              title="Parallel rejim: Moslashtirilgan va asl matn yonma-yon"
            >
              <Icons.Columns /> Parallel
            </button>

            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`${styles.toolBtn} ${showAnnotations ? styles.toolBtnActive : ''}`}
              title="Poetik va madaniy izohlarni yoqish/o‘chirish"
            >
              <Icons.MessageSquare /> Izohlar {showAnnotations ? 'ON' : 'OFF'}
            </button>

            {/* Font size */}
            <div className={styles.fontSizeGroup}>
              <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className={styles.iconBtn}>
                A-
              </button>
              <button onClick={() => setFontSize(Math.min(26, fontSize + 2))} className={styles.iconBtn}>
                A+
              </button>
            </div>

            {/* Theme switcher */}
            <div className={styles.themeGroup}>
              <button
                onClick={() => setReaderTheme('light')}
                className={`${styles.themeDot} ${styles.themeDotLight} ${readerTheme === 'light' ? styles.themeDotActive : ''}`}
                title="Oq va Ko‘k"
              />
              <button
                onClick={() => setReaderTheme('soft')}
                className={`${styles.themeDot} ${styles.themeDotSoft} ${readerTheme === 'soft' ? styles.themeDotActive : ''}`}
                title="Mayin Moviy"
              />
              <button
                onClick={() => setReaderTheme('sepia')}
                className={`${styles.themeDot} ${styles.themeDotSepia} ${readerTheme === 'sepia' ? styles.themeDotActive : ''}`}
                title="Qog‘oz Sepia"
              />
            </div>

            {/* Ask Gadfly Trigger */}
            <button onClick={() => setGadflyOpen(true)} className={styles.gadflyTriggerBtn}>
              <Icons.Bot /> Ask Gadfly
            </button>
          </div>
        </div>
      </div>

      {/* Synchronous Audio Player Bar */}
      <div className={styles.audioBar}>
        <div className={styles.audioBarContainer}>
          <div className={styles.audioLeft}>
            <button onClick={() => setAudioPlaying(!audioPlaying)} className={styles.audioPlayBtn}>
              {audioPlaying ? (
                <>
                  <Icons.Pause /> To‘xtatish
                </>
              ) : (
                <>
                  <Icons.Play /> Ovozli o‘qish
                </>
              )}
            </button>
            <div className={styles.audioMeta}>
              <span className={styles.audioTitle}>Audio narratsiya ({activeLevel} daraja)</span>
              <span className={styles.audioSub}>Gap bo‘yicha sinxron karaoke yoritilishi</span>
            </div>
          </div>

          <div className={styles.audioRight}>
            <div className={styles.speedGroup}>
              <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Tezlik:</span>
              {[0.75, 1.0, 1.25].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setAudioSpeed(spd)}
                  className={`${styles.speedBtn} ${audioSpeed === spd ? styles.speedBtnActive : ''}`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Text Content */}
      <main className={styles.readerContainer}>
        {!isParallel ? (
          /* Single Column Reader */
          <article className={styles.singleColumnArticle} style={{ fontSize: `${fontSize}px` }}>
            <header className={styles.articleHeader}>
              <span className={styles.articleLevelBadge}>{activeLevel} DARAJASI</span>
              <h1 className={styles.chapterTitleDisplay}>{chapter.title}</h1>
              <p className={styles.chapterSubtitleDisplay}>E.L. Voynich · Mumtoz ingliz adabiyoti</p>
            </header>

            <div className={styles.paragraphsStack}>
              {paragraphs.map((p, idx) => {
                const isCurrentAudioSentence = audioPlaying && audioCurrentSentence === idx;
                return (
                  <div
                    key={p.id}
                    className={`${styles.paragraphWrapper} ${isCurrentAudioSentence ? styles.karaokeActive : ''}`}
                  >
                    <span className={styles.paragraphIndex}>{idx + 1}</span>
                    <p className={styles.paragraphBody}>{renderParagraphContent(p.text, p.sourceParagraphId)}</p>
                  </div>
                );
              })}
            </div>
          </article>
        ) : (
          /* Parallel View (Side-by-Side: Adapted vs Original) */
          <div className={styles.parallelReaderGrid} style={{ fontSize: `${fontSize}px` }}>
            {/* Left: Adapted CEFR Level */}
            <div className={styles.parallelCol}>
              <div className={styles.parallelColHeader}>
                <span className={styles.articleLevelBadge}>{activeLevel} MOSLASHTIRILGAN</span>
                <h4>{chapter.title}</h4>
              </div>

              <div className={styles.paragraphsStack}>
                {paragraphs.map((p, idx) => (
                  <div key={p.id} className={styles.parallelItem}>
                    <span className={styles.paragraphIndex}>{idx + 1}</span>
                    <p className={styles.paragraphBody}>{renderParagraphContent(p.text, p.sourceParagraphId)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Original Classic Text */}
            <div className={styles.parallelCol}>
              <div className={styles.parallelColHeader}>
                <span className={styles.originalBadge}>ORIGINAL ASL MATN</span>
                <h4>Klassik Manba (Project Gutenberg #3431)</h4>
              </div>

              <div className={styles.paragraphsStack}>
                {originalParagraphs.map((p, idx) => (
                  <div key={p.id} className={styles.parallelItem}>
                    <span className={styles.paragraphIndex}>{idx + 1}</span>
                    <p className={styles.paragraphBody}>{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Slide-over: Annotation Details Drawer */}
      {activeAnnotation && (
        <aside className={styles.annotationDrawer}>
          <div className={styles.drawerHeader}>
            <span className={styles.drawerCategoryBadge}>{activeAnnotation.type.replace('_', ' ').toUpperCase()}</span>
            <button onClick={() => setActiveAnnotation(null)} className={styles.drawerCloseBtn}>
              <Icons.Close />
            </button>
          </div>

          <div className={styles.drawerBody}>
            <div className={styles.drawerQuoteBox}>
              <span className={styles.quoteIcon}>“</span>
              <p className={styles.drawerQuoteText}>{activeAnnotation.quote}</p>
            </div>

            <div className={styles.noteSection}>
              <h4>Qisqa Izoh</h4>
              <p className={styles.noteUz}>{activeAnnotation.shortNote.uz}</p>
            </div>

            <div className={styles.noteSection}>
              <h4>Kengaytirilgan Poetik Tahlil</h4>
              <p className={styles.noteLong}>{activeAnnotation.longNote.uz}</p>
              <p className={styles.noteEn}>{activeAnnotation.longNote.en}</p>
            </div>

            {activeAnnotation.thesaurusRef && (
              <div className={styles.thesaurusLinkCard}>
                <div>
                  <span style={{ fontSize: 11, color: '#64748b' }}>Bog‘langan Tezaurus birligi</span>
                  <p style={{ fontWeight: 700, margin: '2px 0 0', color: '#0f172a' }}>{activeAnnotation.thesaurusRef}</p>
                </div>
                <Link href="/thesaurus" className={styles.thesaurusGoBtn}>
                  Tezaurusda ochish →
                </Link>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* Word Popup Modal */}
      {selectedWord && (
        <div className={styles.wordModalOverlay} onClick={() => setSelectedWord(null)}>
          <div className={styles.wordModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.wordModalHeader}>
              <div>
                <h3 className={styles.wordTitle}>{selectedWord.word}</h3>
                <span className={styles.wordIpa}>{selectedWord.ipa}</span>
                <span className={styles.wordCefrBadge}>{selectedWord.cefr}</span>
              </div>
              <button onClick={() => setSelectedWord(null)} className={styles.modalCloseBtn}>
                <Icons.Close />
              </button>
            </div>

            <div className={styles.wordModalBody}>
              <p className={styles.wordPos}>{selectedWord.pos}</p>
              <div className={styles.wordTransBox}>
                <span className={styles.transLang}>O‘zbekcha tarjima:</span>
                <p className={styles.transUz}>{selectedWord.translation.uz}</p>
              </div>

              <div className={styles.wordExampleBox}>
                <span className={styles.transLang}>Matndan misol:</span>
                <p className={styles.exampleText}>&ldquo;{selectedWord.example}&rdquo;</p>
              </div>

              <button
                onClick={() => {
                  toggleSavedWord(selectedWord.id);
                  setSelectedWord(null);
                }}
                className={`${styles.saveWordBtn} ${
                  savedWordIds.includes(selectedWord.id) ? styles.saveWordBtnActive : ''
                }`}
              >
                {savedWordIds.includes(selectedWord.id) ? (
                  <>
                    <Icons.Check /> Shaxsiy lug‘atda saqlangan
                  </>
                ) : (
                  <>
                    <Icons.Bookmark /> Lug‘atimga saqlash (+10 XP)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* "Ask Gadfly" AI Tutor Drawer */}
      {gadflyOpen && (
        <div className={styles.gadflyOverlay} onClick={() => setGadflyOpen(false)}>
          <div className={styles.gadflyDrawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.gadflyHeader}>
              <div className={styles.gadflyAvatar}>
                <Icons.Bot />
              </div>
              <div className={styles.gadflyHeaderText}>
                <h3 className={styles.gadflyTitle}>Ask Gadfly (AI-Tutor)</h3>
                <p className={styles.gadflySubtitle}>
                  E.L. Voynich korpusi & CEFR {activeLevel} RAG Tahlili
                </p>
              </div>
              <button onClick={() => setGadflyOpen(false)} className={styles.drawerCloseBtn}>
                <Icons.Close />
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            <div className={styles.gadflyChips}>
              {[
                'Padre ovozi nega erkalashga o‘xshatilgan?',
                'Artur nega foxglove gulini ezg‘ilaydi?',
                'Tirnoqsiz pantera taqqoslashini tushuntir',
                'Bugun Toshkentda ob-havo qanday? (Off-topic test)',
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendGadfly(chip)}
                  className={styles.gadflyChip}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className={styles.gadflyMessages}>
              {gadflyMessages.map((m) => (
                <div
                  key={m.id}
                  className={`${styles.msgRow} ${m.sender === 'user' ? styles.msgUser : styles.msgGadfly}`}
                >
                  <div className={styles.msgBubble}>
                    <p className={styles.msgText}>{m.text}</p>
                    {m.sourceCitation && (
                      <div className={styles.msgCitation}>
                        <span>Manba: {m.sourceCitation.paragraphId}</span>
                        <span>{m.sourceCitation.chapterTitle}</span>
                      </div>
                    )}
                    <span className={styles.msgTime}>{m.timestamp}</span>
                  </div>
                </div>
              ))}
              {gadflyLoading && (
                <div className={`${styles.msgRow} ${styles.msgGadfly}`}>
                  <div className={styles.msgBubble}>
                    <span className={styles.loadingDots}>Gadfly tahlil qilmoqda...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className={styles.gadflyInputRow}>
              <input
                type="text"
                value={gadflyInput}
                onChange={(e) => setGadflyInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendGadfly()}
                placeholder="Gadflydan so‘rang (masalan: Ushbu metafora nimani bildiradi?)..."
                className={styles.gadflyInput}
              />
              <button onClick={() => handleSendGadfly()} className={styles.gadflySendBtn}>
                <Icons.Send />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
