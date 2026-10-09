"use client";
import React, { useState } from 'react';
import { ChevronDown, PlayCircle, Code, FileText, Terminal } from 'lucide-react';
import { CurriculumModule } from '../../types/course';

interface CurriculumProps {
  modules: CurriculumModule[];
}

export function Curriculum({ modules }: CurriculumProps) {
  const [openIds, setOpenIds] = useState<string[]>([modules[0]?.id || '']);

  const toggleModule = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    if (openIds.length === modules.length) {
      setOpenIds([]);
    } else {
      setOpenIds(modules.map((m) => m.id));
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Code className="h-4 w-4 text-indigo-600 shrink-0" />;
      case 'lab':
        return <Terminal className="h-4 w-4 text-emerald-600 shrink-0" />;
      case 'reading':
        return <FileText className="h-4 w-4 text-slate-500 shrink-0" />;
      default:
        return <PlayCircle className="h-4 w-4 text-blue-600 shrink-0" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-serif">Course Curriculum</h2>
          <p className="mt-1 text-sm text-slate-600 tabular-nums">
            {modules.length} structured modules · Progressive hands-on milestones
          </p>
        </div>
        <button
          type="button"
          onClick={expandAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          {openIds.length === modules.length ? 'Collapse All Modules' : 'Expand All Modules'}
        </button>
      </div>

      <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {modules.map((mod) => {
          const isOpen = openIds.includes(mod.id);
          return (
            <div key={mod.id} className="transition-colors">
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
                    <span>{mod.number}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-slate-500 font-normal tabular-nums">{mod.duration}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 font-serif">
                    {mod.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">{mod.summary}</p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-150 ${
                    isOpen ? 'rotate-180 text-slate-900' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:px-6 space-y-2.5">
                  {mod.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between gap-4 rounded-xl bg-white px-4 py-3 border border-slate-200/70 text-xs sm:text-sm"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {getLessonIcon(lesson.type)}
                        <span className="font-medium text-slate-800 truncate">
                          {lesson.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 tabular-nums text-xs text-slate-500">
                        {lesson.isPreview && (
                          <span className="font-semibold text-blue-600">Preview available</span>
                        )}
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
