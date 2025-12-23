// src/components/Reusable.tsx

import React from 'react';
import { ChevronDown, BookOpen, ExternalLink, Search, Code} from './Icons'; // Icon for collapsible sections
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import {User} from "../components/Icons"

// =================================================================================
// --- GENERAL COMPONENTS ---
// =================================================================================


/**
 * MarkdownRenderer Component
 * Renders Markdown content using the marked library for parsing
 * and DOMPurify for security sanitization.
 * * NOTE: We use 'prose' Tailwind classes for automatic typography styling.
 */
interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // 1. Configure marked to use GitHub Flavored Markdown (GFM)
  //    and set up basic options.
  marked.setOptions({
    gfm: true,
    breaks: true, // Render line breaks as <br>
  });

  // 2. Parse the markdown content to raw HTML string
  const rawHtml = marked.parse(content) as string;

  // 3. Sanitize the raw HTML string for security
  const safeHtml = DOMPurify.sanitize(rawHtml);

  // 4. Use dangerouslySetInnerHTML to render the clean HTML
  return (
    // 'prose' is a Tailwind utility that automatically formats
    // all HTML elements (h1, p, ul, pre, etc.) within the container.
    <div className="
      prose 
      max-w-none 
      text-gray-700
      
      /* TARGETING LINKS */
      prose-a:text-blue-700 
      prose-a:no-underline 
    ">
      <div 
        dangerouslySetInnerHTML={{ __html: safeHtml }} 
      />
    </div>
  );
}

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className="relative w-full">
      {/* Icon inside the search bar */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      {/* The input itself, with padding on the left for the icon */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full rounded-md border-gray-300 py-3 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}

/**
 * SectionTitle Component
 * A reusable title component for main content sections.
 */
interface SectionTitleProps {
  icon: React.ElementType;
  title: string;
}

export function SectionTitle({ icon: Icon, title }: SectionTitleProps): JSX.Element {
  return (
    <div className="flex items-center space-x-3 mb-8">
      <Icon className="w-8 h-8 text-gray-900" />
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}

/**
 * ProjectCard Component
 * A reusable card for showcasing projects or skills.
 */
interface ProjectCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href?: string; 
  imageUrl?: string;
}

export function ProjectCard({ icon: Icon, title, description, href, imageUrl }: ProjectCardProps): JSX.Element {
  const content = (
    <>
      {/* Image Block */}
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={`Image for ${title}`} 
          className="w-full h-48 object-cover" 
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <Code className="w-12 h-12 text-gray-300" />
        </div>
      )}
      <div className="flex items-center space-x-3 mt-4 mb-4">
        <Icon className="w-6 h-6 text-indigo-700" />
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <ExternalLink className="w-4 h-4 ml-2 text-gray-500" />
      </div>
      <p className="text-gray-700 leading-relaxed">
        {description}
      </p>
    </>
  );

  // If href is provided, wrap the card in an <a> tag
  if (href && href.startsWith("#/")) {
     return (
      <a 
        href={href} 
        className="block bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200"
      >
        {content}
      </a>
    );
  }
  
  // External link
  if (href && (href.startsWith("http") || href.startsWith("www"))) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200"
      >
        {content}
      </a>
    );
  }

  // No href, just a div
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      {content}
    </div>
  );
}


// =================================================================================
// --- CV PAGE COMPONENTS ---
// =================================================================================

/**
 * CVEntry Component
 * A reusable component for a single job experience entry.
 */
export interface CVEntryProps {
  startYear: number ;
  endYear: number | "" | "Present";
  title: string;
  location: string;
  description: string;
  renderByDefault: boolean;
}

/**
 * Returns the numeric years for filtering a CVEntry.
 * 
 * @param startYear The start year.
 * @param endYear The end year.
 * @returns 
 */
