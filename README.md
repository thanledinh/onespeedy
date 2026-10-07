# OneSpeedy — Website công ty

Website song ngữ (VI / EN) của OneSpeedy. Dựng bằng Astro, Three.js, GSAP và Lenis.

## Chạy thử

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # xuất web tĩnh ra thư mục dist/
```

## Deploy bằng Dokploy

Repo đã có sẵn `Dockerfile` (build Astro → phục vụ bằng Nginx) và `nginx.conf`.

1. Dokploy → **Create Application** → Provider **GitHub** → repo `thanledinh/onespeedy`, branch `main`.
2. **Build Type:** `Dockerfile` (Docker File: `Dockerfile`, Build Path: `/`).
3. **Domains:** thêm tên miền, **Container Port = 80**, bật HTTPS.
4. Bật **Autodeploy** để mỗi lần push lên `main` là tự build lại.

Kiểm tra sau khi chạy: `https://<tên-miền>/healthz` trả về `ok`.

## Sửa nội dung

- **Toàn bộ chữ (VI + EN):** `src/i18n/ui.ts`
- **Email, Zalo, Messenger, WhatsApp, số điện thoại:** biến `contact` trong `src/i18n/ui.ts`. Để trống `''` thì mục đó tự ẩn.
- **Màu, font, khoảng cách:** `src/styles/global.css` (phần design tokens ở đầu file, theo Brand Guidelines v1.0)

## Hiệu ứng hạt theo section

Gắn `data-shape` lên bất kỳ section nào để hạt biến thành hình đó khi section nằm giữa màn hình:

```html
<section data-shape="sphere" data-place="left" data-opacity="0.6">
```

- Hình: `ring`, `sphere`, `wave`, `galaxy`, `frame`, `helix`, `knot`
- Vị trí: `hero`, `corner`, `right`, `left`, `center`

## Cấu trúc

| Đường dẫn | Nội dung |
| --- | --- |
| `src/pages/[lang]/` | Các trang: trang chủ, dịch vụ, bảng giá, lab, dự án, về chúng tôi, liên hệ |
| `src/layouts/Base.astro` | Khung chung: SEO, hreflang, font, header, footer, chat |
| `src/scripts/scene.ts` | Cảnh 3D: hạt sáng tạo thành chữ O của logo (tải trễ) |
| `src/scripts/app.ts` | Cuộn mượt, hiệu ứng chữ, chuyển trang, con trỏ, form, chat |
| `src/components/` | Header, Footer, Logo (path SVG gốc từ Brand Kit), Chat… |

## Còn phải làm trước khi ra mắt

- [ ] Dán link đặt lịch gọi (Google Calendar / Calendly) vào `contact.booking` trong `src/i18n/ui.ts`
- [ ] Duyệt lại **giá tạm** trong `pricingPage` (4 gói, tùy chọn thêm, bảng so sánh) ở `src/i18n/ui.ts`
- [ ] Mua tên miền, rồi sửa `site` trong `astro.config.mjs`
- [ ] Nối form liên hệ với dịch vụ nhận form thật (Web3Forms / Formspree / API riêng): `initForm` trong `src/scripts/app.ts`
- [ ] Nối khung chat với hệ thống CSKH thật (Crisp / Tawk.to / Zalo OA): `initChat` trong `src/scripts/app.ts`
- [ ] Điền link Zalo / Messenger / WhatsApp / mạng xã hội thật
- [ ] Thay các thẻ "Concept" ở trang Dự án bằng dự án thật khi có
- [ ] Duyệt lại nội dung cam kết, bảng ngân sách trong form và câu trả lời FAQ
- [ ] Thêm sitemap, Google Analytics / Search Console
