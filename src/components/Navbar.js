"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef(null);
  const startX = useRef(0);

  // 🔒 Lock background scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // 👉 Swipe to close
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    const deltaX = e.touches[0].clientX - startX.current;
    if (deltaX > 80) setOpen(false);
  };

  return (
    <>
      <nav className="nav">
        <h2 className="logo">CampusHub</h2>

        {/* Desktop */}
        <div className="links desktop">{navLinks(pathname)}</div>

        {/* Hamburger */}
        <button
          className={`hamburger ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        ref={drawerRef}
        className={`mobile-drawer ${open ? "show" : ""}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        {/* ❌ Close button */}
        <button
          className="drawer-close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        {navLinks(pathname, () => setOpen(false), true)}
      </div>
    </>
  );
}

function navLinks(pathname, onClick, stagger = false) {
  const links = [
    ["/dashboard", "Dashboard"],
    ["/students", "Students"],
    ["/courses", "Courses"],
    ["/clubs", "Clubs"],
    ["/students-with-relations", "Students ↔ Courses"],
    ["/analytics", "Analytics"],
  ];

  return links.map(([href, label], i) => (
    <Link
      key={href}
      href={href}
      onClick={onClick}
      className={`${pathname === href ? "active" : ""} ${
        stagger ? "drawer-link" : ""
      }`}
      style={stagger ? { animationDelay: `${i * 70}ms` } : {}}
    >
      {label}
    </Link>
  ));
}
