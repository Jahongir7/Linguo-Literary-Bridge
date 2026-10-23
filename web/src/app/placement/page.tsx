'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StudentNavbar } from '@/components/layout/StudentNavbar';
import styles from './placement.module.css';
import { LITERARY_PLACEMENT_TEST } from '@/data/literaryData';
import { useBookStore } from '@/store/bookStore';
import type { CEFRLevel } from '@/types';

// Clean SVG Icons (zero emojis)
const Icons = {
  Award: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  BookOpen: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
};

export default function PlacementPage() {
  const router = useRouter();
  const { setActiveLevel, addXP } = useBookStore();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [recommendedLevel, setRecommendedLevel] = useState<CEFRLevel>('B1');

  const q = LITERARY_PLACEMENT_TEST[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optIdx });
  };

  const handleNext = () => {
    if (currentIdx < LITERARY_PLACEMENT_TEST.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate score and recommended level
      let correctCount = 0;
      LITERARY_PLACEMENT_TEST.forEach((item, idx) => {
        if (selectedAnswers[idx] === item.correct) {
          correctCount++;
        }
      });

      let level: CEFRLevel = 'B1';
      if (correctCount <= 2) level = 'A2';
      else if (correctCount <= 4) level = 'B1';
      else if (correctCount <= 6) level = 'B2';
      else level = 'C1';

      setRecommendedLevel(level);
      setIsCompleted(true);
      addXP(100);
    }
  };

  const handleConfirmLevel = (lvl: CEFRLevel) => {
    setActiveLevel(lvl);
    router.push('/library');
  };

  return (
    <div className={styles.pageWrapper}>
      <StudentNavbar />

      <main className={styles.mainContent}>
        {!isCompleted ? (
          <div className={styles.quizCard}>
            <div className={styles.quizHeader}>
              <span className={styles.quizBadge}>CEFR Placement Test</span>
              <span className={styles.quizCount}>
                Savol {currentIdx + 1} / {LITERARY_PLACEMENT_TEST.length}
              </span>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${((currentIdx + 1) / LITERARY_PLACEMENT_TEST.length) * 100}%` }}
              />
            </div>

            <h2 className={styles.questionText}>{q.question}</h2>

            <div className={styles.optionsList}>
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`${styles.optionBtn} ${selectedAnswers[currentIdx] === idx ? styles.optionSelected : ''}`}
                >
                  <span className={styles.optLetter}>{String.fromCharCode(65 + idx)}</span>
                  <span className={styles.optText}>{opt}</span>
                </button>
              ))}
            </div>

            <div className={styles.actionRow}>
              {currentIdx > 0 && (
                <button onClick={() => setCurrentIdx(currentIdx - 1)} className={styles.backBtn}>
                  ← Oldingi
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentIdx] === undefined}
                className={styles.nextBtn}
              >
                {currentIdx === LITERARY_PLACEMENT_TEST.length - 1 ? 'Yakunlash va natija' : 'Keyingi →'}
              </button>
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div className={styles.resultCard}>
            <div className={styles.trophyIcon}>
              <Icons.Award />
            </div>
            <h2 className={styles.resultTitle}>Test Muvaffaqiyatli Yakunlandi!</h2>
            <p className={styles.resultSub}>Sizning ingliz tili va adabiyot bo‘yicha aniqlangan darajangiz:</p>

            <div className={styles.levelCard}>
              <span className={styles.levelPillBadge}>Tavsiya etilgan daraja</span>
              <h1 className={styles.levelHeading}>{recommendedLevel}</h1>
              <p className={styles.levelDesc}>
                {recommendedLevel === 'A2' && 'Boshlang‘ich daraja: Sodda jumlalar, asosiy leksika va dialoglar.'}
                {recommendedLevel === 'B1' && 'O‘rta daraja: Ravon matn, murakkab grammatika va boy adabiy mazmun.'}
                {recommendedLevel === 'B2' && 'Yuqori o‘rta daraja: Mumtoz matnga yaqin, passiv qurilmalar va idiomalar.'}
                {recommendedLevel === 'C1' && 'Ilg‘or daraja: Asl matn nusxasi, to‘liq lingvopoetik va stilistik boylik.'}
              </p>
            </div>

            <div className={styles.changeLevelBox}>
              <p>Darajani xohlasangiz qo‘lda ham o‘zgartirishingiz mumkin:</p>
              <div className={styles.levelBtnsRow}>
                {(['A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setRecommendedLevel(lvl)}
                    className={`${styles.lvlSelect} ${recommendedLevel === lvl ? styles.lvlSelectActive : ''}`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => handleConfirmLevel(recommendedLevel)} className={styles.startReadingBtn}>
              <Icons.BookOpen /> {recommendedLevel} darajasida o‘qishni boshlash (+100 XP)
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
