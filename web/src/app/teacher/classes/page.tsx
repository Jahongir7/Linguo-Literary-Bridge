'use client';
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MOCK_CLASSES } from '@/data/mockData';

export default function TeacherClassesPage() {
  return (
    <DashboardLayout
      title="O‘qituvchi Guruhlari"
      subtitle="Talabalar guruhlari, taklif kodlari va o‘quv faolligi"
      actions={<button className="btn-primary">+ Yangi guruh ochish</button>}
    >
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 18, marginBottom: 16 }}>Mening Guruhlarim ({MOCK_CLASSES.length})</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {MOCK_CLASSES.map((cls) => (
            <div
              key={cls.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 12,
                padding: 20,
              }}
            >
              <h4 style={{ fontSize: 16, margin: '0 0 6px' }}>{cls.name}</h4>
              <p style={{ fontSize: 13, color: 'var(--color-accent)', margin: '0 0 12px' }}>
                Taklif kodi: <strong>{cls.inviteCode}</strong>
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
                <span>{cls.studentCount} ta talaba</span>
                <span>Ochilgan: {cls.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
