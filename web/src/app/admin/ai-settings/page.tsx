'use client';
import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import styles from './ai-settings.module.css';

interface PromptVersion {
  id: string;
  name: string;
  version: string;
  updatedAt: string;
  isActive: boolean;
  content: string;
}

const INITIAL_PROMPTS: PromptVersion[] = [
  {
    id: 'p1',
    name: 'Ask Gadfly — Izohlovchi tutor',
    version: 'v1.2',
    updatedAt: '2026-10-10',
    isActive: true,
    content: `You are "Ask Gadfly", an AI literary tutor for the Linguo-Literary Bridge platform.

RULES:
1. Answer ONLY based on the provided corpus (chapter text, annotations, thesaurus).
2. Always cite the source (paragraph ID) in your answer.
3. Adapt your answer complexity to the user's CEFR level: {userLevel}.
4. Respond in the user's chosen language: {lang}.
5. Do NOT reveal events from chapters the user hasn't read yet.
6. Do NOT answer off-topic or harmful questions. Politely decline.
7. Do NOT include personal data in your response.

USER CEFR LEVEL: {userLevel}
CHAPTER CORPUS: {corpus}
USER QUESTION: {question}`,
  },
  {
    id: 'p2',
    name: 'Mashq generatori',
    version: 'v1.0',
    updatedAt: '2026-10-08',
    isActive: true,
    content: `Generate practice exercises for the given text passage.
LEVEL: {userLevel}
PASSAGE: {text}
Generate 3 exercises: vocabulary, comprehension, and literary analysis.`,
  },
  {
    id: 'p3',
    name: 'Esse baholovchi',
    version: 'v1.1',
    updatedAt: '2026-10-05',
    isActive: false,
    content: `Evaluate the student's essay based on the rubric.
RUBRIC: {rubric}
ESSAY: {essay}
Provide: score (0-100), strengths, areas for improvement, suggested corrections.`,
  },
];

