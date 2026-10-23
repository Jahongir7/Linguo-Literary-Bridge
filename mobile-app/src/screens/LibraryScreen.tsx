// ============================================================
// LibraryScreen — LinguaFlow inspired Literary Bookshelf
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
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow } from '../constants/tokens';
import { MOCK_WORKS, MOCK_CHAPTERS } from '../data/mockData';
import { CEFRBadge } from '../components/common/Badge';
import {
  BookIcon,
  FlameIcon,
  ZapIcon,
  BrainIcon,
  SparklesIcon,
  TrophyIcon,
  ChevronRightIcon,
  VolumeIcon,
} from '../components/common/Icons';
import { useAppStore } from '../store/useAppStore';

interface LibraryScreenProps {
  onSelectChapter: (chapterId: string) => void;
  onOpenThesaurus: () => void;
  onOpenPractice: () => void;
  onOpenGadfly: () => void;
  onOpenProfile: () => void;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  onSelectChapter,
  onOpenThesaurus,
  onOpenPractice,
  onOpenGadfly,
  onOpenProfile,
}) => {
  const { cefrLevel, xp, streak, name } = useAppStore();
  const [selectedWorkId, setSelectedWorkId] = useState('gf');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {/* Top User Bar (LinguaFlow inspired) */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.userProfileBtn} onPress={onOpenProfile} activeOpacity={0.8}>
            <LinearGradient colors={['#6C63FF', '#00D4FF']} style={styles.avatar}>
              <Text style={styles.avatarText}>{name.charAt(0)}</Text>
            </LinearGradient>
            <View>
              <Text style={styles.greetingText}>Xayrli kun,</Text>
              <Text style={styles.userNameText}>{name}!</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.statsBadges}>
            {/* Daily streak */}
            <View style={styles.statBadge}>
              <FlameIcon size={16} color="#FF5757" />
              <Text style={styles.statBadgeText}>{streak} kun</Text>
            </View>

            {/* XP */}
            <View style={[styles.statBadge, { borderColor: 'rgba(255, 181, 71, 0.3)' }]}>
              <ZapIcon size={16} color="#FFB547" />
              <Text style={[styles.statBadgeText, { color: '#FFB547' }]}>{xp} XP</Text>
            </View>

            {/* Level */}
            <CEFRBadge level={cefrLevel} size="sm" />
          </View>
        </View>

        {/* Hero Card: Continue Reading */}
        <TouchableOpacity
          style={[styles.continueCard, Shadow.primary]}
          onPress={() => onSelectChapter('gf-p1-c01')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#1D1E42', '#14152F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.continueCardGradient}
          >
            <View style={styles.continueTop}>
              <View style={styles.continueTag}>
                <BookIcon size={14} color="#00D4FF" />
                <Text style={styles.continueTagText}>O‘QISHNI DAVOM ETTIRISH</Text>
              </View>
              <View style={styles.audioTag}>
                <VolumeIcon size={14} color="#00E5A0" />
                <Text style={styles.audioTagText}>Audio sinxron</Text>
              </View>
            </View>

            <Text style={styles.continueTitle}>The Gadfly — 1-bob</Text>
            <Text style={styles.continueSubtitle}>Kutubxona va bog‘ suhbati (Piza seminariyasi)</Text>

            {/* Progress track */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '45%' }]} />
              </View>
              <View style={styles.progressLabels}>
                <Text style={styles.progressText}>45% yakunlandi</Text>
                <Text style={styles.progressTimeText}>~4 daqiqa qoldi</Text>
              </View>
            </View>

            <View style={styles.continueFooter}>
              <View style={styles.levelsRow}>
                <Text style={styles.levelsLabel}>Versiyalar:</Text>
                {(['A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                  <View
                    key={lvl}
                    style={[
                      styles.miniLevelPill,
                      cefrLevel === lvl && styles.miniLevelPillActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.miniLevelText,
                        cefrLevel === lvl && styles.miniLevelTextActive,
                      ]}
                    >
                      {lvl}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.readNowBtn}>
                <Text style={styles.readNowText}>O‘qish</Text>
                <ChevronRightIcon size={16} color="#00D4FF" />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Quick action grid (LinguaFlow inspired) */}
        <View style={styles.quickGrid}>
          <TouchableOpacity style={styles.quickCard} onPress={onOpenThesaurus} activeOpacity={0.8}>
            <View style={[styles.quickIconWrap, { backgroundColor: 'rgba(108, 99, 255, 0.15)' }]}>
              <BrainIcon size={22} color="#6C63FF" />
            </View>
            <Text style={styles.quickTitle}>Tezaurus</Text>
            <Text style={styles.quickSub}>15 birlik</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard} onPress={onOpenPractice} activeOpacity={0.8}>
            <View style={[styles.quickIconWrap, { backgroundColor: 'rgba(255, 181, 71, 0.15)' }]}>
              <TrophyIcon size={22} color="#FFB547" />
            </View>
            <Text style={styles.quickTitle}>Test & O‘yin</Text>
            <Text style={styles.quickSub}>Figurani top</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard} onPress={onOpenGadfly} activeOpacity={0.8}>
            <View style={[styles.quickIconWrap, { backgroundColor: 'rgba(0, 212, 255, 0.15)' }]}>
              <SparklesIcon size={22} color="#00D4FF" />
            </View>
            <Text style={styles.quickTitle}>Ask Gadfly</Text>
            <Text style={styles.quickSub}>AI Tutor</Text>
          </TouchableOpacity>
        </View>

        {/* Classic Works Shelf */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mumtoz asarlar to‘plami</Text>
        </View>

        <View style={styles.worksRow}>
          {MOCK_WORKS.map((work) => {
            const isSelected = selectedWorkId === work.id;
            return (
              <TouchableOpacity
                key={work.id}
                style={[styles.workCard, isSelected && styles.workCardActive]}
                onPress={() => setSelectedWorkId(work.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={work.coverGradient}
                  style={styles.workCoverGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.workStatusTag}>
                    <Text style={styles.workStatusText}>
                      {work.status === 'published' ? 'FAOL' : 'TEZ KUNDA'}
                    </Text>
                  </View>
                  <Text style={styles.workCoverTitle}>{work.title}</Text>
                  <Text style={styles.workCoverAuthor}>{work.author} ({work.year})</Text>
                </LinearGradient>
                <View style={styles.workInfo}>
                  <Text style={styles.workGenre}>{work.genre}</Text>
                  <Text style={styles.workDesc} numberOfLines={2}>
                    {work.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Chapters of The Gadfly */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>The Gadfly — Boblar ro‘yxati</Text>
          <Text style={styles.sectionSubCount}>4 ta bob tayyor</Text>
        </View>

        <View style={styles.chaptersList}>
          {MOCK_CHAPTERS.map((ch, idx) => (
            <TouchableOpacity
              key={ch.id}
              style={[styles.chapterItem, Shadow.sm]}
              onPress={() => onSelectChapter(ch.id)}
              activeOpacity={0.8}
            >
              <View style={styles.chapterNumBox}>
                <Text style={styles.chapterNumText}>{idx + 1}</Text>
              </View>

              <View style={styles.chapterContent}>
                <View style={styles.chapterTitleRow}>
                  <Text style={styles.chapterTitle}>{ch.title}</Text>
                  {ch.audioAvailable && <VolumeIcon size={14} color="#00D4FF" />}
                </View>
                <Text style={styles.chapterSubTitle}>{ch.subtitle}</Text>

                <View style={styles.chapterMeta}>
                  <View style={styles.chapterLevels}>
                    {ch.availableLevels.map((lvl) => (
                      <Text
                        key={lvl}
                        style={[
                          styles.chapterLvlTag,
                          cefrLevel === lvl && styles.chapterLvlTagHighlight,
                        ]}
                      >
                        {lvl}
                      </Text>
                    ))}
                  </View>
                  <Text style={styles.chapterDuration}>⏱ {ch.estimatedMinutes} daqiqa</Text>
                </View>
              </View>

              <ChevronRightIcon size={18} color="rgba(255, 255, 255, 0.4)" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBase,
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  userProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  greetingText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  userNameText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  statsBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 87, 87, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  statBadgeText: {
    fontSize: FontSize.xs,
    color: '#FFF',
    fontWeight: FontWeight.bold,
  },
  continueCard: {
    borderRadius: BorderRadius.xxl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.35)',
    marginBottom: 20,
  },
  continueCardGradient: {
    padding: 20,
  },
  continueTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  continueTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  continueTagText: {
    fontSize: 10,
    fontWeight: FontWeight.extrabold,
    color: '#00D4FF',
    letterSpacing: 0.8,
  },
  audioTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 229, 160, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  audioTagText: {
    fontSize: 10,
    color: '#00E5A0',
    fontWeight: FontWeight.semibold,
  },
  continueTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: '#FFF',
    marginBottom: 2,
  },
  continueSubtitle: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 14,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6C63FF',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  progressTimeText: {
    fontSize: FontSize.xs,
    color: '#00D4FF',
  },
  continueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 12,
  },
  levelsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  levelsLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginRight: 2,
  },
  miniLevelPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  miniLevelPillActive: {
    backgroundColor: '#6C63FF',
  },
  miniLevelText: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: FontWeight.bold,
  },
  miniLevelTextActive: {
    color: '#FFF',
  },
  readNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readNowText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: '#00D4FF',
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  quickCard: {
    flex: 1,
    backgroundColor: '#16172E',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: BorderRadius.xl,
    padding: 14,
    alignItems: 'center',
  },
  quickIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  quickSub: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  sectionSubCount: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  worksRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },
  workCard: {
    flex: 1,
    backgroundColor: '#16172E',
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  workCardActive: {
    borderColor: '#6C63FF',
  },
  workCoverGradient: {
    height: 120,
    padding: 12,
    justifyContent: 'space-between',
  },
  workStatusTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  workStatusText: {
    fontSize: 8,
    color: '#FFF',
    fontWeight: FontWeight.extrabold,
    letterSpacing: 0.5,
  },
  workCoverTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.extrabold,
    color: '#FFF',
  },
  workCoverAuthor: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    fontStyle: 'italic',
  },
  workInfo: {
    padding: 10,
  },
  workGenre: {
    fontSize: 10,
    color: '#00D4FF',
    fontWeight: FontWeight.semibold,
    marginBottom: 2,
  },
  workDesc: {
    fontSize: 10,
    color: Colors.textMuted,
    lineHeight: 14,
  },
  chaptersList: {
    gap: 10,
  },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16172E',
    borderRadius: BorderRadius.xl,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    gap: 12,
  },
  chapterNumBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    backgroundColor: 'rgba(108, 99, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterNumText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: '#8B85FF',
  },
  chapterContent: {
    flex: 1,
  },
  chapterTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chapterTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  chapterSubTitle: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  chapterMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  chapterLevels: {
    flexDirection: 'row',
    gap: 4,
  },
  chapterLvlTag: {
    fontSize: 9,
    color: Colors.textMuted,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  chapterLvlTagHighlight: {
    color: '#00D4FF',
    fontWeight: FontWeight.bold,
    backgroundColor: 'rgba(0, 212, 255, 0.12)',
  },
  chapterDuration: {
    fontSize: 10,
    color: Colors.textMuted,
  },
});
