export default function AuthImage() {
  return (
    <div
      className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
      aria-hidden="true"
    >
      <img
        className="object-cover object-center w-full h-full"
        src={'/images/auth-image.jpeg'}
        width={760}
        height={1024}
        alt="Authentication"
      />
      <img
        className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block"
        src={'/images/auth-decoration.png'}
        width={218}
        height={224}
        alt="Authentication decoration"
      />
    </div>
  );
}
