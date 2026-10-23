'use client';
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MOCK_ASSIGNMENTS } from '@/data/mockData';

export default function TeacherAssignmentsPage() {
  return (
    <DashboardLayout
      title="Topshiriqlar Boshqaruvi"
      subtitle="Boblar bo‘yicha o‘qish, test va poetik tahlil vazifalari"
      actions={<button className="btn-primary">+ Yangi topshiriq</button>}
    >
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 18, marginBottom: 16 }}>Faol Topshiriqlar ({MOCK_ASSIGNMENTS.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MOCK_ASSIGNMENTS.map((asg) => (
            <div
              key={asg.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 12,
                padding: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{asg.chapterId}</span>
                  <span className={`badge badge--${asg.level.toLowerCase()}`}>{asg.level}</span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>Muddat: {asg.dueDate}</p>
              </div>
              <span className={`badge badge--${asg.status === 'active' ? 'published' : 'draft'}`}>
                {asg.status === 'active' ? 'Faol' : 'Yopilgan'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
