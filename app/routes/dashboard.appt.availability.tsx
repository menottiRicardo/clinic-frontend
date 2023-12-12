import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useSubmit } from '@remix-run/react';
import {
  CheckIcon,
  ChevronsUpDownIcon,
  MinusIcon,
  PlusIcon,
  SaveIcon,
  TrashIcon,
} from 'lucide-react';
import { Fragment, useState } from 'react';

import ToggleSwitch from '~/components/toggle-switch';
import { Listbox, Transition } from '@headlessui/react';
import { API_URL } from '~/utils/constants';
import type { Availability, DayKey, Days } from '~/utils/types';
import { getSession } from '~/sessions';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = JSON.parse(formData.get('data') as string);
  try {
    const session = await getSession(request.headers.get('Cookie'));
    const token = session.get('accessToken');
    const doctorId = session.get('userId');
    const clinicId = session.get('clinicId');

    console.log('data', data.tuesday.hours, data.tuesday);
    const res = await fetch(`${API_URL}/appointment/availability`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      method: 'PATCH',
      body: JSON.stringify({
        availability: data,
        doctorId,
        clinicId,
      }),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const result = await res.json();
    return result;
  } catch (error) {
    return null;
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const session = await getSession(request.headers.get('Cookie'));
    const token = session.get('accessToken');
    const userId = session.get('userId');
    const clinicId = session.get('clinicId');
    const res = await fetch(
      `${API_URL}/appointment/availability?doctorId=${userId}&clinicId=${clinicId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const result = await res.json();

    return result;
  } catch (error) {
    return null;
  }
};
const Appt = () => {
  const data = useLoaderData<Availability>();
  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
    data;
  const [days, setDays] = useState<Days>({
    monday: {
      available: monday?.available,
      hours: monday?.hours || [{ start: '8:00 AM', end: '9:00 AM' }],
    },
    tuesday: {
      available: tuesday?.available,
      hours: tuesday?.hours || [{ start: '8:00 AM', end: '9:00 AM' }],
    },
    wednesday: {
      available: wednesday?.available,
      hours: wednesday?.hours || [{ start: '8:00 AM', end: '9:00 AM' }],
    },
    thursday: {
      available: thursday?.available,
      hours: thursday?.hours || [{ start: '8:00 AM', end: '9:00 AM' }],
    },
    friday: {
      available: friday?.available,
      hours: friday?.hours || [{ start: '8:00 AM', end: '9:00 AM' }],
    },
    saturday: {
      available: saturday?.available,
      hours: saturday?.hours || [{ start: '8:00 AM', end: '9:00 AM' }],
    },
    sunday: {
      available: sunday?.available,
      hours: sunday?.hours || [{ start: '8:00 AM', end: '9:00 AM' }],
    },
  });

  const submit = useSubmit();

  const times = Array.from({ length: 96 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${ampm}`;
  });

  const getNextTimes = (lastHour: string) => {
    if (!lastHour) {
      return times;
    }
    return times.slice(times.findIndex((time) => time === lastHour) + 1);
  };

  const handleDayRender = (day: DayKey) => {
    return days[day].hours.map((hour, i) => (
      <div key={`${day}-${i}`} className="flex items-center gap-2">
        <Listbox
          value={days[day].hours[i].start}
          onChange={(val) => {
            const newDays = { ...days };
            newDays[day].hours[i].start = val;
            setDays(newDays);
          }}
        >
          <div className="relative mt-1 w-32">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-slate-500 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{hour.start}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronsUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-500  py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {i === 0
                  ? times.map((time, timeIdx) => (
                      <Listbox.Option
                        key={timeIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? 'bg-indigo-100 text-indigo-900 dark:text-white dark:bg-indigo-500'
                              : 'text-gray-900'
                          }`
                        }
                        value={time}
                      >
                        {({ selected }) => {
                          return (
                            <>
                              <span
                                className={`block truncate dark:text-white ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {time}
                              </span>

                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-indigo-800">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          );
                        }}
                      </Listbox.Option>
                    ))
                  : getNextTimes(days[day].hours[i - 1].end).map(
                      (time, timeIdx) => (
                        <Listbox.Option
                          key={timeIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-indigo-100 text-indigo-900 dark:text-white dark:bg-indigo-500'
                                : 'text-gray-900'
                            }`
                          }
                          value={time}
                        >
                          {({ selected }) => {
                            return (
                              <>
                                <span
                                  className={`block truncate dark:text-white ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {time}
                                </span>

                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-indigo-800">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            );
                          }}
                        </Listbox.Option>
                      )
                    )}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        <span>
          <MinusIcon size={20} />
        </span>
        <Listbox
          value={days[day].hours[i].end}
          onChange={(val) => {
            const newDays = { ...days };
            newDays[day].hours[i].end = val;
            setDays(newDays);
          }}
        >
          <div className="relative mt-1 w-32">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-slate-500 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{hour.end}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronsUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-500  py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {getNextTimes(days[day].hours[i].start).map((time, timeIdx) => (
                  <Listbox.Option
                    key={timeIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-indigo-100 text-indigo-900 dark:text-white dark:bg-indigo-500'
                          : 'text-gray-900'
                      }`
                    }
                    value={time}
                  >
                    {({ selected }) => {
                      return (
                        <>
                          <span
                            className={`block truncate dark:text-white ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {time}
                          </span>

                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 dark:text-indigo-800">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      );
                    }}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
        {days[day].hours.length === 1 && (
          <span
            className="ml-3 cursor-pointer"
            onClick={() => {
              const newDays = { ...days };
              const rest = times.slice(
                times.findIndex((time) => time === days.monday.hours[0].end) + 1
              );
              newDays[day].hours = [
                ...newDays[day].hours,
                { start: rest[0], end: rest[1] },
              ];
              setDays(newDays);
            }}
          >
            <PlusIcon />
          </span>
        )}
        {i === 1 && (
          <span
            className="ml-3 cursor-pointer"
            onClick={() => {
              const newDays = { ...days };
              newDays[day].hours = [newDays[day].hours[0]];
              setDays(newDays);
            }}
          >
            <TrashIcon />
          </span>
        )}
      </div>
    ));
  };

  const DayTitles = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miercoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sabado',
    sunday: 'Domingo',
  };

  const handleAvailabilityCheck = (day: DayKey, value: boolean) => {
    const newDays = { ...days };
    newDays[day].available = value;
    setDays(newDays);
  };

  const handleSubmit = () => {
    submit(
      { data: JSON.stringify(days) },
      {
        method: 'post',
      }
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-4">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
            Disponibilidad
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Estas son tus horas de trabajo.
          </p>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Create event button */}
          <button
            onClick={handleSubmit}
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            <SaveIcon className="opacity-50" />

            <span className="hidden xs:block ml-2">Guardar</span>
          </button>
        </div>
      </div>

      <div className="space-y-1 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-lg">
        {Object.keys(days).map((day) => (
          <div
            className="flex flex-col md:flex-row gap-2 items-center first:border-none border-t py-2 dark:border-slate-700 border-dashed"
            key={day}
          >
            <div className="flex items-center w-36">
              <ToggleSwitch
                id={`${day}-switch`}
                checked={days[day as DayKey].available}
                onChange={(value) =>
                  handleAvailabilityCheck(day as DayKey, value)
                }
              />
              <span className="ml-2 mr-10">{DayTitles[day as DayKey]}</span>
            </div>

            <div className="flex flex-col gap-2">
              {handleDayRender(day as DayKey)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appt;
