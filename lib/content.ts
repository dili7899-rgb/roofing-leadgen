import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'app', 'content', 'articles');

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(articlesDirectory)) return [];
  const filenames = fs.readdirSync(articlesDirectory);
  
  const articles = filenames
    .filter((filename) => /\.mdx?$/.test(filename))
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, '');
      const fullPath = path.join(articlesDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || '2026-01-01',
        category: data.category || 'Roofing & HVAC',
        readingTime: data.readingTime || '8 min read',
      };
    });

  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getArticleBySlug(slug: string) {
  let fullPath = path.join(articlesDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(articlesDirectory, `${slug}.md`);
  }

  if (!fs.existsSync(fullPath)) return null;
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    meta: {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || '2026-01-01',
      category: data.category || 'Roofing & HVAC',
    },
    content,
  };
}