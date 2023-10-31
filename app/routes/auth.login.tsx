import { Link } from '@remix-run/react';
import AuthHeader from '~/components/auth/auth-header';
import AuthImage from '~/components/auth/auth-image';

export const metadata = {
  title: 'Log In - School Board',
  description: 'Page description',
};

export default function SignIn() {
  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <AuthHeader />

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                Welcome back! ✨
              </h1>
              {/* Form */}
              <form method="post">
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1 dark:text-slate-100"
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
                      className="block text-sm font-medium mb-1 dark:text-slate-100"
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
                  >
                    Sign In
                  </button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm dark:text-slate-100">
                  Don't you have an account?{' '}
                  <Link
                    className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </div>
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
