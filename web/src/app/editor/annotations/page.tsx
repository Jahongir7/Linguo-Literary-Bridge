'use client';
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useBookStore } from '@/store/bookStore';

export default function EditorAnnotationsPage() {
  const { annotations } = useBookStore();

  return (
    <DashboardLayout
      title="Poetik va Madaniy Izohlar Boshqaruvi"
      subtitle="Dissertatsiya asosidagi 14 ta dastlabki izoh va leksik tahlillar"
      actions={
        <button className="btn-primary">+ Yangi izoh qo‘shish</button>
      }
    >
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 18, marginBottom: 16 }}>Izohlar Ro‘yxati ({annotations.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {annotations.map((ann) => (
            <div
              key={ann.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderLeft: '4px solid var(--color-warning)',
                borderRadius: 10,
                padding: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, fontWeight: 700, color: '#fff' }}>
                  &ldquo;{ann.quote}&rdquo;
                </span>
                <span className="badge badge--b1">{ann.type.replace('_', ' ')}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 8px' }}>
                {ann.shortNote.uz}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
                <span>Paragraf: {ann.paragraphId} · Darajalar: {ann.levels.join(', ')}</span>
                {ann.thesaurusRef && <span style={{ color: 'var(--color-accent)' }}>→ {ann.thesaurusRef}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
