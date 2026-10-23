// ============================================================
// AudioBar — Synchronized audio narration player
// ============================================================

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow } from '../../constants/tokens';
import { PlayIcon, PauseIcon, VolumeIcon } from '../common/Icons';

interface AudioBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: number;
  onChangeSpeed: (speed: number) => void;
  currentSentenceIndex: number;
  totalSentences: number;
  onClose: () => void;
}

export const AudioBar: React.FC<AudioBarProps> = ({
  isPlaying,
  onTogglePlay,
  speed,
  onChangeSpeed,
  currentSentenceIndex,
  totalSentences,
  onClose,
}) => {
  const speeds = [0.75, 1.0, 1.25];

  const handleNextSpeed = () => {
    const nextIdx = (speeds.indexOf(speed) + 1) % speeds.length;
    onChangeSpeed(speeds[nextIdx]);
  };

  const progressPercent = Math.min(100, Math.round(((currentSentenceIndex + 1) / totalSentences) * 100));

  return (
    <View style={[styles.container, Shadow.lg]}>
      {/* Progress track */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>

      <View style={styles.controlsRow}>
        <View style={styles.infoCol}>
          <View style={styles.titleRow}>
            <VolumeIcon size={16} color="#00D4FF" />
            <Text style={styles.titleText}>Inglizcha nutq (B1 Audio)</Text>
          </View>
          <Text style={styles.sentenceInfo}>
            Gap {currentSentenceIndex + 1} / {totalSentences} ({progressPercent}%)
          </Text>
        </View>

        <View style={styles.buttonsRow}>
          {/* Speed */}
          <TouchableOpacity style={styles.speedBtn} onPress={handleNextSpeed} activeOpacity={0.7}>
            <Text style={styles.speedText}>{speed}x</Text>
          </TouchableOpacity>

          {/* Play/Pause */}
          <TouchableOpacity style={styles.playBtn} onPress={onTogglePlay} activeOpacity={0.8}>
            {isPlaying ? <PauseIcon size={18} color="#FFF" /> : <PlayIcon size={18} color="#FFF" />}
          </TouchableOpacity>

          {/* Close */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E2044',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: BorderRadius.full,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00D4FF',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  titleText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  sentenceInfo: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  speedBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  speedText: {
    fontSize: FontSize.xs,
    color: '#00D4FF',
    fontWeight: FontWeight.bold,
  },
  playBtn: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    padding: 6,
  },
  closeText: {
    color: Colors.textMuted,
    fontSize: FontSize.md,
  },
});
