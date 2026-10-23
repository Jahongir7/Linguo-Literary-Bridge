'use client';
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MOCK_PROGRESS, MOCK_USERS } from '@/data/mockData';

export default function TeacherProgressPage() {
  return (
    <DashboardLayout
      title="Talabalar Natijalari"
      subtitle="O‘qilgan boblar, test ballari va CEFR dinamikasi"
    >
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 18, marginBottom: 16 }}>So‘nggi Natijalar ({MOCK_PROGRESS.length})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <th style={{ padding: 12, textAlign: 'left' }}>Talaba</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Bob</th>
              <th style={{ padding: 12, textAlign: 'left' }}>CEFR</th>
              <th style={{ padding: 12, textAlign: 'left' }}>O‘qildi</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Test Bali</th>
              <th style={{ padding: 12, textAlign: 'right' }}>XP</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PROGRESS.map((p, idx) => {
              const u = MOCK_USERS.find((user) => user.id === p.userId);
              return (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: 12, fontWeight: 600 }}>{u?.name || p.userId}</td>
                  <td style={{ padding: 12 }}>{p.chapterId}</td>
                  <td style={{ padding: 12 }}>
                    <span className={`badge badge--${p.level.toLowerCase()}`}>{p.level}</span>
                  </td>
                  <td style={{ padding: 12 }}>{p.readPercent}%</td>
                  <td style={{ padding: 12, color: 'var(--color-success)', fontWeight: 700 }}>
                    {p.quizScore ? `${p.quizScore}%` : '—'}
                  </td>
                  <td style={{ padding: 12, textAlign: 'right', color: 'var(--color-accent)' }}>
                    +{p.xpEarned} XP
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
