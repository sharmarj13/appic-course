import { BlogArticle } from '../types/blog';
import blogEditorialImg from '../assets/images/blog_featured_editorial_1791367171346.jpg';
import fullstackImg from '../assets/images/course_fullstack_dev_1791367137460.jpg';
import uiuxImg from '../assets/images/course_uiux_design_1791367148988.jpg';
import dataAiImg from '../assets/images/course_data_ai_1791367159844.jpg';

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-1',
    slug: 'bridging-the-senior-engineering-gap-in-2026',
    title: 'Bridging the Architecture Gap: How Mid-Level Engineers Step Into System Ownership',
    excerpt:
      'Why syntax fluency is no longer the primary bottleneck in technical interviews—and how mastering relational data modeling, observability, and trade-off documentation accelerates career progression.',
    category: 'Career',
    publishedAt: 'October 4, 2026',
    readingTime: '7 min read',
    featured: true,
    imageUrl: blogEditorialImg.src,
    visualTheme: 'navy',
    author: {
      name: 'Marcus Vance',
      role: 'Principal Systems Architect & Lead Instructor',
      initials: 'MV',
      bio: 'Marcus has interviewed over 400 software engineers and leads the Full Stack Web Development curriculum at Appic Skill.',
    },
    sections: [
      {
        id: 'the-syntax-commodity',
        heading: '1. Beyond Syntax Fluency: Why Architectural Judgment Matters',
        paragraphs: [
          'Across modern engineering organizations, writing isolated UI components or boilerplate CRUD endpoints has become faster than ever. Yet hiring managers consistently report a shortage of engineers who can reason about end-to-end system behavior under real load.',
          'When evaluating candidates for mid-level and senior roles, technical panels look past surface syntax. They probe how you design database boundaries, handle partial network failures, prevent race conditions in financial or booking flows, and keep latency predictable as tables grow from ten thousand rows to fifty million.',
        ],
        keyTakeaway:
          'Career velocity accelerates when you shift your focus from "how do I write this function?" to "what happens to this system when a downstream dependency slows down by 800ms?"',
      },
      {
        id: 'data-modeling-first',
        heading: '2. Relational Data Modeling Is Your Highest-Leverage Skill',
        paragraphs: [
          'Application code changes every sprint, but your database schema defines the physics of your product for years. Engineers who understand normalization, composite B-Tree indexing, and transaction isolation levels immediately stand out in code reviews.',
          'Consider a multi-tenant learning or booking platform: a poorly indexed query or an unguarded read-modify-write cycle can cause subtle data corruption under concurrent requests.',
        ],
        codeSnippet: {
          language: 'sql',
          code: `-- Composite index supporting high-concurrency tenant lookups
CREATE INDEX CONCURRENTLY idx_enrollments_tenant_status_created
ON course_enrollments (organization_id, status, enrolled_at DESC)
WHERE deleted_at IS NULL;`,
        },
      },
      {
        id: 'writing-rfcs',
        heading: '3. Documenting Trade-Offs with Clarity',
        paragraphs: [
          'Every engineering decision carries a cost. Choosing server-side rendering improves initial paint metrics at the expense of server compute; adding a distributed cache reduces database load while introducing cache invalidation complexity.',
          'In your portfolio projects, include a concise 1-page Architecture Decision Record (ADR). State the problem, list two alternative approaches you rejected, and quantify why your chosen design fits the latency and maintainability constraints.',
        ],
      },
      {
        id: 'building-proof-of-work',
        heading: '4. Structuring a High-Signal Engineering Portfolio',
        paragraphs: [
          'Replace ten shallow tutorial clones with two deep, production-hardened systems. Include live seed accounts so reviewers can test immediately, expose real performance benchmarks, and highlight how you solved a non-trivial engineering bottleneck.',
        ],
      },
    ],
  },
  {
    id: 'blog-2',
    slug: 'designing-tokenized-systems-for-engineering-parity',
    title: 'Designing Tokenized UI Systems That Engineers Actually Love to Implement',
    excerpt:
      'A practical guide to structuring primitive and semantic tokens, enforcing 8px spatial mathematics, and eliminating ambiguity during design-to-code handoffs.',
    category: 'Design',
    publishedAt: 'September 28, 2026',
    readingTime: '6 min read',
    featured: false,
    imageUrl: uiuxImg.src,
    visualTheme: 'indigo',
    author: {
      name: 'Clara Lindqvist',
      role: 'Staff Product Designer',
      initials: 'CL',
      bio: 'Clara leads the UI/UX Design & Design Systems programme and advises enterprise teams on accessibility and design ops.',
    },
    sections: [
      {
        id: 'why-handoffs-fail',
        heading: '1. Why Traditional Design Handoffs Break Down',
        paragraphs: [
          'Most friction between product designers and frontend engineers stems from implicit assumptions. When a static mockup uses raw hex values and arbitrary spacing like 13px or 27px, engineers are forced to guess whether a value is intentional or accidental.',
          'By adopting a shared semantic token contract, both Figma components and CSS variables speak the exact same language.',
        ],
        keyTakeaway:
          'Never assign raw hex codes directly to component surfaces. Route every color decision through a semantic intent layer: canvas, surface-elevated, border-subtle, and text-primary.',
      },
      {
        id: 'spatial-math',
        heading: '2. Enforcing Container & Radius Mathematics',
        paragraphs: [
          'Visual harmony is largely mathematical. Ensure that outer container padding is always greater than or equal to the inner gap between child elements, and calculate nested border radii by subtracting the padding from the outer radius.',
        ],
        codeSnippet: {
          language: 'css',
          code: `:root {
  --surface-canvas: #F8FAFC;
  --surface-card: #FFFFFF;
  --border-hairline: #E2E8F0;
  --radius-outer: 16px;
  --padding-container: 8px;
  --radius-inner: calc(var(--radius-outer) - var(--padding-container));
}`,
        },
      },
      {
        id: 'accessibility-by-default',
        heading: '3. Baking WCAG AA Contrast Into the Token Layer',
        paragraphs: [
          'Accessibility should never be a last-minute QA checklist. When contrast ratios (at least 4.5:1 for body prose and 3:1 for large display type) are verified inside your token pairings, every screen built with those tokens inherits legibility automatically.',
        ],
      },
    ],
  },
  {
    id: 'blog-3',
    slug: 'evaluating-production-rag-and-llm-pipelines',
    title: 'Deterministic Evaluation Harnesses for Production AI & Retrieval Pipelines',
    excerpt:
      'How applied ML teams move from "vibe-based testing" to automated precision, recall, and latency benchmarks before deploying model updates.',
    category: 'Technology',
    publishedAt: 'September 19, 2026',
    readingTime: '8 min read',
    featured: false,
    imageUrl: dataAiImg.src,
    visualTheme: 'blue',
    author: {
      name: 'Dr. Aris Thorne',
      role: 'Lead Applied ML Scientist',
      initials: 'AT',
      bio: 'Dr. Thorne teaches AI & Machine Learning Engineering at Appic Skill and specializes in retrieval evaluation and model optimization.',
    },
    sections: [
      {
        id: 'beyond-vibe-checks',
        heading: '1. The Danger of Ad-Hoc Prompt Inspection',
        paragraphs: [
          'In early prototypes, teams often test AI pipelines by typing five manual queries and eyeballing the output. In production, however, changing a chunking strategy or embedding model can silently degrade accuracy on edge-case technical queries.',
          'Treat your retrieval and generation pipeline like any mission-critical software system: establish a golden dataset of 200+ representative query-document pairs and run automated regression suites on every commit.',
        ],
        keyTakeaway:
          'Separate retrieval evaluation (Context Recall @ K and Mean Reciprocal Rank) from generation evaluation (groundedness and citation accuracy).',
      },
      {
        id: 'hybrid-search-architecture',
        heading: '2. Why Hybrid Search Outperforms Pure Vector Similarity',
        paragraphs: [
          'Dense vector embeddings excel at capturing semantic synonyms, but they frequently struggle with exact product SKUs, error codes, and domain acronyms. Pairing BM25 lexical search with dense vector similarity via Reciprocal Rank Fusion delivers consistently higher recall.',
        ],
      },
      {
        id: 'latency-budgets',
        heading: '3. Designing Strict Latency & Cost Budgets',
        paragraphs: [
          'Users abandon interactive workflows when responses exceed tolerable thresholds. Use smaller, fine-tuned cross-encoders for fast reranking and cache frequent semantic clusters at the edge.',
        ],
      },
    ],
  },
  {
    id: 'blog-4',
    slug: 'modern-full-stack-state-management-patterns',
    title: 'Server State vs. Client UI State: Simplifying Modern Web Applications',
    excerpt:
      'Eliminate bloated global stores by separating remote server cache, URL search parameters, and ephemeral local component state.',
    category: 'Development',
    publishedAt: 'September 11, 2026',
    readingTime: '5 min read',
    featured: false,
    imageUrl: fullstackImg.src,
    visualTheme: 'slate',
    author: {
      name: 'Marcus Vance',
      role: 'Principal Systems Architect',
      initials: 'MV',
      bio: 'Marcus leads the Full Stack Web Development programme at Appic Skill.',
    },
    sections: [
      {
        id: 'taxonomy-of-state',
        heading: '1. A Clean Taxonomy of Application State',
        paragraphs: [
          'Many complex frontend bugs happen when developers copy remote database records into a global client store and attempt to synchronize mutations manually.',
          'By keeping filter, sort, and pagination state inside the URL query string, users gain shareable links and browser back-button resilience for free.',
        ],
        keyTakeaway:
          'If a piece of state should survive a page refresh or link share, store it in the URL or server database—not in ephemeral memory.',
      },
      {
        id: 'optimistic-transitions',
        heading: '2. Designing Perceived Zero-Latency Interactions',
        paragraphs: [
          'Immediate visual acknowledgment within 150ms keeps interfaces feeling crisp and responsive while background validation completes safely.',
        ],
      },
    ],
  },
  {
    id: 'blog-5',
    slug: 'unit-economics-for-product-and-growth-leaders',
    title: 'Unit Economics 101: Aligning Product Roadmaps with Net Dollar Retention',
    excerpt:
      'Why product managers and growth marketers must speak the language of CAC payback, gross margin, and cohort expansion.',
    category: 'Business',
    publishedAt: 'September 2, 2026',
    readingTime: '6 min read',
    featured: false,
    imageUrl: blogEditorialImg.src,
    visualTheme: 'navy',
    author: {
      name: 'Victoria Sterling',
      role: 'COO & Executive Instructor',
      initials: 'VS',
      bio: 'Victoria leads the Business Strategy & Product Leadership programme at Appic Skill.',
    },
    sections: [
      {
        id: 'metrics-that-matter',
        heading: '1. Connecting Product Features to Financial Health',
        paragraphs: [
          'Shipping features is an output, not an outcome. High-performing product leaders map every major roadmap initiative to one of three financial levers: lowering customer acquisition friction, accelerating time-to-value activation, or expanding multi-year retention.',
        ],
        keyTakeaway:
          'Retention is the foundation of compounding growth. Acquisition poured into a leaky onboarding bucket destroys capital efficiency.',
      },
      {
        id: 'cohort-analysis',
        heading: '2. Reading Cohort Retention Tables Like an Operator',
        paragraphs: [
          'Blended averages hide early warning signs. Always segment retention by acquisition channel and initial activation milestone to discover what makes power users stay.',
        ],
      },
    ],
  },
  {
    id: 'blog-6',
    slug: 'deliberate-practice-in-self-paced-technical-learning',
    title: 'The Science of Deliberate Practice: How Working Professionals Master New Skills',
    excerpt:
      'How to beat "tutorial purgatory" using active recall, spaced project milestones, and structured peer code reviews.',
    category: 'Learning',
    publishedAt: 'August 24, 2026',
    readingTime: '5 min read',
    featured: false,
    imageUrl: uiuxImg.src,
    visualTheme: 'indigo',
    author: {
      name: 'Nadia Okafor',
      role: 'Director of Product Analytics & Instructor',
      initials: 'NO',
      bio: 'Nadia teaches Data Analytics & Business Intelligence at Appic Skill.',
    },
    sections: [
      {
        id: 'escaping-passive-consumption',
        heading: '1. Why Passive Video Watching Fails to Build Muscle Memory',
        paragraphs: [
          'Watching an expert write clean code or design a layout creates an illusion of competence. True neural encoding happens only when you close the reference tab and struggle through building a solution from a blank canvas.',
          'At Appic Skill, every 45 minutes of video instruction is paired with an immediate applied lab or project checkpoint.',
        ],
        keyTakeaway:
          'Follow the 30/70 rule: spend 30% of your study block absorbing concepts and 70% building, debugging, and testing real artifacts.',
      },
      {
        id: 'feedback-loops',
        heading: '2. Shortening Your Feedback Loop with Mentors',
        paragraphs: [
          'Isolated learners often spend days stuck on an environmental bug or architectural dead-end. Bringing specific, reproducible questions to live workshops and mentor office hours compresses months of trial-and-error into minutes.',
        ],
      },
    ],
  },
];

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(currentSlug: string, category: string, limit = 3): BlogArticle[] {
  const sameCategory = BLOG_ARTICLES.filter((b) => b.slug !== currentSlug && b.category === category);
  const others = BLOG_ARTICLES.filter((b) => b.slug !== currentSlug && b.category !== category);
  return [...sameCategory, ...others].slice(0, limit);
}
