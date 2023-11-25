import { AUTH_API_URL } from './constants';

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
