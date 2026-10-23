// ============================================================
// Linguo-Literary Bridge — Student Mobile Application (Expo / React Native)
// ============================================================

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow } from './src/constants/tokens';
import { useAppStore } from './src/store/useAppStore';

// Screens
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { PlacementScreen } from './src/screens/PlacementScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { ReaderScreen } from './src/screens/ReaderScreen';
import { ThesaurusScreen } from './src/screens/ThesaurusScreen';
import { PracticeScreen } from './src/screens/PracticeScreen';
import { FigureGameScreen } from './src/screens/FigureGameScreen';
import { AskGadflyScreen } from './src/screens/AskGadflyScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

// Icons
import {
  BookIcon,
  BrainIcon,
  TrophyIcon,
  SparklesIcon,
  UserIcon,
} from './src/components/common/Icons';

export default function App() {
  const {
    activeScreen,
    setActiveScreen,
    initFromStorage,
    setCefrLevel,
    gadflyContextPrompt,
    setGadflyContextPrompt,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'library' | 'thesaurus' | 'practice' | 'gadfly' | 'profile'>('library');

  useEffect(() => {
    initFromStorage();
  }, []);

  const handleStartPlacement = () => {
    setActiveScreen('placement');
  };

  const handleSkipToLibrary = () => {
    setActiveScreen('library');
    setActiveTab('library');
  };

  const handlePlacementComplete = (level: any) => {
    setCefrLevel(level);
    setActiveScreen('library');
    setActiveTab('library');
  };

  const handleSelectChapter = (chapterId: string) => {
    setActiveScreen('reader');
  };

  const handleOpenThesaurusFromReader = (thesaurusId?: string) => {
    setActiveTab('thesaurus');
    setActiveScreen('thesaurus');
  };

  const handleOpenGadflyFromReader = (context?: { quote?: string; paragraphId?: string }) => {
    setGadflyContextPrompt(context || null);
    setActiveTab('gadfly');
    setActiveScreen('gadfly_chat');
  };

  // Determine which screen component to render
  const renderScreen = () => {
    switch (activeScreen) {
      case 'onboarding':
        return (
          <OnboardingScreen
            onStartPlacement={handleStartPlacement}
            onSkipToLibrary={handleSkipToLibrary}
          />
        );

      case 'placement':
        return (
          <PlacementScreen
            onComplete={handlePlacementComplete}
            onBack={() => setActiveScreen('onboarding')}
          />
        );

      case 'reader':
        return (
          <ReaderScreen
            onBack={() => {
              setActiveScreen('library');
              setActiveTab('library');
            }}
            onOpenThesaurus={handleOpenThesaurusFromReader}
            onOpenGadfly={handleOpenGadflyFromReader}
          />
        );

      case 'figure_game':
        return (
          <FigureGameScreen
            onBack={() => {
              setActiveScreen('practice');
              setActiveTab('practice');
            }}
          />
        );

      default:
        // Tab-based screens
        switch (activeTab) {
          case 'thesaurus':
            return (
              <ThesaurusScreen
                onBack={() => {
                  setActiveTab('library');
                  setActiveScreen('library');
                }}
                onNavigateToReader={(quote) => {
                  setActiveScreen('reader');
                }}
              />
            );

          case 'practice':
            return (
              <PracticeScreen
                onBack={() => {
                  setActiveTab('library');
                  setActiveScreen('library');
                }}
                onOpenFigureGame={() => setActiveScreen('figure_game')}
              />
            );

          case 'gadfly':
            return (
              <AskGadflyScreen
                onBack={() => {
                  setActiveTab('library');
                  setActiveScreen('library');
                }}
                onOpenSettings={() => {
                  setActiveTab('profile');
                  setActiveScreen('profile');
                }}
                initialContext={gadflyContextPrompt}
              />
            );

          case 'profile':
            return (
              <ProfileScreen
                onBack={() => {
                  setActiveTab('library');
                  setActiveScreen('library');
                }}
              />
            );

          case 'library':
          default:
            return (
              <LibraryScreen
                onSelectChapter={handleSelectChapter}
                onOpenThesaurus={() => {
                  setActiveTab('thesaurus');
                  setActiveScreen('thesaurus');
                }}
                onOpenPractice={() => {
                  setActiveTab('practice');
                  setActiveScreen('practice');
                }}
                onOpenGadfly={() => {
                  setGadflyContextPrompt(null);
                  setActiveTab('gadfly');
                  setActiveScreen('gadfly_chat');
                }}
                onOpenProfile={() => {
                  setActiveTab('profile');
                  setActiveScreen('profile');
                }}
              />
            );
        }
    }
  };

  // Show bottom tab bar only on main screens
  const showBottomTabs =
    activeScreen !== 'onboarding' &&
    activeScreen !== 'placement' &&
    activeScreen !== 'reader' &&
    activeScreen !== 'figure_game';

  return (
    <View style={styles.appContainer}>
      <StatusBar style="light" />
      <View style={styles.screenWrapper}>{renderScreen()}</View>

      {/* Sleek Floating Bottom Navigation Bar (LinguaFlow aesthetic) */}
      {showBottomTabs && (
        <SafeAreaView style={styles.bottomNavContainer}>
          <View style={[styles.bottomTabBar, Shadow.lg]}>
            <TouchableOpacity
              style={styles.tabBtn}
              onPress={() => {
                setActiveTab('library');
                setActiveScreen('library');
              }}
              activeOpacity={0.7}
            >
              <BookIcon
                size={22}
                color={activeTab === 'library' ? '#6C63FF' : 'rgba(240,242,255,0.45)'}
              />
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === 'library' && styles.tabLabelActive,
                ]}
              >
                Kutubxona
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabBtn}
              onPress={() => {
                setActiveTab('thesaurus');
                setActiveScreen('thesaurus');
              }}
              activeOpacity={0.7}
            >
              <BrainIcon
                size={22}
                color={activeTab === 'thesaurus' ? '#6C63FF' : 'rgba(240,242,255,0.45)'}
              />
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === 'thesaurus' && styles.tabLabelActive,
                ]}
              >
                Tezaurus
              </Text>
            </TouchableOpacity>

            {/* Central Ask Gadfly AI Tab Button */}
            <TouchableOpacity
              style={styles.centerAiTabBtn}
              onPress={() => {
                setGadflyContextPrompt(null);
                setActiveTab('gadfly');
                setActiveScreen('gadfly_chat');
              }}
              activeOpacity={0.85}
            >
              <View style={[styles.centerAiCircle, Shadow.primary]}>
                <SparklesIcon size={22} color="#FFF" />
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === 'gadfly' && styles.tabLabelAiActive,
                ]}
              >
                AI Tutor
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabBtn}
              onPress={() => {
                setActiveTab('practice');
                setActiveScreen('practice');
              }}
              activeOpacity={0.7}
            >
              <TrophyIcon
                size={22}
                color={activeTab === 'practice' ? '#6C63FF' : 'rgba(240,242,255,0.45)'}
              />
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === 'practice' && styles.tabLabelActive,
                ]}
              >
                Mashqlar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tabBtn}
              onPress={() => {
                setActiveTab('profile');
                setActiveScreen('profile');
              }}
              activeOpacity={0.7}
            >
              <UserIcon
                size={22}
                color={activeTab === 'profile' ? '#6C63FF' : 'rgba(240,242,255,0.45)'}
              />
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === 'profile' && styles.tabLabelActive,
                ]}
              >
                Profil
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: Colors.bgBase,
  },
  screenWrapper: {
    flex: 1,
  },
  bottomNavContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 23, 46, 0.94)',
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 0 : 12,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tabBtn: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  centerAiTabBtn: {
    alignItems: 'center',
    marginTop: -20,
  },
  centerAiCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0A0B1A',
  },
  tabLabel: {
    fontSize: 10,
    color: 'rgba(240, 242, 255, 0.5)',
    fontWeight: FontWeight.medium,
    marginTop: 3,
  },
  tabLabelActive: {
    color: '#6C63FF',
    fontWeight: FontWeight.bold,
  },
  tabLabelAiActive: {
    color: '#00D4FF',
    fontWeight: FontWeight.bold,
  },
});
