'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { StudentNavbar } from '@/components/layout/StudentNavbar';
import styles from './practice.module.css';
import { LITERARY_QUIZ_QUESTIONS } from '@/data/literaryData';
import { useBookStore } from '@/store/bookStore';

// Clean SVG Icons (zero emojis)
const Icons = {
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
  Gamepad: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="15" y1="13" x2="15.01" y2="13" />
      <line x1="18" y1="11" x2="18.01" y2="11" />
      <rect x="2" y="6" width="20" height="12" rx="2" />
    </svg>
  ),
  BookOpen: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
};

export default function PracticePage() {
  const { activeLevel, addXP } = useBookStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const q = LITERARY_QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    if (opt === q.correctAnswer) {
      setScore((prev) => prev + 1);
      addXP(25);
    }
  };

  const handleNext = () => {
    if (currentIdx < LITERARY_QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
      addXP(50);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <StudentNavbar />

      <main className={styles.mainContent}>
        {!completed ? (
          <div className={styles.card}>
            <div className={styles.headerRow}>
              <div>
                <span className={styles.badge}>1-bob Testi · CEFR {activeLevel}</span>
                <h1 className={styles.title}>Matnni Tushunish va Poetik Tahlil</h1>
              </div>
              <span className={styles.counter}>
                Savol {currentIdx + 1} / {LITERARY_QUIZ_QUESTIONS.length}
              </span>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${((currentIdx + 1) / LITERARY_QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            <h2 className={styles.questionText}>{q.question}</h2>

            <div className={styles.optionsList}>
              {q.options?.map((opt, idx) => {
                let statusClass = '';
                if (isAnswered) {
                  if (opt === q.correctAnswer) statusClass = styles.optCorrect;
                  else if (opt === selectedOption) statusClass = styles.optWrong;
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className={`${styles.optionBtn} ${statusClass} ${
                      selectedOption === opt ? styles.optSelected : ''
                    }`}
                  >
                    <span className={styles.optLetter}>{String.fromCharCode(65 + idx)}</span>
                    <span className={styles.optText}>{opt}</span>
                    {isAnswered && opt === q.correctAnswer && (
                      <span className={styles.checkIcon}>
                        <Icons.Check />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div
                className={`${styles.feedbackCard} ${
                  selectedOption === q.correctAnswer ? styles.feedbackSuccess : styles.feedbackError
                }`}
              >
                <div className={styles.feedbackTitle}>
                  {selectedOption === q.correctAnswer ? (
                    <>
                      <Icons.Check /> To‘g‘ri javob! (+25 XP)
                    </>
                  ) : (
                    <>
                      <Icons.X /> Noto‘g‘ri javob
                    </>
                  )}
                </div>
                <p className={styles.explanationText}>
                  <strong>Izoh:</strong> {q.explanation}
                </p>
                <button onClick={handleNext} className={styles.nextBtn}>
                  {currentIdx === LITERARY_QUIZ_QUESTIONS.length - 1 ? 'Natijalarni ko‘rish' : 'Keyingi savol →'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Results Card */
          <div className={`${styles.card} ${styles.resultCard}`}>
            <div className={styles.trophyIcon}>
              <Icons.Award />
            </div>
            <h2>Bob Testi Yakunlandi!</h2>
            <p className={styles.scoreText}>
              Natijangiz: <strong>{score}</strong> / {LITERARY_QUIZ_QUESTIONS.length} to‘g‘ri (
              {Math.round((score / LITERARY_QUIZ_QUESTIONS.length) * 100)}%)
            </p>
            <p className={styles.xpGained}>Siz +{score * 25 + 50} XP tajriba balliga ega bo‘ldingiz!</p>

            <div className={styles.btnRow}>
              <button onClick={handleRestart} className={styles.retryBtn}>
                <Icons.RotateCcw /> Qayta topshirish
              </button>
              <Link href="/game" className={styles.gameBtn}>
                <Icons.Gamepad /> &ldquo;Figurani top&rdquo; o‘yiniga o‘tish
              </Link>
              <Link href="/reader/gf-p1-c01" className={styles.readerBtn}>
                <Icons.BookOpen /> Matnga qaytish
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
