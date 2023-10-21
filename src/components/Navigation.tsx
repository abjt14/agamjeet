import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import styles from "@/styles/navigation.module.css";
import clsx from "clsx";

export default function Navigation() {
  type Link = {
    name: string,
    href: string,
    type: "internal" | "external",
  }

  const links: Link[] = [
    {
      name: "home",
      href: "/",
      type: "internal",
    },
    {
      name: "about",
      href: "/about",
      type: "internal",
    },
    {
      name: "site stats",
      href: "/stats",
      type: "internal",
    },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/in/agamjeet-singh/",
      type: "external",
    }
  ];

  return(
    <nav className="w-full flex gap-4 justify-between sm:justify-start items-center">
      {
        links.map((link, index) =>
          link.type === "internal" ? (
            <Link
              key={index}
              href={link.href}
              className="fade-in-small hover:text-cinder-800 hover:dark:text-macaroni-and-cheese-300 transition-colors duration-150"
              style={{
                animationDelay: `${(index + 1)*100 + 450}ms`
              }}
            >
              {link.name}
            </Link>
          ) : (
            <a
              key={index}
              href={link.href}
              target="_blank"
              className="fade-in-small flex justify-between items-center gap-1 whitespace-nowrap hover:text-cinder-800 hover:dark:text-macaroni-and-cheese-300 transition-colors duration-150"
              style={{
                animationDelay: `${(index + 1)*100 + 450}ms`
              }}
            >
              {link.name}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          )
        )
      }
    </nav>
  )
}