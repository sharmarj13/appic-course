import React from 'react';
import { PageSEO } from '../components/common/PageSEO';
import { Hero } from '../components/home/Hero';
import { TrustStats } from '../components/home/TrustStats';
import { FeaturedCourses } from '../components/home/FeaturedCourses';
import { WhyAppicSkill } from '../components/home/WhyAppicSkill';
import { LearningJourney } from '../components/home/LearningJourney';
import { Testimonials } from '../components/home/Testimonials';
import { Workshops } from '../components/home/Workshops';
import { CommunitySection } from '../components/home/CommunitySection';
import { BlogPreview } from '../components/home/BlogPreview';
import { FinalCTA } from '../components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <PageSEO
        title="Appic Skill Career-Focused Online Education & Live Workshops"
        description="Self-paced technical and professional programmes, 50k+ students placed in top companies. Learn Full Stack Development, UI/UX, AI, and Data Analytics."
      />
      <Hero />
      {/* <TrustStats /> */}
      <FeaturedCourses />
      <WhyAppicSkill />
      <LearningJourney />
      <Testimonials />
      <Workshops />
      <CommunitySection />
      <BlogPreview />
      <FinalCTA />
    </>
  );
}
