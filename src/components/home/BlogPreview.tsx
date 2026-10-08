import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { BlogCard } from '../blog/BlogCard';
import { BLOG_ARTICLES } from '../../data/blogs';

export function BlogPreview() {
  const latestArticles = BLOG_ARTICLES.slice(0, 3);

  return (
    <section className="py-8 lg:py-10 bg-white">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-6">
          <SectionHeading
            eyebrow="Editorial & Career Playbooks"
            title="Insights for your next career move"
            description="Practical essays, architectural deep-dives, and career guides written by our teaching faculty."
          />

          <div className="shrink-0">
            <Button href="/blog" variant="outline">
              <span>View All Articles</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
