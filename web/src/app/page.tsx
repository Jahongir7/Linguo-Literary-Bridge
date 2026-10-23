'use client';
import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

// Professional clean SVGs (zero emojis)
const Icons = {
  Book: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  Sparkles: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Layers: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Brain: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" />
    </svg>
  ),
  Audio: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  Award: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
};

export default function LandingPage() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)', position: 'relative' }}>
      {/* Top Navbar */}
      <header
        style={{
          borderBottom: '1px solid rgba(226, 232, 240, 0.85)',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          padding: '14px 24px',
          boxShadow: '0 2px 12px rgba(37, 99, 235, 0.04)',
        }}
      >
        <div
          style={{
            maxWidth: 1300,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(37, 99, 235, 0.08)',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
              }}
            >
              <Icons.Book />
            </div>
            <div>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', display: 'block', lineHeight: 1.1 }}>
                Linguo
              </span>
              <span style={{ fontSize: 11, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Literary Bridge
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link
              href="/book-generator"
              style={{
                background: 'rgba(37, 99, 235, 0.08)',
                border: '1px solid rgba(37, 99, 235, 0.25)',
                color: 'var(--color-primary)',
                padding: '8px 16px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Icons.Sparkles />
              <span>AI Kitob Generator</span>
            </Link>

            <Link
              href="/library"
              style={{
                background: 'var(--color-primary)',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(29, 78, 216, 0.25)',
              }}
            >
              Kutubxona
            </Link>

            <Link
              href="/login"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(203, 213, 225, 0.8)',
                color: 'var(--text-secondary)',
                padding: '8px 16px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              }}
            >
              {isAuthenticated ? `${user?.name} (${user?.role})` : 'Kirish'}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px 88px', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(37, 99, 235, 0.08)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            color: 'var(--color-primary)',
            fontSize: 13,
            fontWeight: 700,
            padding: '6px 18px',
            borderRadius: 24,
            marginBottom: 24,
          }}
        >
          <Icons.Award />
          <span>Innovatsiya Agentligi Loyihasi · E.L. Voynich Asarlari Asosida</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: 20,
            color: 'var(--text-primary)',
          }}
        >
          Mumtoz Ingliz Adabiyoti,<br />
          <span
            style={{
              background: 'linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CEFR Darajalari va AI
          </span>{' '}
          Yordamida
        </h1>

        <p
          style={{
            fontSize: 17,
            color: 'var(--text-secondary)',
            maxWidth: 720,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}
        >
          E.L. Voynichning <em>"The Gadfly"</em> va <em>"Jack Raymond"</em> romanlarini A2, B1, B2, C1 darajalarida
          o‘qing. Badiiy izohlar, 150 birlikli kognitiv tezaurus, interaktiv testlar va "Ask Gadfly" AI-tutori bilan
          adabiy ingliz tilini chuqur o‘zlashtiring.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 64 }}>
          <Link
            href="/placement"
            style={{
              background: 'linear-gradient(135deg, #1d4ed8 0%, #0284c7 100%)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              padding: '16px 36px',
              borderRadius: 12,
              textDecoration: 'none',
              boxShadow: '0 6px 24px rgba(29, 78, 216, 0.28)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>CEFR Darajasini Aniqlash (Boshlash)</span>
            <Icons.ArrowRight />
          </Link>

          <Link
            href="/book-generator"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(191, 219, 254, 0.9)',
              color: 'var(--color-primary)',
              fontSize: 15,
              fontWeight: 700,
              padding: '16px 28px',
              borderRadius: 12,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(37, 99, 235, 0.08)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Icons.Sparkles />
            <span>Kitob Yuklash & AI Moslashtirish</span>
          </Link>
        </div>

        {/* Liquid Glass Feature Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, textAlign: 'left' }}>
          {[
            {
              icon: <Icons.Layers />,
              title: '4 CEFR Darajasi (A2–C1)',
              desc: 'Har bir bob A2, B1, B2, C1 va original versiyada. O‘qish paytida 1 bosishda darajani o‘zgartirish.',
            },
            {
              icon: <Icons.Brain />,
              title: '"Ask Gadfly" AI-Tutor',
              desc: 'Google Gemini AI negizida ishlovchi, manbalar keltiruvchi (RAG) adabiy va poetik savollar yordamchisi.',
            },
            {
              icon: <Icons.Book />,
              title: 'Kognitiv Tezaurus',
              desc: '150 ta stilistik vosita, metafora, o‘xshatish va badiiy detallarning 3 darajali ta’rifi va kartochkalari.',
            },
            {
              icon: <Icons.Audio />,
              title: 'Audio Narratsiya',
              desc: 'Gap bo‘yicha sinxron matnni ajratib ko‘rsatish va 0.75x–1.25x tezlik sozlamalari bilan qulay mutolaa.',
            },
          ].map((f) => (
            <div
              key={f.title}
              className="glass-card"
              style={{
                padding: 26,
                borderRadius: 16,
                background: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                boxShadow: '0 6px 24px rgba(37, 99, 235, 0.05)',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: 'rgba(37, 99, 235, 0.08)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 6px', color: 'var(--text-primary)' }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
