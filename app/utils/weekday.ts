import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

type WeekdayFormat = 'short' | 'long';

// By default starts on Sunday (Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday)
export function weekdayNames(
  locale: string | string[],
  weekStart = 0,
  format: WeekdayFormat = 'long'
) {
  return Array(7)
    .fill(null)
    .map((_, day) => nameOfDay(locale, day + weekStart, format));
}

export function nameOfDay(
  locale: string | string[] | undefined,
  day: number,
  format: WeekdayFormat = 'long'
) {
  return new Intl.DateTimeFormat(locale, { weekday: format }).format(
    new Date(1970, 0, day + 4)
  );
}

export const yyyymmdd = (date: Date | Dayjs) =>
  date instanceof Date
    ? dayjs(date).format('YYYY-MM-DD')
    : date.format('YYYY-MM-DD');

// @see: https://github.com/iamkun/dayjs/issues/1272 - for the reason we're not using dayjs to do this.
export const daysInMonth = (date: Date | Dayjs) => {
  const [year, month] =
    date instanceof Date
      ? [date.getFullYear(), date.getMonth()]
      : [date.year(), date.month()];
  // strange JS quirk: new Date(2022, 12, 0).getMonth() = 11
  return new Date(year, month + 1, 0).getDate();
};

export const to24Hour = (hour: string) => {
  const [time, ampm] = hour.split(' ');
  const [hours, minutes] = time.split(':');
  return ampm === 'PM' ? `${parseInt(hours) + 12}:${minutes}` : time;
};
