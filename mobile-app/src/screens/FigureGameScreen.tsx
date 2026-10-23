// ============================================================
// FigureGameScreen — "Figurani top" (Find the Figure) Mini-game
// Interactive stylistic device guessing game with XP awards
// ============================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow } from '../constants/tokens';
import { MOCK_FIGURE_GAME } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';
import { Button } from '../components/common/Button';
import {
  ChevronLeftIcon,
  TrophyIcon,
  ZapIcon,
  CheckIcon,
  SparklesIcon,
} from '../components/common/Icons';

interface FigureGameScreenProps {
  onBack: () => void;
}

export const FigureGameScreen: React.FC<FigureGameScreenProps> = ({ onBack }) => {
  const { addXP } = useAppStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = MOCK_FIGURE_GAME[currentIdx];

  const handleChoose = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    if (opt === currentQ.correctDevice) {
      setScore(score + 1);
      setEarnedXP(earnedXP + 20);
      addXP(20);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < MOCK_FIGURE_GAME.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setEarnedXP(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.finishContainer}>
          <View style={styles.trophyCircle}>
            <TrophyIcon size={56} color="#FFB547" />
          </View>
          <Text style={styles.finishTitle}>Ajoyib natija!</Text>
          <Text style={styles.finishSub}>
            Siz {MOCK_FIGURE_GAME.length} ta savoldan {score} tasiga to‘g‘ri javob berdingiz!
          </Text>

          <View style={styles.xpCard}>
            <ZapIcon size={24} color="#FFB547" />
            <Text style={styles.xpText}>+{earnedXP} XP qo‘shildi</Text>
          </View>

          <View style={styles.finishActions}>
            <Button
              title="Qayta o‘ynash"
              onPress={handleRestart}
              variant="secondary"
              size="lg"
              style={{ width: '100%', marginBottom: 12 }}
            />
            <Button
              title="Chiqish"
              onPress={onBack}
              variant="primary"
              size="lg"
              style={{ width: '100%' }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ChevronLeftIcon size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Figurani top!</Text>
        <View style={styles.scoreBadge}>
          <ZapIcon size={14} color="#FFB547" />
          <Text style={styles.scoreBadgeText}>{earnedXP} XP</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentIdx + 1) / MOCK_FIGURE_GAME.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressCounter}>
          Bosqich {currentIdx + 1} / {MOCK_FIGURE_GAME.length}
        </Text>

        {/* Quote Card */}
        <View style={[styles.quoteCard, Shadow.md]}>
          <View style={styles.quoteCardTop}>
            <SparklesIcon size={16} color="#00D4FF" />
            <Text style={styles.quoteContext}>{currentQ.context}</Text>
          </View>
          <Text style={styles.quoteText}>{currentQ.quote}</Text>
        </View>

        <Text style={styles.promptText}>
          Matndagi qaysi poetik yoki stilistik vosita qo‘llangan?
        </Text>

        {/* Options */}
        <View style={styles.optionsGrid}>
          {currentQ.options.map((opt) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === currentQ.correctDevice;

            let optStyle = styles.optDefault;
            if (isAnswered) {
              if (isCorrect) optStyle = styles.optCorrect;
              else if (isSelected) optStyle = styles.optWrong;
            } else if (isSelected) {
              optStyle = styles.optSelected;
            }

            return (
              <TouchableOpacity
                key={opt}
                style={[styles.optBtn, optStyle, Shadow.sm]}
                onPress={() => handleChoose(opt)}
                disabled={isAnswered}
                activeOpacity={0.8}
              >
                <Text style={styles.optText}>{opt}</Text>
                {isAnswered && isCorrect && <CheckIcon size={18} color="#00E5A0" />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback message */}
        {isAnswered && (
          <View
            style={[
              styles.feedbackBox,
              selectedOption === currentQ.correctDevice
                ? styles.feedbackBoxCorrect
                : styles.feedbackBoxWrong,
            ]}
          >
            <Text style={styles.feedbackTitle}>
              {selectedOption === currentQ.correctDevice
                ? '✅ Barakalla! To‘g‘ri topdingiz (+20 XP)'
                : `❌ Noto‘g‘ri. To‘g‘ri javob: ${currentQ.correctDevice}`}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Next Button */}
      {isAnswered && (
        <View style={styles.footer}>
          <Button
            title={currentIdx + 1 === MOCK_FIGURE_GAME.length ? 'Natijalarni ko‘rish' : 'Keyingi figura →'}
            onPress={handleNext}
            size="lg"
          />
        </View>
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
    backgroundColor: 'rgba(255, 181, 71, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 181, 71, 0.3)',
  },
  scoreBadgeText: {
    fontSize: FontSize.xs,
    color: '#FFB547',
    fontWeight: FontWeight.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
    backgroundColor: '#00D4FF',
  },
  progressCounter: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: 16,
  },
  quoteCard: {
    backgroundColor: '#16172E',
    borderRadius: BorderRadius.xxl,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(108, 99, 255, 0.3)',
    marginBottom: 20,
  },
  quoteCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  quoteContext: {
    fontSize: FontSize.xs,
    color: '#00D4FF',
    fontWeight: FontWeight.semibold,
  },
  quoteText: {
    fontSize: FontSize.xl,
    fontStyle: 'italic',
    color: '#FFF',
    lineHeight: 28,
  },
  promptText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.semibold,
    marginBottom: 14,
  },
  optionsGrid: {
    gap: 10,
    marginBottom: 20,
  },
  optBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
  },
  optDefault: {
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
    fontSize: FontSize.md,
    color: '#FFF',
    fontWeight: FontWeight.semibold,
  },
  feedbackBox: {
    padding: 14,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: 20,
  },
  feedbackBoxCorrect: {
    backgroundColor: 'rgba(0, 229, 160, 0.1)',
    borderColor: '#00E5A0',
  },
  feedbackBoxWrong: {
    backgroundColor: 'rgba(255, 87, 87, 0.1)',
    borderColor: '#FF5757',
  },
  feedbackTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  finishContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 181, 71, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  finishTitle: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.extrabold,
    color: '#FFF',
    marginBottom: 8,
  },
  finishSub: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  xpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 181, 71, 0.12)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 181, 71, 0.4)',
    marginBottom: 32,
  },
  xpText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: '#FFB547',
  },
  finishActions: {
    width: '100%',
  },
});
