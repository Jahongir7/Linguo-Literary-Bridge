// ============================================================
// PracticeScreen — Interactive Quizzes & Mini-Games Hub
// ============================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow } from '../constants/tokens';
import { MOCK_QUIZ_QUESTIONS } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/common/Button';
import {
  ChevronLeftIcon,
  TrophyIcon,
  ZapIcon,
  FlameIcon,
  CheckIcon,
  ChevronRightIcon,
  SparklesIcon,
} from '../components/common/Icons';

interface PracticeScreenProps {
  onBack: () => void;
  onOpenFigureGame: () => void;
}

export const PracticeScreen: React.FC<PracticeScreenProps> = ({
  onBack,
  onOpenFigureGame,
}) => {
  const { xp, streak, addXP } = useAppStore();

  const [activeTab, setActiveTab] = useState<'hub' | 'quiz'>('hub');
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQ = MOCK_QUIZ_QUESTIONS[quizIdx];

  const handleSelectAnswer = (idx: number) => {
    if (isQuizSubmitted) return;
    setSelectedAns(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAns === null) return;
    setIsQuizSubmitted(true);
    if (selectedAns === currentQ.correctAnswer) {
      setQuizScore(quizScore + 1);
      addXP(15);
    }
  };

  const handleNextQuiz = () => {
    if (quizIdx + 1 < MOCK_QUIZ_QUESTIONS.length) {
      setQuizIdx(quizIdx + 1);
      setSelectedAns(null);
      setIsQuizSubmitted(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIdx(0);
    setSelectedAns(null);
    setIsQuizSubmitted(false);
    setQuizScore(0);
    setIsQuizFinished(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => (activeTab === 'quiz' ? setActiveTab('hub') : onBack())}
        >
          <ChevronLeftIcon size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {activeTab === 'quiz' ? '1-bob Testi' : 'Mashqlar & O‘yinlar'}
        </Text>
        <View style={styles.scoreBadge}>
          <FlameIcon size={16} color="#FF5757" />
          <Text style={styles.scoreBadgeText}>{streak} kun</Text>
        </View>
      </View>

      {activeTab === 'hub' ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Stats Bar */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <ZapIcon size={20} color="#FFB547" />
              <Text style={styles.statNum}>{xp}</Text>
              <Text style={styles.statLabel}>Umumiy XP</Text>
            </View>
            <View style={styles.statBox}>
              <FlameIcon size={20} color="#FF5757" />
              <Text style={styles.statNum}>{streak}</Text>
              <Text style={styles.statLabel}>Kunlik Streak</Text>
            </View>
            <View style={styles.statBox}>
              <TrophyIcon size={20} color="#00E5A0" />
              <Text style={styles.statNum}>88%</Text>
              <Text style={styles.statLabel}>Aniqlik</Text>
            </View>
          </View>

          {/* Featured Mini-Game: Figurani top */}
          <TouchableOpacity
            style={[styles.featuredGameCard, Shadow.primary]}
            onPress={onOpenFigureGame}
            activeOpacity={0.85}
          >
            <View style={styles.gameCardTop}>
              <View style={styles.gameBadge}>
                <SparklesIcon size={14} color="#FFF" />
                <Text style={styles.gameBadgeText}>MINI-O‘YIN</Text>
              </View>
              <Text style={styles.gameXPBonus}>+100 XP gacha</Text>
            </View>

            <Text style={styles.gameTitle}>Figurani top!</Text>
            <Text style={styles.gameDesc}>
              "The Gadfly" romanidagi jumlalardan qaysi poetik vosita (metafora, taqqoslash, personifikatsiya)
              qo‘llanganini toping!
            </Text>

            <View style={styles.gameFooter}>
              <Text style={styles.gameActionText}>O‘yinni boshlash</Text>
              <ChevronRightIcon size={18} color="#00D4FF" />
            </View>
          </TouchableOpacity>

          {/* Section: Chapter Quizzes */}
          <Text style={styles.sectionHeading}>Boblar bo‘yicha interaktiv testlar</Text>

          <TouchableOpacity
            style={[styles.quizListItem, Shadow.sm]}
            onPress={() => {
              handleRestartQuiz();
              setActiveTab('quiz');
            }}
            activeOpacity={0.8}
          >
            <View style={styles.quizIconWrap}>
              <TrophyIcon size={22} color="#6C63FF" />
            </View>
            <View style={styles.quizInfo}>
              <Text style={styles.quizTitle}>The Gadfly • 1-bob testi</Text>
              <Text style={styles.quizSub}>4 ta savol • Metafora, leksik takror, psixologik detal</Text>
            </View>
            <ChevronRightIcon size={18} color="rgba(255,255,255,0.3)" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.quizListItem, { opacity: 0.5 }]} disabled>
            <View style={styles.quizIconWrap}>
              <TrophyIcon size={22} color="#A0A3BD" />
            </View>
            <View style={styles.quizInfo}>
              <Text style={styles.quizTitle}>The Gadfly • 2-bob testi</Text>
              <Text style={styles.quizSub}>Alp tog‘lari sayohati • 1-bob yakunlangach ochiladi</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      ) : isQuizFinished ? (
        /* Quiz Finished Screen */
        <View style={styles.quizFinishBox}>
          <TrophyIcon size={64} color="#FFB547" />
          <Text style={styles.quizFinishTitle}>Test yakunlandi!</Text>
          <Text style={styles.quizFinishScore}>
            {MOCK_QUIZ_QUESTIONS.length} tadan {quizScore} ta to‘g‘ri javob
          </Text>
          <Button
            title="Qayta topshirish"
            onPress={handleRestartQuiz}
            variant="secondary"
            size="lg"
            style={{ width: '100%', marginBottom: 12 }}
          />
          <Button
            title="Mashqlar markaziga qaytish"
            onPress={() => setActiveTab('hub')}
            variant="primary"
            size="lg"
            style={{ width: '100%' }}
          />
        </View>
      ) : (
        /* Interactive Quiz Screen */
        <ScrollView style={styles.quizScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((quizIdx + 1) / MOCK_QUIZ_QUESTIONS.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressCounter}>
            Savol {quizIdx + 1} / {MOCK_QUIZ_QUESTIONS.length}
          </Text>

          {/* Question Card */}
          <View style={[styles.qBox, Shadow.md]}>
            <Text style={styles.qText}>{currentQ.question}</Text>
          </View>

          {/* Options */}
          <View style={styles.optList}>
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedAns === i;
              const isCorrect = i === currentQ.correctAnswer;

              let itemStyle = styles.optBase;
              if (isQuizSubmitted) {
                if (isCorrect) itemStyle = styles.optCorrect;
                else if (isSelected) itemStyle = styles.optWrong;
              } else if (isSelected) {
                itemStyle = styles.optSelected;
              }

              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.optBtn, itemStyle]}
                  onPress={() => handleSelectAnswer(i)}
                  disabled={isQuizSubmitted}
                  activeOpacity={0.8}
                >
                  <Text style={styles.optText}>{opt}</Text>
                  {isQuizSubmitted && isCorrect && <CheckIcon size={18} color="#00E5A0" />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Explanation if submitted */}
          {isQuizSubmitted && (
            <View style={styles.explanationBox}>
              <Text style={styles.explanationHeading}>Izoh:</Text>
              <Text style={styles.explanationBody}>{currentQ.explanation}</Text>
            </View>
          )}

          {/* Action button */}
          <View style={{ marginTop: 20 }}>
            {!isQuizSubmitted ? (
              <Button
                title="Javobni tekshirish"
                onPress={handleSubmitAnswer}
                disabled={selectedAns === null}
                size="lg"
              />
            ) : (
              <Button
                title={quizIdx + 1 === MOCK_QUIZ_QUESTIONS.length ? 'Natijalarni ko‘rish' : 'Keyingi savol →'}
                onPress={handleNextQuiz}
                size="lg"
              />
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBase,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 87, 87, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
  },
  scoreBadgeText: {
    fontSize: FontSize.xs,
    color: '#FF5757',
    fontWeight: FontWeight.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#16172E',
    borderRadius: BorderRadius.xl,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statNum: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: '#FFF',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  featuredGameCard: {
    backgroundColor: '#1E2044',
    borderRadius: BorderRadius.xxl,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 212, 255, 0.4)',
    marginBottom: 24,
  },
  gameCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  gameBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#6C63FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  gameBadgeText: {
    fontSize: 9,
    fontWeight: FontWeight.bold,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  gameXPBonus: {
    fontSize: FontSize.xs,
    color: '#00D4FF',
    fontWeight: FontWeight.bold,
  },
  gameTitle: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.extrabold,
    color: '#FFF',
    marginBottom: 6,
  },
  gameDesc: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  gameFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gameActionText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: '#00D4FF',
  },
  sectionHeading: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: '#FFF',
    marginBottom: 12,
  },
  quizListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16172E',
    borderRadius: BorderRadius.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 12,
    marginBottom: 10,
  },
  quizIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(108, 99, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  quizSub: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  quizScroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6C63FF',
  },
  progressCounter: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: 14,
  },
  qBox: {
    backgroundColor: '#16172E',
    borderRadius: BorderRadius.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
  },
  qText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: '#FFF',
    lineHeight: 24,
  },
  optList: {
    gap: 10,
    marginBottom: 16,
  },
  optBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
  },
  optBase: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  optSelected: {
    backgroundColor: 'rgba(108, 99, 255, 0.15)',
    borderColor: '#6C63FF',
  },
  optCorrect: {
    backgroundColor: 'rgba(0, 229, 160, 0.15)',
    borderColor: '#00E5A0',
  },
  optWrong: {
    backgroundColor: 'rgba(255, 87, 87, 0.15)',
    borderColor: '#FF5757',
  },
  optText: {
    fontSize: FontSize.sm,
    color: '#FFF',
    lineHeight: 20,
    flex: 1,
  },
  explanationBox: {
    backgroundColor: 'rgba(0, 212, 255, 0.08)',
    borderLeftWidth: 3,
    borderLeftColor: '#00D4FF',
    padding: 12,
    borderRadius: BorderRadius.sm,
    marginBottom: 12,
  },
  explanationHeading: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: '#00D4FF',
    marginBottom: 4,
  },
  explanationBody: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  quizFinishBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  quizFinishTitle: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.extrabold,
    color: '#FFF',
    marginTop: 16,
    marginBottom: 8,
  },
  quizFinishScore: {
    fontSize: FontSize.md,
    color: '#00E5A0',
    fontWeight: FontWeight.bold,
    marginBottom: 32,
  },
});
