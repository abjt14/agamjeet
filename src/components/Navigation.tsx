'use client';

import Link from "next/link";
import { useEffect } from "react";

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
      name: "linkedin",
      href: "https://www.linkedin.com/in/agamjeet-singh/",
      type: "external",
    }
  ];

  return(
    <nav className="w-full flex gap-4 justify-between items-center">
      <div className="flex gap-8 justify-start items-center">
        {
          links.map((link, index) =>
            link.type === "internal" ? (
              <Link key={index} href={link.href} className="hover:text-cinder-800 hover:dark:text-macaroni-and-cheese-300 transition-colors duration-150">
                {link.name}
              </Link>
            ) : (
              <a key={index} href={link.href} target="_blank" className="flex justify-between items-center gap-1 hover:text-cinder-800 hover:dark:text-macaroni-and-cheese-300 transition-colors duration-150">
                {link.name}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            )
          )
        }
      </div>
      <button
        className="block p-2 hover:text-cinder-800 hover:dark:text-macaroni-and-cheese-300 transition-colors duration-150"
        onClick={() => {
          document.documentElement.classList.toggle('dark')
          window.localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        }}
        name="Toggle Color Mode"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      </button>
    </nav>
  )
}