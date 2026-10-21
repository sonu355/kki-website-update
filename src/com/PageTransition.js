"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";


export default function PageTransition({
  children,
}) {
  const pathname =
    usePathname();


  useEffect(() => {
    if (
      typeof window !==
      "undefined"
    ) {
      window.scrollTo(
        0,
        0
      );
    }
  }, [pathname]);


  return (
    <div
      key={pathname}
      className="site-page-enter"
    >
      {children}
    </div>
  );
}