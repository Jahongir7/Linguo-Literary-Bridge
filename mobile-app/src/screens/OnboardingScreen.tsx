// ============================================================
// OnboardingScreen — Bookow-inspired aesthetic entry
// ============================================================

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow } from '../constants/tokens';
import { Button } from '../components/common/Button';
import { SparklesIcon, BookIcon, BrainIcon } from '../components/common/Icons';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onStartPlacement: () => void;
  onSkipToLibrary: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onStartPlacement,
  onSkipToLibrary,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Fan of stylized literary book cards */}
        <View style={styles.heroSection}>
          {/* Background aura */}
          <View style={styles.glowAura} />

          {/* Book 1: Left Angled */}
          <View style={[styles.bookCard, styles.bookLeft, Shadow.lg]}>
            <LinearGradient
              colors={['#EC4899', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bookGradient}
            >
              <Text style={styles.bookBadge}>CORNWALL</Text>
              <Text style={styles.bookTitle}>Jack Raymond</Text>
              <Text style={styles.bookAuthor}>E.L. Voynich</Text>
            </LinearGradient>
          </View>

          {/* Book 3: Right Angled */}
          <View style={[styles.bookCard, styles.bookRight, Shadow.lg]}>
            <LinearGradient
              colors={['#00C9A7', '#007A65']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bookGradient}
            >
              <Text style={styles.bookBadge}>PISA • 1840</Text>
              <Text style={styles.bookTitle}>Young Italy</Text>
              <Text style={styles.bookAuthor}>Memoirs</Text>
            </LinearGradient>
          </View>

          {/* Book 2: Center (The Gadfly - Main) */}
          <View style={[styles.bookCard, styles.bookCenter, Shadow.primary]}>
            <LinearGradient
              colors={['#6C63FF', '#00D4FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bookGradient}
            >
              <View style={styles.bookTopRow}>
                <Text style={styles.bookBadge}>CEFR A2-C1</Text>
                <SparklesIcon size={16} color="#FFF" />
              </View>
              <View style={styles.bookCenterBody}>
                <Text style={styles.bookMainTitle}>THE GADFLY</Text>
                <Text style={styles.bookSubTitle}>Ovdosh</Text>
              </View>
              <Text style={styles.bookAuthor}>E.L. Voynich (1897)</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Feature badges row */}
        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <BookIcon size={16} color="#00D4FF" />
            <Text style={styles.featureText}>4 darajali mos matn</Text>
          </View>
          <View style={styles.featureItem}>
            <BrainIcon size={16} color="#8B85FF" />
            <Text style={styles.featureText}>Kognitiv tezaurus</Text>
          </View>
          <View style={styles.featureItem}>
            <SparklesIcon size={16} color="#00E5A0" />
            <Text style={styles.featureText}>Ask Gadfly AI</Text>
          </View>
        </View>

        {/* Text presentation */}
        <View style={styles.textSection}>
          <Text style={styles.title}>
            Mumtoz adabiyot <Text style={styles.highlightText}>aqlli tahlilda</Text>
          </Text>
          <Text style={styles.description}>
            E.L. Voynichning shoh asarlarini o‘z CEFR darajangizda (A2, B1, B2, C1) o‘qing,
            lingvopoetik izohlarni o‘rganing va Gadfly AI bilan suhbatlashing.
          </Text>
        </View>

        {/* Action buttons */}
        <View style={styles.buttonSection}>
          <Button
            title="Darajani aniqlash (Placement Test)"
            onPress={onStartPlacement}
            variant="primary"
            size="lg"
            icon={<SparklesIcon size={20} color="#FFF" />}
          />
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={onSkipToLibrary}
            activeOpacity={0.7}
          >
            <Text style={styles.skipBtnText}>To‘g‘ridan-to‘g‘ri kutubxonaga o‘tish →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBase,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 24,
    paddingTop: 16,
  },
  heroSection: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginTop: 20,
  },
  glowAura: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(108, 99, 255, 0.25)',
  },
  bookCard: {
    width: width * 0.44,
    height: 200,
    borderRadius: BorderRadius.xl,
    position: 'absolute',
    overflow: 'hidden',
  },
  bookLeft: {
    transform: [{ rotate: '-14deg' }, { translateX: -60 }, { translateY: -10 }],
    opacity: 0.85,
  },
  bookRight: {
    transform: [{ rotate: '14deg' }, { translateX: 60 }, { translateY: -10 }],
    opacity: 0.85,
  },
  bookCenter: {
    transform: [{ rotate: '0deg' }, { translateY: 10 }],
    zIndex: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  bookGradient: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  bookTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookBadge: {
    fontSize: 9,
    fontWeight: FontWeight.extrabold,
    color: '#FFF',
    letterSpacing: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bookCenterBody: {
    alignItems: 'center',
    marginVertical: 10,
  },
  bookMainTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.extrabold,
    color: '#FFF',
    letterSpacing: 1,
    textAlign: 'center',
  },
  bookSubTitle: {
    fontSize: FontSize.xs,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  bookTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: '#FFF',
    marginTop: 20,
  },
  bookAuthor: {
    fontSize: FontSize.xs,
    color: 'rgba(255, 255, 255, 0.8)',
    fontStyle: 'italic',
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  featureText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  textSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.extrabold,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 38,
  },
  highlightText: {
    color: '#00D4FF',
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  buttonSection: {
    gap: 12,
    alignItems: 'center',
  },
  skipBtn: {
    paddingVertical: 8,
  },
  skipBtnText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontWeight: FontWeight.semibold,
  },
});
