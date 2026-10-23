'use client';
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MOCK_DAILY_STATS, MOCK_CHAPTER_STATS } from '@/data/mockData';

export default function AdminAnalyticsPage() {
  return (
    <DashboardLayout
      title="Platforma Analitikasi"
      subtitle="DAU, o‘qilgan boblar, CEFR darajalari dinamikasi va retention"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* KPI Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { label: 'Faol foydalanuvchilar (DAU)', val: '92 ta', change: '+18% oxirgi 7 kunda', color: '#6c63ff' },
            { label: 'O‘rtacha sessiya davomiyligi', val: '28 daqiqa', change: '+5 daqiqa', color: '#00d4ff' },
            { label: 'Ask Gadfly AI so‘rovlari', val: '430 ta / kun', change: '96% to‘g‘ri javob', color: '#00e5a0' },
            { label: 'Bobni yakunlash ko‘rsatkichi', val: '78%', change: 'The Gadfly 1-bob', color: '#ffb547' },
          ].map((kpi) => (
            <div key={kpi.label} className="glass-card" style={{ padding: 20, borderLeft: `4px solid ${kpi.color}` }}>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 6px' }}>{kpi.label}</p>
              <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 4px', color: '#fff' }}>{kpi.val}</h3>
              <span style={{ fontSize: 11, color: 'var(--color-success)' }}>{kpi.change}</span>
            </div>
          ))}
        </div>

        {/* Charts & Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
          {/* Daily active users table/chart */}
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>Oxirgi 7 Kunlik Faollik (DAU)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {MOCK_DAILY_STATS.map((d) => (
                <div key={d.date} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12 }}>
                  <span style={{ width: 80, color: 'var(--text-muted)' }}>{d.date}</span>
                  <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 4, height: 12, overflow: 'hidden' }}>
                    <div style={{ width: `${(d.dau / 100) * 100}%`, background: 'var(--color-primary)', height: '100%' }} />
                  </div>
                  <span style={{ width: 45, fontWeight: 700, textAlign: 'right' }}>{d.dau} kishi</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chapters completion */}
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>Boblar Bo‘yicha Tugatish Ko‘rsatkichi</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {MOCK_CHAPTER_STATS.map((ch) => (
                <div key={ch.chapterId}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600 }}>{ch.chapterTitle}</span>
                    <span style={{ color: 'var(--color-accent)' }}>{ch.completionRate}% (O‘rtacha ball: {ch.avgScore})</span>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                    <div style={{ width: `${ch.completionRate}%`, background: 'linear-gradient(90deg, #6c63ff, #00d4ff)', height: '100%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
