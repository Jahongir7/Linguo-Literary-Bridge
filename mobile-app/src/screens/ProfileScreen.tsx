// ============================================================
// ProfileScreen — Student Profile, Saved Vocab & Gemini API Key Settings
// ============================================================

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow } from '../constants/tokens';
import { useAppStore } from '../store/useAppStore';
import { StorageService } from '../services/storageService';
import { CEFRBadge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  ChevronLeftIcon,
  SparklesIcon,
  FlameIcon,
  ZapIcon,
  BookmarkIcon,
  CheckIcon,
} from '../components/common/Icons';

interface ProfileScreenProps {
  onBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  const {
    name,
    cefrLevel,
    setCefrLevel,
    xp,
    streak,
    savedWords,
    removeWord,
    interfaceLang,
  } = useAppStore();

  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isKeySaved, setIsKeySaved] = useState(false);

  useEffect(() => {
    StorageService.getGeminiApiKey().then((k) => {
      if (k && !k.includes('your_gemini_api_key')) {
        setApiKeyInput(k);
      }
    });
  }, []);

  const handleSaveApiKey = async () => {
    await StorageService.setGeminiApiKey(apiKeyInput.trim());
    setIsKeySaved(true);
    setTimeout(() => setIsKeySaved(false), 2500);
    Alert.alert('Muvaffaqiyatli', 'Gemini AI API kaliti saqlandi!');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ChevronLeftIcon size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Talaba profili & Sozlamalar</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={[styles.profileCard, Shadow.md]}>
          <LinearGradient colors={['#6C63FF', '#00D4FF']} style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>{name.charAt(0)}</Text>
          </LinearGradient>

          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>alisher@student.uz</Text>

          <View style={styles.badgeRow}>
            <CEFRBadge level={cefrLevel} size="md" />
            <View style={styles.streakBadge}>
              <FlameIcon size={16} color="#FF5757" />
              <Text style={styles.streakText}>{streak} kunlik streak</Text>
            </View>
            <View style={styles.xpBadge}>
              <ZapIcon size={16} color="#FFB547" />
              <Text style={styles.xpText}>{xp} XP</Text>
            </View>
          </View>
        </View>

        {/* Gemini API Key Settings Box (CRITICAL USER REQUIREMENT) */}
        <View style={[styles.settingsCard, Shadow.sm]}>
          <View style={styles.settingsHeader}>
            <View style={styles.sparkleWrap}>
              <SparklesIcon size={18} color="#00D4FF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingsTitle}>Google Gemini AI Sozlamasi</Text>
              <Text style={styles.settingsSub}>
                "Ask Gadfly" AI-tutori uchun o‘z API kalitingizni ulang
              </Text>
            </View>
          </View>

          <View style={styles.inputWrap}>
            <Text style={styles.inputLabel}>Gemini API Key (AI Studio):</Text>
            <View style={styles.keyInputRow}>
              <TextInput
                style={styles.keyTextInput}
                placeholder="AIzaSy..."
                placeholderTextColor={Colors.textMuted}
                value={apiKeyInput}
                onChangeText={setApiKeyInput}
                secureTextEntry={!showApiKey}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.showKeyBtn}
                onPress={() => setShowApiKey(!showApiKey)}
              >
                <Text style={styles.showKeyText}>{showApiKey ? 'Yashirish' : 'Ko‘rish'}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.helperText}>
              Kalit faqat sizning qurilmangizda xavfsiz holda saqlanadi. Agar kalit kiritilmasa,
              ichki offline adabiy tahlil bazasi ishlaydi.
            </Text>
          </View>

          <Button
            title={isKeySaved ? 'Saqlandi!' : 'API Kalitni saqlash'}
            onPress={handleSaveApiKey}
            variant="primary"
            size="md"
            icon={isKeySaved ? <CheckIcon size={16} color="#FFF" /> : undefined}
          />
        </View>

        {/* Level Switcher */}
        <View style={styles.settingsCard}>
          <Text style={styles.sectionHeading}>Asosiy CEFR darajangiz:</Text>
          <View style={styles.levelsGrid}>
            {(['A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
              <TouchableOpacity
                key={lvl}
                style={[styles.levelOption, cefrLevel === lvl && styles.levelOptionActive]}
                onPress={() => setCefrLevel(lvl)}
              >
                <Text
                  style={[
                    styles.levelOptionText,
                    cefrLevel === lvl && styles.levelOptionTextActive,
                  ]}
                >
                  {lvl}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Saved Vocabulary Section */}
        <View style={styles.vocabSection}>
          <View style={styles.vocabHeader}>
            <Text style={styles.sectionHeading}>
              Mening shaxsiy lug‘atim ({savedWords.length})
            </Text>
          </View>

          {savedWords.length === 0 ? (
            <View style={styles.emptyVocabBox}>
              <BookmarkIcon size={24} color={Colors.textMuted} />
              <Text style={styles.emptyVocabText}>
                O‘qish jarayonida so‘zlar ustiga bosib, shaxsiy lug‘atingizga saqlang!
              </Text>
            </View>
          ) : (
            <View style={styles.vocabList}>
              {savedWords.map((item) => (
                <View key={item.id} style={styles.vocabCard}>
                  <View style={styles.vocabLeft}>
                    <View style={styles.vocabWordRow}>
                      <Text style={styles.vocabWord}>{item.word}</Text>
                      <Text style={styles.vocabIpa}>{item.ipa}</Text>
                      <CEFRBadge level={item.cefr} size="sm" />
                    </View>
                    <Text style={styles.vocabTrans}>{item.translation.uz}</Text>
                    <Text style={styles.vocabEx}>"{item.example}"</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteWordBtn}
                    onPress={() => removeWord(item.id)}
                  >
                    <Text style={styles.deleteWordText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
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
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#16172E',
    borderRadius: BorderRadius.xxl,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 16,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarLargeText: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  profileName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  profileEmail: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
    marginBottom: 14,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 87, 87, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 87, 87, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  streakText: {
    fontSize: FontSize.xs,
    color: '#FF5757',
    fontWeight: FontWeight.bold,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 181, 71, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 181, 71, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  xpText: {
    fontSize: FontSize.xs,
    color: '#FFB547',
    fontWeight: FontWeight.bold,
  },
  settingsCard: {
    backgroundColor: '#16172E',
    borderRadius: BorderRadius.xl,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16,
  },
  settingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  sparkleWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 212, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  settingsSub: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  inputWrap: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 6,
    fontWeight: FontWeight.semibold,
  },
  keyInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 12,
  },
  keyTextInput: {
    flex: 1,
    height: 44,
    color: '#FFF',
    fontSize: FontSize.sm,
    fontFamily: 'monospace',
  },
  showKeyBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  showKeyText: {
    fontSize: FontSize.xs,
    color: '#00D4FF',
    fontWeight: FontWeight.bold,
  },
  helperText: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 6,
    lineHeight: 14,
  },
  sectionHeading: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: '#FFF',
    marginBottom: 12,
  },
  levelsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  levelOption: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  levelOptionActive: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  levelOptionText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textMuted,
  },
  levelOptionTextActive: {
    color: '#FFF',
  },
  vocabSection: {
    marginBottom: 20,
  },
  vocabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  emptyVocabBox: {
    padding: 24,
    backgroundColor: '#16172E',
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    gap: 8,
  },
  emptyVocabText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  vocabList: {
    gap: 10,
  },
  vocabCard: {
    flexDirection: 'row',
    backgroundColor: '#16172E',
    borderRadius: BorderRadius.xl,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'space-between',
  },
  vocabLeft: {
    flex: 1,
  },
  vocabWordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  vocabWord: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  vocabIpa: {
    fontSize: FontSize.xs,
    color: '#00D4FF',
    fontFamily: 'monospace',
  },
  vocabTrans: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  vocabEx: {
    fontSize: FontSize.xs,
    fontStyle: 'italic',
    color: Colors.textMuted,
  },
  deleteWordBtn: {
    padding: 6,
  },
  deleteWordText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
});
