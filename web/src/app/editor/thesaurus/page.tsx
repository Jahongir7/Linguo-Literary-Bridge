'use client';
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useBookStore } from '@/store/bookStore';

export default function EditorThesaurusPage() {
  const { thesaurus } = useBookStore();

  return (
    <DashboardLayout
      title="Kognitiv Tezaurus Muharriri"
      subtitle="150 birlikdan iborat poetik va adabiy atamalar bazasi"
      actions={
        <button className="btn-primary">+ Yangi atama qo‘shish</button>
      }
    >
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, margin: 0 }}>Mavjud Atamalar ({thesaurus.length} / 150)</h3>
          <span style={{ fontSize: 13, color: 'var(--color-primary-light)' }}>
            Progress: {Math.round((thesaurus.length / 150) * 100)}%
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {thesaurus.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 12,
                padding: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <h4 style={{ margin: 0, fontSize: 16 }}>{item.termEn || item.term}</h4>
                <span className="badge badge--b1">{item.cefrLevel || item.cefr || 'B1'}</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--color-primary-light)', margin: '0 0 8px' }}>
                {item.termUz || item.uzbek}
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                {item.definitions?.standard || item.definitionStandard || item.definitions?.simple || item.definitionSimple}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
