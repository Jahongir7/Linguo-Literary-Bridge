'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { useAuthStore, getRoleHomeRoute } from '@/store/authStore';

const DEMO_ACCOUNTS = [
  { label: 'Talaba (Student)', email: 'student1@linguo.uz', password: 'student123', color: '#1d4ed8' },
  { label: 'Administrator', email: 'admin@linguo.uz', password: 'admin123', color: '#0284c7' },
  { label: 'O‘qituvchi', email: 'teacher@linguo.uz', password: 'teacher123', color: '#0d9488' },
  { label: 'Muharrir', email: 'editor@linguo.uz', password: 'editor123', color: '#6366f1' },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace(getRoleHomeRoute(user.role));
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error ?? 'Xatolik yuz berdi');
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    setIsLoading(true);
    const result = await login(demoEmail, demoPassword);
    setIsLoading(false);
    if (!result.success) setError(result.error ?? 'Xatolik');
  };

  return (
    <div className={styles.container}>
      {/* Liquid Glass Ambient Orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Left Panel */}
      <div className={styles.leftPanel}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <span className={styles.brandName}>Linguo-Literary Bridge</span>
        </div>

        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Mumtoz Adabiyot,<br />
            <span className={styles.gradient}>AI Asosida</span> Ta’lim
          </h1>
          <p className={styles.heroSubtitle}>
            E.L. Voynich shoh asarlari negizida yaratilgan interaktiv CEFR ta’lim platformasi.
            Matnlar, izohlar, tezaurus va Google Gemini AI tutori yagona tizimda.
          </p>
        </div>

        <div className={styles.features}>
          {[
            { tag: 'A2–C1', text: '4 ta CEFR darajasiga moslashtirilgan o‘quv matnlari' },
            { tag: 'AI RAG', text: 'Gemini AI asosidagi "Ask Gadfly" adabiy AI-tutor' },
            { tag: 'LIVE', text: 'Talabalar progressi va leksik tahlillar monitoringi' },
            { tag: 'AUDIO', text: 'Sinxron matn ajratib ko‘rsatuvchi audio karaoke' },
          ].map((f) => (
            <div key={f.text} className={styles.featureItem}>
              <span className={styles.featureTag}>{f.tag}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className={styles.rightPanel}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Tizimga Kirish</h2>
            <p>Demo taqdimot uchun kerakli rolni tanlang yoki parolni kiriting</p>
          </div>

          {/* Demo Quick Login */}
          <div className={styles.demoSection}>
            <p className={styles.demoLabel}>1 bosishda tezkor kirish:</p>
            <div className={styles.demoButtons}>
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleDemoLogin(acc.email, acc.password)}
                  className={styles.demoBtn}
                  style={{ '--btn-color': acc.color } as React.CSSProperties}
                  disabled={isLoading}
                >
                  <span className={styles.demoDot} style={{ background: acc.color }} />
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.divider}>
            <span>yoki email orqali</span>
          </div>

          {error && <div className={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nomi@linguo.uz"
                className="input"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Parol</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`${styles.submitBtn} btn-primary`}
            >
              {isLoading ? 'Kirilmoqda...' : 'Tizimga kirish'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
