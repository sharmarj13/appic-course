"use client";
import React, { useEffect } from 'react';
import { usePathname as useLocation } from 'next/navigation';


interface PageSEOProps {
  title: string;
  description: string;
}

export function PageSEO({ title, description }: PageSEOProps) {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title.includes('Appic Skill') ? title : `${title} | Appic Skill`;
    document.title = fullTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [title, description, location]);

  return null;
}
