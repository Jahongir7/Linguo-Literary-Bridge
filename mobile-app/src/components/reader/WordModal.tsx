// ============================================================
// WordModal — Instant Vocabulary popup with IPA & Translations
// ============================================================

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { VocabWord } from '../../types';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow } from '../../constants/tokens';
import { CEFRBadge } from '../common/Badge';
import { BookmarkIcon, SparklesIcon, VolumeIcon } from '../common/Icons';

interface WordModalProps {
  word: VocabWord | null;
  onClose: () => void;
  onSave: (word: VocabWord) => void;
  onAskGadfly: (word: VocabWord) => void;
  isSaved?: boolean;
}

export const WordModal: React.FC<WordModalProps> = ({
  word,
  onClose,
  onSave,
  onAskGadfly,
  isSaved = false,
}) => {
  if (!word) return null;

  return (
    <Modal visible={!!word} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={[styles.dialog, Shadow.lg]} activeOpacity={1}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <View style={styles.wordRow}>
                <Text style={styles.wordText}>{word.word}</Text>
                <CEFRBadge level={word.cefr} size="sm" />
              </View>
              <View style={styles.ipaRow}>
                <Text style={styles.ipaText}>{word.ipa}</Text>
                <Text style={styles.posText}>• {word.pos}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.audioBtn} activeOpacity={0.7}>
              <VolumeIcon size={20} color="#00D4FF" />
            </TouchableOpacity>
          </View>

          {/* Translations */}
          <View style={styles.translationBox}>
            <View style={styles.transRow}>
              <Text style={styles.langLabel}>UZ</Text>
              <Text style={styles.transText}>{word.translation.uz}</Text>
            </View>
            <View style={styles.transRow}>
              <Text style={styles.langLabel}>RU</Text>
              <Text style={styles.transText}>{word.translation.ru}</Text>
            </View>
          </View>

          {/* Example */}
          <View style={styles.exampleBox}>
            <Text style={styles.exampleLabel}>Matndan misol:</Text>
            <Text style={styles.exampleText}>"{word.example}"</Text>
          </View>

          {/* Action buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.saveBtn, isSaved && styles.savedBtn]}
              onPress={() => onSave(word)}
              activeOpacity={0.8}
            >
              <BookmarkIcon size={18} color={isSaved ? '#00E5A0' : '#FFF'} />
              <Text style={[styles.saveBtnText, isSaved && { color: '#00E5A0' }]}>
                {isSaved ? 'Saqlangan' : 'Lug‘atga saqlash'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.aiBtn}
              onPress={() => onAskGadfly(word)}
              activeOpacity={0.8}
            >
              <SparklesIcon size={18} color="#00D4FF" />
              <Text style={styles.aiBtnText}>Gadfly AI</Text>
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
    backgroundColor: 'rgba(5, 6, 18, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  dialog: {
    width: '100%',
    backgroundColor: '#181934',
    borderRadius: BorderRadius.xxl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  wordText: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  ipaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  ipaText: {
    fontSize: FontSize.sm,
    color: '#00D4FF',
    fontFamily: 'monospace',
  },
  posText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  audioBtn: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(0, 212, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  translationBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: BorderRadius.md,
    padding: 12,
    gap: 8,
    marginBottom: 14,
  },
  transRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textMuted,
    width: 32,
  },
  transText: {
    fontSize: FontSize.md,
    color: '#FFF',
    fontWeight: FontWeight.medium,
    flex: 1,
  },
  exampleBox: {
    backgroundColor: 'rgba(108, 99, 255, 0.08)',
    borderLeftWidth: 3,
    borderLeftColor: '#6C63FF',
    padding: 10,
    borderRadius: BorderRadius.sm,
    marginBottom: 20,
  },
  exampleLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  exampleText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  saveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 44,
    backgroundColor: '#6C63FF',
    borderRadius: BorderRadius.full,
  },
  savedBtn: {
    backgroundColor: 'rgba(0, 229, 160, 0.15)',
    borderWidth: 1,
    borderColor: '#00E5A0',
  },
  saveBtnText: {
    color: '#FFF',
    fontWeight: FontWeight.bold,
    fontSize: FontSize.sm,
  },
  aiBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
    height: 44,
    backgroundColor: 'rgba(0, 212, 255, 0.12)',
    borderWidth: 1,
    borderColor: '#00D4FF',
    borderRadius: BorderRadius.full,
  },
  aiBtnText: {
    color: '#00D4FF',
    fontWeight: FontWeight.bold,
    fontSize: FontSize.sm,
  },
});
