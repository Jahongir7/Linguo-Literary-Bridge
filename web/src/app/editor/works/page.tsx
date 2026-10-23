'use client';
import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useBookStore } from '@/store/bookStore';

export default function EditorWorksPage() {
  const { works, chapters } = useBookStore();

  return (
    <DashboardLayout
      title="Muharrir: Badiiy Asarlar va Boblar"
      subtitle="E.L. Voynich korpusidagi matnlar va darajalar tahriri"
      actions={
        <Link href="/book-generator" className="btn-primary" style={{ textDecoration: 'none' }}>
          Yangi Kitob Yuklash & AI Moslashtirish
        </Link>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {works.map((w) => {
          const chList = chapters.filter((c) => c.workId === w.id);
          return (
            <div key={w.id} className="glass-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontSize: 20, margin: '0 0 4px' }}>{w.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--color-accent)', margin: 0 }}>{w.author}</p>
                </div>
                <span className={`badge badge--${w.status === 'published' ? 'published' : 'draft'}`}>
                  {w.status}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {chList.map((ch) => (
                  <div
                    key={ch.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 10,
                      padding: '12px 16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{ch.title}</span>
                      <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                        {(['A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                          <span
                            key={lvl}
                            className={`badge badge--${lvl.toLowerCase()}`}
                            style={{ opacity: ch.versions.includes(lvl) ? 1 : 0.3 }}
                          >
                            {lvl}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link href={`/reader/${ch.id}`} className="btn-ghost" style={{ fontSize: 12, textDecoration: 'none' }}>
                      Tahrirlash / Reader
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
