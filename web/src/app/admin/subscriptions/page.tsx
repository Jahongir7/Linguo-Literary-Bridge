'use client';
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function AdminSubscriptionsPage() {
  const plans = [
    {
      name: 'Bepul (Free / Demo)',
      price: '0 so‘m',
      period: 'cheksiz',
      features: ['The Gadfly 1-bob to‘liq ochiq', '4 ta CEFR versiyasi (A2-C1)', 'Kuniga 20 ta Ask Gadfly so‘rovi', '15 ta Tezaurus birligi'],
      usersCount: 84,
      isPopular: false,
    },
    {
      name: 'Talaba Premium',
      price: '49 000 so‘m',
      period: 'oyiga',
      features: ['Barcha 26 bob to‘liq ochiq', 'Cheksiz Ask Gadfly AI-tutor', 'Offline yuklab olish', 'Shaxsiy audio karaoke'],
      usersCount: 32,
      isPopular: true,
    },
    {
      name: 'Universitet / Tashkilot',
      price: '1 200 000 so‘m',
      period: 'yiliga',
      features: ['500 tagacha talaba hisobi', 'O‘qituvchi boshqaruv kabineti', 'Topshiriq va esse tekshiruvi', 'Eksport va tahlil hisobotlari'],
      usersCount: 3,
      isPopular: false,
    },
  ];

  return (
    <DashboardLayout
      title="Obunalar va To‘lovlar"
      subtitle="Tarif rejalari, integratsiyalar (Payme, Click, Uzum) va tushumlar"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Payment Gateways row */}
        <div className="glass-card" style={{ padding: 20 }}>
          <h4 style={{ fontSize: 14, margin: '0 0 12px', color: 'var(--text-muted)' }}>
            ULANGAN TO‘LOV TIZIMLARI:
          </h4>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {['Payme (Faol)', 'Click (Faol)', 'Uzum Bank (Test)', 'Stripe (Xalqaro)'].map((p) => (
              <div
                key={p}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 10,
                  padding: '8px 14px',
                  fontSize: 13,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00e5a0' }} />
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {plans.map((pl) => (
            <div
              key={pl.name}
              className="glass-card"
              style={{
                padding: 24,
                position: 'relative',
                border: pl.isPopular ? '1px solid var(--color-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {pl.isPopular && (
                <span
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    background: 'var(--color-primary)',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 10,
                  }}
                >
                  OMMABOP
                </span>
              )}
              <h3 style={{ fontSize: 18, margin: '0 0 8px' }}>{pl.name}</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: '#fff' }}>{pl.price}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>/ {pl.period}</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--color-accent)', marginBottom: 16 }}>
                Faol obunachilar: {pl.usersCount} kishi
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                {pl.features.map((f) => (
                  <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-success)' }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
