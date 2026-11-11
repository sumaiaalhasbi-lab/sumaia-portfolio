export const WHATSAPP_URL = 'https://wa.me';
export const LINKEDIN_URL = 'https://linkedin.com';
export const EMAIL_URL = 'mailto:sumaiaalhasi@gmail.com';

export const SECTIONS = [
  { id: 'about', ar: 'عني', en: 'About' },
  { id: 'services', ar: 'خدماتي', en: 'Services' },
  { id: 'videos', ar: 'الفيديوهات', en: 'Videos' },
  { id: 'posts', ar: 'محتوى المنشورات', en: 'Posts' },
  { id: 'process', ar: 'طريقة شغلي', en: 'Process' },
  { id: 'contact', ar: 'تواصل معي', en: 'Contact' },
] as const;

export type Section = (typeof SECTIONS)[number];
