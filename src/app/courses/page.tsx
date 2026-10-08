"use client";
import React, { useMemo, useState } from 'react';
import { PageSEO } from '../../components/common/PageSEO';
import { Container } from '../../components/common/Container';
import { CourseFilters, PriceFilterType, SortOptionType } from '../../components/courses/CourseFilters';
import { CourseGrid } from '../../components/courses/CourseGrid';
import { FinalCTA } from '../../components/home/FinalCTA';
import { CourseCategory, CourseLevel } from '../../types/course';
import { Button } from '../../components/common/Button';
import { useSiteData } from '../../context/SiteDataContext';

export default function CoursesPage() {
  const { courses } = useSiteData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'All'>('All');
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | 'All'>('All');
  const [selectedPrice, setSelectedPrice] = useState<PriceFilterType>('All');
  const [sortBy, setSortBy] = useState<SortOptionType>('popular');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredAndSortedCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = courses.filter((course) => {
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.shortDescription.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.instructor.name.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === 'All' || course.level === selectedLevel;

      let matchesPrice = true;
      if (selectedPrice === 'Under ₹200') {
        matchesPrice = course.price < 200;
      } else if (selectedPrice === '₹200 - ₹250') {
        matchesPrice = course.price >= 200 && course.price <= 250;
      } else if (selectedPrice === 'Over ₹250') {
        matchesPrice = course.price > 250;
      }

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return b.studentsCount - a.studentsCount;
    });
  }, [searchQuery, selectedCategory, selectedLevel, selectedPrice, sortBy]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedPrice('All');
    setSortBy('popular');
  };

  const displayedCourses = filteredAndSortedCourses.slice(0, visibleCount);

  return (
    <>
      <PageSEO
        title="Explore Courses – Self-Paced Career Programmes"
        description="Browse Appic Skill industry-focused programmes in Full Stack Web Development, UI/UX Design, AI & Machine Learning, Data Analytics, Digital Marketing, and Business Leadership."
      />

      {/* Top Section */}
      <section className="bg-slate-950 text-white py-14 lg:py-18 border-b border-slate-800">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-blue-400 mb-2.5">
              Appic Skill Programme Catalog
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Explore Courses
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Rigorous, self-paced programmes built with practicing technical and product leaders. Every track includes hands-on projects, mentor reviews, and verifiable credentials.
            </p>
          </div>
        </Container>
      </section>

      {/* Filters & Grid */}
      <section className="py-12 lg:py-16 bg-[#F8FAFC]">
        <Container className="space-y-8">
          <CourseFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedLevel={selectedLevel}
            onLevelChange={setSelectedLevel}
            selectedPrice={selectedPrice}
            onPriceChange={setSelectedPrice}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onReset={handleReset}
            totalResults={filteredAndSortedCourses.length}
          />

          <CourseGrid courses={displayedCourses} onResetFilters={handleReset} />

          {/* Pagination / Load-More Interaction */}
          {filteredAndSortedCourses.length > 0 && (
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 text-xs text-slate-500">
              <p className="tabular-nums">
                Displaying 1–{displayedCourses.length} of {filteredAndSortedCourses.length} programmes
              </p>
              {visibleCount < filteredAndSortedCourses.length ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                >
                  Load More Programmes
                </Button>
              ) : (
                <span className="text-slate-400 font-medium">
                  All matching programmes loaded
                </span>
              )}
            </div>
          )}
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
