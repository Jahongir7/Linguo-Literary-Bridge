// ============================================================
// PlacementScreen — Interactive CEFR evaluation & selector
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
import { MOCK_PLACEMENT_TEST } from '../data/mockData';
import { CEFRLevel } from '../types';
import { Button } from '../components/common/Button';
import { CEFRBadge } from '../components/common/Badge';
import { CheckIcon, ChevronLeftIcon, SparklesIcon } from '../components/common/Icons';

interface PlacementScreenProps {
  onComplete: (level: CEFRLevel) => void;
  onBack: () => void;
}

export const PlacementScreen: React.FC<PlacementScreenProps> = ({ onComplete, onBack }) => {
  const [mode, setMode] = useState<'test' | 'direct'>('test');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [testResult, setTestResult] = useState<CEFRLevel | null>(null);

  // Direct selection
  const [manualLevel, setManualLevel] = useState<CEFRLevel>('B1');

  const q = MOCK_PLACEMENT_TEST[currentIdx];

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentIdx + 1 < MOCK_PLACEMENT_TEST.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate level
      let correctCount = 0;
      newAnswers.forEach((ans, i) => {
        if (ans === MOCK_PLACEMENT_TEST[i].correct) {
          correctCount++;
        }
      });

      let recommendedLevel: CEFRLevel = 'A2';
      if (correctCount >= 7) recommendedLevel = 'C1';
      else if (correctCount >= 5) recommendedLevel = 'B2';
      else if (correctCount >= 3) recommendedLevel = 'B1';
      else recommendedLevel = 'A2';

      setTestResult(recommendedLevel);
    }
  };

  const renderResultScreen = () => (
    <View style={styles.resultContainer}>
      <View style={styles.resultIconWrap}>
        <SparklesIcon size={44} color="#00D4FF" />
      </View>
      <Text style={styles.resultSubtitle}>Tavsiya etilgan daraja:</Text>
      <View style={styles.levelBadgeLarge}>
        <Text style={styles.levelBadgeLargeText}>{testResult}</Text>
      </View>
      <Text style={styles.resultDesc}>
        Sizning natijalaringiz bo‘yicha E.L. Voynich asarlarini {testResult} darajasidagi moslashtirilgan matnda o‘qish tavsiya etiladi.
        O‘qish jarayonida darajani istalgan paytda almashtirishingiz mumkin!
      </Text>

      {/* Manual level change pills */}
      <Text style={styles.changeLabel}>Boshqa darajani tanlash:</Text>
      <View style={styles.levelPillsRow}>
        {(['A2', 'B1', 'B2', 'C1'] as CEFRLevel[]).map((lvl) => (
          <TouchableOpacity
            key={lvl}
            style={[styles.levelPill, testResult === lvl && styles.levelPillActive]}
            onPress={() => setTestResult(lvl)}
          >
            <Text style={[styles.levelPillText, testResult === lvl && styles.levelPillTextActive]}>
              {lvl}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title="Kutubxonani ochish"
        onPress={() => onComplete(testResult || 'B1')}
        variant="primary"
        size="lg"
        style={{ marginTop: 24, width: '100%' }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ChevronLeftIcon size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Darajani aniqlash</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Mode Switcher */}
      {!testResult && (
        <View style={styles.modeTabs}>
          <TouchableOpacity
            style={[styles.modeTab, mode === 'test' && styles.modeTabActive]}
            onPress={() => setMode('test')}
          >
            <Text style={[styles.modeTabText, mode === 'test' && styles.modeTabTextActive]}>
              Mini-test (8 savol)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeTab, mode === 'direct' && styles.modeTabActive]}
            onPress={() => setMode('direct')}
          >
            <Text style={[styles.modeTabText, mode === 'direct' && styles.modeTabTextActive]}>
              Qo‘lda tanlash
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {testResult ? (
        renderResultScreen()
      ) : mode === 'test' ? (
        <View style={styles.testBody}>
          {/* Progress bar */}
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentIdx + 1) / MOCK_PLACEMENT_TEST.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressCounter}>
            Savol {currentIdx + 1} / {MOCK_PLACEMENT_TEST.length}
          </Text>

          {/* Question card */}
          <View style={[styles.questionCard, Shadow.md]}>
            <Text style={styles.questionText}>{q.question}</Text>
          </View>

          {/* Options */}
          <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
            {q.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.optionItem, isSelected && styles.optionItemSelected]}
                  onPress={() => handleSelectOption(idx)}
                  activeOpacity={0.75}
                >
                  <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                    {isSelected && <View style={styles.radioDot} />}
                  </View>
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Footer Next button */}
          <View style={styles.footer}>
            <Button
              title={currentIdx + 1 === MOCK_PLACEMENT_TEST.length ? 'Natijani ko‘rish' : 'Keyingisi'}
              onPress={handleNext}
              disabled={selectedOption === null}
              size="lg"
            />
          </View>
        </View>
      ) : (
        /* Manual direct selection */
        <View style={styles.directBody}>
          <Text style={styles.directTitle}>O‘zingizga ma’qul CEFR darajasini tanlang:</Text>

          {(
            [
              {
                lvl: 'A2',
                name: 'Boshlang‘ich daraja',
                desc: '8-12 so‘zli sodda jumlalar, asosiy syujet va dialoglar.',
              },
              {
                lvl: 'B1',
                name: 'O‘rta-pastki daraja',
                desc: '12-16 so‘zli jumlalar, asosiy zamonlar va leksik izohlar.',
              },
              {
                lvl: 'B2',
                name: 'O‘rta-yuqori daraja',
                desc: 'Asl matnga yaqin, passiv qurilmalar, badiiy iboralar.',
              },
              {
                lvl: 'C1',
                name: 'Ilg‘or mumtoz daraja',
                desc: 'To‘liq klassik Voynich tili, chuqur poetik va falsafiy tahlil.',
              },
            ] as const
          ).map((item) => {
            const isChosen = manualLevel === item.lvl;
            return (
              <TouchableOpacity
                key={item.lvl}
                style={[styles.levelCard, isChosen && styles.levelCardActive, Shadow.sm]}
                onPress={() => setManualLevel(item.lvl as CEFRLevel)}
                activeOpacity={0.8}
              >
                <View style={styles.levelCardLeft}>
                  <CEFRBadge level={item.lvl as CEFRLevel} size="md" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.levelCardName}>{item.name}</Text>
                    <Text style={styles.levelCardDesc}>{item.desc}</Text>
                  </View>
                </View>
                {isChosen && <CheckIcon size={20} color="#00E5A0" />}
              </TouchableOpacity>
            );
          })}

          <Button
            title="Ushbu darajani tasdiqlash"
            onPress={() => onComplete(manualLevel)}
            size="lg"
            style={{ marginTop: 20 }}
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
  modeTabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.full,
    padding: 4,
    marginBottom: 16,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: BorderRadius.full,
  },
  modeTabActive: {
    backgroundColor: '#6C63FF',
  },
  modeTabText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: FontWeight.semibold,
  },
  modeTabTextActive: {
    color: '#FFF',
    fontWeight: FontWeight.bold,
  },
  testBody: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00D4FF',
  },
  progressCounter: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: 12,
  },
  questionCard: {
    backgroundColor: '#16172E',
    borderRadius: BorderRadius.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
  },
  questionText: {
    fontSize: FontSize.md,
    color: '#FFF',
    fontWeight: FontWeight.semibold,
    lineHeight: 24,
  },
  optionsList: {
    flex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: BorderRadius.lg,
    padding: 14,
    marginBottom: 10,
  },
  optionItemSelected: {
    backgroundColor: 'rgba(108, 99, 255, 0.15)',
    borderColor: '#6C63FF',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: '#6C63FF',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6C63FF',
  },
  optionText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  optionTextSelected: {
    color: '#FFF',
    fontWeight: FontWeight.semibold,
  },
  footer: {
    paddingTop: 10,
  },
  directBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  directTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: '#FFF',
    marginBottom: 16,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#16172E',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: BorderRadius.xl,
    padding: 16,
    marginBottom: 12,
  },
  levelCardActive: {
    borderColor: '#00E5A0',
    backgroundColor: 'rgba(0, 229, 160, 0.08)',
  },
  levelCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  levelCardName: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  levelCardDesc: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
    lineHeight: 16,
  },
  resultContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 212, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  levelBadgeLarge: {
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    borderWidth: 2,
    borderColor: '#6C63FF',
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    marginBottom: 16,
  },
  levelBadgeLargeText: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.extrabold,
    color: '#00D4FF',
  },
  resultDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  changeLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: 10,
  },
  levelPillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  levelPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  levelPillActive: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  levelPillText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontWeight: FontWeight.bold,
  },
  levelPillTextActive: {
    color: '#FFF',
  },
});
