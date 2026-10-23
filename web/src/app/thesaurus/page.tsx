'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { StudentNavbar } from '@/components/layout/StudentNavbar';
import styles from './thesaurus.module.css';
import { useBookStore } from '@/store/bookStore';
import type { ThesaurusEntry } from '@/types';

// Professional SVG Icons (zero emojis)
const Icons = {
  List: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  Layers: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  BookOpen: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  MessageSquare: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  RotateCcw: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
};

export default function ThesaurusPage() {
  const { thesaurus, addXP } = useBookStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeEntry, setActiveEntry] = useState<ThesaurusEntry | null>(thesaurus[0] || null);
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  // Filter entries
  const filtered = thesaurus.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      (item.termEn || item.term || '').toLowerCase().includes(q) ||
      (item.termUz || item.uzbek || '').toLowerCase().includes(q) ||
      (item.termRu || item.russian || '').toLowerCase().includes(q);

    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  const currentFlashcard = filtered[cardIndex] || filtered[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % filtered.length);
    addXP(5);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  return (
    <div className={styles.pageWrapper}>
      <StudentNavbar />

      <main className={styles.mainContent}>
        {/* Header */}
        <div className={styles.headerRow}>
          <div>
            <span className={styles.badgeLabel}>Kognitiv Tezaurus · 150 birlik</span>
            <h1 className={styles.pageTitle}>Adabiy va Lingvistik Tezaurus</h1>
            <p className={styles.pageSub}>
              E.L. Voynich asarlarida uchraydigan barcha poetik vositalar, troplar va gumanizm kategoriyalari
            </p>
          </div>

          <div className={styles.modeButtons}>
            <button
              onClick={() => setIsFlashcardMode(false)}
              className={`${styles.modeBtn} ${!isFlashcardMode ? styles.modeBtnActive : ''}`}
            >
              <Icons.List /> Ro‘yxat & Tahlil
            </button>
            <button
              onClick={() => {
                setIsFlashcardMode(true);
                setIsFlipped(false);
              }}
              className={`${styles.modeBtn} ${isFlashcardMode ? styles.modeBtnActive : ''}`}
            >
              <Icons.Layers /> Kartochkalar (SRS)
            </button>
          </div>
        </div>

        {/* Search & Categories Bar */}
        <div className={styles.searchBar}>
          <div className={styles.searchInputWrapper}>
            <div className={styles.searchIconBox}>
              <Icons.Search />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Atamani qidirish (o‘zbek, ingliz, rus tillarida)..."
              className={styles.searchInput}
            />
          </div>

          <div className={styles.categoryFilters}>
            {[
              { id: 'all', label: 'Barchasi' },
              { id: 'trope', label: 'Troplar (Metafora, O‘xshatish)' },
              { id: 'stylistic', label: 'Stilistik figuralar' },
              { id: 'detail', label: 'Badiiy detallar' },
              { id: 'speech', label: 'Nutq shakllari' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`${styles.catBtn} ${selectedCategory === cat.id ? styles.catBtnActive : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {!isFlashcardMode ? (
          /* List & Detailed Inspector Mode */
          <div className={styles.inspectorGrid}>
            {/* Left: Term Cards List */}
            <div className={styles.termsList}>
              {filtered.map((item) => {
                const isSelected = activeEntry?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveEntry(item)}
                    className={`${styles.termCard} ${isSelected ? styles.termCardSelected : ''}`}
                  >
                    <div className={styles.termCardTop}>
                      <h4 className={styles.termEn}>{item.termEn || item.term}</h4>
                      <span className={styles.termCefrBadge}>{item.cefrLevel || item.cefr || 'B1'}</span>
                    </div>
                    <p className={styles.termUz}>{item.termUz || item.uzbek}</p>
                    <span className={styles.termCat}>{item.categoryLabel || item.category}</span>
                  </div>
                );
              })}
            </div>

            {/* Right: Detailed Deep Dive */}
            {activeEntry && (
              <div className={styles.entryDetailCard}>
                <div className={styles.detailHeader}>
                  <div>
                    <span className={styles.detailCatBadge}>{activeEntry.categoryLabel || activeEntry.category}</span>
                    <h2 className={styles.detailHeading}>{activeEntry.termEn || activeEntry.term}</h2>
                    <p className={styles.detailSubHeading}>
                      {activeEntry.termUz || activeEntry.uzbek} · {activeEntry.termRu || activeEntry.russian}
                    </p>
                  </div>
                  <span className={styles.detailLevelBadge}>CEFR {activeEntry.cefrLevel || activeEntry.cefr || 'B1'}</span>
                </div>

                {/* 3 Definition Levels (Simple, Standard, Academic) */}
                <div className={styles.defsSection}>
                  <h4 className={styles.sectionHeaderTitle}>
                    <Icons.BookOpen /> 3 Darajali Ta’riflar:
                  </h4>

                  <div className={styles.defCard}>
                    <span className={styles.defLevelBadge}>Oddiy ta’rif (A2–B1)</span>
                    <p className={styles.defContent}>
                      {activeEntry.definitions?.simple || activeEntry.definitionSimple}
                    </p>
                  </div>

                  <div className={styles.defCard}>
                    <span className={styles.defLevelBadge}>Standart ta’rif (B2)</span>
                    <p className={styles.defContent}>
                      {activeEntry.definitions?.standard || activeEntry.definitionStandard}
                    </p>
                  </div>

                  <div className={styles.defCard}>
                    <span className={styles.defLevelBadge}>Akademik / Filologik ta’rif (C1)</span>
                    <p className={styles.defContent}>
                      {activeEntry.definitions?.academic || activeEntry.definitionAcademic}
                    </p>
                  </div>
                </div>

                {/* Matndan Misollar */}
                <div className={styles.examplesSection}>
                  <h4 className={styles.sectionHeaderTitle}>
                    <Icons.MessageSquare /> Asardan Olingan Badiiy Misollar:
                  </h4>
                  {activeEntry.examples?.map((ex, i) => (
                    <div key={i} className={styles.exampleBox}>
                      <p className={styles.exQuote}>&ldquo;{ex.quote}&rdquo;</p>
                      {ex.explanationUz && <p className={styles.exExpl}>{ex.explanationUz}</p>}
                      <div className={styles.exRefRow}>
                        <span>{ex.chapterRef || '1-bob: Kutubxona suhbati'}</span>
                        <Link href="/reader/gf-p1-c01" className={styles.readerJumpBtn}>
                          Matnga o‘tish →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Related Terms */}
                {activeEntry.relatedTerms && activeEntry.relatedTerms.length > 0 && (
                  <div className={styles.relatedSection}>
                    <span className={styles.relatedLabel}>Bog‘liq atamalar:</span>
                    <div className={styles.relatedBadges}>
                      {activeEntry.relatedTerms.map((rt) => (
                        <span key={rt} className={styles.relatedBadge}>
                          {rt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Flashcard (SRS) Mode */
          <div className={styles.flashcardContainer}>
            <div className={styles.flashcardMeta}>
              <span>
                Kartochka {cardIndex + 1} / {filtered.length}
              </span>
              <span>Yodlash va bilimlarni tekshirish</span>
            </div>

            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`${styles.flashcard} ${isFlipped ? styles.flashcardFlipped : ''}`}
            >
              {!isFlipped ? (
                /* Front */
                <div className={styles.cardFront}>
                  <span className={styles.cardFrontTag}>{currentFlashcard.categoryLabel || currentFlashcard.category}</span>
                  <h2 className={styles.cardFrontTitle}>{currentFlashcard.termEn || currentFlashcard.term}</h2>
                  <p className={styles.cardFrontSub}>{currentFlashcard.termUz || currentFlashcard.uzbek}</p>
                  <p className={styles.cardPromptText}>Ta’rif va misolni ko‘rish uchun kartochkani bosing</p>
                </div>
              ) : (
                /* Back */
                <div className={styles.cardBack}>
                  <span className={styles.cardBackTag}>Ta’rif & Misol</span>
                  <p className={styles.cardBackDef}>
                    {currentFlashcard.definitions?.standard || currentFlashcard.definitionStandard}
                  </p>
                  {currentFlashcard.examples?.[0] && (
                    <div className={styles.cardBackEx}>
                      <p className={styles.backExQuote}>&ldquo;{currentFlashcard.examples[0].quote}&rdquo;</p>
                      <span className={styles.backExRef}>
                        {currentFlashcard.examples[0].chapterRef || '1-bob'}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={styles.flashcardControls}>
              <button onClick={handlePrevCard} className={styles.fcBtn}>
                ← Oldingi
              </button>
              <button onClick={() => setIsFlipped(!isFlipped)} className={styles.fcFlipBtn}>
                <Icons.RotateCcw /> Aylantirish
              </button>
              <button onClick={handleNextCard} className={styles.fcNextBtn}>
                Keyingisi (+5 XP) →
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
