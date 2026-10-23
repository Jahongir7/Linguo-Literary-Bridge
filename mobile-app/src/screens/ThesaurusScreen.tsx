// ============================================================
// ThesaurusScreen — Cognitive Thesaurus with 3 definition levels
// and SRS Flashcard Mode
// ============================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow } from '../constants/tokens';
import { MOCK_THESAURUS } from '../data/mockData';
import { ThesaurusEntry } from '../types';
import { CEFRBadge, TagBadge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  SearchIcon,
  ChevronLeftIcon,
  BrainIcon,
  BookIcon,
  ChevronRightIcon,
  CheckIcon,
} from '../components/common/Icons';

interface ThesaurusScreenProps {
  onBack: () => void;
  onNavigateToReader: (quote: string) => void;
}

export const ThesaurusScreen: React.FC<ThesaurusScreenProps> = ({
  onBack,
  onNavigateToReader,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedEntry, setSelectedEntry] = useState<ThesaurusEntry | null>(null);
  const [defTab, setDefTab] = useState<'simple' | 'standard' | 'academic'>('standard');

  // Flashcards mode
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [showFlashcardBack, setShowFlashcardBack] = useState(false);

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'trope', label: 'Troplar' },
    { id: 'stylistic', label: 'Stilistik figuralar' },
    { id: 'detail', label: 'Badiiy detal' },
    { id: 'speech', label: 'Nutq shakllari' },
  ];

  const filteredEntries = MOCK_THESAURUS.filter((entry) => {
    const matchesCategory = activeCategory === 'all' || entry.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      entry.termEn.toLowerCase().includes(q) ||
      entry.termUz.toLowerCase().includes(q) ||
      entry.termRu.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const currentFlashcard = MOCK_THESAURUS[flashcardIdx];

  const handleNextFlashcard = () => {
    setShowFlashcardBack(false);
    setFlashcardIdx((flashcardIdx + 1) % MOCK_THESAURUS.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ChevronLeftIcon size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kognitiv Tezaurus</Text>
        <TouchableOpacity
          style={styles.flashcardToggle}
          onPress={() => setIsFlashcardMode(true)}
          activeOpacity={0.8}
        >
          <BrainIcon size={18} color="#00D4FF" />
          <Text style={styles.flashcardToggleText}>Kartochkalar</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <SearchIcon size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Atama qidirish (uz / en / ru)..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={{ color: Colors.textMuted }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catPill, isActive && styles.catPillActive]}
              onPress={() => setActiveCategory(cat.id)}
            >
              <Text style={[styles.catPillText, isActive && styles.catPillTextActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Entries List */}
      <ScrollView style={styles.listArea} showsVerticalScrollIndicator={false}>
        {filteredEntries.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.entryCard, Shadow.sm]}
            onPress={() => setSelectedEntry(item)}
            activeOpacity={0.8}
          >
            <View style={styles.entryHeader}>
              <View style={styles.entryTitleCol}>
                <Text style={styles.entryTitleEn}>{item.termEn}</Text>
                <Text style={styles.entryTitleUz}>{item.termUz}</Text>
              </View>
              <CEFRBadge level={item.cefrLevel} size="sm" />
            </View>

            <Text style={styles.entryDefPreview} numberOfLines={2}>
              {item.definitions.standard}
            </Text>

            {item.examples.length > 0 && (
              <View style={styles.entryExamplePreview}>
                <BookIcon size={12} color="#00D4FF" />
                <Text style={styles.entryQuotePreview} numberOfLines={1}>
                  "{item.examples[0].quote}"
                </Text>
              </View>
            )}

            <View style={styles.entryFooter}>
              <TagBadge label={item.categoryLabel} color="#6C63FF" />
              <ChevronRightIcon size={16} color="rgba(255,255,255,0.3)" />
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <Modal visible={!!selectedEntry} transparent animationType="slide" onRequestClose={() => setSelectedEntry(null)}>
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalSheet, Shadow.lg]}>
              <View style={styles.modalHandle} />

              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitleEn}>{selectedEntry.termEn}</Text>
                  <Text style={styles.modalTitleUz}>{selectedEntry.termUz} ({selectedEntry.termRu})</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedEntry(null)}>
                  <Text style={styles.closeModalText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* 3 Definition Levels Tabs */}
              <View style={styles.defTabsRow}>
                {(['simple', 'standard', 'academic'] as const).map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.defTabBtn, defTab === t && styles.defTabBtnActive]}
                    onPress={() => setDefTab(t)}
                  >
                    <Text style={[styles.defTabText, defTab === t && styles.defTabTextActive]}>
                      {t === 'simple' ? 'Oddiy' : t === 'standard' ? 'Standart' : 'Akademik'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                <Text style={styles.defContentText}>
                  {selectedEntry.definitions[defTab]}
                </Text>

                {/* Literary Examples from The Gadfly */}
                <Text style={styles.examplesHeading}>Matndan misollar (The Gadfly):</Text>
                {selectedEntry.examples.map((ex, i) => (
                  <View key={i} style={styles.exampleCard}>
                    <Text style={styles.exampleQuoteText}>"{ex.quote}"</Text>
                    <Text style={styles.exampleExplText}>{ex.explanationUz}</Text>
                    <TouchableOpacity
                      style={styles.openInReaderBtn}
                      onPress={() => {
                        setSelectedEntry(null);
                        onNavigateToReader(ex.quote);
                      }}
                    >
                      <BookIcon size={14} color="#00D4FF" />
                      <Text style={styles.openInReaderText}>Matnda ko‘rish ({ex.chapterRef})</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                {/* Related Terms */}
                {selectedEntry.relatedTerms.length > 0 && (
                  <View style={styles.relatedBox}>
                    <Text style={styles.relatedHeading}>Bog‘liq atamalar:</Text>
                    <View style={styles.relatedPills}>
                      {selectedEntry.relatedTerms.map((rt) => (
                        <View key={rt} style={styles.relatedPill}>
                          <Text style={styles.relatedPillText}>{rt}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}

      {/* SRS Flashcard Modal */}
      {isFlashcardMode && currentFlashcard && (
        <Modal visible={isFlashcardMode} transparent animationType="fade" onRequestClose={() => setIsFlashcardMode(false)}>
          <View style={styles.flashcardBackdrop}>
            <View style={styles.flashcardDialog}>
              <View style={styles.flashcardTop}>
                <Text style={styles.flashcardCounter}>
                  Kartochka {flashcardIdx + 1} / {MOCK_THESAURUS.length}
                </Text>
                <TouchableOpacity onPress={() => setIsFlashcardMode(false)}>
                  <Text style={styles.closeModalText}>✕</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.flashcardMain, Shadow.lg]}
                onPress={() => setShowFlashcardBack(!showFlashcardBack)}
                activeOpacity={0.9}
              >
                {!showFlashcardBack ? (
                  <View style={styles.flashcardFront}>
                    <TagBadge label={currentFlashcard.categoryLabel} color="#6C63FF" />
                    <Text style={styles.fcTermEn}>{currentFlashcard.termEn}</Text>
                    <Text style={styles.fcHintText}>Ta’rifni ko‘rish uchun bosing 👆</Text>
                  </View>
                ) : (
                  <View style={styles.flashcardBack}>
                    <Text style={styles.fcTermUz}>{currentFlashcard.termUz}</Text>
                    <Text style={styles.fcDef}>{currentFlashcard.definitions.standard}</Text>
                    <View style={styles.fcQuoteBox}>
                      <Text style={styles.fcQuote}>"{currentFlashcard.examples[0]?.quote}"</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>

              <View style={styles.fcActionRow}>
                <Button
                  title="Yana takrorlash"
                  onPress={handleNextFlashcard}
                  variant="secondary"
                  size="md"
                  style={{ flex: 1 }}
                />
                <Button
                  title="Eslab qoldim (+10 XP)"
                  onPress={handleNextFlashcard}
                  variant="primary"
                  size="md"
                  icon={<CheckIcon size={16} color="#FFF" />}
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          </View>
        </Modal>
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
  flashcardToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 212, 255, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  flashcardToggleText: {
    fontSize: FontSize.xs,
    color: '#00D4FF',
    fontWeight: FontWeight.bold,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 16,
    height: 46,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: FontSize.sm,
  },
  categoryScroll: {
    maxHeight: 44,
    marginBottom: 12,
  },
  categoryContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  catPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  catPillActive: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  catPillText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: FontWeight.semibold,
  },
  catPillTextActive: {
    color: '#FFF',
    fontWeight: FontWeight.bold,
  },
  listArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  entryCard: {
    backgroundColor: '#16172E',
    borderRadius: BorderRadius.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  entryTitleCol: {
    flex: 1,
  },
  entryTitleEn: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  entryTitleUz: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  entryDefPreview: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  entryExamplePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 212, 255, 0.06)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    marginBottom: 10,
  },
  entryQuotePreview: {
    fontSize: FontSize.xs,
    color: '#00D4FF',
    fontStyle: 'italic',
    flex: 1,
  },
  entryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(5, 6, 18, 0.75)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#181934',
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    maxHeight: '85%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalTitleEn: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  modalTitleUz: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  closeModalText: {
    fontSize: FontSize.lg,
    color: Colors.textMuted,
  },
  defTabsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.full,
    padding: 3,
    marginBottom: 16,
  },
  defTabBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: BorderRadius.full,
  },
  defTabBtnActive: {
    backgroundColor: '#6C63FF',
  },
  defTabText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: FontWeight.semibold,
  },
  defTabTextActive: {
    color: '#FFF',
    fontWeight: FontWeight.bold,
  },
  modalBody: {
    maxHeight: 380,
  },
  defContentText: {
    fontSize: FontSize.md,
    color: '#FFF',
    lineHeight: 24,
    marginBottom: 20,
  },
  examplesHeading: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: '#00D4FF',
    marginBottom: 10,
  },
  exampleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderLeftWidth: 3,
    borderLeftColor: '#00D4FF',
    padding: 12,
    borderRadius: BorderRadius.sm,
    marginBottom: 12,
  },
  exampleQuoteText: {
    fontSize: FontSize.sm,
    fontStyle: 'italic',
    color: '#FFF',
    lineHeight: 20,
    marginBottom: 6,
  },
  exampleExplText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  openInReaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  openInReaderText: {
    fontSize: FontSize.xs,
    color: '#00D4FF',
    fontWeight: FontWeight.bold,
  },
  relatedBox: {
    marginTop: 10,
  },
  relatedHeading: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  relatedPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  relatedPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  relatedPillText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  flashcardBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(5, 6, 18, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  flashcardDialog: {
    width: '100%',
    alignItems: 'center',
  },
  flashcardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  flashcardCounter: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  flashcardMain: {
    width: '100%',
    height: 260,
    backgroundColor: '#1E2044',
    borderRadius: BorderRadius.xxl,
    borderWidth: 1.5,
    borderColor: 'rgba(108, 99, 255, 0.4)',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  flashcardFront: {
    alignItems: 'center',
    gap: 16,
  },
  fcTermEn: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.extrabold,
    color: '#FFF',
    textAlign: 'center',
  },
  fcHintText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  flashcardBack: {
    alignItems: 'center',
  },
  fcTermUz: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: '#00D4FF',
    marginBottom: 8,
  },
  fcDef: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 14,
  },
  fcQuoteBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 10,
    borderRadius: BorderRadius.sm,
  },
  fcQuote: {
    fontSize: FontSize.xs,
    fontStyle: 'italic',
    color: '#FFF',
  },
  fcActionRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
});
