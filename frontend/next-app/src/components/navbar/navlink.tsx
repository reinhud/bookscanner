"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLink = ({
  href,
  exact,
  children,
}: {
  href: string;
  exact: boolean;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} className={isActive ? "active" : ""}>
      {children}
    </Link>
  );
};
