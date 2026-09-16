import { MetadataRoute } from 'next';
import { ALL_ZIPS } from '@/lib/noaa';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourroofingapp.com';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ];

  const zipPages: MetadataRoute.Sitemap = ALL_ZIPS.map((zip: string) => ({
    url: `${baseUrl}/storm-damage/${zip}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...zipPages];
}