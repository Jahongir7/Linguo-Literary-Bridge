'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './StudentNavbar.module.css';
import { useAuthStore } from '@/store/authStore';
import { useBookStore } from '@/store/bookStore';
import type { CEFRLevel, UserRole } from '@/types';

// Crisp inline SVGs (zero emojis)
const NavIcons = {
  Logo: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 7h8M8 11h5" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Spark: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Streak: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  Star: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Chevron: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
};

export function StudentNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, switchDemoRole } = useAuthStore();
  const { activeLevel, setActiveLevel, xp, streak } = useBookStore();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navLinks = [
    { href: '/library', label: 'Kutubxona' },
    { href: '/reader/gf-p1-c01', label: 'Reader' },
    { href: '/book-generator', label: 'AI Generator', isFeatured: true },
    { href: '/placement', label: 'Placement Test' },
    { href: '/thesaurus', label: 'Tezaurus' },
    { href: '/practice', label: 'Mashqlar' },
    { href: '/game', label: 'Figurani top' },
    { href: '/progress', label: 'Natijalar' },
  ];

  const handleRoleSelect = (role: UserRole) => {
    switchDemoRole(role);
    setRoleMenuOpen(false);
    if (role === 'admin') router.push('/admin/dashboard');
    else if (role === 'editor') router.push('/editor/dashboard');
    else if (role === 'teacher') router.push('/teacher/dashboard');
    else router.push('/library');
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Brand */}
        <Link href="/library" className={styles.brand}>
          <div className={styles.logoBadge}>
            <NavIcons.Logo />
          </div>
          <div>
            <span className={styles.brandTitle}>Linguo</span>
            <span className={styles.brandSub}>Literary Bridge</span>
          </div>
        </Link>

        {/* Links */}
        <nav className={styles.navLinks}>
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href.startsWith('/reader') && pathname.startsWith('/reader'));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''} ${
                  link.isFeatured ? styles.navLinkFeatured : ''
                }`}
              >
                {link.isFeatured && <NavIcons.Spark />}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Stats & Controls */}
        <div className={styles.navRight}>
          {/* CEFR Level Selector */}
          <div className={styles.levelPillContainer}>
            <span className={styles.levelLabel}>Daraja:</span>
            {(['A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setActiveLevel(lvl)}
                className={`${styles.levelPill} ${activeLevel === lvl ? styles.levelPillActive : ''}`}
                style={{
                  '--lvl-color':
                    lvl === 'A2'
                      ? 'var(--color-a2)'
                      : lvl === 'B1'
                      ? 'var(--color-b1)'
                      : lvl === 'B2'
                      ? 'var(--color-b2)'
                      : 'var(--color-c1)',
                } as React.CSSProperties}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Gamification Badges */}
          <div className={styles.badgeItem} title="Kunlik o‘qish staji">
            <NavIcons.Streak />
            <span className={styles.badgeVal}>{streak} kun</span>
          </div>
          <div className={styles.badgeItem} title="Jami to‘plangan tajriba (XP)">
            <NavIcons.Star />
            <span className={styles.badgeVal}>{xp} XP</span>
          </div>

          {/* Demo Role Switcher */}
          <div className={styles.roleSwitcherWrapper}>
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className={styles.roleBtn}
              title="Rolni almashtirish"
            >
              <span className={styles.roleDot} />
              <span className={styles.roleText}>{user?.role ? user.role.toUpperCase() : 'TALABA'}</span>
              <NavIcons.Chevron />
            </button>

            {roleMenuOpen && (
              <div className={styles.roleMenu}>
                <p className={styles.roleMenuHeader}>Rolni tanlang:</p>
                <button onClick={() => handleRoleSelect('student')} className={styles.roleMenuItem}>
                  Talaba (Student View)
                </button>
                <button onClick={() => handleRoleSelect('admin')} className={styles.roleMenuItem}>
                  Administrator (Admin CMS)
                </button>
                <button onClick={() => handleRoleSelect('editor')} className={styles.roleMenuItem}>
                  Muharrir (Editor Panel)
                </button>
                <button onClick={() => handleRoleSelect('teacher')} className={styles.roleMenuItem}>
                  O‘qituvchi (Teacher Panel)
                </button>
              </div>
            )}
          </div>

          {/* Logout */}
          <button onClick={logout} className={styles.logoutBtn} title="Chiqish">
            Chiqish
          </button>
        </div>
      </div>
    </header>
  );
}
