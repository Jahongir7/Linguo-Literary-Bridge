'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { StudentNavbar } from '@/components/layout/StudentNavbar';
import styles from './library.module.css';
import { useBookStore } from '@/store/bookStore';
import type { CEFRLevel } from '@/types';

// Clean SVG icons (zero emojis)
const Icons = {
  Sparkle: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  BookOpen: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Headphones: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  Clock: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Play: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  HelpCircle: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

export default function LibraryPage() {
  const router = useRouter();
  const { works, chapters, activeLevel, setActiveLevel, setActiveChapterId, readProgress } = useBookStore();
  const [selectedWorkId, setSelectedWorkId] = useState<string>('gf');

  const selectedWork = works.find((w) => w.id === selectedWorkId) || works[0];
  const workChapters = chapters.filter((c) => c.workId === selectedWorkId);

  const handleStartReading = (chapterId: string) => {
    setActiveChapterId(chapterId);
    router.push(`/reader/${chapterId}`);
  };

  const handleStartPractice = (chapterId: string) => {
    setActiveChapterId(chapterId);
    router.push(`/practice`);
  };

  return (
    <div className={styles.pageWrapper}>
      <StudentNavbar />

      <main className={styles.mainContent}>
        {/* Banner: AI Book Adaptor */}
        <div className={styles.aiBanner}>
          <div className={styles.aiBannerContent}>
            <span className={styles.aiBannerBadge}>
              <Icons.Sparkle /> Yangi Imkoniyat · AI Dvigateli
            </span>
            <h2>O‘z kitobingizni yuklang va 4 ta CEFR darajasida oling!</h2>
            <p>
              Istalgan ingliz tili badiiy asari yoki bobini matn yoki fayl ko‘rinishida yuklang.
              Google Gemini AI uni A2, B1, B2 va C1 darajalariga daqiqalarda ajratib beradi.
            </p>
          </div>
          <Link href="/book-generator" className={styles.aiBannerBtn}>
            Kitob Yuklash & Moslashtirish <Icons.ArrowRight />
          </Link>
        </div>

        {/* Section: Works Shelf */}
        <section className={styles.shelfSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.titleWithIcon}>
              <div className={styles.iconBox}>
                <Icons.BookOpen />
              </div>
              <div>
                <h2 className={styles.sectionTitle}>Adabiy Kutubxona (E.L. Voynich)</h2>
                <p className={styles.sectionSub}>Barcha asarlar 4 ta CEFR darajasiga to‘liq moslashtirilgan</p>
              </div>
            </div>
            <div className={styles.activeLevelSelector}>
              <span>Faol darajangiz:</span>
              {(['A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveLevel(lvl)}
                  className={`${styles.levelSelectBtn} ${activeLevel === lvl ? styles.levelSelectBtnActive : ''}`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Work Cards */}
          <div className={styles.worksGrid}>
            {works.map((work) => {
              const isSelected = work.id === selectedWorkId;
              const chapterCount = chapters.filter((c) => c.workId === work.id).length;
              return (
                <div
                  key={work.id}
                  onClick={() => setSelectedWorkId(work.id)}
                  className={`${styles.workCard} ${isSelected ? styles.workCardSelected : ''}`}
                >
                  <div className={styles.cardCover}>
                    {work.coverUrl ? (
                      <img src={work.coverUrl} alt={work.title} className={styles.coverImg} />
                    ) : (
                      <div className={styles.placeholderCover}>
                        <Icons.BookOpen />
                      </div>
                    )}
                    <span className={`${styles.statusBadge} ${work.status === 'published' ? styles.statusPublished : styles.statusDraft}`}>
                      {work.status === 'published' ? 'O‘qishga tayyor' : 'Tez kunda'}
                    </span>
                  </div>

                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{work.title}</h3>
                    <p className={styles.cardAuthor}>{work.author}</p>
                    <p className={styles.cardDesc}>{work.description}</p>
                    <div className={styles.cardMeta}>
                      <span>{chapterCount} ta bob</span>
                      <div className={styles.levelPills}>
                        <span className={styles.levelA2}>A2</span>
                        <span className={styles.levelB1}>B1</span>
                        <span className={styles.levelB2}>B2</span>
                        <span className={styles.levelC1}>C1</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section: Chapters List */}
        <section className={styles.chaptersSection}>
          <div className={styles.chapterHeader}>
            <h3>
              {selectedWork.title} — Boblar ro‘yxati ({workChapters.length})
            </h3>
            <span className={styles.activeLevelIndicator}>
              Tanlangan CEFR darajasi: <strong>{activeLevel}</strong>
            </span>
          </div>

          <div className={styles.chaptersList}>
            {workChapters.map((ch) => {
              const progress = readProgress[ch.id] || 0;
              const hasAudio = ch.id === 'gf-p1-c01';

              return (
                <div key={ch.id} className={styles.chapterCard}>
                  <div className={styles.chapterLeft}>
                    <div className={styles.chapterNumberBadge}>
                      {ch.partNumber > 0 ? `${ch.partNumber}.${ch.chapterNumber}` : 'Ep'}
                    </div>
                    <div>
                      <h4 className={styles.chapterTitleText}>{ch.title}</h4>
                      <div className={styles.chapterMetaRow}>
                        <div className={styles.levelBadgesRow}>
                          {(['A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                            <span
                              key={lvl}
                              className={`${styles.chapterLevelTag} ${
                                !ch.versions.includes(lvl) ? styles.dimmedBadge : ''
                              }`}
                            >
                              {lvl}
                            </span>
                          ))}
                        </div>
                        {hasAudio && (
                          <span className={styles.audioTag} title="B1 audio mavjud">
                            <Icons.Headphones /> Audio sinxron
                          </span>
                        )}
                        <span className={styles.readingTime}>
                          <Icons.Clock /> ~6 daqiqa
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress & Actions */}
                  <div className={styles.chapterRight}>
                    <div className={styles.progressBlock}>
                      <div className={styles.progressLabel}>
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                      </div>
                    </div>

                    <div className={styles.chapterBtns}>
                      <button onClick={() => handleStartReading(ch.id)} className={styles.readBtn}>
                        <Icons.Play /> O‘qish
                      </button>
                      <button onClick={() => handleStartPractice(ch.id)} className={styles.testBtn}>
                        <Icons.HelpCircle /> Test
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
