"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname as useLocation } from 'next/navigation';

import { X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '../common/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Blog', href: '/blog' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs md:hidden"
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-xs bg-white border-l border-slate-200 p-6 shadow-2xl md:hidden flex flex-col justify-between overflow-y-auto"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <Link
                  href="/"
                  onClick={onClose}
                  className="text-lg font-bold tracking-tight text-slate-900"
                >
                  Appic Skill
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close navigation menu"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? location === '/'
                      : location.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-blue-50/80 text-blue-600'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="h-4 w-4 opacity-50" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <Button
                variant="primary"
                href="/contact"
                className="w-full"
                onClick={onClose}
              >
                Contact
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
