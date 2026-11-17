// Trang pháp lý: Điều khoản, Bảo mật, Hoàn tiền (song ngữ). Bản tiếng Anh là bản chính (Paddle đọc bản này).
// Sửa chữ ở đây. "{owner}" được thay bằng legalEntity.owner; để trống thì trang hiện nhãn vàng và tự gắn noindex.
import type { Lang } from './ui';

export const legalEntity = {
  brand: 'OneSpeedy',
  // Họ tên thật của người đứng tên kinh doanh (hộ cá thể). Paddle cần tên này khớp với tài khoản Paddle.
  owner: '',
  country: { en: 'Vietnam', vi: 'Việt Nam' },
  email: 'support@onespeedy.com',
  billing: 'billing@onespeedy.com',
  site: 'https://onespeedy.com',
  app: 'https://seo.onespeedy.com',
};

export const LEGAL_UPDATED = '2026-11-17';

export type LegalDoc = 'terms' | 'privacy' | 'refund';
export const legalDocs: LegalDoc[] = ['terms', 'privacy', 'refund'];
export const legalPath = (lang: Lang, doc: LegalDoc) => `/${lang}/${doc}/`;

/** Một mục: tiêu đề + các đoạn. Đoạn bắt đầu bằng "- " là một dòng gạch đầu dòng. */
type Section = { h: string; p: string[] };
type Doc = { title: string; description: string; lead: string; sections: Section[] };

const E = legalEntity.email;
const B = legalEntity.billing;

