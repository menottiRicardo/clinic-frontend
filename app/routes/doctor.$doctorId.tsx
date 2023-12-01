import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ClockIcon, UserCircleIcon } from 'lucide-react';
import { APPT_API_URL } from '~/utils/constants';
import { NUMBER_TO_DAY } from '~/utils/types';
import type {
  Availability,
  DayKey,
  Event as EventType,
  NUMBER_TO_DAY_KEY,
} from '~/utils/types';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import DatePicker from '~/components/date-picker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import { to24Hour } from '~/utils/weekday';
dayjs.extend(isSameOrAfter);
export const loader: LoaderFunction = async ({ request, params }) => {
  const doctorId = params.doctorId;
  try {
    const res = await fetch(
      `${APPT_API_URL}/appointments/schedule/${doctorId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: request.headers.get('Cookie') || '',
        },
      }
    );
    if (!res.ok) {
      console.log('ba', res);
      throw new Error(res.statusText);
    }
    const data = await res.json();

    return data;
  } catch (error) {
    return null;
  }
};

type LoaderData = {
  events: EventType[];
  doctor: {
    name: string;
    clinic: {
      name: string;
    };
  };
  daysOff: number[];
  availability: Availability;
};

const DoctorSchedule = () => {
  const { events, doctor, daysOff, availability } = useLoaderData<LoaderData>();
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>();
  const [selectedTime, setSelectedTime] = useState<string | null>();
  const [month, setMonth] = useState<string | null>();
  //   console.log({ events, doctor, daysOff, availability });

  const times = useMemo(() => {
    if (!selectedEvent) return [];
    const duration = selectedEvent.duration;
    const times = [];

    // handle availability
    let date = dayjs(selectedDate);
    const currentDayNumber = date.day();
    const currentDayLetter =
      NUMBER_TO_DAY[currentDayNumber as NUMBER_TO_DAY_KEY];
    const dayAvailability = availability[currentDayLetter as DayKey];

    const start = date
      .hour(parseInt(to24Hour(dayAvailability.hours[0].start)))
      .minute(0);
    const end = date
      .hour(
        parseInt(
          to24Hour(
            dayAvailability.hours[dayAvailability.hours.length === 1 ? 0 : 1]
              .end
          )
        )
      )
      .minute(0);

    const intervalStart =
      date.hour(parseInt(to24Hour(dayAvailability?.hours[0]?.end))).minute(0) ??
      null;

    const intervalEnd =
      date
        .hour(parseInt(to24Hour(dayAvailability?.hours[1]?.start)))
        .minute(0) ?? null;

    const hasInterval = intervalStart && !isNaN(intervalEnd.day());
    let time = start;
    while (time.isBefore(end)) {
      if (hasInterval) {
        if (time.isSameOrAfter(intervalStart) && time.isBefore(intervalEnd)) {
          time = time.add(parseInt(duration), 'minute');
          continue;
        }
      }
      times.push(time.format('hh:mm A'));
      time = time.add(parseInt(duration), 'minute');
    }

    return times;
  }, [selectedEvent, selectedDate]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="md:bg-white md:dark:bg-slate-700 p-3 rounded-md md:border md:border-slate-500 shadow-sm w-full md:w-3/5 h-full">
        {/* doc */}
        <div className="flex items-center gap-3">
          <UserCircleIcon size={56} />
          <div>
            <h1 className="text-xl dark:text-white text-black font-bold">
              Dr. {doctor.name}
            </h1>
            <h2 className="text-md dark:text-slate-400 text-black">
              Clinica {doctor.clinic.name}
            </h2>
          </div>
        </div>

        {/* events */}

        <div className="max-h-72 overflow-y-scroll space-y-2 my-8">
          {events.map((event: EventType) => (
            <button
              key={event._id}
              onClick={() => setSelectedEvent(event)}
              className={classNames(
                `shadow-lg w-full rounded-md border px-4 py-3 bg-white dark:bg-slate-800 transition-colors duration-200 ease-in-out cursor-auto`,
                {
                  'bg-slate-100 dark:bg-slate-600 border-white dark:border-slate-100 shadow-md':
                    selectedEvent?._id === event._id,
                  'border-slate-200 dark:border-slate-700':
                    selectedEvent?._id !== event._id,
                }
              )}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col text-left">
                  <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                    {event.title}
                  </h2>
                  <h3 className="text-sm subtitle">{event.description}</h3>
                </div>
                <div className="bg-slate-600 flex grow-0 text-xs gap-0.5 rounded-md w-12 px-1 py-0.5 items-center justify-center text-white">
                  <ClockIcon size={20} /> {event.duration}m
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* day picker */}
        <div className="flex justify-center items-center">
          <DatePicker
            onChange={(date: Dayjs | null) => {
              setSelectedDate(date === null ? date : date.format('YYYY-MM-DD'));
            }}
            onMonthChange={(date: Dayjs) => {
              setMonth(date.format('YYYY-MM'));
              setSelectedDate(date.format('YYYY-MM-DD'));
            }}
            locale={'es'}
            browsingDate={month ? dayjs(month) : undefined}
            selected={dayjs(selectedDate)}
            weekStart={1}
            excludedDates={['2023-12-02']}
            daysOff={daysOff}
          />
        </div>

        {/* times */}
        <div className="max-h-72 overflow-y-scroll space-y-2 mt-8 pb-8">
          {times.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={classNames(
                `shadow-lg w-full rounded-md border px-4 py-3 bg-white dark:bg-slate-800 transition-colors duration-200 ease-in-out cursor-auto`,
                {
                  'bg-slate-100 dark:bg-slate-600 border-white dark:border-slate-100 shadow-md':
                    selectedTime === time,
                  'border-slate-200 dark:border-slate-700':
                    selectedTime !== time,
                }
              )}
            >
              <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-center">
                {time}
              </h2>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
