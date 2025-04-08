"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId") || "";
  const params = new URLSearchParams({ projectId });

  const subRoutes = ["/open-budget", "/budget-transfer"];
  const isActiveDropdown = subRoutes.includes(pathname);
  const [isOpen, setIsOpen] = useState(isActiveDropdown);

  const toggleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const navItems = [
    {
      label: "Home",
      href: `/?${params.toString()}`,
      path: "/",
      icon: "/icon-home.svg",
    },
    {
      label: "BoQ",
      href: `/?${params.toString()}`,
      path: "/",
      icon: "/icon-boq.svg",
    },
    {
      label: "Open Budget",
      children: [
        {
          label: "BoQ",
          href: `/open-budget?${params.toString()}`,
          path: "/open-budget",
        },
        {
          label: "Report",
          href: `/budget-transfer?${params.toString()}`,
          path: "/budget-transfer",
        },
      ],
    },
  ];

  return (
    <aside
      className="h-screen text-white fixed top-0 mt-19 bg-ui-primary"
      style={{ width: "203px" }}
    >
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li
            key={item.label}
            className="m-0"
            ref={item.children ? dropdownRef : undefined}
          >
            {item.children ? (
              <>
                <button
                  type="button"
                  className={`w-full h-12 ${
                    isActiveDropdown ? "bg-ui-hover" : ""
                  } hover:bg-ui-hover cursor-pointer flex pl-7 items-center justify-between pr-4`}
                  onClick={toggleCollapse}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleCollapse();
                    }
                  }}
                >
                  <div className="flex items-center gap-3 cursor-pointer">
                    <span className="text-xs font-bold">{item.label}</span>
                  </div>
                </button>
                {isOpen && (
                  <ul className="mt-1">
                    {item.children.map((subItem) => {
                      const isActive = pathname === subItem.path;
                      return (
                        <li
                          key={subItem.href}
                          className={`h-12 ${
                            isActive
                              ? "bg-blue-900 text-white"
                              : "bg-white text-ui-text"
                          } hover:bg-ui-hover hover:text-white flex items-center pl-7 cursor-pointer`}
                        >
                          <Link
                            href={subItem.href}
                            className="text-xs font-semibold w-full h-full flex items-center"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            ) : (
              <div
                className={`h-12 ${
                  pathname === item.path ? "bg-ui-hover" : ""
                } hover:bg-ui-hover cursor-pointer flex pl-7 items-center gap-3`}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-2 w-full h-full"
                >
                  <Image
                    src={item.icon || "/icon-home.svg"}
                    alt="Logo"
                    width={13}
                    height={13}
                    className="inline-block mr-2"
                  />
                  <span className="text-xs text-white font-bold">
                    {item.label}
                  </span>
                </Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
