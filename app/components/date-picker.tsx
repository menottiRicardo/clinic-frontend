import { useEffect } from 'react';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday.js';
import classNames from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { daysInMonth, weekdayNames, yyyymmdd } from '~/utils/weekday';
import { getAvailableDatesInMonth } from '~/utils/getAvailableDatesInMonth';
dayjs.extend(isToday);
export type DatePickerProps = {
  /** which day of the week to render the calendar. Usually Sunday (=0) or Monday (=1) - default: Sunday */
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Fires whenever a selected date is changed. */
  onChange: (date: Dayjs | null) => void;
  /** Fires when the month is changed. */
  onMonthChange?: (date: Dayjs) => void;
  /** which date or dates are currently selected (not tracked from here) */
  selected?: Dayjs | Dayjs[] | null;
  /** defaults to current date. */
  minDate?: Date;
  /** Furthest date selectable in the future, default = UNLIMITED */
  maxDate?: Date;
  /** locale, any IETF language tag, e.g. "hu-HU" - defaults to Browser settings */
  locale: string;
  /** Defaults to [], which dates are not bookable. Array of valid dates like: ["2022-04-23", "2022-04-24"] */
  excludedDates?: string[];
  /** defaults to all, which dates are bookable (inverse of excludedDates) */
  includedDates?: string[];
  /** allows adding classes to the container */
  className?: string;
  /** Shows a small loading spinner next to the month name */
  isLoading?: boolean;
  /** used to query the multiple selected dates */
  eventSlug?: string;

  daysOff: number[];
};

export const Day = ({
  date,
  active,
  disabled,
  ...props
}: JSX.IntrinsicElements['button'] & {
  active: boolean;
  date: Dayjs;
}) => {
  return (
    <button
      type="button"
      style={disabled ? { opacity: 0.5 } : {}}
      className={classNames(
        'disabled:dark:text-white absolute bottom-0 left-0 right-0 top-0 mx-auto w-full rounded-md border-2 border-transparent text-center text-sm font-medium disabled:cursor-default disabled:border-transparent disabled:font-light ',
        active
          ? 'bg-indigo-500 text-white'
          : !disabled
          ? 'hover:border-indigo-500 text-emphasis dark:bg-slate-800'
          : 'text-muted'
      )}
      data-testid="day"
      data-disabled={disabled}
      disabled={disabled}
      {...props}
    >
      {date.date()}
      {date.isToday() && (
        <span
          className={classNames(
            'bg-indigo-500 absolute left-1/2 top-1/2 flex h-[5px] w-[5px] -translate-x-1/2 translate-y-[8px] items-center justify-center rounded-full align-middle sm:translate-y-[12px]',
            active && 'invert'
          )}
        >
          <span className="sr-only">{'Hoy'}</span>
        </span>
      )}
    </button>
  );
};

const NoAvailabilityOverlay = ({
  month,
  nextMonthButton,
}: {
  month: string | null;
  nextMonthButton: () => void;
}) => {
  return (
    <div className="bg-muted border-subtle absolute left-1/2 top-40 -mt-10 w-max -translate-x-1/2 -translate-y-1/2 transform rounded-md border p-8 shadow-sm">
      <h4 className="text-emphasis mb-4 font-medium">no disponible</h4>
      <button
        onClick={nextMonthButton}
        color="primary"
        className=""
        data-testid="view_next_month"
      >
        siguente mes
      </button>
    </div>
  );
};

