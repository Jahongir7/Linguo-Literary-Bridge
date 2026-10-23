// ============================================================
// ReaderScreen — Multilevel Literary Reader
// With parallel mode, annotation layers, dictionary popup & AI
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
import {
  MOCK_PARAGRAPHS_BY_LEVEL,
  MOCK_ANNOTATIONS,
  MOCK_VOCABULARY,
} from '../data/mockData';
import { CEFRLevel, ReaderTheme, VocabWord, Annotation } from '../types';
import { useAppStore } from '../store/useAppStore';
import { WordModal } from '../components/reader/WordModal';
import { AnnotationSheet } from '../components/reader/AnnotationSheet';
import { AudioBar } from '../components/reader/AudioBar';
import {
  ChevronLeftIcon,
  SparklesIcon,
  VolumeIcon,
  LayersIcon,
} from '../components/common/Icons';

interface ReaderScreenProps {
  onBack: () => void;
  onOpenThesaurus: (thesaurusId?: string) => void;
  onOpenGadfly: (context?: { quote?: string; paragraphId?: string }) => void;
}

export const ReaderScreen: React.FC<ReaderScreenProps> = ({
  onBack,
  onOpenThesaurus,
  onOpenGadfly,
}) => {
  const {
    cefrLevel,
    setCefrLevel,
    fontSize,
    setFontSize,
    readerTheme,
    setReaderTheme,
    parallelMode,
    toggleParallelMode,
    saveWord,
    savedWords,
  } = useAppStore();

  const [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(null);
  const [activeWord, setActiveWord] = useState<VocabWord | null>(null);

  // Audio state
  const [showAudio, setShowAudio] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(1);

  // Settings drawer / bar
  const [showSettings, setShowSettings] = useState(false);

  // Paragraphs for current CEFR level
  const paragraphs = MOCK_PARAGRAPHS_BY_LEVEL[cefrLevel] || MOCK_PARAGRAPHS_BY_LEVEL.B1;

  // Theme colors
  const themeStyles = {
    dark: {
      bg: '#0A0B1A',
      cardBg: '#12132A',
      text: '#F0F2FF',
      textMuted: 'rgba(240,242,255,0.6)',
      originalBg: 'rgba(255,255,255,0.03)',
    },
    sepia: {
      bg: '#FBF0D9',
      cardBg: '#F3E5C8',
      text: '#433422',
      textMuted: '#705D47',
      originalBg: 'rgba(0,0,0,0.04)',
    },
    light: {
      bg: '#F8F9FA',
      cardBg: '#FFFFFF',
      text: '#1A1D20',
      textMuted: '#6C757D',
      originalBg: 'rgba(0,0,0,0.03)',
    },
  }[readerTheme];

  const handleWordTap = (rawWord: string) => {
    const cleanWord = rawWord.toLowerCase().replace(/[^a-z]/g, '');
    const found = MOCK_VOCABULARY.find((v) => v.word.toLowerCase() === cleanWord);
    if (found) {
      setActiveWord(found);
    } else {
      // Create quick vocabulary entry for clicked word
      setActiveWord({
        id: 'w-' + cleanWord,
        word: cleanWord,
        ipa: `/${cleanWord}/`,
        pos: 'word',
        cefr: cefrLevel,
        translation: {
          uz: `${cleanWord} (matn leksikasi)`,
          ru: `${cleanWord} (лексика текста)`,
        },
        example: `From The Gadfly, Chapter 1`,
      });
    }
  };

  const renderParagraphContent = (text: string, paragraphId: string) => {
    // Check if any annotation targets this paragraph or quote
    const matchingAnnotation = MOCK_ANNOTATIONS.find((ann) =>
      text.toLowerCase().includes(ann.targetQuote.toLowerCase())
    );

    if (!matchingAnnotation) {
      // Split words to enable tapping
      return (
        <Text style={[styles.bodyText, { fontSize, color: themeStyles.text }]}>
          {text.split(' ').map((word, i) => (
            <Text
              key={i}
              onPress={() => handleWordTap(word)}
              suppressHighlighting
            >
              {word}{' '}
            </Text>
          ))}
        </Text>
      );
    }

    // Split text around the annotated quote
    const quote = matchingAnnotation.targetQuote;
    const parts = text.split(new RegExp(`(${quote})`, 'gi'));

    return (
      <Text style={[styles.bodyText, { fontSize, color: themeStyles.text }]}>
        {parts.map((part, i) => {
          if (part.toLowerCase() === quote.toLowerCase()) {
            return (
              <Text
                key={i}
                style={[
                  styles.annotationHighlight,
                  {
                    backgroundColor: `${matchingAnnotation.color}25`,
                    borderBottomColor: matchingAnnotation.color,
                  },
                ]}
                onPress={() => setActiveAnnotation(matchingAnnotation)}
              >
                {part}
                <Text style={[styles.annBadgeDot, { color: matchingAnnotation.color }]}> ✦</Text>
              </Text>
            );
          }
          return (
            <Text key={i}>
              {part.split(' ').map((w, j) => (
                <Text
                  key={j}
                  onPress={() => handleWordTap(w)}
                  suppressHighlighting
                >
                  {w}{' '}
                </Text>
              ))}
            </Text>
          );
        })}
      </Text>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeStyles.bg }]}>
      {/* Top Reader Bar */}
      <View style={[styles.topBar, { borderBottomColor: 'rgba(255,255,255,0.08)' }]}>
        <TouchableOpacity style={styles.iconBtn} onPress={onBack}>
          <ChevronLeftIcon size={22} color={themeStyles.text} />
        </TouchableOpacity>

        <View style={styles.titleCol}>
          <Text style={[styles.headerTitle, { color: themeStyles.text }]}>The Gadfly • 1-bob</Text>
          <Text style={[styles.headerSubTitle, { color: themeStyles.textMuted }]}>
            {parallelMode ? 'Parallel Rejim (Asl + Mos)' : 'Kutubxona va bog‘ suhbati'}
          </Text>
        </View>

        <View style={styles.topActions}>
          <TouchableOpacity
            style={[styles.actionIconBtn, showAudio && styles.actionIconBtnActive]}
            onPress={() => setShowAudio(!showAudio)}
          >
            <VolumeIcon size={18} color={showAudio ? '#00D4FF' : themeStyles.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionIconBtn, parallelMode && styles.actionIconBtnActive]}
            onPress={toggleParallelMode}
          >
            <LayersIcon size={18} color={parallelMode ? '#6C63FF' : themeStyles.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionIconBtn}
            onPress={() => setShowSettings(!showSettings)}
          >
            <Text style={[styles.settingsIconText, { color: themeStyles.text }]}>Aa</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Level Switcher Ribbon (A2, B1, B2, C1) */}
      <View style={styles.levelRibbon}>
        <Text style={[styles.levelRibbonLabel, { color: themeStyles.textMuted }]}>CEFR Daraja:</Text>
        {(['A2', 'B1', 'B2', 'C1'] as CEFRLevel[]).map((lvl) => {
          const isActive = cefrLevel === lvl;
          return (
            <TouchableOpacity
              key={lvl}
              style={[
                styles.levelTab,
                isActive && styles.levelTabActive,
              ]}
              onPress={() => setCefrLevel(lvl)}
            >
              <Text
                style={[
                  styles.levelTabText,
                  isActive && styles.levelTabTextActive,
                ]}
              >
                {lvl}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Reader Settings Bar (expandable) */}
      {showSettings && (
        <View style={[styles.settingsPanel, { backgroundColor: themeStyles.cardBg }]}>
          {/* Font size */}
          <View style={styles.settingsRow}>
            <Text style={[styles.settingsLabel, { color: themeStyles.text }]}>Shrift o‘lchami:</Text>
            <View style={styles.fontSizeControls}>
              <TouchableOpacity
                style={styles.fontBtn}
                onPress={() => setFontSize(Math.max(13, fontSize - 1))}
              >
                <Text style={[styles.fontBtnText, { color: themeStyles.text }]}>A-</Text>
              </TouchableOpacity>
              <Text style={[styles.currentFontSize, { color: themeStyles.text }]}>{fontSize}px</Text>
              <TouchableOpacity
                style={styles.fontBtn}
                onPress={() => setFontSize(Math.min(24, fontSize + 1))}
              >
                <Text style={[styles.fontBtnText, { color: themeStyles.text }]}>A+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Theme selector */}
          <View style={styles.settingsRow}>
            <Text style={[styles.settingsLabel, { color: themeStyles.text }]}>Mavzu:</Text>
            <View style={styles.themeBtnsRow}>
              {(['dark', 'sepia', 'light'] as ReaderTheme[]).map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.themeBtn,
                    readerTheme === t && styles.themeBtnActive,
                    { backgroundColor: t === 'dark' ? '#0A0B1A' : t === 'sepia' ? '#FBF0D9' : '#FFFFFF' },
                  ]}
                  onPress={() => setReaderTheme(t)}
                >
                  <Text
                    style={[
                      styles.themeBtnText,
                      { color: t === 'dark' ? '#FFF' : '#000' },
                    ]}
                  >
                    {t.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Reading Scroll Area */}
      <ScrollView style={styles.readerScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.chapterHeader}>
          <Text style={[styles.chapterMainHeading, { color: themeStyles.text }]}>
            Part I • Chapter 1
          </Text>
          <Text style={[styles.chapterSubHeading, { color: themeStyles.textMuted }]}>
            Kutubxona va bog‘dagi suhbat (Piza seminariyasi)
          </Text>
          <View style={styles.divider} />
        </View>

        {paragraphs.map((p, index) => {
          const isSentenceHighlighted = showAudio && isPlayingAudio && index === activeSentenceIndex;

          return (
            <View
              key={p.id}
              style={[
                styles.paragraphContainer,
                isSentenceHighlighted && styles.audioSentenceActive,
              ]}
            >
              {/* If parallel mode is ON, show original 1897 text above or side */}
              {parallelMode && p.originalText && (
                <View style={[styles.originalTextBox, { backgroundColor: themeStyles.originalBg }]}>
                  <View style={styles.originalTag}>
                    <Text style={styles.originalTagText}>ASL MATN (VOYNICH, 1897)</Text>
                  </View>
                  <Text
                    style={[
                      styles.originalText,
                      { fontSize: fontSize - 1, color: themeStyles.textMuted },
                    ]}
                  >
                    {p.originalText}
                  </Text>
                </View>
              )}

              {/* CEFR Adapted paragraph text */}
              <View style={styles.adaptedTextBox}>
                {parallelMode && (
                  <View style={styles.adaptedTag}>
                    <Text style={styles.adaptedTagText}>CEFR {cefrLevel} VERSIYASI</Text>
                  </View>
                )}
                {renderParagraphContent(p.text, p.sourceParagraphId)}
              </View>

              {/* Ask Gadfly Context Button */}
              <TouchableOpacity
                style={styles.askSnippetBtn}
                onPress={() =>
                  onOpenGadfly({ quote: p.text.slice(0, 80) + '...', paragraphId: p.sourceParagraphId })
                }
              >
                <SparklesIcon size={13} color="#00D4FF" />
                <Text style={styles.askSnippetText}>Bu paragraf haqida Gadflydan so‘rash</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Floating Ask Gadfly Action Button */}
      <TouchableOpacity
        style={[styles.fabGadfly, Shadow.primary]}
        onPress={() => onOpenGadfly()}
        activeOpacity={0.85}
      >
        <SparklesIcon size={22} color="#FFF" />
        <Text style={styles.fabText}>Ask Gadfly</Text>
      </TouchableOpacity>

      {/* Audio Bar */}
      {showAudio && (
        <AudioBar
          isPlaying={isPlayingAudio}
          onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
          speed={audioSpeed}
          onChangeSpeed={setAudioSpeed}
          currentSentenceIndex={activeSentenceIndex}
          totalSentences={paragraphs.length}
          onClose={() => setShowAudio(false)}
        />
      )}

      {/* Word Popup Modal */}
      <WordModal
        word={activeWord}
        onClose={() => setActiveWord(null)}
        onSave={(word) => {
          saveWord(word);
          setActiveWord(null);
        }}
        onAskGadfly={(word) => {
          setActiveWord(null);
          onOpenGadfly({ quote: word.word });
        }}
        isSaved={savedWords.some((w) => w.id === activeWord?.id)}
      />

      {/* Annotation Bottom Sheet */}
      <AnnotationSheet
        annotation={activeAnnotation}
        onClose={() => setActiveAnnotation(null)}
        onOpenThesaurus={(thesaurusId) => {
          setActiveAnnotation(null);
          onOpenThesaurus(thesaurusId);
        }}
        onAskGadfly={(ann) => {
          setActiveAnnotation(null);
          onOpenGadfly({ quote: ann.targetQuote, paragraphId: ann.sourceParagraphId });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleCol: {
    flex: 1,
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  headerSubTitle: {
    fontSize: FontSize.xs,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionIconBtn: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconBtnActive: {
    backgroundColor: 'rgba(108, 99, 255, 0.25)',
    borderWidth: 1,
    borderColor: '#6C63FF',
  },
  settingsIconText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  levelRibbon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    gap: 8,
  },
  levelRibbonLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  levelTab: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  levelTabActive: {
    backgroundColor: '#6C63FF',
  },
  levelTabText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: FontWeight.bold,
  },
  levelTabTextActive: {
    color: '#FFF',
  },
  settingsPanel: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fontBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  fontBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  currentFontSize: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  themeBtnsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  themeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  themeBtnActive: {
    borderColor: '#6C63FF',
    borderWidth: 2,
  },
  themeBtnText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  readerScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chapterHeader: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  chapterMainHeading: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.extrabold,
    letterSpacing: 0.5,
  },
  chapterSubHeading: {
    fontSize: FontSize.sm,
    marginTop: 4,
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: '#6C63FF',
    marginTop: 16,
    borderRadius: 1,
  },
  paragraphContainer: {
    marginBottom: 24,
  },
  audioSentenceActive: {
    backgroundColor: 'rgba(0, 212, 255, 0.08)',
    borderRadius: BorderRadius.md,
    padding: 8,
  },
  originalTextBox: {
    borderLeftWidth: 2,
    borderLeftColor: '#CA6F1E',
    padding: 12,
    borderRadius: BorderRadius.sm,
    marginBottom: 10,
  },
  originalTag: {
    marginBottom: 4,
  },
  originalTagText: {
    fontSize: 9,
    fontWeight: FontWeight.bold,
    color: '#CA6F1E',
    letterSpacing: 0.5,
  },
  originalText: {
    lineHeight: 24,
    fontStyle: 'italic',
  },
  adaptedTextBox: {
    marginBottom: 6,
  },
  adaptedTag: {
    marginBottom: 4,
  },
  adaptedTagText: {
    fontSize: 9,
    fontWeight: FontWeight.bold,
    color: '#00D4FF',
    letterSpacing: 0.5,
  },
  bodyText: {
    lineHeight: 28,
  },
  annotationHighlight: {
    textDecorationLine: 'underline',
    fontWeight: FontWeight.bold,
    borderRadius: 3,
  },
  annBadgeDot: {
    fontSize: 10,
    fontWeight: FontWeight.bold,
  },
  askSnippetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingVertical: 2,
  },
  askSnippetText: {
    fontSize: FontSize.xs,
    color: '#00D4FF',
    fontWeight: FontWeight.medium,
  },
  fabGadfly: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  fabText: {
    color: '#FFF',
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
});
