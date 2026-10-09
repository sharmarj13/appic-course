"use client";
import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Award, ShieldCheck } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Interactive3DTilt } from '../../lib/motion';
import certificateCrestImg from '../../assets/images/visual_3d_certificate_crest_1791369163747.jpg';
import { useSiteData } from '../../context/SiteDataContext';

export function FinalCTA() {
  const { home } = useSiteData();
  const { finalCta } = home;
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-8 lg:py-10 bg-[#F8FAFC] border-t border-slate-200/80">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 shadow-2xl border border-slate-800">
          {/* Subtle decorative studio light */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/3 h-80 w-96 rounded-full bg-blue-600/20 blur-3xl"
          />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
            {/* Left 8 Columns: Conversion Copy & CTAs */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <p className="text-xs font-semibold tracking-wider text-blue-400">
                {finalCta.badge}
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.14]">
                {finalCta.title}
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                {finalCta.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  href={finalCta.ctaLink || '/contact'}
                  variant="primary"
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{finalCta.ctaText}</span>
                </Button>
              </div>
            </div>

            {/* Right 4 Columns: Interactive 3D Academic Credential Showcase */}
            <div className="lg:col-span-4">
              <Interactive3DTilt intensity={9}>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl space-y-4">
                  <div className="relative aspect-square max-h-52 w-full mx-auto overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
                    {!imgError ? (
                      <img
                        src={certificateCrestImg.src}
                        alt="3D rendered Appic Skill academic crest and certificate plaque"
                        referrerPolicy="no-referrer"
                        onError={() => setImgError(true)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Award className="h-12 w-12 text-blue-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs text-white">
                      <span className="font-semibold truncate pr-2" suppressHydrationWarning>
                        {finalCta?.diplomaText || 'Appic Skill Diploma'}
                      </span>
                      <span className="font-mono text-[11px] text-emerald-400 shrink-0">
                        ● Verified
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-blue-400 shrink-0" />
                      <span>Cryptographically verifiable</span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-400">
                      ISO-Aligned
                    </span>
                  </div>
                </div>
              </Interactive3DTilt>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
