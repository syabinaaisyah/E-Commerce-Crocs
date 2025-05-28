import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./Logout";

export default async function Navbar() {
  const cookieStore = await cookies()
  const token = cookieStore.get("authorization")?.value|| "";

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className="text-white hover:text-green-300 transition-all duration-300 text-lg font-semibold"
    >
      {children}
    </Link>
  );

  return (
    <div className="bg-gradient-to-r from-green-500 to-green-700 p-4 shadow-lg flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img
          src="/img-crocs.png"
          alt="CROCS Logo"
          className="w-20 h-10 object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex-grow flex justify-center gap-10">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about-me">About</NavLink>
        <NavLink href="/products">Products</NavLink>
      </div>

      <div className="flex items-center gap-6">
        {token ? (
          <>
            <NavLink href="/wishlists">Wishlists</NavLink>
            <LogoutButton />
          </>
        ) : (
          <div className="flex gap-4">
            <NavLink href="/login">Login</NavLink>
          </div>
        )}
      </div>
    </div>
  );
}