export default function OnboardingImage() {
  return (
    <div
      className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
      aria-hidden="true"
    >
      <img
        className="object-cover w-full h-full"
        src={'/images/onboarding.avif'}
        width={760}
        height={1024}
        alt="Onboarding"
      />
      <img
        className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block"
        src={'/images/auth-decoration.png'}
        width={218}
        height="224"
        alt="Onboarding decoration"
      />
    </div>
  );
}
