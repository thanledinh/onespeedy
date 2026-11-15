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
  // Tạm dùng hộp thư cá nhân (chủ chọn ngày 15/11/2026); đổi sang hộp thư tên miền khi có.
  email: 'thanle.webdev@gmail.com',
  phone: '0777 710 027',
  zalo: '',
  messenger: 'https://m.me/onespeedy',
  whatsapp: '',
  linkedin: '',
  facebook: 'https://www.facebook.com/onespeedy',
};

// Trang giới thiệu SEO Ops (sản phẩm của OneSpeedy), do máy chủ SEO Ops phục vụ trên cùng tên miền.
export const seoOps = { vi: 'https://onespeedy.com/seo', en: 'https://onespeedy.com/en/seo' } as const;

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
      title: 'OneSpeedy — Làm web theo yêu cầu, SEO Ops, CMS và Analytics',
      description:
        'OneSpeedy code website theo yêu cầu, làm SEO Ops (công cụ SEO cho Google và AI), dựng CMS và gắn Analytics cho doanh nghiệp.',
    },
    services: {
      title: 'Dịch vụ: làm web theo yêu cầu, SEO Ops, CMS, Analytics — OneSpeedy',
      description:
        'Code website theo yêu cầu, SEO với SEO Ops, dựng CMS và gắn Analytics. Một đội lo trọn website của bạn.',
    },
    pricing: {
      title: 'Bảng giá SEO Ops — OneSpeedy',
      description: 'Gói SEO Ops từ $99 mỗi tháng: thứ hạng, đối thủ và tìm kiếm bằng AI cho doanh nghiệp của bạn. Dùng thử 14 ngày.',
    },
    work: {
      title: 'Dự án — OneSpeedy',
      description: 'Mẫu giao diện website OneSpeedy theo từng ngành: tiệm nail, nhà hàng Việt, môi giới bất động sản, head spa.',
    },
    about: {
      title: 'Về chúng tôi — OneSpeedy',
      description: 'OneSpeedy là một đội nhỏ chuyên code website và tự làm SEO Ops, công cụ SEO của riêng mình.',
    },
    contact: {
      title: 'Liên hệ & nhận báo giá — OneSpeedy',
      description: 'Cho chúng tôi biết bạn cần gì: website, SEO Ops, CMS hay Analytics. OneSpeedy sẽ gửi đề xuất và báo giá.',
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
    seoOps: 'SEO Ops',
    work: 'Dự án',
    about: 'Về chúng tôi',
    contact: 'Liên hệ',
    express: 'OneSpeedy Express',
    cta: 'Bắt đầu dự án',
    book: 'Đặt lịch gọi',
    bookLong: 'Đặt lịch gọi 15 phút',
    emailUs: 'Gửi email',
    menu: 'Menu',
    close: 'Đóng',
    skip: 'Bỏ qua đến nội dung chính',
    langLabel: 'Ngôn ngữ',
  },
  tagline: 'Fast to build. Easy to find.',
  home: {
    eyebrow: 'Website · SEO · CMS · Analytics',
    // Tagline giữ nguyên tiếng Anh, không dịch.
    titleA: 'Fast to build.',
    titleB: 'Easy to find.',
    lead:
      'OneSpeedy code web nhanh, làm riêng cho từng thương hiệu, rồi giúp web có khách: SEO Ops để được tìm thấy trên Google và trong câu trả lời của AI, CMS để bạn tự sửa web, Analytics để biết khách đến từ đâu.',
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
    heroSecondary: 'Dùng thử SEO Ops',
    heroPoints: ['Code riêng, không dùng theme có sẵn', 'SEO Ops do OneSpeedy tự làm', 'Dựng sẵn CMS và Analytics'],
    heroChips: ['Song ngữ VI · EN', 'Ưu tiên điện thoại', 'Chuẩn SEO'],
    stripLabel: 'Đã có mẫu cho',
    strip: ['Tiệm nail', 'Nhà hàng Việt', 'Head spa', 'Bất động sản'],
    cardMore: 'Xem thêm',
    processText: 'Bốn bước rõ ràng. Bạn duyệt thiết kế trước khi chúng tôi lập trình.',
    offerLabel: 'Chúng tôi làm gì',
    offerText: 'Một đội lo trọn website của bạn: code, công cụ SEO, quản lý nội dung và đo lường.',
    offers: [
      { icon: 0, title: 'Làm web theo yêu cầu', text: 'Thiết kế và code web từ đầu cho riêng bạn: tải nhanh, song ngữ, sẵn sàng cho Google.', more: 'Xem dịch vụ', to: 'services' },
      { icon: 4, title: 'SEO Ops', badge: 'Sản phẩm của OneSpeedy', text: 'Công cụ SEO do chúng tôi tự làm. Cho thấy Google và AI hiểu doanh nghiệp bạn thế nào, đo thứ hạng mỗi tuần và canh đối thủ.', more: 'Quét web miễn phí', to: 'seo' },
      { icon: 6, title: 'CMS', text: 'Tự sửa trang, bài viết và bảng giá, không cần lập trình viên. Chúng tôi dựng CMS hợp với web của bạn, có phân quyền cho nhân viên.', more: 'Hỏi báo giá', to: 'contact' },
      { icon: 7, title: 'Analytics', text: 'Biết khách vào web từ đâu và điều gì khiến họ liên hệ. Chúng tôi gắn đo lường và làm bảng số liệu dễ đọc.', more: 'Hỏi báo giá', to: 'contact' },
    ],
    seo: {
      label: 'Sản phẩm · SEO Ops',
      titleA: 'Xem Google và AI',
      titleB: 'hiểu bạn đến đâu.',
      text: 'Dán địa chỉ web. Khoảng 30 giây sau, SEO Ops cho bạn thấy nó hiểu bạn là ai, bán gì, có những dịch vụ nào, đối thủ là ai và AI có đọc được web của bạn không.',
      points: ['Quét thử miễn phí, không cần tài khoản', 'Dùng thử 14 ngày: đo thứ hạng mỗi tuần, báo khi đối thủ đổi giá', 'Quét toàn bộ web và báo cáo tháng ngắn gọn'],
      cta: 'Quét web miễn phí',
      bar: 'SEO Ops · Tuần này',
      alt: 'Bảng điều khiển SEO Ops, trang Tuần này, số liệu ví dụ',
      note: 'Tên và số liệu chỉ là ví dụ. Ảnh chụp giao diện tiếng Anh.',
    },
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
    titleA: 'Mọi thứ website cần,',
    titleB: 'gom về một chỗ.',
    lead: 'Chúng tôi code web cho bạn, dựng CMS để bạn tự sửa, gắn Analytics để biết điều gì hiệu quả, và giúp web được tìm thấy bằng SEO Ops.',
    pillars: [
      { id: 'web', icon: 0, title: 'Làm web theo yêu cầu', text: 'Thiết kế và code từ đầu cho riêng thương hiệu của bạn. Chạy nhanh trên điện thoại, song ngữ khi cần, sẵn sàng cho Google ngay từ ngày đầu.', items: ['Website doanh nghiệp', 'Landing page cho chiến dịch', 'Cửa hàng online', 'Trang 3D và tương tác', 'Cài hosting, sao lưu và chăm sóc web'], cta: 'Xem các mẫu', to: 'work' },
      { id: 'seo', icon: 4, title: 'SEO & SEO Ops', badge: 'Sản phẩm của OneSpeedy', text: 'SEO Ops là công cụ SEO do chúng tôi tự làm. Nó cho thấy Google và AI hiểu doanh nghiệp bạn thế nào, đo thứ hạng mỗi tuần và canh đối thủ. Web nào chúng tôi làm cũng được làm SEO kỹ thuật ngay từ đầu.', items: ['Quét thử web miễn phí trong 30 giây', 'Thứ hạng mỗi tuần, báo khi đối thủ thay đổi', 'SEO kỹ thuật và Core Web Vitals', 'SEO đa ngôn ngữ (hreflang)', 'Cài đặt Google Business Profile'], cta: 'Quét web miễn phí', to: 'seo' },
      { id: 'cms', icon: 6, title: 'CMS', text: 'Tự sửa trang, bài viết, bảng giá và hình ảnh mà không cần gọi lập trình viên. Chúng tôi dựng CMS hợp với web của bạn và hướng dẫn đội của bạn cách dùng.', items: ['Trang quản trị làm riêng cho nội dung của bạn', 'Trang, blog, menu và bảng giá', 'Tài khoản nhân viên có phân quyền và bản nháp', 'Nội dung nhiều ngôn ngữ', 'Buổi hướng dẫn cho đội của bạn'], cta: 'Hỏi báo giá', to: 'contact' },
      { id: 'analytics', icon: 7, title: 'Analytics', text: 'Biết khách vào web từ đâu và điều gì khiến họ gọi, đặt lịch hay mua hàng. Chúng tôi gắn đo lường và làm bảng số liệu đọc trong một phút là hiểu.', items: ['Google Analytics 4 và Search Console', 'Đo cuộc gọi, form và lượt đặt lịch', 'Đo chuyển đổi từ quảng cáo', 'Bảng số liệu chỉ gồm những con số quan trọng', 'Báo cáo tháng ngắn gọn, nếu bạn cần'], cta: 'Hỏi báo giá', to: 'contact' },
    ],
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
        a: 'Có. Với CMS, bạn tự đăng bài, sửa chữ và thay hình. Chúng tôi hướng dẫn đội của bạn khi web lên mạng.',
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
        a: 'Có. Chúng tôi soạn từ một buổi phỏng vấn ngắn và website hiện tại của bạn, viết sẵn cho Google. Cần thêm ngôn ngữ thì báo chúng tôi.',
      },
      {
        q: 'Website có được bảo hành không?',
        a: 'Có. Thời hạn và phạm vi bảo hành được ghi trong hợp đồng; sau đó bạn có thể chọn gói chăm sóc hàng tháng.',
      },
      {
        q: 'Tôi có bắt buộc dùng SEO Ops không?',
        a: 'Không. Web nào chúng tôi làm cũng có sẵn SEO kỹ thuật. SEO Ops dành cho chủ doanh nghiệp muốn theo dõi thứ hạng, đối thủ và tìm kiếm bằng AI sau khi web ra mắt.',
      },
      {
        q: 'Web tôi đã có sẵn thì có làm được không?',
        a: 'Được. Chúng tôi có thể thêm CMS, gắn Analytics hay nối SEO Ops cho web đang chạy. Chúng tôi xem web trước rồi nói rõ nên làm gì.',
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
        id: 'realtor',
        name: 'Jordan Hale',
        quote: 'Homes, thoughtfully sold.',
        industry: 'Môi giới bất động sản · Mỹ',
        planLine: 'Mẫu · Tiếng Anh',
        hue: 'teal',
        points: [
          'Trang chủ kiểu tạp chí cao cấp, ảnh nhà tràn khung',
          'Bảng nhà đã bán có ảnh chạy theo chuột, kèm bản đồ thật',
          'Các bước mua, bán nhà và máy tính trả góp',
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
    lead: 'OneSpeedy là một đội nhỏ chuyên code website và làm phần mềm giúp website lớn lên. Chúng tôi làm web cho thương hiệu trong và ngoài nước, và tự làm SEO Ops, công cụ SEO của riêng mình.',
    whatLabel: 'Chúng tôi làm gì',
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
    lead: 'Cho chúng tôi biết bạn cần gì: web mới, CMS, Analytics hay SEO. Chúng tôi sẽ gửi đề xuất và báo giá.',
    seoTitle: 'Muốn xem nhanh trước?',
    seoText: 'SEO Ops quét web của bạn miễn phí trong khoảng 30 giây: nó hiểu bạn là ai, bạn có những dịch vụ nào và đối thủ là ai.',
    seoCta: 'Quét web miễn phí',
    channelsTitle: 'Hoặc nhắn trực tiếp',
    bookText: 'Chọn giờ phù hợp, chúng tôi gọi cho bạn.',
    emailLabel: 'Email',
    form: {
      name: 'Họ và tên',
      email: 'Email',
      phone: 'Số điện thoại / Zalo',
      company: 'Công ty',
      services: 'Bạn quan tâm đến',
      serviceOptions: ['Làm web theo yêu cầu', 'SEO Ops', 'CMS', 'Analytics', 'Chưa rõ, cần tư vấn'],
      message: 'Mô tả ngắn về dự án',
      submit: 'Gửi yêu cầu',
      sending: 'Đang gửi…',
      required: 'Vui lòng điền mục này',
      invalidEmail: 'Email chưa đúng định dạng',
      successTitle: 'Bấm Gửi trong email là xong',
      successText: 'Chúng tôi đã soạn sẵn email gửi {email} với thông tin của bạn. Bạn chỉ cần bấm Gửi trong ứng dụng email. Nếu không thấy ứng dụng email mở ra, hãy gửi thẳng tới {email}.',
      again: 'Gửi yêu cầu khác',
      privacy: 'Thông tin của bạn chỉ dùng để liên hệ về dự án. Nút gửi sẽ mở ứng dụng email của bạn.',
      mailSubject: 'Yêu cầu dự án từ {name}',
      templateLine: 'Tôi muốn làm web giống mẫu {name}.',
    },
  },
  pricingPage: {
    label: 'Bảng giá',
    titleA: 'Bảng giá SEO Ops,',
    titleB: 'rõ ràng, dễ chọn.',
    lead: 'Bắt đầu bằng một lượt quét miễn phí và 14 ngày dùng thử. Trả theo tháng, hoặc trả theo năm để giảm 20%.',
    monthly: 'Theo tháng',
    yearly: 'Theo năm · giảm 20%',
    limitLabels: ['Từ khoá theo dõi', 'Đối thủ theo dõi', 'Trang quét mỗi lần', 'Câu hỏi đo trên AI', 'Trang đo tốc độ', 'Quét nhanh đối thủ'],
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        for: 'Cho doanh nghiệp nhỏ, một web, vài dịch vụ.',
        monthly: '$99',
        monthlyUnit: '/tháng',
        monthlyNote: '',
        yearly: '$948',
        yearlyUnit: '/năm',
        yearlyNote: 'Khoảng $79/tháng',
        badge: '',
        cta: 'Quét web miễn phí',
        featured: false,
        limits: ['20', '2', '300', '15', '10', '4 giờ/lần'],
        list: [],
      },
      {
        id: 'growth',
        name: 'Growth',
        for: 'Cho doanh nghiệp muốn vượt đối thủ trong khu vực.',
        monthly: '$199',
        monthlyUnit: '/tháng',
        monthlyNote: '',
        yearly: '$1.908',
        yearlyUnit: '/năm',
        yearlyNote: 'Khoảng $159/tháng',
        badge: 'Nên chọn',
        cta: 'Quét web miễn phí',
        featured: true,
        limits: ['50', '5', '1.500', '40', '30', '1 giờ/lần'],
        list: [],
      },
      {
        id: 'pro',
        name: 'Pro',
        for: 'Cho web lớn, nhiều trang và nhiều từ khoá.',
        monthly: '$399',
        monthlyUnit: '/tháng',
        monthlyNote: '',
        yearly: '$3.828',
        yearlyUnit: '/năm',
        yearlyNote: 'Khoảng $319/tháng',
        badge: '',
        cta: 'Quét web miễn phí',
        featured: false,
        limits: ['200', '10', '5.000', '100', '100', '30 phút/lần'],
        list: [],
      },
      {
        id: 'dfy',
        name: 'Done-for-you',
        for: 'Đội OneSpeedy làm SEO giùm bạn.',
        monthly: '$1.500',
        monthlyUnit: '/tháng',
        monthlyNote: 'Ký tối thiểu 3 tháng',
        yearly: '$14.400',
        yearlyUnit: '/năm',
        yearlyNote: 'Khoảng $1.200/tháng, ký 12 tháng',
        badge: '',
        cta: 'Liên hệ với chúng tôi',
        featured: false,
        limits: [],
        list: ['Mọi thứ của gói Pro', 'Đội SEO của chúng tôi làm giùm bạn mỗi tháng'],
      },
    ],
    includedTitle: 'Gói nào cũng có',
    included: ['Quét toàn bộ web, chỉ rõ chỗ cần sửa', 'Đo thứ hạng mỗi tuần', 'Báo khi đối thủ đổi giá hay đăng trang mới', 'Lượt nhấp từ Google theo dịch vụ (cần Search Console)', 'Báo cáo tháng ngắn gọn', 'Dùng thử miễn phí 14 ngày'],
    note: 'Giá tính bằng đô la Mỹ.',
    quoteTitle: 'Cần làm web, CMS hay Analytics?',
    quoteText: 'Phần này báo giá theo từng dự án, sau một cuộc gọi ngắn.',
    quoteCta: 'Hỏi báo giá',
    faqLabel: 'Câu hỏi thường gặp',
    faqTitle: 'Câu hỏi về giá',
    faq: [
      { q: 'Có dùng thử miễn phí không?', a: 'Có. Quét web miễn phí, rồi tạo tài khoản để dùng SEO Ops miễn phí 14 ngày.' },
      { q: 'Trả theo năm là thế nào?', a: 'Bạn trả trước 12 tháng và tiết kiệm 20% so với trả theo tháng.' },
      { q: 'Từ khoá theo dõi là gì?', a: 'Là cụm từ khách gõ trên Google mà SEO Ops kiểm tra mỗi tuần, ví dụ "nha khoa quận 3". Mỗi gói giới hạn số từ khoá theo dõi cùng lúc.' },
      { q: 'Gói Done-for-you gồm những gì?', a: 'Mọi thứ của gói Pro, cộng đội của chúng tôi làm việc SEO giùm bạn mỗi tháng. Ký tối thiểu 3 tháng.' },
      { q: 'Bảng điều khiển bằng tiếng gì?', a: 'Hiện bảng điều khiển SEO Ops bằng tiếng Việt. Trang quét thử có cả tiếng Anh và tiếng Việt.' },
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
    status: 'Trả lời nhanh các câu hay hỏi',
    greeting: 'Xin chào 👋 Chúng tôi có thể giúp gì cho dự án website của bạn?',
    quick: [
      {
        q: 'Tôi muốn nhận báo giá',
        a: 'Báo giá tuỳ số trang, tính năng và hiệu ứng. Bạn gửi yêu cầu ở trang Liên hệ, hoặc nhắn thẳng cho chúng tôi qua các nút bên dưới.',
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
        a: 'Bạn nhắn Messenger, gọi 0777 710 027 hoặc email thanle.webdev@gmail.com, chúng tôi sẽ trả lời bạn.',
      },
    ],
    placeholder: 'Nhập tin nhắn…',
    send: 'Gửi',
    leadPrompt: 'Để chúng tôi nhận được tin của bạn, hãy nhắn Messenger, gọi điện hoặc gửi email bằng các nút bên dưới nhé.',
    leadPlaceholder: 'SĐT hoặc email',
    leadThanks: 'Cảm ơn bạn! Chuyên viên sẽ liên hệ trong giờ làm việc.',
    autoReply: 'Khung chat này chỉ trả lời các câu hay hỏi, tin nhắn gõ ở đây chưa tới người thật.',
    channels: 'Liên hệ qua',
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
      title: 'OneSpeedy — Custom websites, SEO Ops, CMS & analytics',
      description:
        'OneSpeedy codes custom websites, builds SEO Ops (an SEO tool for Google and AI search), and sets up your CMS and analytics.',
    },
    services: {
      title: 'Services: custom websites, SEO Ops, CMS & analytics — OneSpeedy',
      description:
        'Custom-coded websites, SEO with SEO Ops, CMS setup and analytics tracking, from one small team.',
    },
    pricing: {
      title: 'SEO Ops pricing — OneSpeedy',
      description: 'SEO Ops plans from $99 a month: rankings, competitors and AI search for your business. 14-day free trial.',
    },
    work: {
      title: 'Work — OneSpeedy',
      description: 'OneSpeedy website templates by industry: nail salon, Vietnamese restaurant, real estate agent, head spa.',
    },
    about: {
      title: 'About — OneSpeedy',
      description: 'OneSpeedy is a small team that codes websites and builds SEO Ops, its own SEO tool.',
    },
    contact: {
      title: 'Contact & get a quote — OneSpeedy',
      description: 'Tell us what you need: a website, SEO Ops, a CMS or analytics. OneSpeedy will reply with a proposal and a quote.',
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
    seoOps: 'SEO Ops',
    work: 'Work',
    about: 'About',
    contact: 'Contact',
    express: 'OneSpeedy Express',
    cta: 'Start a project',
    book: 'Book a call',
    bookLong: 'Book a 15-min call',
    emailUs: 'Email us',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to main content',
    langLabel: 'Language',
  },
  tagline: 'Fast to build. Easy to find.',
  home: {
    eyebrow: 'Websites · SEO · CMS · Analytics',
    titleA: 'Fast to build.',
    titleB: 'Easy to find.',
    lead:
      'OneSpeedy codes fast, custom websites, then helps them bring in customers: SEO Ops to get found on Google and in AI answers, a CMS so you can edit your site yourself, and analytics that show where customers come from.',
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
    heroSecondary: 'Try SEO Ops free',
    heroPoints: ['Custom code, no off-the-shelf themes', 'SEO Ops, built in-house', 'CMS and analytics set up for you'],
    heroChips: ['Bilingual EN · VI', 'Mobile first', 'SEO-ready'],
    stripLabel: 'Templates for',
    strip: ['Nail salons', 'Vietnamese restaurants', 'Head spas', 'Real estate'],
    cardMore: 'Learn more',
    processText: 'Four clear steps. You approve the design before we write code.',
    offerLabel: 'What we do',
    offerText: 'One team for your whole website: the code, the SEO tool, content management and analytics.',
    offers: [
      { icon: 0, title: 'Custom websites', text: 'We design and code your site from scratch: fast, bilingual and ready for Google.', more: 'See services', to: 'services' },
      { icon: 4, title: 'SEO Ops', badge: 'Our own product', text: 'The SEO tool we built ourselves. It shows how Google and AI understand your business, measures your rankings every week and watches your competitors.', more: 'Scan your site free', to: 'seo' },
      { icon: 6, title: 'CMS', text: 'Edit pages, posts and price lists yourself, no developer needed. We set up a CMS that fits your site, with roles for your staff.', more: 'Ask for a quote', to: 'contact' },
      { icon: 7, title: 'Analytics', text: 'Know where visitors come from and what makes them get in touch. We set up the tracking and a dashboard you can read.', more: 'Ask for a quote', to: 'contact' },
    ],
    seo: {
      label: 'Our product · SEO Ops',
      titleA: 'See how Google and AI',
      titleB: 'understand your business.',
      text: 'Paste your website address. In about 30 seconds SEO Ops shows who it thinks you are, what you sell, your services, your competitors, and whether AI can read your site.',
      points: ['Free scan, no account needed', '14-day trial: weekly rankings and alerts when competitors change prices', 'A full-site crawl and a short monthly report'],
      cta: 'Scan your site free',
      bar: 'SEO Ops · This week',
      alt: 'SEO Ops dashboard, This week page, with example data',
      note: 'Example names and numbers.',
    },
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
    titleA: 'Everything your website needs,',
    titleB: 'in one place.',
    lead: 'We code your website, set up a CMS so you can edit it yourself, add analytics so you know what works, and help it get found with SEO Ops.',
    pillars: [
      { id: 'web', icon: 0, title: 'Custom websites', text: 'Designed and coded from scratch for your brand. Fast on phones, bilingual when you need it, and ready for Google from day one.', items: ['Company websites', 'Landing pages for campaigns', 'Online stores', '3D and interactive pages', 'Hosting setup, backups and care'], cta: 'See templates', to: 'work' },
      { id: 'seo', icon: 4, title: 'SEO & SEO Ops', badge: 'Our own product', text: 'SEO Ops is the SEO tool we built ourselves. It shows how Google and AI understand your business, measures your rankings every week and watches your competitors. Every site we build also gets technical SEO from the start.', items: ['A free 30-second scan of your site', 'Weekly rankings and competitor alerts', 'Technical SEO and Core Web Vitals', 'Multilingual SEO (hreflang)', 'Google Business Profile setup'], cta: 'Scan your site free', to: 'seo' },
      { id: 'cms', icon: 6, title: 'CMS', text: 'Edit pages, posts, prices and photos yourself, without calling a developer. We set up a CMS that fits your site and show your team how to use it.', items: ['An admin made for your content', 'Pages, blog, menus and price lists', 'Staff accounts with roles and drafts', 'Content in more than one language', 'A walkthrough for your team'], cta: 'Ask for a quote', to: 'contact' },
      { id: 'analytics', icon: 7, title: 'Analytics', text: 'Know where visitors come from and what makes them call, book or buy. We set up the tracking and a dashboard you can read in a minute.', items: ['Google Analytics 4 and Search Console', 'Calls, forms and bookings tracked', 'Ad conversion tracking', 'A dashboard with the numbers that matter', 'A short monthly report, if you want one'], cta: 'Ask for a quote', to: 'contact' },
    ],
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
        a: 'Yes. With a CMS you can publish posts, edit text and swap photos yourself. We give your team a walkthrough when the site goes live.',
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
        a: 'Yes. We draft it from a short interview and your current site, written for search. More languages on request.',
      },
      {
        q: 'Is there a warranty?',
        a: 'Yes. Warranty length and scope are stated in the contract; after that you can choose a monthly care plan.',
      },
      {
        q: 'Do I need SEO Ops to work with you?',
        a: 'No. Every site we build has technical SEO built in. SEO Ops is for owners who want to keep track of rankings, competitors and AI search after launch.',
      },
      {
        q: 'Can you work on a website I already have?',
        a: 'Yes. We can add a CMS, set up analytics or connect SEO Ops to an existing site. We look at it first and tell you what makes sense.',
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
        id: 'realtor',
        name: 'Jordan Hale',
        quote: 'Homes, thoughtfully sold.',
        industry: 'Real estate agent · US',
        planLine: 'Template · English',
        hue: 'teal',
        points: [
          'An editorial, magazine-style home page with a full-bleed photo',
          'A sold-homes table with photos that follow the cursor, plus a real map',
          'Buying and selling steps and a mortgage calculator',
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
    lead: 'OneSpeedy is a small team that codes websites and builds the software that helps them grow. We make sites for brands in Vietnam and abroad, and we make SEO Ops, our own SEO tool.',
    whatLabel: 'What we do',
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
    lead: "Tell us what you need: a new website, a CMS, analytics or help with SEO. We'll reply with a proposal and a quote.",
    seoTitle: 'Want a quick look first?',
    seoText: 'SEO Ops scans your site for free in about 30 seconds: who it thinks you are, your services and your competitors.',
    seoCta: 'Scan your site free',
    channelsTitle: 'Or message us directly',
    bookText: "Pick a time that suits you and we'll call.",
    emailLabel: 'Email',
    form: {
      name: 'Full name',
      email: 'Email',
      phone: 'Phone / WhatsApp',
      company: 'Company',
      services: "You're interested in",
      serviceOptions: ['Custom website', 'SEO Ops', 'CMS', 'Analytics', 'Not sure yet'],
      message: 'Briefly describe your project',
      submit: 'Send request',
      sending: 'Sending…',
      required: 'Please fill in this field',
      invalidEmail: 'Please enter a valid email',
      successTitle: 'Almost done: press Send',
      successText: 'We prepared an email to {email} with your details. Just press Send in your email app. If no email app opened, write to us directly at {email}.',
      again: 'Send another request',
      privacy: 'Your details are only used to contact you about your project. The button opens your email app.',
      mailSubject: 'Project request from {name}',
      templateLine: "I'd like a website like the {name} template.",
    },
  },
  pricingPage: {
    label: 'Pricing',
    titleA: 'Simple plans',
    titleB: 'for SEO Ops.',
    lead: 'Start with a free scan and a 14-day free trial. Pay monthly, or pay for a year and save 20%.',
    monthly: 'Monthly',
    yearly: 'Yearly · save 20%',
    limitLabels: ['Tracked keywords', 'Competitors watched', 'Pages crawled per scan', 'AI search questions tracked', 'Pages speed-tested', 'Competitor check'],
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        for: 'For a small business with one site and a few services.',
        monthly: '$99',
        monthlyUnit: '/month',
        monthlyNote: '',
        yearly: '$948',
        yearlyUnit: '/year',
        yearlyNote: 'About $79/month',
        badge: '',
        cta: 'Start with a free scan',
        featured: false,
        limits: ['20', '2', '300', '15', '10', 'every 4 hours'],
        list: [],
      },
      {
        id: 'growth',
        name: 'Growth',
        for: 'For a business that wants to beat its local competitors.',
        monthly: '$199',
        monthlyUnit: '/month',
        monthlyNote: '',
        yearly: '$1,908',
        yearlyUnit: '/year',
        yearlyNote: 'About $159/month',
        badge: 'Recommended',
        cta: 'Start with a free scan',
        featured: true,
        limits: ['50', '5', '1,500', '40', '30', 'every hour'],
        list: [],
      },
      {
        id: 'pro',
        name: 'Pro',
        for: 'For bigger sites with many pages and keywords.',
        monthly: '$399',
        monthlyUnit: '/month',
        monthlyNote: '',
        yearly: '$3,828',
        yearlyUnit: '/year',
        yearlyNote: 'About $319/month',
        badge: '',
        cta: 'Start with a free scan',
        featured: false,
        limits: ['200', '10', '5,000', '100', '100', 'every 30 minutes'],
        list: [],
      },
      {
        id: 'dfy',
        name: 'Done-for-you',
        for: 'Our team does the SEO work for you.',
        monthly: '$1,500',
        monthlyUnit: '/month',
        monthlyNote: '3-month minimum',
        yearly: '$14,400',
        yearlyUnit: '/year',
        yearlyNote: 'About $1,200/month, 12-month contract',
        badge: '',
        cta: 'Talk to us',
        featured: false,
        limits: [],
        list: ['Everything in Pro', 'Our SEO team does the work for you every month'],
      },
    ],
    includedTitle: 'Every plan includes',
    included: ['A full-site crawl with what to fix', 'Rankings measured every week', 'Alerts when competitors change prices or publish pages', 'Google clicks by service (with Search Console)', 'A short monthly report', '14-day free trial'],
    note: 'Prices in US dollars.',
    quoteTitle: 'Need a website, a CMS or analytics?',
    quoteText: 'We quote these per project, after a short call.',
    quoteCta: 'Ask for a quote',
    faqLabel: 'FAQ',
    faqTitle: 'Pricing questions',
    faq: [
      { q: 'Is there a free trial?', a: 'Yes. Scan your site for free, then create an account to use SEO Ops free for 14 days.' },
      { q: 'How does yearly billing work?', a: 'You pay for 12 months up front and save 20% compared with paying monthly.' },
      { q: 'What is a tracked keyword?', a: 'A search phrase SEO Ops checks on Google every week, like "dentist in Austin". Each plan sets how many you track at once.' },
      { q: 'What does Done-for-you include?', a: 'Everything in Pro, and our team does the SEO work for you each month. It starts with a 3-month minimum.' },
      { q: 'What language is the dashboard in?', a: 'The free scan and these pages are in English. The SEO Ops dashboard is currently in Vietnamese.' },
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
    status: 'Quick answers to common questions',
    greeting: 'Hi there 👋 How can we help with your website project?',
    quick: [
      {
        q: "I'd like a quote",
        a: 'Pricing depends on pages, features and effects. Send a request on the Contact page, or message us directly with the buttons below.',
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
        a: 'Message us on Messenger, call +84 777 710 027 or email thanle.webdev@gmail.com and we will reply.',
      },
    ],
    placeholder: 'Type a message…',
    send: 'Send',
    leadPrompt: 'So that your message reaches us, use Messenger, call or email with the buttons below.',
    leadPlaceholder: 'Phone or email',
    leadThanks: 'Thank you! A specialist will reach out within business hours.',
    autoReply: 'This chat only answers common questions; messages typed here do not reach a person yet.',
    channels: 'Reach us',
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
