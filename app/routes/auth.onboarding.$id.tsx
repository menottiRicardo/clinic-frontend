import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useParams, useSearchParams } from '@remix-run/react';
import AdminStep0 from '~/components/onboarding/admin/step-0';
import OnboardingHeader from '~/components/onboarding/onboarding-header';
import OnboardingImage from '~/components/onboarding/onboarding-image';
import OnboardingProgress from '~/components/onboarding/onboarding-progress';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  //   const user = await getUserO(params.contactId);
  //   if (!contact) {
  //     throw new Response('Not Found', { status: 404 });
  //   }
  //   return json({ contact });
  return null;
};

function Onboarding() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get('step') ?? '1';
  if (!id) return null;
  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="relative flex">
        {/* Content */}
        <div className="w-full md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <div className="flex-1">
              <OnboardingHeader />
              {/* <OnboardingProgress step={step} steps={adminSteps} /> */}
            </div>

            <div className="px-4 py-8">
              <div className="max-w-md mx-auto">
                {step === '1' && <AdminStep0 id={id} />}
              </div>
            </div>
          </div>
        </div>

        <OnboardingImage />
      </div>
    </main>
  );
}

export default Onboarding;
