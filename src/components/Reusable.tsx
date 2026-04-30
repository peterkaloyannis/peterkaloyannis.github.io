// src/components/Reusable.tsx

import { type ReactElement, type ElementType, type ReactNode, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, BookOpen, ExternalLink, Search, Code, User, X } from 'lucide-react';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';
import DOMPurify from 'dompurify';
import 'katex/dist/katex.min.css';

// =================================================================================
// --- GENERAL COMPONENTS ---
// =================================================================================

/**
 * PageWithSidebar Component
 * Standard two-column page layout: sticky sidebar on the left, scrollable content on the right.
 */
interface PageWithSidebarProps {
  id: string;
  icon: ElementType;
  title: string;
  sidebar: ReactNode;
  children: ReactNode;
}

export function PageWithSidebar({ id, icon, title, sidebar, children }: PageWithSidebarProps): ReactElement {
  return (
    <section id={id}>
      <SectionTitle icon={icon} title={title} />
      <div className="page-layout">
        <div className="page-sidebar">
          <div className="sticky top-8">{sidebar}</div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </section>
  );
}

/**
 * MarkdownRenderer Component
 * Renders Markdown content using the marked library for parsing
 * and DOMPurify for security sanitization.
 * * NOTE: We use 'prose' Tailwind classes for automatic typography styling.
 */
interface MarkdownRendererProps {
  content: string;
}