export function getNumericEndYear({startYear, endYear} : CVEntryProps): number {
  // If numerical, return value.
  if (typeof endYear === "number") {
    return endYear;
  }
  // If persent, return the current year.
  else if (endYear === "Present") {
    const currentYear = new Date().getFullYear();
    return currentYear;
  }
  // If blank, this is a 1 time event and end == start.
  else if (endYear === "") {
    return startYear
  }
  else {
    return 0
  }
}

/**
 * Helper function for rendering the year ranges.
 * 
 * @param startYear The start year.
 * @param endYear The end year.
 * @returns 
 */
function formatYearRange(startYear: number | string , endYear: number | string): string {
  // Check if endYear is an empty string, null, or undefined
  if (endYear === "") {
    return `${startYear}`;
  }

  return `${startYear}-${endYear}`;
}

export function CVEntry({ title, startYear, endYear, location, description }: CVEntryProps): JSX.Element {

  var date = formatYearRange(startYear, endYear)

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-3">
           <User className="w-8 h-8" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-lg font-medium text-indigo-700">{location}</p>
          </div>
        </div>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">{date}</span>
      </div>
      <p className="text-gray-700 leading-relaxed">
        <MarkdownRenderer content={description} />
      </p>
    </div>
  );
}

/**
 * ToggleSwitch Component
 * A reusable on/off switch component.
 */
interface ToggleSwitchProps {
  id: string;
  label: string;
  isEnabled: boolean;
  onToggle: () => void;
}

export function ToggleSwitch({ id, label, isEnabled, onToggle }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor={id} className="font-medium text-gray-700">
        {label}
      </label>
      <button
        id={id}
        onClick={onToggle}
        type="button"
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2
          ${isEnabled ? 'bg-indigo-600' : 'bg-gray-200'}
        `}
        role="switch"
        aria-checked={isEnabled}
      >
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
            transition duration-200 ease-in-out
            ${isEnabled ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
}

/**
 * TextInput Component
 * A reusable labeled text input field.
 */
interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function TextInput({ id, label, value, onChange, placeholder }: TextInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}

/**
 * AnimatedChevron Component
 * A helper to show a rotating chevron.
 */
function AnimatedChevron({ isOpen }: { isOpen: boolean }) {
  return (
    <ChevronDown 
      className={`
        w-5 h-5 text-gray-500 
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'rotate-180' : 'rotate-0'}
      `} 
    />
  );
}

/**
 * CollapsibleSection Component
 * A controlled component for a collapsible section.
 */
interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function CollapsibleSection({ 
  title, 
  isOpen, 
  onToggle, 
  children 
}: CollapsibleSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full p-6"
      >
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <AnimatedChevron isOpen={isOpen} />
      </button>
      
      {/* Animated Content */}
      <div 
        className="grid transition-all duration-300 ease-in-out"
        // This is the animation:
        // When open: grid-rows-[1fr] (1 "fraction", a.k.a. full height)
        // When closed: grid-rows-[0fr] (0 "fractions", a.k.a. 0 height)
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr'
        }}
      >
        <div className="overflow-hidden">
          {/* We add padding-bottom here so it's part of the animated content */}
          <div className="space-y-4 px-6 pb-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}


// =================================================================================
// --- BLOG & RECIPE COMPONENTS ---
// =================================================================================

/**
 * BlogPostCard Component
 * A reusable card for the blog list page.
 */
interface BlogPostCardProps {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export function BlogPostCard({ slug, title, date, summary }: BlogPostCardProps) {
  return (
    <a 
      href={`#/blog/${slug}`} 
      className="block bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-200"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{date}</p>
      <p className="text-gray-700 leading-relaxed">
        {summary}
      </p>
    </a>
  );
}

/**
 * RecipeCard Component
 * A reusable card for the recipe list page.
 */
interface RecipeCardProps {
  slug: string;
  type: 'original' | 'curated';
  title: string;
  date: string;
  summary: string;
  serves?: string;
  tags?: string[];
  imageUrl?: string;
  sourceUrl?: string; // We'll read this prop
}

