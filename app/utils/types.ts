export interface UserSidebarLink {
    name: string;
    href?: string;
    icon?: string;
    subMenu?: { name: string; href: string }[];
  }