// Configure marked once at module load time (not per-render)
marked.setOptions({ gfm: true });
marked.use(markedKatex({ throwOnError: false }));

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const rawHtml = marked.parse(content) as string;
  const safeHtml = DOMPurify.sanitize(rawHtml);
  return (
    <div className="content-prose">
      <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
    </div>
  );
}

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, onClear, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-[var(--color-text-subtle)]" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field w-full py-1.5 pl-10 pr-8 sm:text-sm"
      />
      {value && (
        <button onClick={onClear} className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

/**
 * SectionTitle Component
 * A reusable title component for main content sections.
 */
interface SectionTitleProps {
  icon: ElementType;
  title: string;
}

export function SectionTitle({ icon: Icon, title }: SectionTitleProps): ReactElement {
  return (
    <div className="flex items-center space-x-3 mb-8">
      <Icon className="w-8 h-8 text-[var(--color-text)]" />
      <h2 className="text-3xl font-bold">{title}</h2>
    </div>
  );
}

/**
 * ProjectCard Component
 * A reusable card for showcasing projects or skills.
 */
interface ProjectCardProps {
  icon: ElementType;
  title: string;
  description: string;
  href?: string;
  imageUrl?: string;
}

export function ProjectCard({ icon: Icon, title, description, href, imageUrl }: ProjectCardProps): ReactElement {
  const content = (
    <>
      {/* Image Block */}
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={`Image for ${title}`} 
          className="mx-auto h-48 object-cover rounded-lg" 
        />
      ) : (
        <div className="image-placeholder">
          <Code className="w-12 h-12 text-[var(--color-text-subtle)]" />
        </div>
      )}
      <div className="flex items-center space-x-3 mt-4 mb-4">
        <Icon className="w-6 h-6 text-[var(--color-accent-loud)]" />
        <h3 className="text-xl font-bold">{title}</h3>
        <ExternalLink className="w-4 h-4 ml-2 text-[var(--color-text-muted)]" />
      </div>
      <p className="leading-relaxed">
        {description}
      </p>
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("www");
    return (
      <a
        href={href}
        className="card-interactive hover:scale-[1.02]"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return <div className="card">{content}</div>;
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
  iconUrl?: string;
  icon?: ElementType;
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

export function CVEntry({ title, startYear, endYear, location, description, iconUrl, icon: Icon = User }: CVEntryProps): ReactElement {

  const date = formatYearRange(startYear, endYear);

  return (
    <div className="card !pb-2 md:!pb-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
        <div className="flex items-center space-x-3">
          {iconUrl
            ? <img src={iconUrl} alt={location} className="w-10 h-10 md:w-14 md:h-14 object-contain rounded-md flex-shrink-0" />
            : <Icon className="w-10 h-10 md:w-8 md:h-8 flex-shrink-0" />
          }
          <div>
            <h3 className="text-lg md:text-xl font-bold">{title}</h3>
            <p className="text-base md:text-lg font-medium text-accent">{location}</p>
            <span className="text-sm text-muted md:hidden">{date}</span>
          </div>
        </div>
        <span className="text-sm text-muted flex-shrink-0 hidden md:inline-block">{date}</span>
      </div>
      <div className="leading-relaxed">
        <MarkdownRenderer content={description} />
      </div>
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
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <button
        id={id}
        onClick={onToggle}
        type="button"
        className={`toggle-track ${isEnabled ? 'toggle-track-on' : 'toggle-track-off'}`}
        role="switch"
        aria-checked={isEnabled}
      >
        <span
          aria-hidden="true"
          className={`toggle-thumb ${isEnabled ? 'translate-x-5' : 'translate-x-0'}`}
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
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  placeholder?: string;
}

export function TextInput({ id, label, value, onChange, onClear, placeholder }: TextInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-field w-full py-1.5 px-3 pr-8 sm:text-sm"
        />
        {value && (
          <button onClick={onClear} className="absolute inset-y-0 right-0 flex items-center pr-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
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
        w-5 h-5 text-[var(--color-text-muted)]
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'rotate-180' : 'rotate-0'}
      `} 
    />
  );
}

/**
 * CollapsibleText Component
 * Inline collapsible — panel-heading style with chevron, no card chrome.
 */
interface CollapsibleTextProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'heading';
}

export function CollapsibleText({ title, isOpen, onToggle, children, className = 'mt-6', variant = 'default' }: CollapsibleTextProps) {
  return (
    <div className={className}>
      <button onClick={onToggle} className="flex items-center w-full gap-2">
        <span
          className={variant === 'heading' ? 'text-xl font-bold whitespace-nowrap' : 'text-xs font-medium whitespace-nowrap'}
          style={{ color: variant === 'heading' ? 'var(--color-text)' : 'var(--color-text-muted)' }}
        >{title}</span>
        <div className="flex-1" style={{ height: variant === 'heading' ? '2px' : '1px', backgroundColor: variant === 'heading' ? 'var(--color-accent)' : 'var(--color-border)' }} />
        <span style={variant === 'heading' ? { color: 'var(--color-accent)' } : undefined}>
          <AnimatedChevron isOpen={!isOpen} />
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pt-4 px-1 pb-1">{children}</div>
        </div>
      </div>
    </div>
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
  children: ReactNode;
}

export function CollapsibleSection({ 
  title, 
  isOpen, 
  onToggle, 
  children 
}: CollapsibleSectionProps) {
  return (
    <div className="card-flush">
      {/* Header */}
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full p-4 md:p-6"
      >
        <h3 className="text-2xl font-bold">{title}</h3>
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
          <div className="space-y-3 px-4 pb-4 md:px-6 md:pb-6">
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
 * RecipeImageOrPlaceholder Component
 * Renders a recipe image if available, otherwise a styled placeholder.
 */
function RecipeImageOrPlaceholder({ imageUrl, title, className = "w-full h-48 object-cover" }: { imageUrl?: string; title?: string; className?: string }) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={title ? `Image for ${title}` : "Recipe cover image"}
        className={className}
      />
    );
  }
  return (
    <div className="image-placeholder">
      <BookOpen className="w-12 h-12 text-[var(--color-text-subtle)]" />
    </div>
  );
}

/**
 * RecipeTypeBadge Component
 * Displays a pill badge for 'original' or 'curated' recipe type.
 */
function RecipeTypeBadge({ type }: { type: 'original' | 'curated' }) {
  return (
    <span className={`recipe-type-badge ${type === 'curated' ? 'recipe-type-badge-curated' : 'recipe-type-badge-original'}`}>
      {type === 'curated' ? 'Curated' : 'Original'}
    </span>
  );
}

/**
 * BlogPostCard Component
 * A reusable card for the blog list page.
 */
interface BlogPostCardProps {
  slug: string;
  title: string;
  date: string;
  summary: string;
  imageUrl?: string;
}

export function BlogPostCard({ slug, title, date, summary, imageUrl }: BlogPostCardProps) {
  return (
    <Link to={`/blog/${slug}`} className="card-interactive-flush hover:scale-[1.01]">
      <RecipeImageOrPlaceholder imageUrl={imageUrl} title={title} />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>{date}</p>
        <p className="leading-relaxed line-clamp-2">{summary}</p>
      </div>
    </Link>
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
  sourceUrl?: string;
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
  sourceUrl
}: RecipeCardProps) {

  const isCurated = type === 'curated' && sourceUrl;

  // --- 1. Define the Card's Content ---
  // This is the same for both link types
  const cardContent = (
    <>
      <RecipeImageOrPlaceholder imageUrl={imageUrl} title={title} />
      
      {/* Padding is now applied to a div *inside* the card */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          {/* Title now includes an external link icon if curated */}
          <h3 className="text-xl font-bold flex items-center">
            {title}
            {isCurated && <ExternalLink className="w-4 h-4 ml-2 text-[var(--color-text-muted)]" />}
          </h3>
          <RecipeTypeBadge type={type} />
        </div>
        <div className="flex justify-between items-center text-sm mb-3 text-[var(--color-text-muted)]">
          <p>{date}</p>
          {serves && (
            <p className="flex items-center space-x-1 font-medium">
              <User className="w-4 h-4" />
              <span>Serves: {serves}</span>
            </p>
          )}
        </div>
        <p className="leading-relaxed line-clamp-2">
          {summary}
        </p>
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {[...tags].sort().map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (isCurated) {
    return (
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="card-interactive-flush hover:scale-[1.01]">
        {cardContent}
      </a>
    );
  }
  return (
    <Link to={`/recipe-details/${slug}`} className="card-interactive-flush hover:scale-[1.01]">
      {cardContent}
    </Link>
  );
}

/**
 * NotFound Component
 * Standard 404 page shown when a resource or route doesn't exist.
 */
interface NotFoundProps {
  message: string;
  backHref: string;
  backLabel: string;
}

export function NotFound({ message, backHref, backLabel }: NotFoundProps) {
  return (
    <section className="text-center py-24">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-xl mb-8" style={{ color: 'var(--color-text-muted)' }}>{message}</p>
      <a href={backHref} className="back-link">&larr; {backLabel}</a>
    </section>
  );
}

/**
 * RecipeMetadataPanel Component
 * A reusable panel to display recipe timing and details in a tabular format.
 */
interface RecipeMetadataPanelProps {
    serves?: string;
    activeTime?: string;
    totalTime?: string;
    tags?: string[];
    type: 'original' | 'curated';
    imageUrl?: string;
    summary: string;
}

export function RecipeMetadataPanel({
  serves,
  activeTime,
  totalTime,
  tags,
  type,
  imageUrl,
  summary,
}: RecipeMetadataPanelProps) {
    return (
        <div className="card-flush">

            {/* Image */}
            <RecipeImageOrPlaceholder imageUrl={imageUrl} className="w-full h-auto object-cover" />

            {/* Info rows */}
            <div className="p-6 space-y-3 border-b border-[var(--color-border)]">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Status</span>
                <RecipeTypeBadge type={type} />
              </div>
              {serves && (
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Serves</span>
                  <span className="font-medium">{serves}</span>
                </div>
              )}
              {activeTime && (
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Active Time</span>
                  <span className="font-medium">{activeTime}</span>
                </div>
              )}
              {totalTime && (
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Time</span>
                  <span className="font-medium">{totalTime}</span>
                </div>
              )}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {[...tags].sort().map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="p-6">
              <p className="italic leading-relaxed">{summary}</p>
            </div>

        </div>
    );
}
