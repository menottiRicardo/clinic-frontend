import Logo from '~/components/logo';
import ThemeToggle from '../theme-toggle';

export default function AuthHeader() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 w-full">
        <Logo />
        <ThemeToggle />
      </div>
    </div>
  );
}
