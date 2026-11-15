import type { APIRoute } from 'astro';
import { path, type Lang, type PageKey } from '../i18n/ui';

// Sitemap cho Google: mọi trang song ngữ của web OneSpeedy, cộng trang SEO Ops (/seo, /en/seo) do máy chủ SEO Ops
// phục vụ trên cùng tên miền. Express (chỉ tiếng Việt, đang ẩn) không có ở đây. Sửa nội dung trang thì đổi LASTMOD.
const PAGES: PageKey[] = ['home', 'services', 'pricing', 'work', 'about', 'contact'];
const LASTMOD = '2026-11-15';

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://onespeedy.com')).origin;
  const abs = (p: string) => `${origin}${p}`;
  const pairs: Array<Record<Lang, string>> = [
    ...PAGES.map((page) => ({ vi: abs(path('vi', page)), en: abs(path('en', page)) })),
    { vi: abs('/seo'), en: abs('/en/seo') },
  ];
  const entry = (loc: string, alt: Record<Lang, string>) =>
    `<url><loc>${loc}</loc><xhtml:link rel="alternate" hreflang="vi" href="${alt.vi}"/><xhtml:link rel="alternate" hreflang="en" href="${alt.en}"/><xhtml:link rel="alternate" hreflang="x-default" href="${alt.en}"/><lastmod>${LASTMOD}</lastmod></url>`;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pairs.flatMap((p) => [entry(p.en, p), entry(p.vi, p)]).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
