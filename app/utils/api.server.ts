import { APPT_API_URL, AUTH_API_URL } from './constants';
import type { Event } from './types';

export const getUserSidebar = async (request: Request) => {
  try {
    const res = await fetch(`${AUTH_API_URL}/users/sidebar`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('Cookie') || '',
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const user = await res.json();

    return user;
  } catch (error) {
    return null;
  }
};

export const changeVisibility = async (
  request: Request,
  id: string,
  value: boolean
) => {
  try {
    const res = await fetch(`${AUTH_API_URL}/users/sidebar`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('Cookie') || '',
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const user = await res.json();

    return user;
  } catch (error) {
    return null;
  }
};

export const getDoctorEvents = async (request: Request) => {
  try {
    const res = await fetch(`${APPT_API_URL}/events`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('Cookie') || '',
      },
    });
    if (!res.ok) {
      console.log('ba', res);
      throw new Error(res.statusText);
    }
    const events = await res.json();

    return events;
  } catch (error) {
    return null;
  }
};

export const createEvent = async (request: Request, eventBody: Event) => {
  try {
    const res = await fetch(`${APPT_API_URL}/events`, {
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('Cookie') || '',
      },
      method: 'POST',
      body: JSON.stringify(eventBody),
    });
    if (!res.ok) {
      console.log('ba', res);
      throw new Error(res.statusText);
    }
    const data = await res.json();
    console.log('data', data);
    return data;
  } catch (error) {
    return null;
  }
};
