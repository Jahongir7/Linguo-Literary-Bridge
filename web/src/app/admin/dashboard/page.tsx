'use client';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import styles from './dashboard.module.css';
import {
  MOCK_DAILY_STATS,
  MOCK_CHAPTER_STATS,
  MOCK_USERS,
  MOCK_WORKS,
  MOCK_CHAPTERS,
} from '@/data/mockData';

// ── Stat Card ─────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaPositive?: boolean;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ label, value, delta, deltaPositive, icon, color }: StatCardProps) {
  return (
    <div className={styles.statCard} style={{ '--card-color': color } as React.CSSProperties}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statBody}>
        <p className={styles.statLabel}>{label}</p>
        <p className={styles.statValue}>{value}</p>
        {delta && (
          <p className={`${styles.statDelta} ${deltaPositive ? styles.positive : styles.negative}`}>
            {deltaPositive ? '↑' : '↓'} {delta}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Custom Tooltip ────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.chartTooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: <strong>{entry.value}</strong>
        </p>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function AdminDashboard() {
  const totalStudents = MOCK_USERS.filter((u) => u.role === 'student').length;
  const totalUsers = MOCK_USERS.length;
  const totalChapters = MOCK_CHAPTERS.filter((c) => c.status === 'published').length;
  const latestDAU = MOCK_DAILY_STATS[MOCK_DAILY_STATS.length - 1].dau;

  const recentUsers = [...MOCK_USERS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Platforma umumiy ko'rinishi"
    >
      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <StatCard
          label="Jami foydalanuvchilar"
          value={totalUsers}
          delta="12% bu oy"
          deltaPositive
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
          color="#1d4ed8"
        />
        <StatCard
          label="Faol talabalar"
          value={totalStudents}
          delta="8 yangi"
          deltaPositive
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          }
          color="#0284c7"
        />
        <StatCard
          label="Nashr qilingan boblar"
          value={totalChapters}
          delta=""
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          }
          color="#059669"
        />
        <StatCard
          label="Bugungi faol (DAU)"
          value={latestDAU}
          delta="9% o'sish"
          deltaPositive
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          }
          color="#d97706"
        />
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        {/* DAU Chart */}
        <div className={`${styles.chartCard} glass-card`}>
          <div className={styles.chartHeader}>
            <div>
              <h3>Kunlik faol foydalanuvchilar</h3>
              <p>So'nggi 7 kun</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MOCK_DAILY_STATS} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDau" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6c63ff" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6c63ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
                tickFormatter={(d) => new Date(d).toLocaleDateString('uz', { weekday: 'short' })}
                tick={{ fill: 'rgba(240,242,255,0.4)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={{ fill: 'rgba(240,242,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="dau" name="DAU" stroke="#6c63ff" strokeWidth={2} fill="url(#colorDau)" />
              <Area type="monotone" dataKey="newUsers" name="Yangi" stroke="#00d4ff" strokeWidth={2} fill="url(#colorNew)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chapter Completion */}
        <div className={`${styles.chartCard} glass-card`}>
          <div className={styles.chartHeader}>
            <div>
              <h3>Bob tugatish foizi</h3>
              <p>Har bob bo'yicha</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MOCK_CHAPTER_STATS} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="chapterTitle"
                tick={{ fill: 'rgba(240,242,255,0.4)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(t) => t.split(' ').slice(0, 2).join(' ')}
              />
              <YAxis tick={{ fill: 'rgba(240,242,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="completionRate" name="Tugatish" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgScore" name="O'rtacha ball" fill="url(#barGrad2)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6c63ff" /><stop offset="100%" stopColor="#4a43cc" />
                </linearGradient>
                <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" /><stop offset="100%" stopColor="#0099cc" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow}>
        {/* Recent Users */}
        <div className={`${styles.tableCard} glass-card`}>
          <div className={styles.cardHeader}>
            <h3>So'nggi foydalanuvchilar</h3>
            <a href="/admin/users" className={styles.viewAll}>Barchasi →</a>
          </div>
          <div className="table-wrapper" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th>Foydalanuvchi</th>
                  <th>Rol</th>
                  <th>CEFR</th>
                  <th>XP</th>
                  <th>Holat</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className={styles.userCell}>
                        <div className="avatar" style={{ width: 32, height: 32, fontSize: 12, background: 'var(--gradient-primary)' }}>
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 500 }}>{u.name}</p>
                          <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge--${u.role === 'admin' ? 'b2' : u.role === 'teacher' ? 'b1' : u.role === 'editor' ? 'success' : 'warning'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>{u.cefr ? <span className={`badge badge--${u.cefr.toLowerCase()}`}>{u.cefr}</span> : '—'}</td>
                    <td style={{ fontWeight: 600, color: 'var(--color-primary-light)' }}>{u.xp.toLocaleString()}</td>
                    <td>
                      <span className={`badge badge--${u.isActive ? 'success' : 'danger'}`}>
                        {u.isActive ? 'Faol' : 'Nofaol'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Works Overview */}
        <div className={`${styles.worksCard} glass-card`}>
          <div className={styles.cardHeader}>
            <h3>Asarlar</h3>
            <a href="/admin/content" className={styles.viewAll}>CMS →</a>
          </div>
          <div className={styles.worksList}>
            {MOCK_WORKS.map((work) => {
              const chapters = MOCK_CHAPTERS.filter((c) => c.workId === work.id);
              const published = chapters.filter((c) => c.status === 'published').length;
              return (
                <div key={work.id} className={styles.workItem}>
                  <div className={styles.workCover}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <div className={styles.workInfo}>
                    <p className={styles.workTitle}>{work.title}</p>
                    <p className={styles.workAuthor}>{work.author}</p>
                    <div className={styles.workProgress}>
                      <div className="progress-bar" style={{ flex: 1 }}>
                        <div
                          className="progress-bar__fill"
                          style={{ width: `${(published / work.totalChapters) * 100}%` }}
                        />
                      </div>
                      <span className={styles.workStat}>{published}/{work.totalChapters} bob</span>
                    </div>
                  </div>
                  <span className={`badge badge--${work.status}`}>{work.status}</span>
                </div>
              );
            })}
          </div>

          {/* Quick Session Stats */}
          <div className={styles.sessionStats}>
            <h4>O'rtacha sessiya davomiyligi (daqiqa)</h4>
            {MOCK_DAILY_STATS.slice(-4).map((d) => (
              <div key={d.date} className={styles.sessionRow}>
                <span className={styles.sessionDate}>
                  {new Date(d.date).toLocaleDateString('uz', { weekday: 'short', day: 'numeric' })}
                </span>
                <div className="progress-bar" style={{ flex: 1 }}>
                  <div
                    className="progress-bar__fill"
                    style={{
                      width: `${(d.sessionsAvgMin / 40) * 100}%`,
                      background: 'linear-gradient(90deg, #00d4ff, #6c63ff)',
                    }}
                  />
                </div>
                <span className={styles.sessionMin}>{d.sessionsAvgMin} min</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
