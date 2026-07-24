export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techTags: string[];
  liveLink?: string;
  type: 'website' | 'app';
  apkDownloadUrl?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}