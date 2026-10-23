// ============================================================
// AnnotationSheet — Bottom sheet for literary & cultural notes
// ============================================================

import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Annotation, InterfaceLang } from '../../types';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow } from '../../constants/tokens';
import { SparklesIcon, BrainIcon } from '../common/Icons';

interface AnnotationSheetProps {
  annotation: Annotation | null;
  onClose: () => void;
  onOpenThesaurus: (thesaurusId: string) => void;
  onAskGadfly: (annotation: Annotation) => void;
  currentLang?: InterfaceLang;
}

export const AnnotationSheet: React.FC<AnnotationSheetProps> = ({
  annotation,
  onClose,
  onOpenThesaurus,
  onAskGadfly,
  currentLang = 'uz',
}) => {
  const [tab, setTab] = useState<'short' | 'deep'>('short');

  if (!annotation) return null;

  const noteText =
    tab === 'short'
      ? annotation.shortNote[currentLang] || annotation.shortNote.uz
      : annotation.longNote[currentLang] || annotation.longNote.uz;

  return (
    <Modal visible={!!annotation} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={[styles.sheet, Shadow.lg]} activeOpacity={1}>
          {/* Grab handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <View
              style={[
                styles.categoryChip,
                { backgroundColor: `${annotation.color}20`, borderColor: annotation.color },
              ]}
            >
              <Text style={[styles.categoryText, { color: annotation.color }]}>
                {annotation.categoryLabel}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Quote */}
          <View style={[styles.quoteBox, { borderLeftColor: annotation.color }]}>
            <Text style={styles.quoteText}>"{annotation.targetQuote}"</Text>
          </View>

          {/* Tabs */}
          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tabBtn, tab === 'short' && styles.tabBtnActive]}
              onPress={() => setTab('short')}
            >
              <Text style={[styles.tabText, tab === 'short' && styles.tabTextActive]}>
                Qisqa izoh
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, tab === 'deep' && styles.tabBtnActive]}
              onPress={() => setTab('deep')}
            >
              <Text style={[styles.tabText, tab === 'deep' && styles.tabTextActive]}>
                Chuqur tahlil (Dissertatsiya)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Note content */}
          <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
            <Text style={styles.noteContent}>{noteText}</Text>
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.footer}>
            {annotation.thesaurusRef && (
              <TouchableOpacity
                style={styles.thesaurusBtn}
                onPress={() => onOpenThesaurus(annotation.thesaurusRef!)}
                activeOpacity={0.8}
              >
                <BrainIcon size={18} color="#6C63FF" />
                <Text style={styles.thesaurusBtnText}>Tezaurusda o‘qish</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.aiBtn}
              onPress={() => onAskGadfly(annotation)}
              activeOpacity={0.8}
            >
              <SparklesIcon size={18} color="#FFF" />
              <Text style={styles.aiBtnText}>Gadflydan so‘rash</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(5, 6, 18, 0.7)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#16172E',
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 12,
    maxHeight: '80%',
  },
  handle: {
    width: 44,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: BorderRadius.full,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },
  closeText: {
    fontSize: FontSize.lg,
    color: Colors.textMuted,
    fontWeight: FontWeight.bold,
  },
  quoteBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderLeftWidth: 3,
    padding: 12,
    borderRadius: BorderRadius.sm,
    marginBottom: 16,
  },
  quoteText: {
    fontSize: FontSize.md,
    fontStyle: 'italic',
    color: '#FFF',
    lineHeight: 22,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 14,
  },
  tabBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
  },
  tabBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#6C63FF',
  },
  tabText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontWeight: FontWeight.medium,
  },
  tabTextActive: {
    color: '#FFF',
    fontWeight: FontWeight.bold,
  },
  scrollArea: {
    maxHeight: 180,
    marginBottom: 20,
  },
  noteContent: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  thesaurusBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 46,
    backgroundColor: 'rgba(108, 99, 255, 0.12)',
    borderWidth: 1,
    borderColor: '#6C63FF',
    borderRadius: BorderRadius.full,
  },
  thesaurusBtnText: {
    color: '#8B85FF',
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  aiBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 46,
    backgroundColor: '#6C63FF',
    borderRadius: BorderRadius.full,
  },
  aiBtnText: {
    color: '#FFF',
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
});
