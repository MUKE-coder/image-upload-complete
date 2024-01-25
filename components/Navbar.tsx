"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const navLinks = [
    {
      name: "Uploadthing",
      path: "/uploadthing",
    },
    {
      name: "EdgeStore",
      path: "/edgestore",
    },
    {
      name: "Cloudinary",
      path: "/cloudinary",
    },
    {
      name: "FileStack",
      path: "/filestack",
    },
  ];
  return (
    <header className="py-4 bg-white">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <a href="/" title="JB" className="flex font-bold">
              JB WEB DEVELOPER
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-900"
              onClick={toggleExpanded}
              aria-expanded={expanded}
            >
              <span aria-hidden="true">
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {expanded ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </span>
            </button>
          </div>

          <nav className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-16">
            {navLinks.map((item, i) => {
              return (
                <Link
                  key={i}
                  href={item.path}
                  title={item.name}
                  className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <nav className="hidden lg:flex">
            <a
              href="https://www.youtube.com/c/JBWEBDEVELOPER"
              title="Subscribe to JB WEB DEVELOPER"
              className="inline-flex items-center justify-center px-6 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              role="button"
            >
              SUBSCRIBE
            </a>
          </nav>
        </div>

        <nav style={{ display: expanded ? "block" : "none" }}>
          <div className="px-1 py-8">
            <div className="grid gap-y-7">
              {navLinks.map((item, i) => {
                return (
                  <Link
                    key={i}
                    href={item.path}
                    title={item.name}
                    className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    {item.name}
                  </Link>
                );
              })}

              <a
                href="https://www.youtube.com/c/JBWEBDEVELOPER"
                title="Subscribe to JB WEB DEVELOPER"
                className="inline-flex items-center justify-center px-6 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Subscribe
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
