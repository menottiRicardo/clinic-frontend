export interface UserSidebarLink {
  name: string;
  href?: string;
  icon?: string;
  subMenu?: { name: string; href: string }[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  href?: string;
  visibility?: boolean;
}
