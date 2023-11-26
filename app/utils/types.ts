export interface UserSidebarLink {
  name: string;
  href?: string;
  icon?: string;
  subMenu?: { name: string; href: string }[];
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  href?: string;
  duration: boolean;
}
