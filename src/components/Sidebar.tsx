import { type ReactElement, type ElementType, useState } from 'react';
import type { AppRoutePage } from '../types';
import { Home, Presentation, Newspaper, BookOpen, FileText, GraduationCap, Menu, X } from 'lucide-react';
import { Github, OrcidIcon } from './CustomIcons';

/**
 * Sidebar Component
 * Renders the fixed navigation bar on the left (desktop)
 * or a sticky, collapsible header (mobile).
 */
interface SidebarProps {
  currentPage: AppRoutePage;
}

// Nav link definitions — single source of truth for both mobile and desktop.
const NAV_LINKS = [
  { icon: Home,         label: 'Home',     href: '#/home',     page: 'home' as AppRoutePage },
  { icon: Presentation, label: 'Projects', href: '#/projects', page: 'projects' as AppRoutePage },
  { icon: Newspaper,    label: 'Blog',     href: '#/blog',     page: 'blog' as AppRoutePage },
  { icon: BookOpen,     label: 'Recipes',  href: '#/recipes',  page: 'recipes' as AppRoutePage },
  { icon: FileText,     label: 'CV',       href: '#/cv',       page: 'cv' as AppRoutePage },
];

const SOCIAL_LINKS = [
  { href: 'https://github.com/peterkaloyannis',                                      icon: Github,        label: 'GitHub' },
  { href: 'https://orcid.org/0009-0002-3420-8961',                                  icon: OrcidIcon,     label: 'ORCID' },
  { href: 'https://scholar.google.com/citations?user=_zY2gt4AAAAJ&hl=en',           icon: GraduationCap, label: 'Google Scholar' },
];

export default function Sidebar({ currentPage }: SidebarProps): ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  // Blog sub-pages should keep the Blog nav link highlighted.
  const isLinkActive = (page: AppRoutePage) =>
    page === 'blog'
      ? currentPage === 'blog' || currentPage === 'blog-post'
      : currentPage === page;

  return (
    // Mobile: 'sticky top-0' to keep it visible, 'z-50' to stay on top.
    // Desktop: 'lg:fixed' to lock it to the left, 'lg:h-screen', etc.
    <aside className="sidebar sticky top-0 lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-72 lg:p-8 p-4 shadow-xl z-50">
      <div className="flex flex-col justify-between h-full">

        {/* --- 1. TOP GROUP (Header + Navs) --- */}
        <div>
          {/* --- Top Header (Visible on Mobile & Desktop) --- */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-extrabold">
                PETER <br/> KALOYANNIS
              </h2>
            </div>

            {/* --- Mobile Hamburger Button --- */}
            <button
              className="lg:hidden p-3 social-link"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* --- Mobile Menu Content (Animated) --- */}
          <div
            className="grid lg:hidden transition-all duration-300 ease-in-out"
            style={{ gridTemplateRows: isMobileMenuOpen ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <nav className="flex flex-col pt-4 px-2">
                {NAV_LINKS.map(({ icon, label, href, page }) => (
                  <SidebarLink
                    key={page}
                    icon={icon}
                    label={label}
                    href={href}
                    isActive={isLinkActive(page)}
                    onClick={handleLinkClick}
                  />
                ))}
              </nav>

              {/* --- Mobile Social Links --- */}
              <div className="flex pt-4 pb-2 px-2 justify-center">
                {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link p-3">
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* --- Desktop Navigation --- */}
          <div className="hidden lg:block">
            <nav className="flex flex-col space-y-4 pt-12">
              {NAV_LINKS.map(({ icon, label, href, page }) => (
                <SidebarLink
                  key={page}
                  icon={icon}
                  label={label}
                  href={href}
                  isActive={isLinkActive(page)}
                  onClick={() => {}}
                />
              ))}
            </nav>
          </div>
        </div>

        {/* --- 2. BOTTOM GROUP (Desktop Social Links) --- */}
        <div className="hidden lg:flex space-x-4 justify-center">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link">
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>

      </div>
    </aside>
  );
}

/**
 * SidebarLink Component
 * A reusable component for navigation links in the sidebar.
 */
interface SidebarLinkProps {
  icon: ElementType;
  label: string;
  isActive: boolean;
  href: string;
  onClick: () => void;
}

function SidebarLink({ icon: Icon, label, isActive, href, onClick }: SidebarLinkProps): ReactElement {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </a>
  );
}
