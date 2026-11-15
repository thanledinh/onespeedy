// Toàn bộ nội dung chữ của website, song ngữ VI / EN.
// Sửa chữ ở đây, không cần đụng vào giao diện.

export const languages = { vi: 'Tiếng Việt', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'vi';

export type PageKey = 'home' | 'services' | 'pricing' | 'work' | 'about' | 'contact' | 'express';

export const routes: Record<PageKey, string> = {
  home: '',
  services: 'services/',
  pricing: 'pricing/',
  work: 'work/',
  about: 'about/',
  contact: 'contact/',
  express: 'express/',
};

// Thứ tự trang cho hiệu ứng "cuộn tiếp để sang trang sau" (Express đứng ngoài chuỗi này)
export const pageOrder: PageKey[] = ['home', 'services', 'pricing', 'work', 'about', 'contact'];
export function nextPage(page: PageKey): PageKey {
  return pageOrder[(pageOrder.indexOf(page) + 1) % pageOrder.length];
}

// Hình hạt 3D riêng của mỗi trang: hiện ở đầu trang đó, và ở cuối trang trước để báo trước trang sau.
// Đổi ở đây thì đổi luôn data-shape ở section đầu của trang tương ứng.
export const pageShape: Record<PageKey, string> = {
  home: 'ring',
  services: 'layers',
  pricing: 'bars',
  work: 'knot',
  about: 'helix',
  contact: 'bubble',
  express: 'sphere',
};

export function path(lang: Lang, page: PageKey) {
  return `/${lang}/${routes[page]}`;
}

// Trang chỉ có bản tiếng Việt (Express là gói cho tiệm nhỏ ở VN, không hiện với khách quốc tế).
export const viOnlyPages: PageKey[] = ['express'];
export function hasPage(lang: Lang, page: PageKey) {
  return lang === 'vi' || !viOnlyPages.includes(page);
}

// Thông tin liên hệ — TODO: điền thông tin thật khi có. Để trống ('') thì mục đó tự ẩn.
export const contact = {
  // Link đặt lịch gọi (Google Calendar / Calendly). Để trống thì nút "Đặt lịch gọi" dẫn về trang Liên hệ.
  booking: '',
  email: 'hello@onespeedy.com',
  phone: '0777 710 027',
  zalo: '',
  messenger: 'https://m.me/onespeedy',
  whatsapp: '',
  linkedin: '',
  facebook: 'https://www.facebook.com/onespeedy',
};

// Gói OneSpeedy Express cho tiệm nhỏ.
// Ô nào để trống thì trang /express/ hiện nhãn vàng [..] đúng chỗ đó và tự gắn noindex (Google chưa lập chỉ mục).
export const express = {
  price: '$111', // giá khởi điểm trọn gói
  days: '5', // số ngày làm việc từ khi nhận đủ ảnh & thông tin
  pages: '5', // số trang của website
  revisions: '5', // số lần chỉnh sửa trước khi lên mạng
  // Câu trả lời "Giá đã gồm tên miền và hosting chưa?"
  hosting: {
    vi: 'Chưa. Tên miền và hosting trả riêng theo nhà cung cấp bạn chọn — chúng tôi tư vấn và cài đặt giúp bạn.',
    en: 'No. Domain and hosting are paid separately to the provider you choose — we advise and set them up for you.',
  },
  // Các ngành đã có mẫu (khớp với ngành có demo trong site-kit)
  industries: { vi: 'tiệm nail, nhà hàng & quán ăn', en: 'nail salons, restaurants & eateries' },
};

const vi = {
  meta: {
    siteName: 'OneSpeedy',
    home: {
      title: 'OneSpeedy — Thiết kế website cao cấp tại Việt Nam & quốc tế',
      description:
        'OneSpeedy thiết kế và phát triển website cao cấp, song ngữ, tốc độ cao và chuẩn SEO cho doanh nghiệp tại Việt Nam và quốc tế.',
    },
    services: {
      title: 'Dịch vụ thiết kế website — OneSpeedy',
      description:
        'Website doanh nghiệp, landing page, thương mại điện tử, trải nghiệm 3D, SEO và vận hành website trọn gói.',
    },
    pricing: {
      title: 'Bảng giá thiết kế website — OneSpeedy',
      description: 'Bảng giá thiết kế website theo quy mô và độ phức tạp — từ website gọn vài trang đến dự án nhiều tính năng, bán hàng online và 3D.',
    },
    work: {
      title: 'Dự án — OneSpeedy',
      description: 'Mẫu giao diện website OneSpeedy theo từng ngành: tiệm nail, nhà hàng Việt, detailing & PPF, head spa.',
    },
    about: {
      title: 'Về chúng tôi — OneSpeedy',
      description: 'OneSpeedy là studio thiết kế và phát triển website cho thương hiệu tại Việt Nam và quốc tế.',
    },
    contact: {
      title: 'Liên hệ & nhận báo giá — OneSpeedy',
      description: 'Kể cho chúng tôi về dự án của bạn. OneSpeedy sẽ phản hồi với đề xuất và báo giá chi tiết.',
    },
    express: {
      title: 'OneSpeedy Express — Website trọn gói cho tiệm nhỏ',
      description: 'Website đẹp, nhanh, chuẩn SEO cho tiệm nhỏ trên mẫu do OneSpeedy thiết kế. Chọn mẫu, gửi thông tin, lên mạng trong vài ngày.',
    },
  },
  nav: {
    home: 'Trang chủ',
    services: 'Dịch vụ',
    pricing: 'Bảng giá',
    work: 'Dự án',
    about: 'Về chúng tôi',
    contact: 'Liên hệ',
    express: 'OneSpeedy Express',
    cta: 'Bắt đầu dự án',
    book: 'Đặt lịch gọi',
    bookLong: 'Đặt lịch gọi 15 phút',
    menu: 'Menu',
    close: 'Đóng',
    skip: 'Bỏ qua đến nội dung chính',
    langLabel: 'Ngôn ngữ',
  },
  tagline: 'Fast to build. Easy to find.',
  home: {
    eyebrow: 'Studio thiết kế website · Việt Nam & quốc tế',
    // Tagline giữ nguyên tiếng Anh, không dịch.
    titleA: 'Fast to build.',
    titleB: 'Easy to find.',
    lead:
      'OneSpeedy thiết kế và phát triển website cao cấp cho những thương hiệu muốn dẫn đầu — đẹp như một tác phẩm, nhanh như một ứng dụng, và được tối ưu để khách hàng tìm thấy bạn trước.',
    ctaPrimary: 'Bắt đầu dự án',
    ctaSecondary: 'Xem dịch vụ',
    scroll: 'Cuộn để khám phá',
    manifestoLabel: 'Tuyên ngôn',
    manifesto:
      'Một website không chỉ để trưng bày. Nó là nhân viên bán hàng làm việc 24/7, là ấn tượng đầu tiên, và là nơi khách hàng quyết định có tin bạn hay không. Chúng tôi xây nó đúng như vậy.',
    marquee: [
      'Thiết kế UI/UX',
      'Three.js & WebGL',
      'SEO kỹ thuật',
      'Website song ngữ',
      'Thương mại điện tử',
      'Core Web Vitals',
      'Chuyển động điện ảnh',
      'Landing page chuyển đổi',
    ],
    servicesLabel: 'Dịch vụ',
    servicesTitle: 'Mọi thứ một website đẳng cấp cần — ở cùng một nơi.',
    servicesMore: 'Tất cả dịch vụ',
    pillarsLabel: 'Vì sao là OneSpeedy',
    pillarsTitle: 'Ba cam kết trong mọi dự án.',
    pillars: [
      {
        k: 'Nhanh',
        title: 'Tốc độ là một tính năng',
        text: 'Mỗi website được đo bằng Lighthouse và Core Web Vitals trước khi bàn giao. Trang tải nhanh giữ chân khách và được Google ưu tiên.',
      },
      {
        k: 'Đẹp',
        title: 'Thiết kế may đo',
        text: 'Không dùng theme đại trà. Mỗi giao diện được thiết kế riêng từ nhận diện thương hiệu, với chuyển động và chi tiết được chăm chút.',
      },
      {
        k: 'Được tìm thấy',
        title: 'Song ngữ & SEO từ gốc',
        text: 'Cấu trúc đa ngôn ngữ, dữ liệu có cấu trúc và SEO kỹ thuật được làm ngay từ ngày đầu — sẵn sàng cho khách hàng trong nước và quốc tế.',
      },
    ],
    processLabel: 'Quy trình',
    processTitle: 'Từ ý tưởng đến ra mắt, rõ ràng từng bước.',
    workLabel: 'Dự án',
    workTitle: 'Mẫu giao diện, mỗi ngành một ý tưởng.',
    workText: 'OneSpeedy vừa ra mắt nên chưa có dự án khách hàng để giới thiệu. Đây là các mẫu chúng tôi dựng cho từng ngành.',
    workMore: 'Xem cả bốn mẫu',
    ctaTitleA: 'Có ý tưởng?',
    ctaTitleB: 'Hãy biến nó thành website đẳng cấp.',
    ctaText: 'Kể cho chúng tôi về dự án. Bạn sẽ nhận đề xuất hướng thiết kế và báo giá chi tiết.',
    // Giao diện sáng của trang chủ
    heroSecondary: 'Xem các mẫu',
    heroPoints: ['Thiết kế riêng, không dùng theme có sẵn', 'Song ngữ Việt · Anh', 'Chuẩn SEO từ gốc'],
    heroChips: ['Song ngữ VI · EN', 'Ưu tiên điện thoại', 'Chuẩn SEO'],
    stripLabel: 'Đã có mẫu cho',
    strip: ['Tiệm nail', 'Nhà hàng Việt', 'Head spa', 'Detailing & PPF'],
    cardMore: 'Xem thêm',
    processText: 'Bốn bước rõ ràng. Bạn duyệt thiết kế trước khi chúng tôi lập trình.',
  },
  services: [
    {
      title: 'Website doanh nghiệp',
      text: 'Hồ sơ năng lực số sang trọng, chuẩn SEO, dễ tự cập nhật nội dung.',
      items: ['Thiết kế giao diện riêng', 'Trang quản trị nội dung', 'Song ngữ theo yêu cầu', 'Tối ưu SEO on-page'],
    },
    {
      title: 'Landing page chuyển đổi',
      text: 'Trang đích cho chiến dịch quảng cáo, tối ưu từng điểm chạm để ra khách.',
      items: ['Kịch bản nội dung bán hàng', 'Form nhận khách & nút đặt lịch', 'Gắn mã đo lường quảng cáo', 'Thử nghiệm A/B'],
    },
    {
      title: 'Thương mại điện tử',
      text: 'Cửa hàng online nhanh, thanh toán trong nước và quốc tế, quản lý đơn gọn gàng.',
      items: ['Danh mục & giỏ hàng', 'Cổng thanh toán', 'Quản lý đơn & kho', 'Tối ưu tốc độ trang sản phẩm'],
    },
    {
      title: 'Trải nghiệm 3D & tương tác',
      text: 'Three.js, WebGL và chuyển động điện ảnh — để thương hiệu không thể bị lướt qua.',
      items: ['Cảnh 3D thời gian thực', 'Hiệu ứng cuộn & chuyển trang', 'Trình diễn sản phẩm 3D', 'Tối ưu cho điện thoại'],
    },
    {
      title: 'SEO & tốc độ',
      text: 'Tối ưu Core Web Vitals, dữ liệu có cấu trúc, đa ngôn ngữ — để Google tìm thấy bạn.',
      items: ['Kiểm tra SEO kỹ thuật', 'Tối ưu Core Web Vitals', 'SEO quốc tế (hreflang)', 'Google Business Profile'],
    },
    {
      title: 'Vận hành & bảo trì',
      text: 'Hosting, bảo mật, sao lưu và cập nhật — bạn tập trung kinh doanh.',
      items: ['Cài hosting trong tài khoản của bạn', 'Sao lưu định kỳ', 'Giám sát bảo mật', 'Hỗ trợ cập nhật nội dung'],
    },
  ],
  process: [
    {
      title: 'Khám phá',
      text: 'Tìm hiểu doanh nghiệp, khách hàng và mục tiêu. Chốt phạm vi, sitemap và lộ trình rõ ràng.',
    },
    {
      title: 'Thiết kế',
      text: 'Định hướng hình ảnh, thiết kế giao diện và chuyển động. Bạn duyệt từng màn hình trước khi lập trình.',
    },
    {
      title: 'Phát triển',
      text: 'Lập trình chuẩn hiệu năng, song ngữ, chuẩn SEO. Kiểm thử trên mọi thiết bị và trình duyệt.',
    },
    {
      title: 'Ra mắt & tăng trưởng',
      text: 'Đưa website lên mạng, gắn đo lường, bàn giao và đồng hành tối ưu sau ra mắt.',
    },
  ],
  servicesPage: {
    label: 'Dịch vụ',
    titleA: 'Thiết kế, xây dựng',
    titleB: 'và làm website tăng trưởng.',
    lead: 'Từ một landing page cho chiến dịch đến một nền tảng thương mại điện tử song ngữ — mỗi dự án đều được may đo, đo lường và tối ưu.',
    includes: 'Bao gồm',
    processLabel: 'Quy trình',
    processTitle: 'Bốn bước, không bất ngờ.',
    faqLabel: 'Câu hỏi thường gặp',
    faqTitle: 'Những điều khách hàng hay hỏi.',
    faq: [
      {
        q: 'Làm một website mất bao lâu?',
        a: 'Tuỳ quy mô. Landing page nhanh hơn nhiều so với website nhiều trang hay thương mại điện tử. Sau buổi trao đổi đầu tiên, bạn sẽ nhận lộ trình với mốc thời gian cụ thể.',
      },
      {
        q: 'Tôi có tự cập nhật nội dung được không?',
        a: 'Có, với gói Signature và Custom: chúng tôi cung cấp trang quản trị dễ dùng và hướng dẫn chi tiết, để đội của bạn tự đăng bài, sửa chữ và thay hình. Với gói Launch, việc sửa nội dung nằm trong gói Chăm sóc website.',
      },
      {
        q: 'OneSpeedy có làm cho khách hàng nước ngoài không?',
        a: 'Có. Chúng tôi làm việc bằng tiếng Việt và tiếng Anh, xây website đa ngôn ngữ và tối ưu SEO cho từng thị trường.',
      },
      {
        q: 'Website 3D có làm trang chậm không?',
        a: 'Không, nếu được làm đúng. Hiệu ứng 3D được tải sau nội dung chính, tự giảm chất lượng trên máy yếu và tắt khi người dùng chọn giảm chuyển động.',
      },
      {
        q: 'Sau khi bàn giao thì sao?',
        a: 'Bạn sở hữu toàn bộ website. Nếu cần, chúng tôi tiếp tục vận hành, bảo trì và tối ưu theo gói hàng tháng.',
      },
      {
        q: 'Thanh toán như thế nào?',
        a: 'Thanh toán chia theo các giai đoạn của dự án. Lịch thanh toán cụ thể được ghi rõ trong báo giá và hợp đồng.',
      },
      {
        q: 'Tôi được chỉnh sửa bao nhiêu lần?',
        a: 'Số vòng chỉnh sửa cho từng giai đoạn được ghi rõ trong báo giá. Bạn duyệt thiết kế trước khi lập trình, nên rất ít phải sửa về sau.',
      },
      {
        q: 'Ai sở hữu mã nguồn và nội dung?',
        a: 'Bạn. Sau khi thanh toán đủ, toàn bộ mã nguồn, thiết kế và nội dung thuộc về bạn.',
      },
      {
        q: 'OneSpeedy có lo tên miền và hosting không?',
        a: 'Có. Chúng tôi tư vấn, đăng ký và cài đặt giúp bạn. Chi phí tên miền và hosting tính theo nhà cung cấp.',
      },
      {
        q: 'Có viết nội dung cho website không?',
        a: 'Có. Gói nào cũng đã gồm viết nội dung, soạn từ buổi phỏng vấn có ghi âm và website hiện tại của bạn, chuẩn SEO. Thêm ngôn ngữ tính theo tùy chọn thêm.',
      },
      {
        q: 'Website có được bảo hành không?',
        a: 'Có. Thời hạn và phạm vi bảo hành được ghi trong hợp đồng; sau đó bạn có thể chọn gói chăm sóc hàng tháng.',
      },
    ],
  },
  workPage: {
    label: 'Dự án',
    titleA: 'Mẫu giao diện,',
    titleB: 'mỗi ngành một ý tưởng.',
    lead: 'OneSpeedy vừa ra mắt nên chưa có dự án khách hàng để giới thiệu. Đây là bốn mẫu chúng tôi dựng theo từng ngành: mỗi mẫu lấy ý tưởng từ chính nghề đó, không dùng khung "chữ một bên, ảnh một bên".',
    badge: 'Mẫu giao diện',
    note: 'Tên tiệm, giá, giờ mở cửa và đánh giá trong mẫu đều là dữ liệu mẫu. Bản xem thử trực tiếp sắp có.',
    cta: 'Muốn web kiểu này',
    // Ảnh chụp từng mẫu nằm ở src/assets/mau, ghép theo `id` trong components/WorkCard.astro
    templates: [
      {
        id: 'nail',
        name: 'Mai Nail Atelier',
        quote: 'Small studio, careful hands.',
        industry: 'Tiệm nail · Mỹ',
        planLine: 'Gói Express · Tiếng Anh',
        hue: 'gold',
        points: [
          'Bìa là vòng mẫu móng xoè hình quạt: ảnh móng thật xen ô màu sơn',
          'Bảng dịch vụ có thời lượng, độ bền, giá; lọc theo loại',
          'Thẻ hẹn có mã QR; đổi được bảng màu và font cho từng tiệm',
        ],
      },
      {
        id: 'pho',
        name: 'Phở Lan',
        quote: 'Ngon từ nước dùng.',
        industry: 'Nhà hàng Việt · Mỹ',
        planLine: 'Gói Launch + thêm ngôn ngữ · Anh + Việt',
        hue: 'slate',
        points: [
          'Hero là sơ đồ giải phẫu một tô phở: trong nồi, trong tô',
          'Thực đơn như bảng menu đánh số trên tường',
          'Ưu đãi riêng theo nguồn quảng cáo; giờ trưa đưa bún, cơm lên trước',
        ],
      },
      {
        id: 'guong',
        name: 'Gương Studio',
        quote: 'Bề mặt sơn. Như gương.',
        industry: 'Detailing, dán PPF · Việt Nam',
        planLine: 'Gói Signature + cảnh 3D · Tiếng Việt',
        hue: 'teal',
        points: [
          'Tấm thân xe 3D chia trước / sau, kéo hoặc cuộn để so',
          'Máy tính báo giá: chọn cỡ xe và dịch vụ, ra giá tạm tính',
          'Máy yếu tự hiện ảnh thay 3D; nút Zalo và Gọi luôn trong tầm tay',
        ],
      },
      {
        id: 'spa',
        name: 'Sương Head Spa',
        quote: 'Rest your head.',
        industry: 'Head spa · Mỹ',
        planLine: 'Gói Launch · Tiếng Anh',
        hue: 'slate',
        points: [
          'Hero là cuộn phim một giờ gội đầu trên thước 00–60 phút',
          'Bộ chọn buổi: chọn liệu trình, ra tổng số phút và giá',
          'Chuyển động chỉ dùng CSS, gần như không có JavaScript',
        ],
      },
    ],
    commonTitle: 'Mẫu nào cũng có',
    common: [
      'Ưu tiên điện thoại: thanh Gọi, Chỉ đường, Đặt lịch dính đáy màn hình',
      'SEO dựng sẵn: tiêu đề, mô tả, sitemap, dữ liệu cấu trúc đúng ngành',
      'Dữ liệu tách khỏi giao diện: làm cho tiệm mới chỉ cần thay dữ liệu và ảnh',
      'Chạy dạng file tĩnh, không cần máy chủ riêng',
    ],
  },
  aboutPage: {
    label: 'Về chúng tôi',
    titleA: 'Một studio nhỏ',
    titleB: 'với tiêu chuẩn lớn.',
    lead: 'OneSpeedy được thành lập với một niềm tin đơn giản: doanh nghiệp Việt xứng đáng có những website đẹp và nhanh ngang tầm thế giới — và khách hàng quốc tế xứng đáng có một đối tác tận tâm tại Việt Nam.',
    storyLabel: 'Câu chuyện logo',
    storyTitle: 'Mọi thứ nằm trong chữ O.',
    story: [
      { k: 'Vòng tròn', text: 'Một vòng tròn hình học tuyệt đối — nền tảng vững chắc, có hệ thống, có thể mở rộng.' },
      { k: 'Khoảng hở', text: 'Vòng tròn mở ở góc phải trên, như một thanh tiến trình sắp hoàn tất — tốc độ, làm nhanh.' },
      { k: 'Điểm teal', text: 'Một điểm nằm trên quỹ đạo — vật đang di chuyển, cũng là điểm đến trên bản đồ: dễ tìm thấy.' },
    ],
    valuesLabel: 'Giá trị',
    valuesTitle: 'Cách chúng tôi làm việc.',
    values: [
      { title: 'Minh bạch', text: 'Phạm vi, chi phí và tiến độ rõ ràng từ đầu. Bạn luôn biết dự án đang ở đâu.' },
      { title: 'Tận tâm với chi tiết', text: 'Từng khoảng cách, từng chuyển động đều có lý do. Chi tiết tạo nên đẳng cấp.' },
      { title: 'Đo được', text: 'Đẹp thôi chưa đủ. Mỗi website được đo tốc độ, SEO và chuyển đổi.' },
      { title: 'Đồng hành dài hạn', text: 'Ra mắt chỉ là bắt đầu. Chúng tôi ở lại để website tiếp tục tăng trưởng.' },
    ],
    teamTitle: 'Đội ngũ đang mở rộng',
    teamText: 'Chúng tôi đang tìm những designer và developer yêu cái đẹp và tốc độ.',
    teamCta: 'Gửi thư cho chúng tôi',
  },
  contactPage: {
    label: 'Liên hệ',
    titleA: 'Hãy kể cho chúng tôi',
    titleB: 'về dự án của bạn.',
    lead: 'Điền vài thông tin bên dưới. Chúng tôi sẽ phản hồi với đề xuất hướng thiết kế và báo giá chi tiết.',
    channelsTitle: 'Hoặc nhắn trực tiếp',
    bookText: 'Chọn giờ phù hợp, chúng tôi gọi cho bạn.',
    emailLabel: 'Email',
    form: {
      name: 'Họ và tên',
      email: 'Email',
      phone: 'Số điện thoại / Zalo',
      company: 'Công ty',
      services: 'Bạn quan tâm đến',
      serviceOptions: ['Website doanh nghiệp', 'Landing page', 'Thương mại điện tử', 'Website 3D', 'OneSpeedy Express', 'SEO', 'Bảo trì'],
      budget: 'Ngân sách dự kiến',
      budgetOptions: ['Chưa xác định', 'Dưới $3,000', '$3,000–5,000', '$5,000–10,000', '$10,000–20,000', '$20,000+'],
      message: 'Mô tả ngắn về dự án',
      submit: 'Gửi yêu cầu',
      sending: 'Đang gửi…',
      required: 'Vui lòng điền mục này',
      invalidEmail: 'Email chưa đúng định dạng',
      successTitle: 'Đã nhận yêu cầu!',
      successText: 'Cảm ơn bạn. Chúng tôi sẽ liên hệ lại sớm nhất trong giờ làm việc.',
      again: 'Gửi yêu cầu khác',
      privacy: 'Thông tin của bạn chỉ dùng để liên hệ về dự án.',
    },
  },
  // Giá USD chung với bản EN (Launch, Signature theo quyết định 1 ngày 24/10/2026). Các add-on vẫn là giá tạm, cần duyệt lại.
  pricingPage: {
    label: 'Bảng giá',
    titleA: 'Giá rõ ràng.',
    titleB: 'Không bất ngờ.',
    lead: 'Gói chia theo quy mô và độ phức tạp, không theo loại website. Giá dưới đây là mức khởi điểm — báo giá cố định được gửi sau buổi trao đổi 15 phút.',
    from: 'Từ',
    note: 'Giá tham khảo bằng USD.',
    expressHint: 'Tiệm nhỏ mới bắt đầu?',
    expressLink: 'Xem OneSpeedy Express',
    recommended: 'Đề xuất',
    choose: 'Chọn gói này',
    // Một bảng giá USD chung cho cả bản VI và EN (quyết định ngày 25/10/2026): gói và mức giá giống hệt bản EN.
    plans: [
      {
        id: 'launch',
        name: 'Launch',
        for: 'Website gọn cho một mục tiêu rõ ràng',
        price: '3,900',
        featured: true,
        features: ['Đến 6 trang, thiết kế riêng', 'Đã gồm viết nội dung, soạn từ buổi phỏng vấn có ghi âm', 'Form nhận khách hoặc nút đặt lịch nối với công cụ bạn đang dùng', 'SEO kỹ thuật & tối ưu tốc độ', '2 vòng chỉnh sửa'],
      },
      {
        id: 'signature',
        name: 'Signature',
        for: 'Website đầy đủ cho doanh nghiệp đang vận hành',
        price: '7,500',
        featured: false,
        features: ['Đến 15 trang', 'Viết nội dung cho mọi trang', 'Chuyển nội dung & chuyển hướng từ website cũ', 'SEO on-page & dữ liệu có cấu trúc', 'Chuyển động & chuyển trang mượt mà'],
      },
      {
        id: 'custom',
        name: 'Custom',
        for: 'Nhiều chi nhánh, đa ngôn ngữ hoặc nhiều tính năng',
        price: 'Trao đổi',
        featured: false,
        features: ['Lên phạm vi cùng bạn', 'Tính năng riêng: tài khoản, tìm kiếm, bảng điều khiển…', 'Kết nối thanh toán, CRM, email', 'Đa ngôn ngữ', 'Ưu tiên hỗ trợ'],
      },
    ],
    includedTitle: 'Gói nào cũng có',
    included: ['Thiết kế riêng theo thương hiệu', 'Hiển thị đẹp trên mọi thiết bị', 'Bạn sở hữu mã nguồn và thiết kế sau khi thanh toán đủ', 'Đo tốc độ trước khi bàn giao', 'Hướng dẫn sử dụng & bàn giao'],
    addonsTitle: 'Tùy chọn thêm',
    addons: [
      { name: 'Bán hàng online', price: 'Báo giá', unit: 'theo quy mô' },
      { name: 'Cảnh 3D riêng', price: 'Báo giá', unit: 'theo độ phức tạp' },
      { name: 'Thêm ngôn ngữ', price: '+$400', unit: '/ ngôn ngữ' },
      { name: 'Trang bổ sung', price: '+$250', unit: '/ trang' },
      { name: 'Chăm sóc website', price: 'Từ $190', unit: '/ tháng' },
      { name: 'SEO tăng trưởng', price: '$500', unit: '/ tháng' },
    ],
    compareTitle: 'So sánh các gói',
    compareFeature: 'Hạng mục',
    // 'yes' = có, 'no' = không, 'add' = tùy chọn thêm; chữ khác hiển thị nguyên văn
    compare: [
      ['Số trang', 'Đến 6', 'Đến 15', 'Theo dự án'],
      ['Viết nội dung', 'yes', 'yes', 'yes'],
      ['Chuyển nội dung & chuyển hướng', 'no', 'yes', 'yes'],
      ['Song ngữ', 'add', 'add', 'yes'],
      ['Trang quản trị nội dung', 'no', 'yes', 'yes'],
      ['Tính năng riêng (tài khoản, tìm kiếm…)', 'no', 'add', 'yes'],
      ['Kết nối hệ thống (thanh toán, CRM…)', 'no', 'add', 'yes'],
      ['Bán hàng online', 'add', 'add', 'add'],
      ['Cảnh 3D riêng', 'add', 'add', 'add'],
      ['SEO', 'Kỹ thuật', 'On-page', 'On-page + quốc tế'],
    ],
    compareLegend: { yes: 'Có', no: 'Không', add: 'Tùy chọn thêm' },
    faqTitle: 'Câu hỏi về giá',
    faq: [
      {
        q: 'Vì sao giá ghi "từ"?',
        a: 'Mỗi website được làm riêng nên chi phí phụ thuộc số trang, tính năng và hiệu ứng. Sau buổi trao đổi, bạn nhận báo giá cố định, ghi rõ từng hạng mục.',
      },
      {
        q: 'Làm website bán hàng hoặc có 3D thì chọn gói nào?',
        a: 'Gói nào cũng được — tùy độ phức tạp. Một cửa hàng vài chục sản phẩm khác hẳn hệ thống nhiều kho, đa tiền tệ; một chút 3D điểm xuyết khác hẳn một cảnh 3D dựng riêng. Chúng tôi báo giá phần này sau khi nắm rõ yêu cầu.',
      },
      {
        q: 'Giá đã gồm tên miền và hosting chưa?',
        a: 'Chưa. Tên miền và hosting tính riêng theo nhà cung cấp bạn chọn. Chúng tôi tư vấn và cài đặt giúp bạn.',
      },
      {
        q: 'Thanh toán như thế nào?',
        a: 'Thanh toán chia theo các giai đoạn của dự án. Lịch thanh toán cụ thể được ghi rõ trong báo giá và hợp đồng.',
      },
      {
        q: 'Tôi chưa biết nên chọn gói nào?',
        a: 'Đặt lịch gọi 15 phút. Chúng tôi sẽ nghe mục tiêu của bạn và đề xuất gói phù hợp — kể cả khi đó là gói nhỏ nhất.',
      },
      {
        q: 'Tôi chỉ có một tiệm nhỏ, ngân sách vừa phải?',
        a: 'Hãy xem OneSpeedy Express: website trọn gói trên mẫu do chúng tôi thiết kế, dành riêng cho tiệm nhỏ mới bắt đầu.',
      },
    ],
  },
  expressPage: {
    label: 'OneSpeedy Express',
    titleA: 'Tiệm của bạn,',
    titleB: 'có mặt trên mạng.',
    lead: 'Chọn một mẫu do đội OneSpeedy thiết kế, gửi ảnh và thông tin tiệm. Chúng tôi dựng, tối ưu và đưa lên mạng — bạn chỉ việc đón khách.',
    // {price}, {days}… lấy từ `express` ở đầu file
    facts: [
      { k: 'Giá trọn gói', v: 'Từ {price}' },
      { k: 'Thời gian', v: '{days} ngày làm việc' },
      { k: 'Website', v: '{pages} trang' },
    ],
    cta: 'Nhận tư vấn',
    ctaAlt: 'Gói gồm những gì',
    forLabel: 'Dành cho',
    forTitle: 'Tiệm nhỏ muốn khách tìm thấy mình.',
    forText: 'Tiệm nail, nhà hàng, quán ăn, spa, salon tóc — những cửa hàng cần một website gọn và đẹp, để khách tìm thấy trên Google và liên hệ ngay từ điện thoại.',
    industries: 'Mẫu đang có cho: {industries}',
    sampleLabel: 'Mẫu Express',
    sampleTitle: 'Một mẫu Express đang có.',
    sampleMore: 'Xem tất cả mẫu',
    stepsLabel: 'Cách làm',
    stepsTitle: 'Ba bước, không cần họp dài.',
    steps: [
      { k: 'Chọn', title: 'Chọn mẫu', text: 'Chọn một mẫu hợp với tiệm trong bộ mẫu OneSpeedy thiết kế cho từng ngành.' },
      { k: 'Gửi', title: 'Gửi thông tin', text: 'Gửi tên tiệm, ảnh, bảng giá dịch vụ, giờ mở cửa và địa chỉ.' },
      { k: 'Lên mạng', title: 'Đón khách', text: 'Chúng tôi dựng, kiểm tra tốc độ và đưa website lên mạng trong {days} ngày làm việc.' },
    ],
    offerLabel: 'Gói Express',
    offerTitle: 'Giá gọn vì phạm vi cố định, không phải vì làm vội.',
    offerText: [
      'Express dùng mẫu OneSpeedy đã thiết kế sẵn và một phạm vi cố định, nên không có các vòng thiết kế riêng — phần làm nên chi phí của một website may đo.',
      'Chuẩn kỹ thuật thì giữ nguyên như mọi website OneSpeedy: tải nhanh, chuẩn SEO, đẹp trên điện thoại.',
    ],
    upgrade: 'Khi tiệm lớn lên và cần thiết kế riêng, bạn có thể nâng lên gói Launch hoặc Signature.',
    upgradeLink: 'Xem bảng giá',
    plan: {
      name: 'Express',
      for: 'Website trọn gói cho tiệm nhỏ',
      from: 'Từ',
      features: [
        '{pages} trang trên mẫu do OneSpeedy thiết kế',
        'Đẹp và nhanh trên điện thoại',
        'Nút gọi, nhắn tin và chỉ đường',
        'SEO cơ bản để khách tìm thấy trên Google',
        'Chỉnh sửa {revisions} lần trước khi lên mạng',
      ],
      cta: 'Bắt đầu với Express',
    },
    faqTitle: 'Câu hỏi về Express',
    faq: [
      { q: 'Bao lâu thì website lên mạng?', a: 'Khoảng {days} ngày làm việc, tính từ khi chúng tôi nhận đủ ảnh và thông tin tiệm.' },
      { q: 'Giá đã gồm tên miền và hosting chưa?', a: '{hosting}' },
      {
        q: 'Tôi có được đổi màu, đổi chữ trên mẫu không?',
        a: 'Có. Màu, logo, ảnh và nội dung được thay theo tiệm của bạn. Bố cục giữ theo mẫu — nếu cần bố cục riêng, gói Launch sẽ hợp hơn.',
      },
      {
        q: 'Sau này muốn làm website riêng thì sao?',
        a: 'Bạn có thể nâng lên gói Launch hoặc Signature bất cứ lúc nào. Chúng tôi sẽ tư vấn phần nào giữ lại được.',
      },
    ],
  },
  next: {
    label: 'Cuộn tiếp để sang trang sau',
    hint: 'Trang tiếp theo',
  },
  chat: {
    open: 'Chat với chúng tôi',
    title: 'OneSpeedy',
    status: 'Thường phản hồi trong vài phút',
    greeting: 'Xin chào 👋 Chúng tôi có thể giúp gì cho dự án website của bạn?',
    quick: [
      {
        q: 'Tôi muốn nhận báo giá',
        a: 'Tuyệt! Báo giá phụ thuộc số trang, tính năng và hiệu ứng. Bạn để lại số điện thoại hoặc email bên dưới, chuyên viên sẽ liên hệ tư vấn chi tiết nhé.',
      },
      {
        q: 'Làm web mất bao lâu?',
        a: 'Tuỳ quy mô dự án — landing page nhanh hơn nhiều so với website nhiều trang. Sau khi trao đổi, bạn sẽ nhận lộ trình với mốc thời gian cụ thể.',
      },
      {
        q: 'Có làm web song ngữ không?',
        a: 'Có ạ. Mọi website của OneSpeedy đều có thể song ngữ Việt — Anh (hoặc nhiều ngôn ngữ hơn), tối ưu SEO cho từng thị trường.',
      },
      {
        q: 'Gặp tư vấn viên',
        a: 'Bạn có thể nhắn ngay qua Zalo, Messenger hoặc WhatsApp ở bên dưới, hoặc để lại số điện thoại để chúng tôi gọi lại.',
      },
    ],
    placeholder: 'Nhập tin nhắn…',
    send: 'Gửi',
    leadPrompt: 'Để lại SĐT hoặc email để chúng tôi liên hệ lại:',
    leadPlaceholder: 'SĐT hoặc email',
    leadThanks: 'Cảm ơn bạn! Chuyên viên sẽ liên hệ trong giờ làm việc.',
    autoReply: 'Cảm ơn bạn đã nhắn tin! Một chuyên viên sẽ phản hồi sớm.',
    channels: 'Nhắn qua',
    minimize: 'Thu nhỏ',
  },
  footer: {
    ctaA: 'Sẵn sàng',
    ctaB: 'bắt đầu?',
    nav: 'Điều hướng',
    connect: 'Kết nối',
    rights: 'Mọi quyền được bảo lưu.',
    made: 'Thiết kế & phát triển bởi OneSpeedy',
    top: 'Lên đầu trang',
  },
  notFound: {
    title: 'Trang này đã đi lạc khỏi quỹ đạo.',
    text: 'Đường dẫn không tồn tại hoặc đã được di chuyển.',
    back: 'Về trang chủ',
  },
};

const en: typeof vi = {
  meta: {
    siteName: 'OneSpeedy',
    home: {
      title: 'OneSpeedy — Premium web design studio in Vietnam & worldwide',
      description:
        'OneSpeedy designs and engineers premium, multilingual, lightning-fast and SEO-ready websites for brands in Vietnam and worldwide.',
    },
    services: {
      title: 'Web design services — OneSpeedy',
      description:
        'Corporate websites, landing pages, e-commerce, 3D experiences, SEO and end-to-end website care.',
    },
    pricing: {
      title: 'Website design pricing — OneSpeedy',
      description: 'Website pricing by project size and complexity — from focused sites to feature-rich builds, online stores and 3D.',
    },
    work: {
      title: 'Work — OneSpeedy',
      description: 'OneSpeedy website templates by industry: nail salon, Vietnamese restaurant, detailing & PPF, head spa.',
    },
    about: {
      title: 'About — OneSpeedy',
      description: 'OneSpeedy is a web design and development studio for brands in Vietnam and worldwide.',
    },
    contact: {
      title: 'Contact & get a quote — OneSpeedy',
      description: 'Tell us about your project. OneSpeedy will reply with a proposal and a detailed quote.',
    },
    express: {
      title: 'OneSpeedy Express — All-in websites for small shops',
      description: 'A fast, SEO-ready website for small shops on a OneSpeedy-designed template. Pick a template, send your details, go live in days.',
    },
  },
  nav: {
    home: 'Home',
    services: 'Services',
    pricing: 'Pricing',
    work: 'Work',
    about: 'About',
    contact: 'Contact',
    express: 'OneSpeedy Express',
    cta: 'Start a project',
    book: 'Book a call',
    bookLong: 'Book a 15-min call',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to main content',
    langLabel: 'Language',
  },
  tagline: 'Fast to build. Easy to find.',
  home: {
    eyebrow: 'Web design studio · Vietnam & worldwide',
    titleA: 'Fast to build.',
    titleB: 'Easy to find.',
    lead:
      'OneSpeedy designs and engineers premium websites for brands that intend to lead — crafted like a work of art, fast like an app, and built to be found first.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'Our services',
    scroll: 'Scroll to explore',
    manifestoLabel: 'Manifesto',
    manifesto:
      "A website isn't a brochure. It's your best salesperson working 24/7, your first impression, and the place customers decide whether to trust you. That's exactly how we build it.",
    marquee: [
      'UI/UX design',
      'Three.js & WebGL',
      'Technical SEO',
      'Multilingual sites',
      'E-commerce',
      'Core Web Vitals',
      'Cinematic motion',
      'Conversion landing pages',
    ],
    servicesLabel: 'Services',
    servicesTitle: 'Everything a world-class website needs — under one roof.',
    servicesMore: 'All services',
    pillarsLabel: 'Why OneSpeedy',
    pillarsTitle: 'Three promises on every project.',
    pillars: [
      {
        k: 'Fast',
        title: 'Speed is a feature',
        text: 'Every site is measured with Lighthouse and Core Web Vitals before handover. Fast pages keep visitors and rank higher.',
      },
      {
        k: 'Beautiful',
        title: 'Tailor-made design',
        text: 'No off-the-shelf themes. Every interface is designed from your brand identity, with crafted motion and detail.',
      },
      {
        k: 'Findable',
        title: 'Multilingual & SEO by default',
        text: 'Multilingual architecture, structured data and technical SEO from day one — ready for local and global customers.',
      },
    ],
    processLabel: 'Process',
    processTitle: 'From idea to launch, clear at every step.',
    workLabel: 'Work',
    workTitle: 'Templates, one idea per industry.',
    workText: 'OneSpeedy has just launched, so there are no client projects to show yet. Here are templates we built for specific industries.',
    workMore: 'See all four',
    ctaTitleA: 'Have an idea?',
    ctaTitleB: "Let's make it a world-class website.",
    ctaText: "Tell us about your project. You'll get a design direction proposal and a detailed quote.",
    heroSecondary: 'See templates',
    heroPoints: ['Custom design, no off-the-shelf themes', 'English · Vietnamese', 'SEO built in from day one'],
    heroChips: ['Bilingual EN · VI', 'Mobile first', 'SEO-ready'],
    stripLabel: 'Templates for',
    strip: ['Nail salons', 'Vietnamese restaurants', 'Head spas', 'Detailing & PPF'],
    cardMore: 'Learn more',
    processText: 'Four clear steps. You approve the design before we write code.',
  },
  services: [
    {
      title: 'Corporate websites',
      text: 'A premium digital profile — SEO-ready and easy to update yourself.',
      items: ['Custom interface design', 'Content management', 'Multilingual on request', 'On-page SEO'],
    },
    {
      title: 'Conversion landing pages',
      text: 'Campaign landing pages where every touchpoint is tuned to win customers.',
      items: ['Sales copy structure', 'Lead forms & booking links', 'Ad tracking setup', 'A/B testing'],
    },
    {
      title: 'E-commerce',
      text: 'Fast online stores with local and international payments and clean order management.',
      items: ['Catalog & cart', 'Payment gateways', 'Orders & inventory', 'Fast product pages'],
    },
    {
      title: '3D & interactive experiences',
      text: 'Three.js, WebGL and cinematic motion — so your brand is impossible to scroll past.',
      items: ['Real-time 3D scenes', 'Scroll & page transitions', '3D product showcases', 'Mobile-optimized'],
    },
    {
      title: 'SEO & performance',
      text: 'Core Web Vitals, structured data and multilingual SEO — so Google finds you.',
      items: ['Technical SEO audit', 'Core Web Vitals tuning', 'International SEO (hreflang)', 'Google Business Profile'],
    },
    {
      title: 'Care & maintenance',
      text: 'Hosting, security, backups and updates — you focus on the business.',
      items: ['Hosting setup in your account', 'Scheduled backups', 'Security monitoring', 'Content update support'],
    },
  ],
  process: [
    {
      title: 'Discover',
      text: 'We learn your business, customers and goals, then agree on scope, sitemap and a clear roadmap.',
    },
    {
      title: 'Design',
      text: 'Visual direction, interface and motion design. You approve every screen before we write code.',
    },
    {
      title: 'Build',
      text: 'Performance-first, multilingual, SEO-ready engineering — tested on every device and browser.',
    },
    {
      title: 'Launch & grow',
      text: 'We go live, set up analytics, hand over, and keep optimizing after launch.',
    },
  ],
  servicesPage: {
    label: 'Services',
    titleA: 'We design, build',
    titleB: 'and grow websites.',
    lead: 'From a single campaign landing page to a multilingual e-commerce platform — every project is tailor-made, measured and optimized.',
    includes: 'Includes',
    processLabel: 'Process',
    processTitle: 'Four steps. No surprises.',
    faqLabel: 'FAQ',
    faqTitle: 'What clients usually ask.',
    faq: [
      {
        q: 'How long does a website take?',
        a: "It depends on scope. A landing page is much faster than a multi-page site or an online store. After our first call you'll get a roadmap with concrete milestones.",
      },
      {
        q: 'Can I update the content myself?',
        a: 'Yes, on Signature and Custom: you get an easy content dashboard and a walkthrough, so your team can publish posts, edit copy and swap images. On Launch, content edits are covered by the Care plan.',
      },
      {
        q: 'Do you work with clients outside Vietnam?',
        a: 'Yes. We work in English and Vietnamese, build multilingual websites and optimize SEO for each market.',
      },
      {
        q: 'Will 3D effects slow my site down?',
        a: 'Not when done right. 3D loads after the main content, scales down on low-end devices and turns off for users who prefer reduced motion.',
      },
      {
        q: 'What happens after launch?',
        a: 'You own the whole website. If you like, we keep running, maintaining and optimizing it on a monthly plan.',
      },
      {
        q: 'How does payment work?',
        a: 'Payments are split across project milestones. The exact schedule is stated in your quote and contract.',
      },
      {
        q: 'How many revisions do I get?',
        a: 'The number of revision rounds per phase is stated in your quote. You approve the design before we build, so late changes are rare.',
      },
      {
        q: 'Who owns the code and content?',
        a: 'You do. Once paid in full, all code, design and content belong to you.',
      },
      {
        q: 'Do you handle domains and hosting?',
        a: 'Yes. We advise, register and set everything up for you. Domain and hosting fees are billed by the provider.',
      },
      {
        q: 'Do you write the website copy?',
        a: 'Yes. Copywriting is included in every plan: we draft it from a recorded interview and your existing site, SEO-ready. Extra languages are available as an add-on.',
      },
      {
        q: 'Is there a warranty?',
        a: 'Yes. Warranty length and scope are stated in the contract; after that you can choose a monthly care plan.',
      },
    ],
  },
  workPage: {
    label: 'Work',
    titleA: 'Templates,',
    titleB: 'one idea per industry.',
    lead: 'OneSpeedy has just launched, so there are no client projects to show yet. These are four templates we built for specific industries: each takes its idea from the trade itself instead of the usual text-beside-image layout.',
    badge: 'Template',
    note: 'Shop names, prices, opening hours and reviews in these templates are sample data. Live previews are coming soon.',
    cta: 'I want one like this',
    templates: [
      {
        id: 'nail',
        name: 'Mai Nail Atelier',
        quote: 'Small studio, careful hands.',
        industry: 'Nail salon · US',
        planLine: 'Template · English',
        hue: 'gold',
        points: [
          'The cover is a fan of nail tips: real sets mixed with polish swatches',
          'Service menu with duration, wear time and price, filtered by type',
          'Appointment card with a QR code; colors and fonts switch per salon',
        ],
      },
      {
        id: 'pho',
        name: 'Phở Lan',
        quote: 'Broth first.',
        industry: 'Vietnamese restaurant · US',
        planLine: 'Template · English + Vietnamese',
        hue: 'slate',
        points: [
          'The hero is an anatomy of a bowl of phở: in the pot, in the bowl',
          'The menu reads like a numbered board on the wall',
          'Offers matched to the ad source; at lunch, bún and rice dishes move up',
        ],
      },
      {
        id: 'guong',
        name: 'Gương Studio',
        quote: 'Bề mặt sơn. Như gương.',
        industry: 'Detailing & PPF · Vietnam',
        planLine: 'Template · Vietnamese',
        hue: 'teal',
        points: [
          'A 3D car panel split before / after: drag or scroll to compare',
          'A quote calculator: pick car size and service for an estimate',
          'Weak devices get a poster instead of 3D; Zalo and Call stay within reach',
        ],
      },
      {
        id: 'spa',
        name: 'Sương Head Spa',
        quote: 'Rest your head.',
        industry: 'Head spa · US',
        planLine: 'Template · English',
        hue: 'slate',
        points: [
          'The hero is a film strip of the one-hour wash on a 00–60 minute ruler',
          'A session builder: pick treatments, see total minutes and price',
          'Motion uses CSS only, with almost no JavaScript',
        ],
      },
    ],
    commonTitle: 'Every template includes',
    common: [
      'Phone first: a sticky Call, Directions, Book bar',
      'SEO built in: titles, descriptions, sitemap, industry-specific structured data',
      'Data kept apart from design: a new shop only needs new data and photos',
      'Runs as static files, no dedicated server',
    ],
  },
  aboutPage: {
    label: 'About',
    titleA: 'A small studio',
    titleB: 'with big standards.',
    lead: 'OneSpeedy was founded on a simple belief: Vietnamese businesses deserve websites as beautiful and fast as the best in the world — and international brands deserve a dedicated partner in Vietnam.',
    storyLabel: 'The logo story',
    storyTitle: "It's all in the O.",
    story: [
      { k: 'The circle', text: 'A perfect geometric circle — a solid, systematic, scalable foundation.' },
      { k: 'The gap', text: 'The circle opens at the top right, like a progress bar about to complete — speed, getting it done.' },
      { k: 'The teal dot', text: 'A point on the orbit — an object in motion, and a destination on the map: easy to find.' },
    ],
    valuesLabel: 'Values',
    valuesTitle: 'How we work.',
    values: [
      { title: 'Transparency', text: 'Clear scope, cost and timeline from day one. You always know where the project stands.' },
      { title: 'Obsessed with detail', text: 'Every spacing and every motion has a reason. Detail is what makes premium.' },
      { title: 'Measurable', text: 'Beautiful is not enough. Every site is measured for speed, SEO and conversion.' },
      { title: 'Long-term partners', text: 'Launch is just the beginning. We stay so your website keeps growing.' },
    ],
    teamTitle: 'Our team is growing',
    teamText: "We're looking for designers and developers who love beauty and speed.",
    teamCta: 'Write to us',
  },
  contactPage: {
    label: 'Contact',
    titleA: 'Tell us',
    titleB: 'about your project.',
    lead: "Share a few details below. We'll reply with a design direction proposal and a detailed quote.",
    channelsTitle: 'Or message us directly',
    bookText: "Pick a time that suits you and we'll call.",
    emailLabel: 'Email',
    form: {
      name: 'Full name',
      email: 'Email',
      phone: 'Phone / WhatsApp',
      company: 'Company',
      services: "You're interested in",
      serviceOptions: ['Corporate website', 'Landing page', 'E-commerce', '3D website', 'SEO', 'Maintenance'],
      budget: 'Estimated budget',
      budgetOptions: ['Not sure yet', 'Under $3,000', '$3,000–5,000', '$5,000–10,000', '$10,000–20,000', '$20,000+'],
      message: 'Briefly describe your project',
      submit: 'Send request',
      sending: 'Sending…',
      required: 'Please fill in this field',
      invalidEmail: 'Please enter a valid email',
      successTitle: 'Request received!',
      successText: "Thank you. We'll get back to you within business hours.",
      again: 'Send another request',
      privacy: 'Your details are only used to contact you about your project.',
    },
  },
  // Giá bản EN (khách quốc tế) theo quyết định 1 ngày 24/10/2026 (D:\OneSpeedy\ke-hoach-quoc-te\ke-hoach.md):
  // Launch from US$3,900, Signature from US$7,500, gói lớn hơn "Let's talk", Care from US$190/tháng.
  // Các add-on còn lại vẫn là giá tạm, OneSpeedy cần duyệt lại.
  pricingPage: {
    label: 'Pricing',
    titleA: 'Clear pricing.',
    titleB: 'No surprises.',
    lead: 'Plans scale with size and complexity, not website type. Prices below are starting points; a fixed quote follows a 15-minute call.',
    from: 'From',
    note: 'Indicative prices in USD.',
    expressHint: '',
    expressLink: '',
    recommended: 'Recommended',
    choose: 'Choose this plan',
    plans: [
      {
        id: 'launch',
        name: 'Launch',
        for: 'A focused website with one clear goal',
        price: '3,900',
        featured: true,
        features: ['Up to 6 custom pages', 'Copywriting included, drafted from a recorded interview', 'Lead form or booking button linked to your existing tool', 'Technical SEO & speed tuning', '2 revision rounds'],
      },
      {
        id: 'signature',
        name: 'Signature',
        for: 'A complete website for an established business',
        price: '7,500',
        featured: false,
        features: ['Up to 15 pages', 'Copywriting included for every page', 'Content migration & redirects from your old site', 'On-page SEO & structured data', 'Smooth motion & page transitions'],
      },
      {
        id: 'custom',
        name: 'Custom',
        for: 'Multi-location, multilingual or feature-heavy projects',
        price: "Let's talk",
        featured: false,
        features: ['Scope planned with you', 'Custom features: accounts, search, dashboards…', 'Payments, CRM & email integrations', 'Multilingual', 'Priority support'],
      },
    ],
    includedTitle: 'Every plan includes',
    included: ['Custom design for your brand', 'Looks great on every device', 'You own the code and design once paid in full', 'Speed tested before handover', 'Training & handover'],
    addonsTitle: 'Add-ons',
    addons: [
      { name: 'Online store', price: 'Quote', unit: 'by scale' },
      { name: 'Custom 3D scene', price: 'Quote', unit: 'by complexity' },
      { name: 'Extra language', price: '+$400', unit: '/ language' },
      { name: 'Extra page', price: '+$250', unit: '/ page' },
      { name: 'Website care', price: 'From $190', unit: '/ month' },
      { name: 'SEO growth', price: '$500', unit: '/ month' },
    ],
    compareTitle: 'Compare plans',
    compareFeature: 'Feature',
    compare: [
      ['Pages', 'Up to 6', 'Up to 15', 'Per project'],
      ['Copywriting', 'yes', 'yes', 'yes'],
      ['Content migration & redirects', 'no', 'yes', 'yes'],
      ['Bilingual', 'add', 'add', 'yes'],
      ['Content management', 'no', 'yes', 'yes'],
      ['Custom features (accounts, search…)', 'no', 'add', 'yes'],
      ['Integrations (payments, CRM…)', 'no', 'add', 'yes'],
      ['Online store', 'add', 'add', 'add'],
      ['Custom 3D scene', 'add', 'add', 'add'],
      ['SEO', 'Technical', 'On-page', 'On-page + international'],
    ],
    compareLegend: { yes: 'Included', no: 'Not included', add: 'Add-on' },
    faqTitle: 'Pricing questions',
    faq: [
      {
        q: 'Why do prices say "from"?',
        a: 'Every website is custom, so cost depends on pages, features and effects. After our call you get a fixed quote with every item itemized.',
      },
      {
        q: 'Which plan do I need for an online store or 3D?',
        a: 'Any plan — it depends on complexity. A store with a few dozen products is very different from a multi-warehouse, multi-currency system, and a light 3D touch is very different from a fully custom 3D scene. We quote this part once we understand what you need.',
      },
      {
        q: 'Are domain and hosting included?',
        a: 'No. Domain and hosting are billed separately by the provider you choose. We advise and set them up for you.',
      },
      {
        q: 'How does payment work?',
        a: 'Payments are split across project milestones. The exact schedule is stated in your quote and contract.',
      },
      {
        q: "I'm not sure which plan fits.",
        a: "Book a 15-minute call. We'll listen to your goals and recommend the right plan — even if it's the smallest one.",
      },
    ],
  },
  expressPage: {
    label: 'OneSpeedy Express',
    titleA: 'Your shop,',
    titleB: 'on the map.',
    lead: 'Pick a template designed by the OneSpeedy team, then send us your photos and shop details. We build, optimize and launch it — you just welcome the customers.',
    facts: [
      { k: 'All-in price', v: 'From {price}' },
      { k: 'Turnaround', v: '{days} business days' },
      { k: 'Website', v: '{pages} pages' },
    ],
    cta: 'Get in touch',
    ctaAlt: "What's included",
    forLabel: 'Made for',
    forTitle: 'Small shops that want to be found.',
    forText: 'Nail salons, restaurants, eateries, spas, hair salons — shops that need a clean, good-looking website so customers find them on Google and reach out right from their phone.',
    industries: 'Templates available for: {industries}',
    sampleLabel: 'Express template',
    sampleTitle: 'An Express template, ready now.',
    sampleMore: 'See all templates',
    stepsLabel: 'How it works',
    stepsTitle: 'Three steps, no long meetings.',
    steps: [
      { k: 'Pick', title: 'Choose a template', text: 'Pick the one that fits your shop from the templates OneSpeedy designs for each industry.' },
      { k: 'Send', title: 'Send your details', text: 'Send your shop name, photos, price list, opening hours and address.' },
      { k: 'Launch', title: 'Welcome customers', text: 'We build it, test its speed and put it online within {days} business days.' },
    ],
    offerLabel: 'The Express plan',
    offerTitle: 'Priced lean because the scope is fixed — not because it is rushed.',
    offerText: [
      'Express uses templates OneSpeedy has already designed and a fixed scope, so there are no custom design rounds — the part that drives the cost of a tailor-made website.',
      'The technical standard stays the same as every OneSpeedy site: fast, SEO-ready and polished on phones.',
    ],
    upgrade: 'When your shop grows and needs a custom design, you can move up to Launch or Signature.',
    upgradeLink: 'See pricing',
    plan: {
      name: 'Express',
      for: 'An all-in website for small shops',
      from: 'From',
      features: [
        '{pages} pages on a OneSpeedy-designed template',
        'Fast and polished on phones',
        'Call, message and directions buttons',
        'Basic SEO so Google can find you',
        '{revisions} rounds of edits before launch',
      ],
      cta: 'Start with Express',
    },
    faqTitle: 'Express questions',
    faq: [
      { q: 'How long until my website is live?', a: 'About {days} business days from when we have all your photos and shop details.' },
      { q: 'Are domain and hosting included?', a: '{hosting}' },
      {
        q: 'Can I change the colors and text on a template?',
        a: 'Yes. Colors, logo, photos and content are swapped for your shop. The layout follows the template — if you need a custom layout, the Launch plan is a better fit.',
      },
      {
        q: 'What if I want a custom website later?',
        a: 'You can move up to Launch or Signature at any time. We will advise you on what can be carried over.',
      },
    ],
  },
  next: {
    label: 'Keep scrolling for the next page',
    hint: 'Next page',
  },
  chat: {
    open: 'Chat with us',
    title: 'OneSpeedy',
    status: 'Usually replies in a few minutes',
    greeting: 'Hi there 👋 How can we help with your website project?',
    quick: [
      {
        q: "I'd like a quote",
        a: 'Great! Pricing depends on pages, features and effects. Leave your phone or email below and a specialist will reach out with details.',
      },
      {
        q: 'How long does it take?',
        a: "It depends on scope — a landing page is much faster than a multi-page site. After a quick call you'll get a roadmap with concrete milestones.",
      },
      {
        q: 'Do you build multilingual sites?',
        a: 'Yes. Every OneSpeedy website can be bilingual (or more languages), with SEO tuned for each market.',
      },
      {
        q: 'Talk to a person',
        a: 'Message us right away on Zalo, Messenger or WhatsApp below, or leave your number and we will call you back.',
      },
    ],
    placeholder: 'Type a message…',
    send: 'Send',
    leadPrompt: 'Leave your phone or email and we will get back to you:',
    leadPlaceholder: 'Phone or email',
    leadThanks: 'Thank you! A specialist will reach out within business hours.',
    autoReply: 'Thanks for your message! A specialist will reply shortly.',
    channels: 'Message us on',
    minimize: 'Minimize',
  },
  footer: {
    ctaA: 'Ready',
    ctaB: 'to begin?',
    nav: 'Navigate',
    connect: 'Connect',
    rights: 'All rights reserved.',
    made: 'Designed & built by OneSpeedy',
    top: 'Back to top',
  },
  notFound: {
    title: 'This page drifted out of orbit.',
    text: "The link doesn't exist or has moved.",
    back: 'Back home',
  },
};

export const ui = { vi, en };
export type UI = typeof vi;

export function useT(lang: Lang): UI {
  return ui[lang] ?? ui[defaultLang];
}

export function isLang(x: string | undefined): x is Lang {
  return !!x && x in languages;
}
