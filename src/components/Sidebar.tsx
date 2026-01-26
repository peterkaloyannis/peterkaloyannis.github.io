import React, { type ReactElement, useState } from 'react';
import type { AppRoutePage } from '../types'; 
import {
  Home,
  Presentation,
  Newspaper,
  BookOpen,
  FileText,
  Github,
  OrcidIcon,     
  GraduationCap,
  Menu,        
  XIcon    
} from './Icons';

/**
 * Sidebar Component
 * Renders the fixed navigation bar on the left (desktop)
 * or a sticky, collapsible header (mobile).
 */
interface SidebarProps {
  // Update the prop type
  currentPage: AppRoutePage;
}

export default function Sidebar({ currentPage }: SidebarProps): ReactElement {
  // Handler for mobile view.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handler for clicking a link on mobile to close the menu
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false); // Close the menu
  };

  // Determine if the blog link should be active
  // It's active if the page is 'blog' OR 'blog-post'
  const isBlogActive = currentPage === 'blog' || currentPage === 'blog-post';
  
  return (
    // Mobile: 'sticky top-0' to keep it visible, 'z-50' to stay on top.
    // Desktop: 'lg:fixed' to lock it to the left, 'lg:h-screen', etc.
    <aside className="sticky top-0 lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-72 bg-gray-900 text-gray-200 lg:p-8 p-4 shadow-xl z-50">
      {/* This div is now the main layout container.
        On mobile, it's just a block.
        On desktop, it becomes a flex-col to separate nav and social links.
      */}
      <div className="flex flex-col justify-between h-full">
        
        {/* --- 1. TOP GROUP (Header + Navs) --- */}
        {/* This wrapper div ensures header and nav stay together at the top */}
        <div> 
          {/* --- Top Header (Visible on Mobile & Desktop) --- */}
          <div className="flex justify-between items-center">
            {/* Your Name / Logo */}
            <div>
              <h2 className="text-2xl font-extrabold text-white">
                PETER <br/> KALOYANNIS
              </h2>
            </div>

            {/* --- Mobile Hamburger Button --- */}
            {/* 'lg:hidden' ensures this only shows on mobile */}
            <button 
              className="lg:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* --- Mobile Menu Content (Animated) --- */}
          {/* This div contains the animated navigation menu for mobile.
            It uses the grid-template-rows trick to animate height.
          */}
          <div 
            className="grid lg:hidden transition-all duration-300 ease-in-out"
            style={{
              gridTemplateRows: isMobileMenuOpen ? '1fr' : '0fr'
            }}
          >
            <div className="overflow-hidden">
              <nav className="flex flex-col space-y-2 pt-6 px-4">
                {/* Pass the new onClick handler to each link */}
                <SidebarLink 
                  icon={Home} 
                  label="Home" 
                  href="#/home"
                  isActive={currentPage === 'home'}
                  onClick={handleLinkClick}
                />
                <SidebarLink 
                  icon={Presentation} 
                  label="Projects" 
                  href="#/projects"
                  isActive={currentPage === 'projects'}
                  onClick={handleLinkClick}
                />
                <SidebarLink 
                  icon={Newspaper} 
                  label="Blog" 
                  href="#/blog"
                  isActive={isBlogActive}
                  onClick={handleLinkClick}
                />
                <SidebarLink 
                  icon={BookOpen} 
                  label="Recipes" 
                  href="#/recipes"
                  isActive={currentPage === 'recipes'}
                  onClick={handleLinkClick}
                />
                <SidebarLink 
                  icon={FileText} 
                  label="CV" 
                  href="#/cv"
                  isActive={currentPage === 'cv'}
                  onClick={handleLinkClick}
                />
              </nav>

              {/* --- Mobile Social Links --- */}
              {/* These are also part of the collapsible mobile menu */}
              <div className="flex space-x-4 pt-6 pb-4 px-4 justify-center">
                <a href="https://github.com/peterkaloyannis" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://orcid.org/0009-0002-3420-8961" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <OrcidIcon className="w-6 h-6" />
                </a>
                <a href="https://scholar.google.com/citations?user=_zY2gt4AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <GraduationCap className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>


          {/* --- Desktop Navigation --- */}
          {/* 'hidden lg:block' ensures this only shows on desktop */}
          <div className="hidden lg:block">
            <nav className="flex flex-col space-y-4 pt-12">
              <SidebarLink 
                icon={Home} 
                label="Home" 
                href="#/home"
                isActive={currentPage === 'home'}
                onClick={() => {}} // No-op on desktop
              />
              <SidebarLink 
                icon={Presentation} 
                label="Projects" 
                href="#/projects"
                isActive={currentPage === 'projects'}
                onClick={() => {}}
              />
              <SidebarLink 
                icon={Newspaper} 
                label="Blog" 
                href="#/blog"
                isActive={isBlogActive}
                onClick={() => {}}
              />
              <SidebarLink 
                icon={BookOpen} 
                label="Recipes" 
                href="#/recipes"
                isActive={currentPage === 'recipes'}
                onClick={() => {}}
              />
              <SidebarLink 
                icon={FileText} 
                label="CV" 
                href="#/cv"
                isActive={currentPage === 'cv'}
                onClick={() => {}}
              />
            </nav>
          </div>
        </div> {/* --- End of 1. TOP GROUP --- */}


        {/* --- 2. BOTTOM GROUP (Desktop Social Links) --- */}
        {/* 'hidden lg:flex' ensures this only shows on desktop */}
        {/* 'justify-between' will now push this to the bottom */}
        <div className="hidden lg:flex space-x-4 justify-center">
          <a href="https://github.com/peterkaloyannis" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://orcid.org/0009-0002-3420-8961" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <OrcidIcon className="w-6 h-6" />
          </a>
          <a href="https://scholar.google.com/citations?user=_zY2gt4AAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <GraduationCap className="w-6 h-6" />
          </a>
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
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  href: string;
  onClick: () => void; // Added for mobile menu closing
}

function SidebarLink({ icon: Icon, label, isActive, href, onClick }: SidebarLinkProps): ReactElement {
  
  const baseClasses = "flex items-center space-x-3 text-lg font-medium rounded-lg p-2 -ml-2 transition-colors duration-200 w-full text-left";
  const activeClasses = "bg-gray-800 text-white";
  const inactiveClasses = "text-gray-300 hover:bg-gray-800 hover:text-white";

  return (
    <a 
      href={href} 
      onClick={onClick} // Pass the click handler
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </a>
  );
}
