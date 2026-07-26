export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  image?: string;
  tech_stack?: string[];
  github_url?: string;
  live_url?: string;
  category_id?: number;
  category?: ProjectCategory;
  featured: boolean;
  order: number;
  created_at?: string;
}

export interface Skill {
  id: number;
  name: string;
  icon?: string;
  category?: string;
  proficiency: number;
  order: number;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issue_date?: string;
  credential_url?: string;
  image?: string;
  pdf_url?: string;
  order: number;
}

export interface Service {
  id: number;
  title: string;
  description?: string;
  icon?: string;
  features?: string[];
  order: number;
}

export interface Testimonial {
  id: number;
  client_name: string;
  client_role?: string;
  client_company?: string;
  client_image?: string;
  content: string;
  rating: number;
  order: number;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at?: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon?: string;
  is_active: boolean;
}

export interface Setting {
  [key: string]: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
