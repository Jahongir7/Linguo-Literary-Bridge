'use client';
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MOCK_USERS } from '@/data/mockData';
import type { UserRole } from '@/types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filtered = users.filter((u) => roleFilter === 'all' || u.role === roleFilter);

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  return (
    <DashboardLayout
      title="Foydalanuvchilar Boshqaruvi"
      subtitle="Talabalar, o‘qituvchilar, muharrirlar va administratorlar ro‘yxati"
      actions={
        <button className="btn-primary">+ Yangi foydalanuvchi</button>
      }
    >
      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['all', 'student', 'teacher', 'editor', 'admin'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`btn-ghost ${roleFilter === r ? 'active' : ''}`}
                style={{
                  background: roleFilter === r ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  fontSize: 12,
                }}
              >
                {r.toUpperCase()} ({r === 'all' ? users.length : users.filter((u) => u.role === r).length})
              </button>
            ))}
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Jami: {filtered.length} ta foydalanuvchi
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <th style={{ padding: 12, textAlign: 'left' }}>Ism-familiya</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Email</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Rol</th>
                <th style={{ padding: 12, textAlign: 'left' }}>CEFR</th>
                <th style={{ padding: 12, textAlign: 'left' }}>XP & Streak</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Holati</th>
                <th style={{ padding: 12, textAlign: 'right' }}>Amal</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: 12, fontWeight: 600 }}>{u.name}</td>
                  <td style={{ padding: 12, color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td style={{ padding: 12 }}>
                    <span
                      style={{
                        fontSize: 11,
                        padding: '3px 8px',
                        borderRadius: 8,
                        fontWeight: 700,
                        background:
                          u.role === 'admin'
                            ? 'rgba(108, 99, 255, 0.2)'
                            : u.role === 'teacher'
                            ? 'rgba(0, 212, 255, 0.2)'
                            : u.role === 'editor'
                            ? 'rgba(0, 229, 160, 0.2)'
                            : 'rgba(255, 181, 71, 0.2)',
                        color:
                          u.role === 'admin'
                            ? '#8b85ff'
                            : u.role === 'teacher'
                            ? '#33ddff'
                            : u.role === 'editor'
                            ? '#00e5a0'
                            : '#ffb547',
                      }}
                    >
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: 12 }}>
                    {u.cefr ? <span className={`badge badge--${u.cefr.toLowerCase()}`}>{u.cefr}</span> : '—'}
                  </td>
                  <td style={{ padding: 12 }}>
                    {u.xp} XP · {u.streak} kun streak
                  </td>
                  <td style={{ padding: 12 }}>
                    <span
                      style={{
                        fontSize: 12,
                        color: u.isActive ? 'var(--color-success)' : 'var(--color-danger)',
                      }}
                    >
                      {u.isActive ? '● Faol' : '○ Bloklangan'}
                    </span>
                  </td>
                  <td style={{ padding: 12, textAlign: 'right' }}>
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className="btn-ghost"
                      style={{ fontSize: 11 }}
                    >
                      {u.isActive ? 'Bloklash' : 'Faollashtirish'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
