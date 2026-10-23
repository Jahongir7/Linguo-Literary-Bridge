'use client';
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function TeacherEssaysPage() {
  const essays = [
    {
      id: 'es-1',
      studentName: 'Zulfiya Rahimova',
      topic: 'Montanelli ovozidagi metafora va ota mehrining ifodalanishi',
      chapter: 'The Gadfly, 1-bob',
      submittedAt: '2026-10-12',
      aiScore: '92/100',
      status: 'Tekshirilgan',
    },
    {
      id: 'es-2',
      studentName: 'Jasur Toshmatov',
      topic: 'Artur obrazidagi "tirnoqsiz pantera" taqqoslashining badiiy tahlili',
      chapter: 'The Gadfly, 1-bob',
      submittedAt: '2026-10-13',
      aiScore: '88/100',
      status: 'Kutilmoqda',
    },
  ];

  return (
    <DashboardLayout
      title="Keyslar va Esseylar Tekshiruvi"
      subtitle="Rubrika asosida AI-baholash va o‘qituvchi tasdig‘i"
    >
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 18, marginBottom: 16 }}>Topshirilgan Yozma Ishlar ({essays.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {essays.map((es) => (
            <div
              key={es.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 12,
                padding: 18,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div>
                <h4 style={{ fontSize: 15, margin: '0 0 4px' }}>{es.topic}</h4>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
                  Talaba: <strong>{es.studentName}</strong> · {es.chapter} · {es.submittedAt}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 13, color: 'var(--color-success)', fontWeight: 700 }}>
                  AI Bahosi: {es.aiScore}
                </span>
                <span className={`badge badge--${es.status === 'Tekshirilgan' ? 'published' : 'draft'}`}>
                  {es.status}
                </span>
                <button className="btn-ghost" style={{ fontSize: 12 }}>
                  Baho va fikr berish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
