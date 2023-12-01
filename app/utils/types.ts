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
  duration: string;
  doctorId: string;
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

export const DAY_TO_NUMBER: DayToNumber = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export interface DayToNumber {
  sunday: 0;
  monday: 1;
  tuesday: 2;
  wednesday: 3;
  thursday: 4;
  friday: 5;
  saturday: 6;
}

export const NUMBER_TO_DAY: NumberToDay = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
};

export interface NumberToDay {
  0: 'sunday';
  1: 'monday';
  2: 'tuesday';
  3: 'wednesday';
  4: 'thursday';
  5: 'friday';
  6: 'saturday';
}

export type DAY_TO_NUMBER_KEY = keyof DayToNumber;
export type NUMBER_TO_DAY_KEY = keyof NumberToDay;
