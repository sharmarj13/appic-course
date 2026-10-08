import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CourseCategory, CourseLevel } from '../../types/course';

export type PriceFilterType = 'All' | 'Under ₹200' | '₹200 - ₹250' | 'Over ₹250';
export type SortOptionType = 'popular' | 'rating' | 'price-asc' | 'price-desc';

interface CourseFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: CourseCategory | 'All';
  onCategoryChange: (cat: CourseCategory | 'All') => void;
  selectedLevel: CourseLevel | 'All';
  onLevelChange: (lvl: CourseLevel | 'All') => void;
  selectedPrice: PriceFilterType;
  onPriceChange: (price: PriceFilterType) => void;
  sortBy: SortOptionType;
  onSortChange: (sort: SortOptionType) => void;
  onReset: () => void;
  totalResults: number;
}

const CATEGORIES: (CourseCategory | 'All')[] = [
  'All',
  'Development',
  'Design',
  'Data & AI',
  'Marketing',
  'Business',
];

const LEVELS: (CourseLevel | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const PRICE_RANGES: PriceFilterType[] = ['All', 'Under ₹200', '₹200 - ₹250', 'Over ₹250'];

export function CourseFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
  selectedPrice,
  onPriceChange,
  sortBy,
  onSortChange,
  onReset,
  totalResults,
}: CourseFiltersProps) {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedLevel !== 'All' ||
    selectedPrice !== 'All';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-5">
      {/* Top Row: Search input + Sort dropdown */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by programme title, skill, SQL, React, Figma, or instructor..."
            aria-label="Search courses"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none transition-colors shadow-inner"
          />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <label htmlFor="course-sort" className="text-xs font-semibold text-slate-600 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="course-sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOptionType)}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-slate-400 focus:outline-none cursor-pointer shadow-sm"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category interactive segmented buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by category">
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Level and Price Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
            <label htmlFor="level-filter" className="text-xs font-medium text-slate-500">
              Level:
            </label>
            <select
              id="level-filter"
              value={selectedLevel}
              onChange={(e) => onLevelChange(e.target.value as CourseLevel | 'All')}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:border-blue-600 focus:outline-none cursor-pointer"
            >
              {LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl === 'All' ? 'All Levels' : lvl}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="price-filter" className="text-xs font-medium text-slate-500">
              Tuition:
            </label>
            <select
              id="price-filter"
              value={selectedPrice}
              onChange={(e) => onPriceChange(e.target.value as PriceFilterType)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:border-blue-600 focus:outline-none cursor-pointer"
            >
              {PRICE_RANGES.map((pr) => (
                <option key={pr} value={pr}>
                  {pr === 'All' ? 'All Prices' : pr}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Results summary line */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-slate-500 pt-1">
        <span className="tabular-nums">
          Showing <strong className="font-semibold text-slate-900">{totalResults}</strong> industry-verified{' '}
          {totalResults === 1 ? 'programme' : 'programmes'}
        </span>
        <span className="text-[11px] sm:text-xs text-slate-400">All programmes include mentor code/design reviews & verified certificate</span>
      </div>
    </div>
  );
}
