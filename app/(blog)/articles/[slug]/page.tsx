
import { notFound } from 'next/navigation';
import { getAllArticles, getArticleBySlug } from '@/lib/content';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

// MDX Custom Components mapping with explicit block spacing and typography resets
const mdxComponents = {
  // Tables – hardened for 2026 financial matrices & cost breakdowns
  table: (props: any) => (
    <div className="my-8 w-full overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full min-w-[640px] border-collapse bg-white text-left text-sm text-slate-700" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-slate-900 text-white sticky top-0" {...props} />,
  th: (props: any) => (
    <th className="p-4 text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 whitespace-nowrap" {...props} />
  ),
  tbody: (props: any) => <tbody className="divide-y divide-slate-100" {...props} />,
  tr: (props: any) => (
    <tr className="even:bg-slate-50/70 hover:bg-blue-50/40 transition-colors" {...props} />
  ),
  td: (props: any) => (
    <td className="p-4 font-medium text-slate-700 align-middle whitespace-normal break-words" {...props} />
  ),

  // Typography – explicit resets to defeat prose collisions
  p: (props: any) => <p className="mb-5 text-base leading-relaxed text-slate-700 last:mb-0" {...props} />,
  ul: (props: any) => <ul className="mb-5 list-disc space-y-2 pl-5 text-slate-700" {...props} />,
  ol: (props: any) => <ol className="mb-5 list-decimal space-y-2 pl-5 text-slate-700" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  h2: (props: any) => (
    <h2 className="mt-12 mb-4 border-b border-slate-100 pb-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-slate-900" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="mt-6 mb-2 text-lg font-semibold text-slate-800" {...props} />
  ),
  strong: (props: any) => <strong className="font-semibold text-slate-900" {...props} />,
  em: (props: any) => <em className="italic text-slate-700" {...props} />,

  // Links, code, quotes, images – critical structural additions
  a: (props: any) => (
    <a className="font-medium text-blue-600 underline decoration-blue-200 underline-offset-2 hover:text-blue-800" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="my-6 border-l-4 border-blue-600 bg-blue-50/50 py-3 pl-5 pr-4 text-slate-700 italic rounded-r-xl" {...props} />
  ),
  code: (props: any) => (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-800" {...props} />
  ),
  pre: (props: any) => (
    <pre className="my-6 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100" {...props} />
  ),
  hr: () => <hr className="my-10 border-slate-200" />,
  img: (props: any) => (
    <img className="my-6 rounded-2xl border border-slate-200 shadow-sm" loading="lazy" {...props} />
  ),
};

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.meta.title,
    description: article.meta.description,
    datePublished: article.meta.date,
    publisher: {
      '@type': 'Organization',
      name: 'USARoofDamageCheck.com',
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="max-w-4xl mx-auto space-y-10">
        <article className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 md:p-12">
          {/* Header Metadata */}
          <header className="border-b border-slate-100 pb-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center bg-blue-50 text-blue-700 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                {article.meta.category}
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                ✓ Fact Checked & Updated for 2026
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              {article.meta.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
              <span>Published: {article.meta.date}</span>
              <span>•</span>
              <span>By Editorial Research Team</span>
            </div>
          </header>

          {/* Key Takeaways Box */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 border-l-4 border-blue-600 p-5 rounded-r-2xl mb-8 shadow-sm">
            <h4 className="text-xs uppercase tracking-wider font-bold text-blue-900 mb-1">
              Executive Summary
            </h4>
            <p className="text-base md:text-lg font-medium text-slate-800 leading-relaxed">
              {article.meta.description}
            </p>
          </div>

          {/* Clean MDX Content Render with explicit node overrides */}
          <div className="text-slate-700 [&>*:first-child]:mt-0">
            <MDXRemote
              source={article.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>
        </article>

        {/* High-Converting Pay-Per-Call Banner */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-700">
          <div className="space-y-3 text-center md:text-left">
            <span className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              Verified Local Contractor Network
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Need an Immediate Roof Inspection?
            </h3>
            <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed">
              Connect directly with licensed, background-checked roofing specialists in your ZIP code. Free estimate with zero commitment.
            </p>
          </div>
          <a
            href="tel:18000000000"
            className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg py-4 px-8 rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 text-center whitespace-nowrap"
          >
            📞 Call Free Estimate
          </a>
        </section>

        {/* Legal Disclaimer */}
        <footer className="bg-white border border-slate-200/60 rounded-2xl p-6 text-xs text-slate-500 leading-relaxed shadow-sm">
          <p>
            <strong className="text-slate-700">Disclaimer & Matching Disclosure:</strong> USARoofDamageCheck.com operates as an independent matching service connecting homeowners with licensed service providers. We are not a direct contractor or insurer. All contractors are independent entities, and USARoofDamageCheck.com does not warrant or guarantee any work performed.
          </p>
        </footer>
      </div>
    </main>
  );
}