export default function AISettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gemini-2.0-flash');
  const [dailyLimit, setDailyLimit] = useState(20);
  const [temperature, setTemperature] = useState(0.7);
  const [prompts, setPrompts] = useState<PromptVersion[]>(INITIAL_PROMPTS);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptVersion | null>(null);
  const [editContent, setEditContent] = useState('');
  const [testQuestion, setTestQuestion] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSelectPrompt = (p: PromptVersion) => {
    setSelectedPrompt(p);
    setEditContent(p.content);
  };

  const handleSavePrompt = () => {
    if (!selectedPrompt) return;
    setPrompts((prev) =>
      prev.map((p) =>
        p.id === selectedPrompt.id
          ? { ...p, content: editContent, version: bumpVersion(p.version), updatedAt: new Date().toISOString().split('T')[0] }
          : p
      )
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTestAI = async () => {
    if (!testQuestion.trim()) return;
    setIsTesting(true);
    setTestResponse('');
    // Simulate API call with mock response
    await new Promise((r) => setTimeout(r, 1500));
    setTestResponse(
      `[Mock Gemini Response]\n\nSavol: "${testQuestion}"\n\nJavob: Bu test javobi. Haqiqiy Gemini API integratsiyasi uchun .env.local faylida GEMINI_API_KEY ni kiriting.\n\nManba: gf-p1-c01-p002 (The Gadfly, I qism, 1-bob)`
    );
    setIsTesting(false);
  };

  return (
    <DashboardLayout
      title="AI Sozlamalari"
      subtitle="Gemini AI integratsiyasi va prompt versiyalari"
    >
      <div className={styles.grid}>
        {/* API Config Card */}
        <div className={`${styles.configCard} glass-card`}>
          <h3 className={styles.sectionTitle}>
            Gemini API Konfiguratsiyasi
          </h3>

          <div className={styles.field}>
            <label className={styles.label}>API Key</label>
            <div className={styles.apiKeyWrapper}>
              <input
                type="password"
                className="input"
                placeholder="AIza... (saqlash uchun .env.local faylga qo'ying)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <div className={styles.envHint}>
                <code>.env.local</code> faylida: <code>GEMINI_API_KEY=your_key</code>
              </div>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Model</label>
            <select
              className={`input ${styles.select}`}
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="gemini-2.0-flash">gemini-2.0-flash (Tez, tejamkor)</option>
              <option value="gemini-2.0-pro">gemini-2.0-pro (Kuchli, sekin)</option>
              <option value="gemini-1.5-flash">gemini-1.5-flash (Avvalgi versiya)</option>
            </select>
          </div>

          <div className={styles.sliderField}>
            <div className={styles.sliderHeader}>
              <label className={styles.label}>Temperature (Kreativlik)</label>
              <span className={styles.sliderValue}>{temperature}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderHints}>
              <span>0 — Aniq</span>
              <span>1 — Kreativ</span>
            </div>
          </div>

          <div className={styles.sliderField}>
            <div className={styles.sliderHeader}>
              <label className={styles.label}>Kunlik so'rov limiti (foydalanuvchi boshiga)</label>
              <span className={styles.sliderValue}>{dailyLimit}</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={dailyLimit}
              onChange={(e) => setDailyLimit(parseInt(e.target.value))}
              className={styles.slider}
            />
          </div>

          {/* Safety Badges */}
          <div className={styles.safetySection}>
            <p className={styles.safetyTitle}>Himoya choralari</p>
            <div className={styles.safetyBadges}>
              {['Shaxsiy ma\'lumot yo\'q', 'RAG faqat korpusda', 'Spoiler nazorati', 'Mavzudan tashqarini rad'].map((s) => (
                <span key={s} className={styles.safetyBadge}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Prompts List */}
        <div className={`${styles.promptsCard} glass-card`}>
          <h3 className={styles.sectionTitle}>
            Prompt Versiyalari
          </h3>
          <div className={styles.promptsList}>
            {prompts.map((p) => (
              <button
                key={p.id}
                className={`${styles.promptItem} ${selectedPrompt?.id === p.id ? styles.promptActive : ''}`}
                onClick={() => handleSelectPrompt(p)}
              >
                <div className={styles.promptInfo}>
                  <p className={styles.promptName}>{p.name}</p>
                  <p className={styles.promptMeta}>{p.version} · {p.updatedAt}</p>
                </div>
                <span className={`badge badge--${p.isActive ? 'success' : 'draft'}`}>
                  {p.isActive ? 'Faol' : 'Nofaol'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Editor */}
        {selectedPrompt && (
          <div className={`${styles.editorCard} glass-card`}>
            <div className={styles.editorHeader}>
              <h3 className={styles.sectionTitle}>
                {selectedPrompt.name} — {selectedPrompt.version}
              </h3>
              <button className="btn-primary" onClick={handleSavePrompt}>
                {saved ? 'Saqlandi' : 'Saqlash'}
              </button>
            </div>
            <textarea
              className={styles.promptEditor}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={14}
            />
            <div className={styles.templateVars}>
              <p>Template o'zgaruvchilar:</p>
              <div className={styles.vars}>
                {['{userLevel}', '{corpus}', '{question}', '{lang}', '{text}', '{rubric}', '{essay}'].map((v) => (
                  <code key={v} className={styles.varBadge}>{v}</code>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Test AI */}
        <div className={`${styles.testCard} glass-card`}>
          <h3 className={styles.sectionTitle}>
            AI ni Sinash
          </h3>
          <div className={styles.testForm}>
            <textarea
              className={`${styles.testInput} input`}
              placeholder="Savol kiriting (masalan: Nima uchun Montanellining ovozi erkalashga o'xshatilgan?)"
              value={testQuestion}
              onChange={(e) => setTestQuestion(e.target.value)}
              rows={3}
            />
            <button
              className="btn-primary"
              onClick={handleTestAI}
              disabled={isTesting || !testQuestion.trim()}
            >
              {isTesting ? (
                <><span className={styles.spinner} /> Yuborilmoqda...</>
              ) : (
                'Ask Gadfly ni Sinash'
              )}
            </button>
          </div>
          {testResponse && (
            <div className={styles.testResponse}>
              <p className={styles.testResponseLabel}>Javob:</p>
              <pre className={styles.testResponseContent}>{testResponse}</pre>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function bumpVersion(v: string): string {
  const parts = v.replace('v', '').split('.');
  return `v${parts[0]}.${parseInt(parts[1]) + 1}`;
}
