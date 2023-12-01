import type { ActionFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, Link, useActionData, useNavigation } from '@remix-run/react';
import AuthHeader from '~/components/auth/auth-header';
import AuthImage from '~/components/auth/auth-image';
import Banner from '~/components/banner';
import { commitSession, getSession } from '~/sessions';
import { AUTH_API_URL } from '~/utils/constants';
export const metadata = {
  title: 'Log In - School Board',
  description: 'Page description',
};

export async function action({ request }: ActionFunctionArgs) {
  try {
    const body = await request.formData();
    const username = body.get('cid');
    const password = body.get('password');
    const res = await fetch(`${AUTH_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      return json({ error: true });
    }
    const data = await res.json();
    const session = await getSession(request.headers.get('Cookie'));
    session.set('accessToken', data.access_token);
    session.set('userId', '6569382206ff6ea7855c76cc');
    session.set('clinicId', '655c57e576c2c7421f4b3414');
    session.set('role', 'ADMIN');
    return redirect('/dashboard', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function SignIn() {
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const isSubmitting = navigation.state !== 'idle';

  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              {/* error banner */}

              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                Bienvenido de Vuelta! ✨
              </h1>

              {/* Form */}
              <Form method="post" action="/auth/login">
                <fieldset disabled={isSubmitting}>
                  <div className="space-y-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1 text-black dark:text-slate-100"
                        htmlFor="email"
                      >
                        Cedula
                      </label>
                      <input
                        id="cid"
                        name="cid"
                        className="form-input w-full"
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1 text-black dark:text-slate-100"
                        htmlFor="password"
                      >
                        Contraseña
                      </label>
                      <input
                        id="password"
                        name="password"
                        className="form-input w-full"
                        type="password"
                        autoComplete="on"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6 ">
                    <div className="mr-1">
                      <Link
                        className="text-sm underline hover:no-underline dark:text-slate-100"
                        to="/reset-password"
                      >
                        Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <button
                      className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 "
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
                    </button>
                  </div>
                </fieldset>
              </Form>
              {/* Footer */}

              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                {actionData?.error && (
                  <Banner type="error" open={true}>
                    Cedula o Contraseña Incorrecta
                  </Banner>
                )}
                {/* Warning */}
                <div className="mt-5">
                  <div className="bg-amber-100 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400 px-3 py-2 rounded">
                    <svg
                      className="inline w-3 h-3 shrink-0 fill-current mr-2"
                      viewBox="0 0 12 12"
                    >
                      <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                    </svg>
                    <span className="text-sm">
                      To support you during the pandemic super pro features are
                      free until March 31st.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AuthImage />
      </div>
    </main>
  );
}
