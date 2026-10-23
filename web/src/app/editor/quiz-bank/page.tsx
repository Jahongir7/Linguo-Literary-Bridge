'use client';
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LITERARY_QUIZ_QUESTIONS } from '@/data/literaryData';

export default function EditorQuizBankPage() {
  return (
    <DashboardLayout
      title="Test Banki Muharriri"
      subtitle="Boblar va CEFR darajalariga biriktirilgan interaktiv savollar"
      actions={
        <button className="btn-primary">+ Yangi savol qo‘shish</button>
      }
    >
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 18, marginBottom: 16 }}>Mavjud Savollar ({LITERARY_QUIZ_QUESTIONS.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {LITERARY_QUIZ_QUESTIONS.map((q, idx) => (
            <div
              key={q.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Savol #{idx + 1} · {q.type}</span>
                <span className="badge badge--b1">{q.level}</span>
              </div>
              <h4 style={{ fontSize: 15, margin: '0 0 10px' }}>{q.question}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                {q.options?.map((opt) => (
                  <span
                    key={opt}
                    style={{
                      background: opt === q.correctAnswer ? 'rgba(0, 229, 160, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${opt === q.correctAnswer ? 'var(--color-success)' : 'rgba(255, 255, 255, 0.1)'}`,
                      color: opt === q.correctAnswer ? 'var(--color-success)' : 'inherit',
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 12,
                    }}
                  >
                    {opt}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
                <strong>Tushuntirish:</strong> {q.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