const Days = ({
  minDate,
  excludedDates = [],
  browsingDate,
  weekStart,
  DayComponent = Day,
  selected,
  month,
  daysOff,
  nextMonthButton,
  eventSlug,
  ...props
}: Omit<DatePickerProps, 'locale' | 'className' | 'weekStart'> & {
  DayComponent?: React.FC<React.ComponentProps<typeof Day>>;
  browsingDate: Dayjs;
  weekStart: number;
  month: string | null;
  nextMonthButton: () => void;
  daysOff: number[];
}) => {
  // Create placeholder elements for empty days in first week
  const weekdayOfFirst = browsingDate.date(1).day();

  const includedDates = getAvailableDatesInMonth({
    browsingDate: browsingDate.toDate(),
    minDate,
    includedDates: props.includedDates,
  });

  const days: (Dayjs | null)[] = Array(
    (weekdayOfFirst - weekStart + 7) % 7
  ).fill(null);
  for (
    let day = 1, dayCount = daysInMonth(browsingDate);
    day <= dayCount;
    day++
  ) {
    const date = browsingDate.set('date', day);
    days.push(date);
  }

  const isActive = (day: dayjs.Dayjs) => {
    if (daysOff.includes(day.day())) return false;
    // for selecting a range of dates
    if (Array.isArray(selected)) {
      return (
        Array.isArray(selected) &&
        selected?.some((e) => yyyymmdd(e) === yyyymmdd(day))
      );
    }

    if (selected && yyyymmdd(selected) === yyyymmdd(day)) {
      return true;
    }

    return false;
  };

  const daysToRenderForTheMonth = days.map((day) => {
    if (!day) return { day: null, disabled: true };
    return {
      day: day,
      disabled:
        (includedDates && !includedDates.includes(yyyymmdd(day))) ||
        excludedDates.includes(yyyymmdd(day)) ||
        daysOff.includes(day.day()),
    };
  });

  /**
   * Takes care of selecting a valid date in the month if the selected date is not available in the month
   */

  const useHandleInitialDateSelection = () => {
    // Let's not do something for now in case of multiple selected dates as behaviour is unclear and it's not needed at the moment
    if (selected instanceof Array) {
      return;
    }
    const firstAvailableDateOfTheMonth = daysToRenderForTheMonth.find(
      (day) => !day.disabled
    )?.day;

    const isSelectedDateAvailable = selected
      ? daysToRenderForTheMonth.some(({ day, disabled }) => {
          if (day && yyyymmdd(day) === yyyymmdd(selected) && !disabled)
            return true;
        })
      : false;

    if (!isSelectedDateAvailable && firstAvailableDateOfTheMonth) {
      // If selected date not available in the month, select the first available date of the month
      props.onChange(firstAvailableDateOfTheMonth);
    }

    if (!firstAvailableDateOfTheMonth) {
      props.onChange(null);
    }
  };

  useEffect(useHandleInitialDateSelection);

  return (
    <>
      {daysToRenderForTheMonth.map(({ day, disabled }, idx) => (
        <div
          key={day === null ? `e-${idx}` : `day-${day.format()}`}
          className="relative w-full pt-[100%]"
        >
          {day === null ? (
            <div key={`e-${idx}`} />
          ) : props.isLoading ? (
            <button
              className="bg-muted text-muted absolute bottom-0 left-0 right-0 top-0 mx-auto flex w-full items-center justify-center rounded-sm border-transparent text-center font-medium opacity-50"
              key={`e-${idx}`}
              disabled
            >
              loading...
            </button>
          ) : (
            <DayComponent
              date={day}
              onClick={() => {
                props.onChange(day);
              }}
              disabled={disabled}
              active={isActive(day)}
            />
          )}
        </div>
      ))}

      {!props.isLoading && includedDates && includedDates?.length === 0 && (
        <NoAvailabilityOverlay
          month={month}
          nextMonthButton={nextMonthButton}
        />
      )}
    </>
  );
};

const DatePicker = ({
  weekStart = 0,
  className,
  locale,
  selected,
  daysOff,
  onMonthChange,
  ...passThroughProps
}: DatePickerProps & Partial<React.ComponentProps<typeof Days>>) => {
  const browsingDate =
    passThroughProps.browsingDate || dayjs().startOf('month');

  const changeMonth = (newMonth: number) => {
    if (onMonthChange) {
      onMonthChange(browsingDate.add(newMonth, 'month'));
    }
  };
  const month = browsingDate
    ? new Intl.DateTimeFormat('es', { month: 'long' }).format(
        new Date(browsingDate.year(), browsingDate.month())
      )
    : null;

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xl">
        <span className="text-default w-1/2 text-base">
          {browsingDate ? (
            <>
              <strong className="dark:text-white font-semibold capitalize">
                {month}{' '}
              </strong>
              <span className="text-subtle font-medium">
                {browsingDate.format('YYYY')}
              </span>
            </>
          ) : (
            <span className="text-emphasis font-semibold">...</span>
          )}
        </span>
        <div className="dark:text-white">
          <div className="flex">
            <button
              className={classNames(
                'group p-1 opacity-70 hover:opacity-100 rtl:rotate-180',
                !browsingDate.isAfter(dayjs()) &&
                  'disabled:opacity-20 hover:bg-background hover:opacity-70'
              )}
              onClick={() => changeMonth(-1)}
              disabled={!browsingDate.isAfter(dayjs())}
            >
              <ChevronLeftIcon />
            </button>
            <button
              className="group p-1 opacity-70 hover:opacity-100 rtl:rotate-180"
              onClick={() => changeMonth(+1)}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="dark:border-slate-800 mb-2 grid grid-cols-7 gap-4 border-b border-t text-center md:mb-0 md:border-0">
        {weekdayNames(locale, weekStart, 'short').map((weekDay) => (
          <div
            key={weekDay}
            className="dark:text-white my-4 text-xs font-medium uppercase tracking-widest"
          >
            {weekDay}
          </div>
        ))}
      </div>
      <div className="relative grid grid-cols-7 gap-1 text-center">
        <Days
          weekStart={weekStart}
          selected={selected}
          {...passThroughProps}
          browsingDate={browsingDate}
          month={month}
          nextMonthButton={() => changeMonth(+1)}
          daysOff={daysOff}
        />
      </div>
    </div>
  );
};

export default DatePicker;
