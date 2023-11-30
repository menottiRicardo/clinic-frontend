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

export interface Day {
  available: boolean;
  hours: { start: string; end: string }[];
}

export interface Days {
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
}
export interface Availability extends Days {
  _id: string;
  doctorId: string;
}

export type DayKey = keyof Days;
