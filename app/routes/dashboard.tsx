import { Outlet } from '@remix-run/react';
import Header from '~/components/header';
import Sidebar from '~/components/sidebar';
import AppProvider from '~/utils/app-provider';
import type { UserSidebarLink } from '~/utils/types';

// export const loader: LoaderFunction = async ({ request }) => {
//   const sidebar = await getUserSidebar(request);

//   if (!sidebar) {
//     console.log('redirecting to login', sidebar);
//     return redirect('/auth/login');
//   }

//   return sidebar;
// };
function Dashboard() {
  // const sidebarLinks = useLoaderData<UserSidebarLink[]>();

  const sidebarLinks: UserSidebarLink[] = [
    {
      name: 'Dashboard',
      icon: 'Home',
      href: '/dashboard',
    },
    {
      name: 'Citas',
      icon: 'Calendar',
      href: '/dashboard/appt',
      subMenu: [
        {
          name: 'Eventos',
          href: '/dashboard/appt/events',
        },
      ],
    },
  ];

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
