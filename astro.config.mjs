import { defineConfig } from 'astro/config';

// TODO: đổi `site` sang tên miền thật khi đã mua (dùng cho canonical, hreflang, sitemap).
export default defineConfig({
  site: 'https://onespeedy.com',
  trailingSlash: 'always',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
  // Express chỉ có bản tiếng Việt. Tạm về /en/; đổi thành /en/clinics/ khi trang cửa trước (W7) xong — sửa cả nginx.conf.
  redirects: { '/en/express': { status: 302, destination: '/en/' } },
});
