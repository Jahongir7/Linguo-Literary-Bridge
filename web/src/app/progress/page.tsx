'use client';
import React from 'react';
import Link from 'next/link';
import { StudentNavbar } from '@/components/layout/StudentNavbar';
import styles from './progress.module.css';
import { useBookStore } from '@/store/bookStore';
import { useAuthStore } from '@/store/authStore';

// Professional SVG Icons (zero emojis)
const Icons = {
  Star: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Flame: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  BookOpen: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Bookmark: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Close: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

export default function ProgressPage() {
  const { user } = useAuthStore();
  const { activeLevel, xp, streak, readProgress, chapters, vocabulary, savedWordIds, toggleSavedWord } =
    useBookStore();

  const savedWords = vocabulary.filter((v) => savedWordIds.includes(v.id));

  return (
    <div className={styles.pageWrapper}>
      <StudentNavbar />

      <main className={styles.mainContent}>
        {/* User Card */}
        <div className={styles.userCard}>
          <div className={styles.avatar}>
            {user?.name ? user.name.charAt(0) : 'Z'}
          </div>
          <div className={styles.userMain}>
            <div className={styles.userTop}>
              <h1 className={styles.userName}>{user?.name || 'Zulfiya Rahimova'}</h1>
              <span className={styles.userLevelBadge}>
                CEFR {activeLevel} INTERMEDIATE
              </span>
            </div>
            <p className={styles.userEmail}>{user?.email || 'student1@linguo.uz'}</p>
          </div>

          <div className={styles.statCards}>
            <div className={styles.statBox}>
              <div className={styles.statIconBox}>
                <Icons.Star />
              </div>
              <div>
                <p className={styles.statVal}>{xp}</p>
                <p className={styles.statLbl}>Jami XP</p>
              </div>
            </div>

            <div className={styles.statBox}>
              <div className={styles.statIconBox}>
                <Icons.Flame />
              </div>
              <div>
                <p className={styles.statVal}>{streak} kun</p>
                <p className={styles.statLbl}>Streak</p>
              </div>
            </div>

            <div className={styles.statBox}>
              <div className={styles.statIconBox}>
                <Icons.BookOpen />
              </div>
              <div>
                <p className={styles.statVal}>{savedWords.length}</p>
                <p className={styles.statLbl}>Lug‘at</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters Reading Progress */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionHeaderLeft}>
              <Icons.BookOpen />
              <h3>Boblar Bo‘yicha O‘qish Progressi</h3>
            </div>
            <span className={styles.activeLvlBadge}>Faol daraja: {activeLevel}</span>
          </div>

          <div className={styles.chapterProgressList}>
            {chapters.map((ch) => {
              const p = readProgress[ch.id] || (ch.id === 'gf-p1-c01' ? 85 : 0);
              return (
                <div key={ch.id} className={styles.chapterProgressItem}>
                  <div className={styles.chMeta}>
                    <h4 className={styles.chTitle}>{ch.title}</h4>
                    <span className={styles.chPercent}>{p}% o‘qilgan</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${p}%` }} />
                  </div>
                  <Link href={`/reader/${ch.id}`} className={styles.continueBtn}>
                    {p > 0 ? 'Davom ettirish →' : 'Boshlash →'}
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Personal Saved Vocabulary */}
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionHeaderLeft}>
              <Icons.Bookmark />
              <h3>Shaxsiy Lug‘atim ({savedWords.length} ta so‘z)</h3>
            </div>
            <span style={{ fontSize: 13, color: '#64748b' }}>
              Readerda so‘z ustiga bosib saqlangan leksika
            </span>
          </div>

          {savedWords.length > 0 ? (
            <div className={styles.vocabGrid}>
              {savedWords.map((v) => (
                <div key={v.id} className={styles.vocabCard}>
                  <div className={styles.vocabTop}>
                    <div>
                      <h4 className={styles.vWord}>{v.word}</h4>
                      <span className={styles.vIpa}>{v.ipa}</span>
                    </div>
                    <span className={styles.wordBadge}>{v.cefr}</span>
                  </div>
                  <p className={styles.vUz}>{v.translation.uz}</p>
                  <p className={styles.vEx}>&ldquo;{v.example}&rdquo;</p>
                  <button
                    onClick={() => toggleSavedWord(v.id)}
                    className={styles.removeWordBtn}
                    title="Lug‘atdan o‘chirish"
                  >
                    <Icons.Close /> O‘chirish
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#64748b', fontSize: 14 }}>
              Hozircha saqlangan so‘zlar yo‘q. Readerda matn ichidagi so‘z ustiga bosib shaxsiy lug‘atingizga qo‘shing.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
