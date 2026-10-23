'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { StudentNavbar } from '@/components/layout/StudentNavbar';
import styles from './game.module.css';
import { LITERARY_FIGURE_GAME } from '@/data/literaryData';
import { useBookStore } from '@/store/bookStore';

// Professional SVG Icons (zero emojis)
const Icons = {
  Gamepad: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="15" y1="13" x2="15.01" y2="13" />
      <line x1="18" y1="11" x2="18.01" y2="11" />
      <rect x="2" y="6" width="20" height="12" rx="2" />
    </svg>
  ),
  Flame: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  Star: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Award: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  RotateCcw: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  ),
  HelpCircle: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  BookOpen: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
};

export default function FigureGamePage() {
  const { addXP } = useBookStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const q = LITERARY_FIGURE_GAME[currentIdx];

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    if (opt === q.correctDevice) {
      setScore((prev) => prev + 100 + streak * 20);
      setStreak((prev) => prev + 1);
      addXP(30);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx < LITERARY_FIGURE_GAME.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsGameOver(true);
      addXP(100);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <StudentNavbar />

      <main className={styles.mainContent}>
        {!isGameOver ? (
          <div className={styles.gameCard}>
            {/* Game Stats Header */}
            <div className={styles.statsHeader}>
              <div className={styles.statBadge}>
                <Icons.Gamepad />
                <span>O‘yin:</span>
                <strong>&ldquo;Figurani top&rdquo;</strong>
              </div>

              <div className={styles.streakBadge}>
                <Icons.Flame />
                <span>Streak:</span>
                <strong>{streak}x</strong>
              </div>

              <div className={styles.scoreBadge}>
                <Icons.Star />
                <span>Ball:</span>
                <strong>{score}</strong>
              </div>
            </div>

            {/* Quote Card */}
            <div className={styles.quoteCard}>
              <span className={styles.quoteTag}>Matndan iqtibos:</span>
              <h2 className={styles.quoteText}>{q.quote}</h2>
              <p className={styles.contextText}>Kontekst: {q.context}</p>
            </div>

            <p className={styles.promptText}>Ushbu jumlada qaysi badiiy yoki stilistik vosita qo‘llangan?</p>

            {/* 4 Options Grid */}
            <div className={styles.optionsGrid}>
              {q.options.map((opt) => {
                let btnClass = '';
                if (isAnswered) {
                  if (opt === q.correctDevice) btnClass = styles.optCorrect;
                  else if (opt === selectedOption) btnClass = styles.optWrong;
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    className={`${styles.optionBtn} ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback */}
            {isAnswered && (
              <div className={styles.feedbackRow}>
                <div className={styles.feedbackMsg}>
                  {selectedOption === q.correctDevice ? (
                    <span className={styles.feedbackSuccessText}>
                      <Icons.Check /> Ajoyib! To‘g‘ri javob (+{100 + (streak - 1) * 20} ball)
                    </span>
                  ) : (
                    <span className={styles.feedbackErrorText}>
                      <Icons.X /> Noto‘g‘ri. To‘g‘ri vosita: <strong>{q.correctDevice}</strong>
                    </span>
                  )}
                </div>

                <button onClick={handleNext} className={styles.nextBtn}>
                  {currentIdx === LITERARY_FIGURE_GAME.length - 1 ? 'O‘yinni yakunlash' : 'Keyingi bosqich →'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Game Over Screen */
          <div className={`${styles.gameCard} ${styles.gameOverCard}`}>
            <div className={styles.winnerIcon}>
              <Icons.Award />
            </div>
            <h2>O‘yin Yakunlandi!</h2>
            <p className={styles.finalScore}>Jami to‘plagan ballingiz:</p>
            <h1 className={styles.bigScore}>{score}</h1>
            <p className={styles.xpBonus}>Tabriklaymiz, siz +{score + 100} XP ga ega bo‘ldingiz!</p>

            <div className={styles.btnRow}>
              <button onClick={handleRestart} className={styles.restartBtn}>
                <Icons.RotateCcw /> Qayta o‘ynash
              </button>
              <Link href="/practice" className={styles.subBtn}>
                <Icons.HelpCircle /> Testlar
              </Link>
              <Link href="/reader/gf-p1-c01" className={styles.subBtn}>
                <Icons.BookOpen /> Reader
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
