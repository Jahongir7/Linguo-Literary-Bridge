'use client';
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import styles from './editor-dashboard.module.css';
import { MOCK_CHAPTERS, MOCK_ANNOTATIONS, MOCK_THESAURUS, MOCK_QUIZ_QUESTIONS, MOCK_WORKS } from '@/data/mockData';
import type { ContentStatus } from '@/types';

const STATUS_LABELS: Record<ContentStatus, string> = {
  published: 'Nashr',
  review: 'Tekshiruvda',
  draft: 'Qoralama',
};

export default function EditorDashboard() {
  const [activeTab, setActiveTab] = useState<'chapters' | 'annotations' | 'thesaurus' | 'quiz'>('chapters');

  const publishedCount = MOCK_CHAPTERS.filter((c) => c.status === 'published').length;
  const reviewCount = MOCK_CHAPTERS.filter((c) => c.status === 'review').length;

  return (
    <DashboardLayout
      title="Muharrir Paneli"
      subtitle="Matn versiyalari, izohlar, tezaurus va test banki"
      actions={
        <button className="btn-primary">+ Yangi kontent</button>
      }
    >
      {/* Stats Row */}
      <div className={styles.statsRow}>
        {[
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            ),
            label: 'Jami boblar',
            value: MOCK_CHAPTERS.length,
            color: '#1d4ed8',
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ),
            label: 'Nashr etilgan',
            value: publishedCount,
            color: '#059669',
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            ),
            label: 'Tekshiruvda',
            value: reviewCount,
            color: '#d97706',
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            ),
            label: 'Izohlar',
            value: MOCK_ANNOTATIONS.length,
            color: '#0284c7',
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            ),
            label: 'Tezaurus',
            value: `${MOCK_THESAURUS.length}/150`,
            color: '#7c3aed',
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            ),
            label: 'Savollar',
            value: MOCK_QUIZ_QUESTIONS.length,
            color: '#ea580c',
          },
        ].map((s) => (
          <div key={s.label} className={styles.miniStat} style={{ '--c': s.color } as React.CSSProperties}>
            <span className={styles.miniIcon}>{s.icon}</span>
            <div>
              <p className={styles.miniValue}>{s.value}</p>
              <p className={styles.miniLabel}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className={`${styles.tabsCard} glass-card`}>
        <div className={styles.tabs}>
          {([
            { key: 'chapters', label: 'Boblar' },
            { key: 'annotations', label: 'Izohlar' },
            { key: 'thesaurus', label: 'Tezaurus' },
            { key: 'quiz', label: 'Testlar' },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chapters Tab */}
        {activeTab === 'chapters' && (
          <div className={styles.tabContent}>
            {MOCK_WORKS.map((work) => {
              const chapters = MOCK_CHAPTERS.filter((c) => c.workId === work.id);
              return (
                <div key={work.id} className={styles.workGroup}>
                  <div className={styles.workGroupHeader}>
                    <h4>{work.title}</h4>
                    <span className={`badge badge--${work.status}`}>{work.status}</span>
                  </div>
                  <div className={styles.chaptersList}>
                    {chapters.map((ch) => (
                      <div key={ch.id} className={styles.chapterRow}>
                        <div className={styles.chapterLeft}>
                          <span className={styles.chapterNum}>
                            {ch.partNumber > 0 ? `${ch.partNumber}.${ch.chapterNumber}` : 'Epilog'}
                          </span>
                          <div>
                            <p className={styles.chapterTitle}>{ch.title}</p>
                            <div className={styles.chapterLevels}>
                              {(['A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                                <span
                                  key={lvl}
                                  className={`badge badge--${lvl.toLowerCase()} ${!ch.versions.includes(lvl) ? styles.missingLevel : ''}`}
                                >
                                  {lvl}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className={styles.chapterRight}>
                          <span className={`badge badge--${ch.status}`}>
                            {STATUS_LABELS[ch.status]}
                          </span>
                          <button className="btn-ghost" style={{ fontSize: 12 }}>Tahrirlash</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Annotations Tab */}
        {activeTab === 'annotations' && (
          <div className={styles.tabContent}>
            <div className={styles.annotationsList}>
              {MOCK_ANNOTATIONS.map((ann) => (
                <div key={ann.id} className={styles.annotationRow}>
                  <div className={styles.annQuote}>&ldquo;{ann.quote}&rdquo;</div>
                  <div className={styles.annMeta}>
                    <span className={`badge badge--b1`}>{ann.type.replace('_', ' ')}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      Darajalar: {ann.levels.join(', ')}
                    </span>
                    {ann.thesaurusRef && (
                      <span style={{ fontSize: 12, color: 'var(--color-accent)' }}>
                        → {ann.thesaurusRef}
                      </span>
                    )}
                  </div>
                  <p className={styles.annNote}>{ann.shortNote.uz}</p>
                  <button className="btn-ghost" style={{ fontSize: 12, alignSelf: 'flex-start' }}>Tahrirlash</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Thesaurus Tab */}
        {activeTab === 'thesaurus' && (
          <div className={styles.tabContent}>
            <div className={styles.thesaurusProgress}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Jami progress</span>
                <span style={{ fontSize: 14, color: 'var(--color-primary-light)' }}>
                  {MOCK_THESAURUS.length}/150 birlik
                </span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar__fill" style={{ width: `${(MOCK_THESAURUS.length / 150) * 100}%` }} />
              </div>
            </div>
            <div className={styles.thesaurusList}>
              {MOCK_THESAURUS.map((entry) => (
                <div key={entry.id} className={styles.thesaurusRow}>
                  <div className={styles.thesaurusLeft}>
                    <p className={styles.thesaurusTerm}>{entry.term}</p>
                    <p className={styles.thesaurusUz}>{entry.uzbek}</p>
                    <p className={styles.thesaurusDef}>{entry.definitionSimple}</p>
                  </div>
                  <div className={styles.thesaurusRight}>
                    <span className={`badge badge--${(entry.cefr || 'B1').toLowerCase()}`}>{entry.cefr || 'B1'}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{entry.category}</span>
                    <button className="btn-ghost" style={{ fontSize: 12 }}>Tahrirlash</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className={styles.tabContent}>
            <div className={styles.quizList}>
              {MOCK_QUIZ_QUESTIONS.map((q, i) => (
                <div key={q.id} className={styles.quizRow}>
                  <div className={styles.quizNum}>{i + 1}</div>
                  <div className={styles.quizContent}>
                    <p className={styles.quizQuestion}>{q.question}</p>
                    <div className={styles.quizMeta}>
                      <span className={`badge badge--${q.level.toLowerCase()}`}>{q.level}</span>
                      <span className="badge badge--info">{q.type.replace('_', ' ')}</span>
                      <span className="badge badge--draft">{q.skill}</span>
                    </div>
                  </div>
                  <button className="btn-ghost" style={{ fontSize: 12 }}>Tahrirlash</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
