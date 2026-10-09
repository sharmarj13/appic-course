"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname as useLocation } from 'next/navigation';

import { Menu } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { MobileMenu } from './MobileMenu';
import { cn } from '../../lib/utils';
import { useSiteData } from '../../context/SiteDataContext';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Blog', href: '/blog' },
];

export function Header() {
  const { settings } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-150',
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <Container className="flex h-16 items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <Link
            href="/"
            className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
          >
            {settings.siteName}
          </Link>

          {/* Zone 2: Clean text navigation links with subtle hover underlines */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600"
          >
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === '/'
                  ? location === '/'
                  : location.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-slate-900',
                    isActive
                      ? 'text-blue-600 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-full'
                      : 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-slate-900 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-150'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Contact action */}
          <div className="hidden md:flex items-center">
            <Button
              variant="primary"
              size="sm"
              href="/contact"
              className="px-4 py-2 text-sm"
            >
              Contact
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            className="inline-flex md:hidden items-center justify-center rounded-xl p-2.5 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>
        </Container>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
