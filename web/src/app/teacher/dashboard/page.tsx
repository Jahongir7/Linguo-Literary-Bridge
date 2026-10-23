'use client';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import styles from './teacher-dashboard.module.css';
import { MOCK_CLASSES, MOCK_ASSIGNMENTS, MOCK_PROGRESS, MOCK_USERS, MOCK_CHAPTERS } from '@/data/mockData';
import { useAuthStore } from '@/store/authStore';

export default function TeacherDashboard() {
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    setNow(Date.now());
  }, []);
  const { user } = useAuthStore();

  const myClasses = MOCK_CLASSES.filter((c) => c.teacherId === user?.id);
  const totalStudents = myClasses.reduce((s, c) => s + c.studentCount, 0);
  const activeAssignments = MOCK_ASSIGNMENTS.filter((a) => a.status === 'active').length;
  const avgScore = Math.round(
    MOCK_PROGRESS.filter((p) => p.quizScore !== undefined)
      .reduce((s, p) => s + (p.quizScore ?? 0), 0) /
      MOCK_PROGRESS.filter((p) => p.quizScore !== undefined).length
  );

  const students = MOCK_USERS.filter((u) => u.role === 'student');

  return (
    <DashboardLayout
      title="O'qituvchi Kabineti"
      subtitle="Guruhlar, topshiriqlar va talabalar natijalarini boshqaring"
      actions={
        <a href="/teacher/classes" className="btn-primary">
          + Guruh yaratish
        </a>
      }
    >
      {/* Stats */}
      <div className={styles.statsRow}>
        {[
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            ),
            label: 'Jami Talabalar',
            value: totalStudents,
            color: '#1d4ed8',
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            ),
            label: 'Guruhlarim',
            value: myClasses.length,
            color: '#0284c7',
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
            ),
            label: 'Faol topshiriqlar',
            value: activeAssignments,
            color: '#d97706',
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ),
            label: 'O\'rt. ball',
            value: `${avgScore}%`,
            color: '#059669',
          },
        ].map((s) => (
          <div key={s.label} className={styles.statCard} style={{ '--c': s.color } as React.CSSProperties}>
            <div className={styles.statIcon}>{s.icon}</div>
            <div>
              <p className={styles.statLabel}>{s.label}</p>
              <p className={styles.statValue}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        {/* Classes */}
        <div className={`${styles.card} glass-card`}>
          <div className={styles.cardHeader}>
            <h3>Guruhlarim</h3>
            <a href="/teacher/classes" className={styles.link}>Barchasi →</a>
          </div>
          <div className={styles.classesList}>
            {myClasses.map((cls) => (
              <div key={cls.id} className={styles.classItem}>
                <div className={styles.classIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div className={styles.classInfo}>
                  <p className={styles.className}>{cls.name}</p>
                  <p className={styles.classMeta}>{cls.studentCount} talaba · Kod: <code>{cls.inviteCode}</code></p>
                </div>
                <div className="progress-bar" style={{ width: 80 }}>
                  <div className="progress-bar__fill" style={{ width: '68%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Assignments */}
        <div className={`${styles.card} glass-card`}>
          <div className={styles.cardHeader}>
            <h3>Faol Topshiriqlar</h3>
            <a href="/teacher/assignments" className={styles.link}>Yangi →</a>
          </div>
          <div className={styles.assignmentsList}>
            {MOCK_ASSIGNMENTS.filter((a) => a.status === 'active').map((a) => {
              const chapter = MOCK_CHAPTERS.find((c) => c.id === a.chapterId);
              const cls = MOCK_CLASSES.find((c) => c.id === a.classId);
              const due = new Date(a.dueDate);
              const daysLeft = Math.ceil((due.getTime() - (now || due.getTime())) / (1000 * 60 * 60 * 24));
              return (
                <div key={a.id} className={styles.assignmentItem}>
                  <div className={styles.assignmentLeft}>
                    <p className={styles.assignmentTitle}>{chapter?.title ?? a.chapterId}</p>
                    <p className={styles.assignmentMeta}>{cls?.name} · Muddat: {a.dueDate}</p>
                  </div>
                  <div className={styles.assignmentRight}>
                    <span className={`badge badge--${a.level.toLowerCase()}`}>{a.level}</span>
                    <span className={`${styles.dueBadge} ${daysLeft <= 3 ? styles.urgent : ''}`}>
                      {daysLeft} kun
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Student Progress */}
        <div className={`${styles.progressCard} glass-card`}>
          <div className={styles.cardHeader}>
            <h3>Talabalar Natijalar</h3>
            <a href="/teacher/progress" className={styles.link}>To'liq →</a>
          </div>
          <div className="table-wrapper" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Talaba</th>
                  <th>CEFR</th>
                  <th>XP</th>
                  <th>Streak</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => {
                  const prog = MOCK_PROGRESS.find((p) => p.userId === s.id);
                  return (
                    <tr key={s.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="avatar" style={{ width: 30, height: 30, fontSize: 12, background: 'var(--gradient-primary)' }}>
                            {s.name.charAt(0)}
                          </div>
                          <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{s.name}</span>
                        </div>
                      </td>
                      <td>{s.cefr ? <span className={`badge badge--${s.cefr.toLowerCase()}`}>{s.cefr}</span> : '—'}</td>
                      <td style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>{s.xp}</td>
                      <td>{s.streak} kun streak</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="progress-bar" style={{ flex: 1 }}>
                            <div className="progress-bar__fill" style={{ width: `${prog?.readPercent ?? 0}%` }} />
                          </div>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 32 }}>
                            {prog?.readPercent ?? 0}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