const en: Record<LegalDoc, Doc> & { labels: Record<string, string> } = {
  labels: {
    updated: 'Last updated',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    refund: 'Refund Policy',
    legal: 'Legal',
    ownerTodo: 'owner full name',
  },
  terms: {
    title: 'Terms of Service — OneSpeedy',
    description: 'The terms for using SEO Ops and buying an SEO Ops subscription from OneSpeedy.',
    lead: 'These terms apply when you use SEO Ops or buy an SEO Ops subscription. By creating an account or paying, you agree to them.',
    sections: [
      {
        h: '1. Who we are',
        p: [
          `OneSpeedy is a business name of {owner}, a sole proprietor based in ${legalEntity.country.en} ("OneSpeedy", "we", "us"). OneSpeedy runs ${legalEntity.site} and the SEO Ops app at ${legalEntity.app}.`,
          `Contact: ${E}.`,
        ],
      },
      {
        h: '2. The service',
        p: [
          'SEO Ops is software that monitors the search performance of your website. Depending on your plan it crawls the public pages of your site, reads your Google Search Console data when you grant access, tracks keyword rankings and competitors you add, measures page speed, checks how AI search tools mention you, and lists suggested tasks.',
          'SEO Ops does not change your website. Its tasks are suggestions; you decide what to do. We do not guarantee any ranking, traffic or revenue result.',
          'What each plan includes (number of keywords, competitors, pages crawled and so on) is shown on our Pricing page and inside the app.',
        ],
      },
      {
        h: '3. Payments are handled by Paddle',
        p: [
          'Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns.',
          'Prices are shown in US dollars. Taxes such as VAT or sales tax are calculated and collected by Paddle at checkout where they apply.',
        ],
      },
      {
        h: '4. Free trial',
        p: [
          'New accounts get a 14-day free trial of the Starter plan. No card is needed for the trial. When the trial ends, scheduled checks stop until you choose a paid plan. You are never charged automatically at the end of a free trial unless you have entered payment details and chosen a plan.',
        ],
      },
      {
        h: '5. Subscriptions, renewal and cancellation',
        p: [
          'Paid plans are billed in advance, monthly or yearly. A subscription renews automatically at the end of each billing period until you cancel.',
          'You can cancel at any time from the billing link in your receipt email, through Paddle, or by emailing billing@onespeedy.com. After you cancel, your plan stays active until the end of the period you have already paid for and is not renewed.',
          'If you upgrade or downgrade, the change and any proration are handled by Paddle.',
          'We may change our prices. A new price applies only from your next renewal, and we will email you at least 14 days before it takes effect.',
          'Refunds are described in our Refund Policy.',
        ],
      },
      {
        h: '6. Your account',
        p: [
          'You must give true information when you sign up and keep your password private. The person who signs up is the administrator of the company account and can invite others with admin, approver or view-only roles. You are responsible for what is done with your account.',
          'You must be at least 18 years old and use SEO Ops for a business purpose.',
        ],
      },
      {
        h: '7. Acceptable use',
        p: [
          'You may only add websites that you own or are allowed to monitor. You must not:',
          '- use SEO Ops to attack, overload or break into any system;',
          '- try to get around plan limits, share an account outside your company, or access another customer\'s data;',
          '- enter unlawful content into the app;',
          '- resell SEO Ops without our written permission.',
          'Competitor sites are only read through their public pages, slowly, following their robots.txt.',
          'If you break these rules we may suspend or close your account. We will tell you by email unless the breach is serious.',
        ],
      },
      {
        h: '8. Your data',
        p: [
          'Data about your website stays yours. We use it only to provide SEO Ops to you, as described in our Privacy Policy. You can delete your company account at any time from Settings → Delete company; it is closed at once and permanently erased 72 hours later.',
        ],
      },
      {
        h: '9. Availability and changes',
        p: [
          'We work to keep SEO Ops available, but it may stop for updates, maintenance or outages. Data from Google and other sources can be late or wrong. We may add, change or remove features; if a change removes something important from a paid plan, you can cancel and get a pro-rata refund for the unused time.',
        ],
      },
      {
        h: '10. Liability',
        p: [
          'SEO Ops is provided "as is". To the extent the law allows, we are not liable for indirect or consequential loss, lost profit or lost data, and our total liability for any claim is limited to the amount you paid us in the 12 months before the claim. Nothing in these terms limits rights you have under consumer law that cannot be excluded.',
        ],
      },
      {
        h: '11. Other services',
        p: [
          'Custom websites, CMS, analytics work and the "Done-for-you" SEO service are not sold through online checkout. They are quoted and agreed in writing for each project, and those written terms apply to them.',
        ],
      },
      {
        h: '12. Law and changes to these terms',
        p: [
          `These terms are governed by the laws of ${legalEntity.country.en}. If we change them, we update the date above and email account holders before a major change takes effect.`,
          `Questions: ${E}.`,
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy — OneSpeedy',
    description: 'What personal data OneSpeedy and SEO Ops collect, why, who receives it and how long it is kept.',
    lead: 'This policy explains what personal data we collect when you visit onespeedy.com or use SEO Ops, why we collect it, who receives it, how long we keep it, and your rights.',
    sections: [
      {
        h: '1. Who is responsible',
        p: [
          `The controller of your data is OneSpeedy, a business name of {owner}, ${legalEntity.country.en}. Contact: ${E}.`,
        ],
      },
      {
        h: '2. What we collect',
        p: [
          '- Account: your name, email (used as your login), optional phone number, company name and website address. Passwords are stored only as a one-way hash.',
          '- Use of the app: an activity log of who did what and when (for example who approved a task), and login sessions.',
          '- Security: for your login history we store the IP address and browser of each sign-in for 90 days so you can spot unknown sign-ins. Recognised devices are stored as a hash and removed after 180 days without use.',
          '- Free scan: the web address you enter, the scan result, and a hash of your IP address to enforce scan limits. Unclaimed scans are deleted after 7 days.',
          '- Your website data: Search Console figures (only if you grant access), public page content, rankings, scan results and tasks. Each company\'s data is stored separately and other customers cannot see it.',
          '- Payments: Paddle collects your billing details and card or payment information. We do not see or store full card numbers; we receive your name, email, country, plan and payment status.',
          '- Contact: what you send us by email or the contact form.',
        ],
      },
      {
        h: '3. Why we use it',
        p: [
          'To run your account and keep it secure, to provide the SEO Ops features you turn on, to send account emails (confirmations, password resets, trial and billing notices), to answer your messages, and to meet legal obligations. We do not sell your data and do not use it for advertising.',
          'The legal bases are: performing our contract with you, our legitimate interest in keeping the service secure, your consent where we ask for it, and legal obligations.',
        ],
      },
      {
        h: '4. Who receives it',
        p: [
          'We share only what each feature needs:',
          '- Paddle (payments, tax, invoices), as Merchant of Record.',
          '- Google (Search Console, Chrome UX Report): your site address and keywords.',
          '- AI providers (OpenAI, Perplexity, and models reached through OpenCode): industry questions, keywords, service names, page titles and public page text. We do not send your personal details.',
          '- Serper (Google search results): keywords and location.',
          '- Cloudflare: all traffic to our sites passes through Cloudflare for HTTPS and bot protection.',
          '- Hostinger (email delivery): your email address, name and the email content.',
          '- Telegram or Slack: only if you connect them.',
          'Some of these providers process data outside your country. By using these features you agree to that transfer, only for the purposes above. We disclose data to authorities only when the law requires it.',
        ],
      },
      {
        h: '5. How long we keep it',
        p: [
          'Account and website data: while your account is open. When you delete your company it is erased 72 hours later. Login history: 90 days. Free scans: 7 days if not claimed. Payment records: as long as tax law requires. Backups roll over and are overwritten within 30 days.',
        ],
      },
      {
        h: '6. Your rights',
        p: [
          `You can ask to access, correct, export or delete your personal data, to restrict or object to its use, and to withdraw consent. Email ${E}; we answer within 30 days. You can also complain to your local data protection authority.`,
        ],
      },
      {
        h: '7. Cookies',
        p: [
          'We use only necessary cookies: your login session, your language and display mode, and a security token for forms. We do not use advertising cookies.',
        ],
      },
      {
        h: '8. Security',
        p: [
          'Traffic is encrypted with HTTPS. Passwords and session tokens are stored as hashes, secrets as encrypted values, and accounts can turn on two-step verification.',
        ],
      },
      {
        h: '9. Changes',
        p: ['If this policy changes we update the date above, and email account holders before a major change.'],
      },
    ],
  },
  refund: {
    title: 'Refund Policy — OneSpeedy',
    description: 'When and how you can get a refund for an SEO Ops subscription.',
    lead: 'We want you to pay only for SEO Ops if it is useful to you. That is why every account starts with a 14-day free trial, and paid plans have a 14-day money-back guarantee.',
    sections: [
      {
        h: '1. 14-day money-back guarantee',
        p: [
          'If you are not happy with SEO Ops, ask for a refund within 14 days of your first payment for a plan and you get the full amount back, no questions asked. This applies to monthly and yearly plans.',
        ],
      },
      {
        h: '2. After 14 days',
        p: [
          'You can cancel at any time. Your plan stays active until the end of the period you have paid for and does not renew. We do not refund the unused part of a period, except:',
          '- if you were charged by mistake, for example a duplicate charge or a renewal after you cancelled;',
          '- if SEO Ops was unavailable for a long time through our fault;',
          '- if we removed an important feature from your paid plan (pro-rata refund);',
          '- where consumer law in your country gives you a right to a refund.',
        ],
      },
      {
        h: '3. How to ask',
        p: [
          `Email ${B} from your account email with your receipt number, or reply to your Paddle receipt, or contact Paddle at paddle.net. Paddle, our Merchant of Record, processes all refunds.`,
          'Refunds go back to the original payment method, usually within 5–10 business days depending on your bank.',
        ],
      },
      {
        h: '4. Other services',
        p: [
          'Custom websites, CMS, analytics and the Done-for-you SEO service are not sold through online checkout; refunds for them follow the written agreement for each project.',
        ],
      },
    ],
  },
};

const vi: typeof en = {
  labels: {
    updated: 'Cập nhật',
    terms: 'Điều khoản dịch vụ',
    privacy: 'Chính sách bảo mật',
    refund: 'Chính sách hoàn tiền',
    legal: 'Pháp lý',
    ownerTodo: 'họ tên chủ',
  },
  terms: {
    title: 'Điều khoản dịch vụ — OneSpeedy',
    description: 'Điều khoản dùng SEO Ops và mua gói SEO Ops của OneSpeedy.',
    lead: 'Điều khoản này áp dụng khi bạn dùng SEO Ops hoặc mua gói SEO Ops. Tạo tài khoản hay trả tiền là bạn đồng ý. Nếu bản tiếng Việt và bản tiếng Anh khác nhau, bản tiếng Anh được dùng.',
    sections: [
      { h: '1. Chúng tôi là ai', p: [`OneSpeedy là tên kinh doanh của {owner}, cá nhân kinh doanh tại ${legalEntity.country.vi}. OneSpeedy vận hành ${legalEntity.site} và ứng dụng SEO Ops tại ${legalEntity.app}.`, `Liên hệ: ${E}.`] },
      { h: '2. Dịch vụ', p: ['SEO Ops là phần mềm theo dõi hiệu quả tìm kiếm của website: quét trang công khai, đọc số Search Console khi bạn cấp quyền, đo thứ hạng từ khoá và đối thủ bạn thêm, đo tốc độ, xem AI tìm kiếm nhắc tới bạn ra sao, và gợi ý việc nên làm.', 'SEO Ops không tự sửa web của bạn; việc làm hay không do bạn quyết. Chúng tôi không bảo đảm thứ hạng, lượt truy cập hay doanh thu.', 'Mỗi gói gồm gì được ghi ở trang Bảng giá và trong ứng dụng.'] },
      { h: '3. Thanh toán qua Paddle', p: ['Đơn hàng được xử lý bởi đại lý bán hàng trực tuyến Paddle.com. Paddle.com là bên bán chính thức (Merchant of Record) cho mọi đơn hàng, lo phần hỗ trợ thanh toán và hoàn tiền.', 'Giá tính bằng đô la Mỹ. Thuế (VAT, thuế bán hàng) do Paddle tính và thu khi thanh toán, nếu có.'] },
      { h: '4. Dùng thử', p: ['Tài khoản mới được dùng thử gói Starter 14 ngày, không cần thẻ. Hết hạn dùng thử, các việc tự chạy dừng cho tới khi bạn chọn gói trả tiền. Không bao giờ tự trừ tiền khi hết dùng thử nếu bạn chưa nhập thông tin thanh toán và chọn gói.'] },
      { h: '5. Gói trả tiền, gia hạn, huỷ', p: ['Gói trả trước theo tháng hoặc theo năm, tự gia hạn cuối mỗi kỳ cho tới khi bạn huỷ.', 'Bạn huỷ lúc nào cũng được: qua đường link trong thư biên nhận, qua Paddle, hoặc email billing@onespeedy.com. Huỷ rồi thì gói vẫn dùng tới hết kỳ đã trả và không gia hạn nữa.', 'Đổi gói lên hoặc xuống: Paddle tính phần chênh lệch.', 'Nếu đổi giá, giá mới chỉ áp dụng từ kỳ gia hạn sau, và chúng tôi báo qua email trước ít nhất 14 ngày.', 'Hoàn tiền: xem Chính sách hoàn tiền.'] },
      { h: '6. Tài khoản', p: ['Thông tin đăng ký phải đúng, mật khẩu tự giữ kín. Người đăng ký là quản trị của công ty, mời thêm người với vai quản trị, duyệt hoặc chỉ xem. Việc làm bằng tài khoản của bạn là trách nhiệm của bạn.', 'Bạn phải từ 18 tuổi và dùng SEO Ops cho mục đích kinh doanh.'] },
      { h: '7. Không được', p: ['Chỉ thêm web của bạn hoặc web bạn được phép theo dõi. Không được:', '- dùng SEO Ops để tấn công, làm quá tải hay đột nhập hệ thống khác;', '- lách giới hạn gói, đưa tài khoản cho người ngoài công ty, dò dữ liệu của khách khác;', '- nhập nội dung trái pháp luật;', '- bán lại SEO Ops khi chưa được đồng ý bằng văn bản.', 'Web đối thủ chỉ được đọc trang công khai, chậm, theo robots.txt.', 'Vi phạm thì chúng tôi tạm khoá hoặc đóng tài khoản, báo qua email trừ khi vi phạm nghiêm trọng.'] },
      { h: '8. Dữ liệu của bạn', p: ['Dữ liệu về web của bạn là của bạn, chỉ dùng để cung cấp SEO Ops cho bạn (xem Chính sách bảo mật). Bạn xoá công ty lúc nào cũng được ở Cài đặt → Xoá công ty: đóng ngay, xoá hẳn sau 72 giờ.'] },
      { h: '9. Hoạt động và thay đổi', p: ['SEO Ops có lúc dừng để cập nhật, bảo trì hoặc gặp sự cố. Số liệu từ Google và nguồn khác có thể trễ hoặc sai. Nếu chúng tôi bỏ một tính năng quan trọng của gói trả tiền, bạn được huỷ và hoàn tiền phần thời gian chưa dùng.'] },
      { h: '10. Giới hạn trách nhiệm', p: ['Dịch vụ cung cấp như hiện có. Trong phạm vi pháp luật cho phép, chúng tôi không chịu thiệt hại gián tiếp, mất lợi nhuận hay mất dữ liệu; tổng trách nhiệm không quá số tiền bạn đã trả trong 12 tháng trước đó. Điều này không bỏ các quyền bảo vệ người tiêu dùng mà luật không cho bỏ.'] },
      { h: '11. Dịch vụ khác', p: ['Làm website, CMS, phân tích số liệu và dịch vụ SEO "Done-for-you" không bán qua thanh toán trực tuyến; báo giá và thoả thuận bằng văn bản riêng cho từng dự án.'] },
      { h: '12. Luật áp dụng, thay đổi điều khoản', p: [`Điều khoản theo pháp luật ${legalEntity.country.vi}. Khi đổi, ngày cập nhật ở trên đổi theo; thay đổi lớn thì báo qua email trước.`, `Câu hỏi: ${E}.`] },
    ],
  },
  privacy: {
    title: 'Chính sách bảo mật — OneSpeedy',
    description: 'OneSpeedy và SEO Ops giữ dữ liệu cá nhân gì, để làm gì, gửi cho ai, giữ bao lâu.',
    lead: 'Chính sách này nói rõ chúng tôi giữ dữ liệu cá nhân gì khi bạn vào onespeedy.com hoặc dùng SEO Ops, để làm gì, gửi cho ai, giữ bao lâu, và quyền của bạn. Nếu bản tiếng Việt và bản tiếng Anh khác nhau, bản tiếng Anh được dùng.',
    sections: [
      { h: '1. Ai chịu trách nhiệm', p: [`OneSpeedy, tên kinh doanh của {owner}, ${legalEntity.country.vi}. Liên hệ: ${E}.`] },
      { h: '2. Dữ liệu chúng tôi giữ', p: ['- Tài khoản: tên, email (là tên đăng nhập), số điện thoại nếu bạn ghi, tên công ty, địa chỉ web. Mật khẩu chỉ giữ mã băm.', '- Khi dùng: nhật ký ai làm gì lúc nào, phiên đăng nhập.', '- Bảo vệ tài khoản: lịch sử đăng nhập ghi địa chỉ IP và trình duyệt, giữ 90 ngày; máy đã quen giữ mã băm, xoá sau 180 ngày không dùng.', '- Quét thử: địa chỉ web bạn dán, kết quả, mã băm của IP để giới hạn lượt; không ai nhận thì xoá sau 7 ngày.', '- Dữ liệu web của bạn: số Search Console (khi bạn cấp quyền), nội dung trang công khai, thứ hạng, kết quả quét, phiếu việc; mỗi công ty một kho riêng.', '- Thanh toán: Paddle thu thông tin thanh toán và thẻ. Chúng tôi không thấy số thẻ; chỉ nhận tên, email, quốc gia, gói và trạng thái thanh toán.', '- Liên hệ: nội dung bạn gửi qua email hoặc form.'] },
      { h: '3. Để làm gì', p: ['Chạy và bảo vệ tài khoản, chạy các tính năng bạn bật, gửi thư về tài khoản (xác nhận, đặt lại mật khẩu, dùng thử, thanh toán), trả lời bạn, và làm đúng nghĩa vụ pháp luật. Không bán dữ liệu, không dùng để quảng cáo.'] },
      { h: '4. Gửi cho ai', p: ['Chỉ gửi phần mỗi tính năng cần:', '- Paddle: thanh toán, thuế, hoá đơn.', '- Google (Search Console, Chrome UX Report): địa chỉ web, từ khoá.', '- Nhà cung cấp AI (OpenAI, Perplexity, các model qua OpenCode): câu hỏi về ngành, từ khoá, tên dịch vụ, tiêu đề và chữ trang công khai; không gửi thông tin cá nhân.', '- Serper (kết quả Google): từ khoá, khu vực.', '- Cloudflare: mọi lượt vào web đi qua Cloudflare (HTTPS, chống bot).', '- Hostinger (gửi thư): email, tên, nội dung thư.', '- Telegram, Slack: chỉ khi bạn tự nối.', 'Một số bên đặt máy chủ ở nước ngoài; dùng các tính năng này là bạn đồng ý chuyển phần dữ liệu đó, chỉ cho các mục đích trên. Chỉ cung cấp cho cơ quan nhà nước khi luật bắt buộc.'] },
      { h: '5. Giữ bao lâu', p: ['Dữ liệu tài khoản và web: khi tài khoản còn mở; xoá công ty thì xoá hẳn sau 72 giờ. Lịch sử đăng nhập: 90 ngày. Quét thử: 7 ngày nếu không ai nhận. Chứng từ thanh toán: theo luật thuế. Bản sao lưu ghi đè trong 30 ngày.'] },
      { h: '6. Quyền của bạn', p: [`Bạn có quyền xem, sửa, lấy bản sao, xoá dữ liệu cá nhân, hạn chế hoặc phản đối việc xử lý, rút lại đồng ý. Email ${E}; chúng tôi trả lời trong 30 ngày.`] },
      { h: '7. Cookie', p: ['Chỉ dùng cookie cần thiết: phiên đăng nhập, ngôn ngữ, chế độ hiển thị, mã chống giả mạo form. Không dùng cookie quảng cáo.'] },
      { h: '8. An toàn', p: ['Mọi kết nối qua HTTPS. Mật khẩu và mã phiên giữ dạng băm, khoá bí mật được mã hoá, tài khoản bật được xác minh hai bước.'] },
      { h: '9. Thay đổi', p: ['Khi đổi chính sách, ngày cập nhật ở trên đổi theo; thay đổi lớn thì báo qua email trước.'] },
    ],
  },
  refund: {
    title: 'Chính sách hoàn tiền — OneSpeedy',
    description: 'Khi nào và cách nào được hoàn tiền gói SEO Ops.',
    lead: 'Mỗi tài khoản được dùng thử miễn phí 14 ngày, và gói trả tiền được hoàn tiền trong 14 ngày. Nếu bản tiếng Việt và bản tiếng Anh khác nhau, bản tiếng Anh được dùng.',
    sections: [
      { h: '1. Hoàn tiền trong 14 ngày', p: ['Không hài lòng thì xin hoàn tiền trong 14 ngày kể từ lần trả tiền đầu tiên cho một gói: hoàn đủ, không cần lý do. Áp dụng cho cả gói tháng và gói năm.'] },
      { h: '2. Sau 14 ngày', p: ['Bạn huỷ lúc nào cũng được; gói dùng tới hết kỳ đã trả và không gia hạn. Không hoàn phần chưa dùng của kỳ, trừ khi:', '- bị trừ tiền nhầm (trừ hai lần, gia hạn sau khi đã huỷ);', '- SEO Ops ngừng hoạt động lâu do lỗi của chúng tôi;', '- chúng tôi bỏ một tính năng quan trọng của gói (hoàn theo tỷ lệ);', '- luật bảo vệ người tiêu dùng nơi bạn sống cho bạn quyền hoàn tiền.'] },
      { h: '3. Cách xin hoàn tiền', p: [`Email ${B} từ email tài khoản, kèm số biên nhận; hoặc trả lời thư biên nhận của Paddle; hoặc liên hệ Paddle tại paddle.net. Paddle (bên bán chính thức) xử lý mọi khoản hoàn tiền.`, 'Tiền về lại phương thức đã trả, thường trong 5–10 ngày làm việc tuỳ ngân hàng.'] },
      { h: '4. Dịch vụ khác', p: ['Làm website, CMS, phân tích số liệu và SEO Done-for-you không bán qua thanh toán trực tuyến; hoàn tiền theo thoả thuận bằng văn bản của từng dự án.'] },
    ],
  },
};

export const legal = { en, vi };
