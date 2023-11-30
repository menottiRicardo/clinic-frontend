import { jwtDecode } from 'jwt-decode';

export const getUserFromReq = (request: Request): User | null => {
  const cookies = request.headers.get('Cookie')?.split('; ');
  const access_token = cookies
    ?.find((cookie) => cookie.startsWith('access_token'))
    ?.split('=')[1];
  if (!access_token) return null;
  return jwtDecode(access_token);
};

export interface User {
  username: string;
  sub: string;
  role: string;
  iat: number;
  exp: number;
}
