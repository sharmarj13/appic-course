"use client";
import React, { useMemo, useState } from 'react';
import { PageSEO } from '../../components/common/PageSEO';
import { Container } from '../../components/common/Container';
import { BlogCard } from '../../components/blog/BlogCard';
import { BlogFilters, FeaturedArticle } from '../../components/blog/BlogComponents';
import { FinalCTA } from '../../components/home/FinalCTA';
import { useSiteData } from '../../context/SiteDataContext';
import { BlogCategory } from '../../types/blog';

export default function BlogPage() {
  const { blogs } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticle = blogs.find((a) => a.featured) || blogs[0];

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return blogs.filter((article) => {
      const matchesCat =
        selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        article.author.name.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <div className="bg-slate-50">
      <PageSEO
        title="Editorial & Career Insights – Appic Skill Blog"
        description="Read architectural deep-dives, UI/UX design system guides, applied AI evaluation tutorials, and career playbooks from Appic Skill faculty."
      />

      {/* Blog Hero */}
      <section className="bg-[#0f172a] text-white py-16 lg:py-24 border-b border-slate-800">
        <Container>
          <div className="max-w-3xl text-center mx-auto">
            <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-4">
              Appic Skill Editorial
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white mb-6">
              Insights for your next career move
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              In-depth engineering guides, product design systems frameworks, and quantitative growth essays written by our expert instructors.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="space-y-12">
          {/* Category & Search Filters */}
          <BlogFilters
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchQuery}
          />

          {/* Featured Article on Top if on 'All' and no search query */}
          {selectedCategory === 'All' && !searchQuery && featuredArticle && (
            <FeaturedArticle article={featuredArticle} />
          )}

          {/* Articles Grid */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {selectedCategory === 'All' ? 'Latest Publications' : `${selectedCategory} Articles`}
              </h2>
              <span className="text-sm text-slate-500 font-medium">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
              </span>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <BlogCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                <p className="text-lg font-bold text-slate-800 mb-2">No matching articles found</p>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">
                  Try tweaking your search term or select another category filter.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <FinalCTA />
    </div>
  );
}
