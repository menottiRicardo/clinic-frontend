import { Link } from "@remix-run/react"

interface SidebarLinkProps {
  children: React.ReactNode
  href: string
}

export default function SidebarLink({
  children,
  href,
}: SidebarLinkProps) {

  const pathname = 'usePathname()'
  
  return (
    <Link className={`block text-slate-200 hover:text-white transition duration-150 truncate ${pathname === href ? 'group-[.is-link-group]:text-indigo-500' : 'group-[.is-link-group]:text-slate-400 hover:text-slate-200 hover:group-[.is-link-group]:text-slate-200'}`} to={href}>
      {children}
    </Link>
  )
}
