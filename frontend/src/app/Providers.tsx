"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ActionModalProvider } from '@/components/common/ActionModalContext';
import { SiteDataProvider } from '@/context/SiteDataContext';

function HashAndScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    }
  }, [pathname]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SiteDataProvider>
      <ActionModalProvider>
        <HashAndScrollHandler />
        {children}
      </ActionModalProvider>
    </SiteDataProvider>
  );
}
