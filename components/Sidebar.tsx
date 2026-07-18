"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// SVG Icons inline — no external icon library needed
const icons = {
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  chat: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  projects: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  proposals: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  memory: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  ops: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
    </svg>
  ),
  studio: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 2,7 12,12 22,7 12,2"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/>
    </svg>
  ),
  integra: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M21 12h-2M5 12H3M12 21v-2M12 5V3"/>
    </svg>
  ),
};

const navItems = [
  { href: "/dashboard",  label: "Dashboard",   icon: icons.dashboard  },
  { href: "/chat",       label: "Chat con RUA", icon: icons.chat       },
  { href: "/projects",   label: "Proyectos",    icon: icons.projects   },
  { href: "/proposals",  label: "Propuestas",   icon: icons.proposals  },
  { href: "/memory",     label: "Memoria",      icon: icons.memory     },
  { href: "/ops",        label: "Operaciones",  icon: icons.ops        },
  { href: "/studio",     label: "Studio",       icon: icons.studio     },
  { href: "/integra",    label: "Integraciones",icon: icons.integra    },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="rua-sidebar" role="navigation" aria-label="Navegación principal de RUA">
      {/* Logo */}
      <div className="rua-logo-wrapper">
        <div className="rua-logo" aria-label="RUA">R</div>
        <span className="rua-logo-full">RUA</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-nav-item ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              id={`nav-${item.href.replace("/", "")}`}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}

        <div className="sidebar-divider" />

        <Link href="/settings" className={`sidebar-nav-item ${pathname === "/settings" ? "active" : ""}`} id="nav-settings">
          <span className="nav-icon" aria-hidden="true">{icons.settings}</span>
          <span className="nav-label">Configuración</span>
        </Link>
      </nav>

      {/* User */}
      <div className="sidebar-user" id="sidebar-user-profile">
        <div className="user-avatar" aria-label="Javier Gallardo — Super Admin">JG</div>
        <div className="user-info">
          <div className="user-name">Javier Gallardo</div>
          <div className="user-role">Super Admin</div>
        </div>
      </div>
    </aside>
  );
}
