import type { LoaderFunction } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import EventCard from '~/components/appt/event-card';
import { getSession } from '~/sessions';
import { API_URL } from '~/utils/constants';
import type { Event } from '~/utils/types';

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const session = await getSession(request.headers.get('Cookie'));
    const token = session.get('accessToken');
    const userId = session.get('userId');
    const clinicId = session.get('clinicId');
    const role = session.get('role');

    console.log('clinicId', clinicId, token, userId, role);
    const shouldFetchSingleEvents = role === 'DOCTOR' || role === 'ADMIN';
    const res = await fetch(
      `${API_URL}/appointment/events?${
        shouldFetchSingleEvents ? `doctorId=${userId}&` : ''
      }clinicId=${clinicId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      console.log(' bad res', res);
      throw new Error(res.statusText);
    }
    console.log('res', res);
    return await res.json();
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

const Appt = () => {
  const events: Event[] = useLoaderData();
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <Outlet />
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-4">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
            Eventos
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Crea eventos para que los pacientes puedan agendar citas contigo.
          </p>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Create event button */}
          <Link
            to="new"
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            <svg
              className="w-4 h-4 fill-current opacity-50 shrink-0"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Nuevo Evento</span>
          </Link>
        </div>
      </div>

      <div className="space-y-1">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event._id}
              title={event.title}
              description={event.description}
              duration={event.duration}
              _id={event._id}
              doctorId={event.doctorId}
            />
          ))
        ) : (
          <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-10">
            No hay eventos registrados
          </div>
        )}
      </div>
    </div>
  );
};

export default Appt;
