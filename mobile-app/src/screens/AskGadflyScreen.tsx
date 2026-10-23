// ============================================================
// AskGadflyScreen — "Ask Gadfly" Literary AI Tutor
// Grounded RAG with Gemini AI and citation cards
// ============================================================

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow } from '../constants/tokens';
import { AIMessage } from '../types';
import { GeminiService } from '../services/geminiService';
import { useAppStore } from '../store/useAppStore';
import {
  ChevronLeftIcon,
  SparklesIcon,
  SendIcon,
  BookIcon,
  SettingsIcon,
} from '../components/common/Icons';

interface AskGadflyScreenProps {
  onBack: () => void;
  onOpenSettings: () => void;
  initialContext?: { quote?: string; paragraphId?: string } | null;
}

export const AskGadflyScreen: React.FC<AskGadflyScreenProps> = ({
  onBack,
  onOpenSettings,
  initialContext,
}) => {
  const { cefrLevel, interfaceLang } = useAppStore();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'm1',
      sender: 'gadfly',
      text: `Salom! Men Gadfly — E.L. Voynichning "The Gadfly" asari bo‘yicha sizning shaxsiy AI adabiy va til tutoringizman.

Hozir sizning CEFR darajangiz: ${cefrLevel}.
Sizga asarning tili, metaforalar, stilistik vositalar yoki qahramonlar psixologiyasini tushunishda yordam bera olaman. Nima haqida so‘ramoqchisiz?`,
      timestamp: '10:00',
      suggestedFollowUps: [
        'Padre ovozi nima uchun "caress" deb atalgan?',
        'Artur nega foxglove gulini ezg‘ilaydi?',
        '"A tame panther without the claws" iborasini tahlil qil',
      ],
    },
  ]);

  // If seeded with reader context, send initial query automatically
  useEffect(() => {
    if (initialContext?.quote) {
      const seedPrompt = `Ushbu iqtibosni CEFR ${cefrLevel} darajamga moslab tahlil qilib ber: "${initialContext.quote}"`;
      handleSend(seedPrompt, initialContext);
    }
  }, [initialContext]);

  const handleSend = async (customPrompt?: string, ctxOverride?: { quote?: string; paragraphId?: string }) => {
    const textToSend = customPrompt || inputText.trim();
    if (!textToSend || isLoading) return;

    setInputText('');

    const userMsg: AIMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await GeminiService.askGadfly(textToSend, {
        cefrLevel,
        interfaceLang,
        selectedQuote: ctxOverride?.quote || initialContext?.quote,
        paragraphId: ctxOverride?.paragraphId || initialContext?.paragraphId,
        chapterTitle: 'The Gadfly, 1-bob',
      });

      setMessages((prev) => [...prev, response]);
    } catch {
      const fallbackMsg: AIMessage = {
        id: 'gadfly-' + Date.now(),
        sender: 'gadfly',
        text: 'Kechirasiz, javob olishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <ChevronLeftIcon size={22} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.headerTitleCol}>
            <View style={styles.nameRow}>
              <Text style={styles.headerTitle}>Ask Gadfly</Text>
              <View style={styles.onlineDot} />
            </View>
            <Text style={styles.headerSub}>Gemini AI • CEFR {cefrLevel} Moslashtirilgan</Text>
          </View>

          <TouchableOpacity style={styles.settingsBtn} onPress={onOpenSettings}>
            <SettingsIcon size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Selected snippet context banner if active */}
        {initialContext?.quote && (
          <View style={styles.contextBanner}>
            <BookIcon size={14} color="#00D4FF" />
            <Text style={styles.contextBannerText} numberOfLines={1}>
              Tanlangan kontekst: "{initialContext.quote}"
            </Text>
          </View>
        )}

        {/* Messages Scroll Area */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesScroll}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  isUser ? styles.messageRowUser : styles.messageRowGadfly,
                ]}
              >
                {!isUser && (
                  <View style={styles.gadflyAvatar}>
                    <SparklesIcon size={16} color="#FFF" />
                  </View>
                )}

                <View
                  style={[
                    styles.bubble,
                    isUser ? styles.bubbleUser : styles.bubbleGadfly,
                    Shadow.sm,
                  ]}
                >
                  <Text style={[styles.bubbleText, isUser && styles.bubbleTextUser]}>
                    {msg.text}
                  </Text>

                  {/* RAG Source Citation */}
                  {msg.sourceCitation && (
                    <View style={styles.citationBox}>
                      <View style={styles.citationTag}>
                        <Text style={styles.citationTagText}>
                          MANBA: [{msg.sourceCitation.paragraphId}]
                        </Text>
                      </View>
                      <Text style={styles.citationQuote}>"{msg.sourceCitation.quote}"</Text>
                    </View>
                  )}

                  <Text style={[styles.timeText, isUser && styles.timeTextUser]}>
                    {msg.timestamp}
                  </Text>
                </View>
              </View>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <View style={[styles.messageRow, styles.messageRowGadfly]}>
              <View style={styles.gadflyAvatar}>
                <SparklesIcon size={16} color="#FFF" />
              </View>
              <View style={[styles.bubble, styles.bubbleGadfly, styles.loadingBubble]}>
                <ActivityIndicator size="small" color="#00D4FF" />
                <Text style={styles.loadingText}>Gadfly javob tayyorlamoqda...</Text>
              </View>
            </View>
          )}

          {/* Suggested Prompts */}
          {messages.length > 0 &&
            messages[messages.length - 1].suggestedFollowUps &&
            !isLoading && (
              <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsLabel}>Taklif etilgan savollar:</Text>
                <View style={styles.suggestionsList}>
                  {messages[messages.length - 1].suggestedFollowUps!.map((prompt, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.suggestionPill}
                      onPress={() => handleSend(prompt)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.suggestionText}>{prompt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Gadflydan badiiy vosita yoki so‘z haqida so‘rang..."
            placeholderTextColor={Colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={() => handleSend()}
            disabled={!inputText.trim() || isLoading}
            activeOpacity={0.8}
          >
            <SendIcon size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBase,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleCol: {
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: '#FFF',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00E5A0',
  },
  headerSub: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  settingsBtn: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contextBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0, 212, 255, 0.08)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 212, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contextBannerText: {
    fontSize: FontSize.xs,
    color: '#00D4FF',
    fontStyle: 'italic',
    flex: 1,
  },
  messagesScroll: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 14,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  messageRowGadfly: {
    justifyContent: 'flex-start',
  },
  gadflyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  bubble: {
    maxWidth: '82%',
    padding: 14,
    borderRadius: BorderRadius.xl,
  },
  bubbleUser: {
    backgroundColor: '#6C63FF',
    borderBottomRightRadius: 4,
  },
  bubbleGadfly: {
    backgroundColor: '#181934',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  bubbleTextUser: {
    color: '#FFF',
  },
  citationBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderLeftWidth: 2,
    borderLeftColor: '#00D4FF',
    padding: 8,
    borderRadius: BorderRadius.sm,
    marginTop: 10,
  },
  citationTag: {
    marginBottom: 3,
  },
  citationTagText: {
    fontSize: 9,
    fontWeight: FontWeight.bold,
    color: '#00D4FF',
  },
  citationQuote: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  timeText: {
    fontSize: 10,
    color: Colors.textMuted,
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  timeTextUser: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  loadingText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  suggestionsContainer: {
    marginTop: 8,
  },
  suggestionsLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  suggestionPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
  },
  suggestionText: {
    fontSize: FontSize.xs,
    color: '#00D4FF',
    fontWeight: FontWeight.medium,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16172E',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.xl,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#FFF',
    fontSize: FontSize.sm,
    maxHeight: 100,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
