"use client"

import Link from "next/link";
import "@/app/camponents/header.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "خانه", href: "/" },
  { label: "آغاز همکاری", href: "/my-identity" },
  { label: "هویت من", href: "/my-identity" },
];

export default function Header() {

  const [scroll, setScroll] = useState(false)
  const pathName = usePathname()

  useEffect(()=>{

    const handlerScroll = ()=>{

      setScroll(window.scrollY > 145)

    }

    window.addEventListener("scroll", handlerScroll)

    return()=> {window.removeEventListener("scroll", handlerScroll)}

  },[])

  return (
    <header className={`header ${scroll === true ? "scrolled-header" : ""}`}>
      <div className="header-container">
          
          <div className="nav-cta">

          <nav className="header-nav" aria-label="منوی اصلی">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathName === item.href ? "active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

          <Link href="tel:09059627668" className="header-cta">
            ارتباط با من
          </Link>
          </div>

      </div>
    </header>
  );
}