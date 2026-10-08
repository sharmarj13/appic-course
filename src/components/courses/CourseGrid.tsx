import React from 'react';
import { Course } from '../../types/course';
import { CourseCard } from './CourseCard';
import { Button } from '../common/Button';

interface CourseGridProps {
  courses: Course[];
  onResetFilters?: () => void;
}

export function CourseGrid({ courses, onResetFilters }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center my-6">
        <h3 className="text-lg font-bold text-slate-900">
          No programmes match your current filters
        </h3>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
          Try broadening your search keywords or resetting the category, level, and tuition filters to view all available programmes.
        </p>
        {onResetFilters && (
          <div className="mt-6">
            <Button variant="primary" size="sm" onClick={onResetFilters}>
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course, idx) => (
        <CourseCard key={course.id} course={course} index={idx} />
      ))}
    </div>
  );
}
