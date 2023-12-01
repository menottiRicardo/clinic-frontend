import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import Header from '~/components/header';
import Sidebar from '~/components/sidebar';
import { getSession } from '~/sessions';
import AppProvider from '~/utils/app-provider';
import { AUTH_API_URL } from '~/utils/constants';
import type { UserSidebarLink } from '~/utils/types';

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const session = await getSession(request.headers.get('Cookie'));
    const token = session.get('accessToken');
    const res = await fetch(`${AUTH_API_URL}/users/sidebar`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok || !token) {
      console.log('sidebar', token);
      return redirect('/auth/login');
    }
    const sidebar = await res.json();

    return sidebar;
  } catch (error) {
    return null;
  }
};
function Dashboard() {
  const sidebarLinks = useLoaderData<UserSidebarLink[]>();

  return (
    <AppProvider>
      <div className="flex h-[100dvh] overflow-hidden">
        {/* Sidebar */}

        <Sidebar sidebarLinks={sidebarLinks} />
        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header />

          <main className="grow [&>*:first-child]:scroll-mt-16">
            <Outlet />
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default Dashboard;
