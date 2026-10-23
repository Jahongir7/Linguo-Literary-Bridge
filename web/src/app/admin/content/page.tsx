'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useBookStore } from '@/store/bookStore';

export default function AdminContentPage() {
  const { works, chapters } = useBookStore();
  const [selectedWorkId, setSelectedWorkId] = useState(works[0]?.id || 'gf');

  return (
    <DashboardLayout
      title="Kontent Boshqaruvi (CMS)"
      subtitle="Badiiy asarlar, boblar va CEFR adaptatsiya versiyalari"
      actions={
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/book-generator" className="btn-primary" style={{ textDecoration: 'none' }}>
            Yangi Kitob Yuklash & AI Moslashtirish
          </Link>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Works list */}
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 18, marginBottom: 16 }}>Asarlar Katalogi ({works.length})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {works.map((w) => (
              <div
                key={w.id}
                onClick={() => setSelectedWorkId(w.id)}
                style={{
                  background: selectedWorkId === w.id ? 'rgba(108, 99, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${selectedWorkId === w.id ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.08)'}`,
                  borderRadius: 12,
                  padding: 16,
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <h4 style={{ margin: 0, fontSize: 16 }}>{w.title}</h4>
                  <span className={`badge badge--${w.status === 'published' ? 'published' : 'draft'}`}>
                    {w.status}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--color-accent)', margin: '0 0 8px' }}>{w.author}</p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>{w.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chapters table */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, margin: 0 }}>Boblar va CEFR Darajalar Holati</h3>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Tanlangan asar: <strong>{works.find((w) => w.id === selectedWorkId)?.title}</strong>
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <th style={{ padding: 12, textAlign: 'left' }}>№</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Bob Nomi</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Mavjud Versiyalar</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Holati</th>
                  <th style={{ padding: 12, textAlign: 'right' }}>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {chapters
                  .filter((c) => c.workId === selectedWorkId)
                  .map((ch, idx) => (
                    <tr key={ch.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      <td style={{ padding: 12 }}>{idx + 1}</td>
                      <td style={{ padding: 12, fontWeight: 600 }}>{ch.title}</td>
                      <td style={{ padding: 12 }}>
                        <div style={{ display: 'flex', gap: 4 }}>
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
                      </td>
                      <td style={{ padding: 12 }}>
                        <span className={`badge badge--${ch.status === 'published' ? 'published' : 'draft'}`}>
                          {ch.status === 'published' ? 'Nashr etilgan' : 'Qoralama'}
                        </span>
                      </td>
                      <td style={{ padding: 12, textAlign: 'right' }}>
                        <Link
                          href={`/reader/${ch.id}`}
                          className="btn-ghost"
                          style={{ fontSize: 12, textDecoration: 'none', marginRight: 8 }}
                        >
                          Readerda ko‘rish
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