export function RecipeCard({ 
  slug, 
  type, 
  title, 
  date, 
  summary, 
  serves, 
  tags, 
  imageUrl,
  sourceUrl // We now use this
}: RecipeCardProps) {
  
  const isCurated = type === 'curated' && sourceUrl;

  // --- 1. Define the Card's Content ---
  // This is the same for both link types
  const cardContent = (
    <>
      {/* Image Block */}
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={`Image for ${title}`} 
          className="w-full h-48 object-cover" 
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-gray-300" />
        </div>
      )}
      
      {/* Padding is now applied to a div *inside* the card */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          {/* Title now includes an external link icon if curated */}
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            {title}
            {isCurated && <ExternalLink className="w-4 h-4 ml-2 text-gray-500" />}
          </h3>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isCurated ? 'bg-gray-100 text-gray-600' : 'bg-indigo-100 text-indigo-600'}`}>
            {isCurated ? 'Curated' : 'Original'}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <p>{date}</p>
          {serves && (
            <p className="flex items-center space-x-1 font-medium text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span>Serves: {serves}</span>
            </p>
          )}
        </div>
        <p className="text-gray-700 leading-relaxed line-clamp-2">
          {summary}
        </p>
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
              {tags.map(tag => (
                  <span key={tag} className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md border border-gray-200">
                      {tag}
                  </span>
              ))}
          </div>
        )}
      </div>
    </>
  );

  // --- 2. Define Card Wrapper (Conditional Link) ---
  const commonClasses = "block bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl hover:scale-[1.01] transition-all duration-200 border-t-4 border-indigo-500";

  if (isCurated) {
    // If it's curated, render an <a> tag pointing to the external sourceUrl
    return (
      <a 
        href={sourceUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className={commonClasses}
      >
        {cardContent}
      </a>
    );
  } else {
    // If it's original, render an <a> tag pointing to our internal hash route
    return (
      <a 
        href={`#/recipe-details/${slug}`} 
        className={commonClasses}
      >
        {cardContent}
      </a>
    );
  }
}

/**
 * RecipeMetadataPanel Component
 * A reusable panel to display recipe timing and details in a tabular format.
 */
interface RecipeMetadataPanelProps {
    serves?: string;
    activeCookTime?: string;
    totalTime?: string;
    tags?: string[];
    type: 'original' | 'curated'; 
    imageUrl?: string; 
}

export function RecipeMetadataPanel({ 
  serves, 
  activeCookTime, 
  totalTime, 
  tags, 
  type, 
  imageUrl 
}: RecipeMetadataPanelProps) {
    
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            
            {/* Image Block */}
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Recipe cover image"
                className="w-full h-auto object-cover" 
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-gray-300" />
              </div>
            )}
            
            {/* Padding is now applied to a div *inside* the panel */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-5 border-b border-gray-200 pb-3">
                  Recipe Information
              </h3>
              
              <div className="space-y-4">
                
                {/* Status Row */}
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Status</span>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${type === 'curated' ? 'bg-gray-100 text-gray-600' : 'bg-indigo-100 text-indigo-600'}`}>
                        {capitalizedType}
                    </span>
                </div>

                {/* Serves Row */}
                {serves && (
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Serves</span>
                        <span className="text-gray-900 font-medium">{serves}</span>
                    </div>
                )}
                
                {/* Active Time Row */}
                {activeCookTime && (
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Active Time</span>
                        <span className="text-gray-900 font-medium">{activeCookTime}</span>
                    </div>
                )}

                {/* Total Time Row */}
                {totalTime && (
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Total Time</span>
                        <span className="text-gray-900 font-medium">{totalTime}</span>
                    </div>
                )}

                {/* Tags Row */}
                {tags && tags.length > 0 && (
                    <div className="flex justify-between items-start pt-2">
                        <span className="font-semibold text-gray-700 shrink-0 mr-4">Tags</span>
                        <div className="flex flex-wrap gap-2 justify-end">
                            {tags.map(tag => (
                                <span key={tag} className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
              </div>
            </div>
        </div>
    );
}
