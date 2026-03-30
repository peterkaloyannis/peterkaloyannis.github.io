// src/pages/CVPage.tsx

import { useState, useMemo, type ReactElement } from 'react';
import {
  PageWithSidebar,
  CVEntry,
  ToggleSwitch,
  CollapsibleText,
  type CVEntryProps,
} from '../components/Reusable';

function getNumericEndYear({startYear, endYear} : CVEntryProps): number {
  if (typeof endYear === "number") return endYear;
  if (endYear === "Present") return new Date().getFullYear();
  if (endYear === "") return startYear;
  return 0;
}
import { FileText } from 'lucide-react';

import {
  allExperienceData,
  allEducationData,
  allAwardsData,
 } from '../content/cvData';

const allCVEntries = [...allExperienceData, ...allEducationData, ...allAwardsData];
const MIN_YEAR = Math.min(...allCVEntries.map(e => e.startYear));
const MAX_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MIN_YEAR + i);

type SectionState = {
  experience: boolean;
  education: boolean;
  awards: boolean;
  service: boolean;
}

const ALL_OPEN: SectionState  = { experience: true,  education: true,  awards: true,  service: true  };
const ALL_CLOSED: SectionState = { experience: false, education: false, awards: false, service: false };

function filterCVEntry(
  startYear:string ,
  endYear:string,
  showFullCV: boolean,
  entries:CVEntryProps[]
) : CVEntryProps[] {
  const start = parseInt(startYear) || 0;
  const end = parseInt(endYear) || 9999;

  return entries.filter((item) => {
    if (!item.renderByDefault && !showFullCV) {
      return false;
    }

    const itemStart = item.startYear;
    const itemEnd = getNumericEndYear(item);

    return Math.max(start, itemStart) <= Math.min(end, itemEnd);
  });
}

export default function CVPage(): ReactElement {
  const [showFullCV, setShowFullCV] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(true);
  const [buttonsOpen, setButtonsOpen] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  const [openSections, setOpenSections] = useState<SectionState>(ALL_OPEN);

  const toggleSection = (section: keyof SectionState) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const expandAll  = () => setOpenSections(ALL_OPEN);
  const collapseAll = () => setOpenSections(ALL_CLOSED);

  const [filteredExperience, filteredEducation, filteredAwards] = useMemo(
    () => [allExperienceData, allEducationData, allAwardsData].map(
      entries => filterCVEntry(startYear, endYear, showFullCV, entries)
    ),
    [startYear, endYear, showFullCV]
  );

  const sidebar = (
    <div className="card">
      <CollapsibleText title="Filters" isOpen={filtersOpen} onToggle={() => setFiltersOpen(o => !o)} className="">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="start-year" className="block text-sm font-medium mb-1">From Year</label>
            <select id="start-year" value={startYear} onChange={(e) => setStartYear(e.target.value)} className="input-field w-full py-1.5 px-3 sm:text-sm">
              <option value="">Any</option>
              {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="end-year" className="block text-sm font-medium mb-1">To Year</label>
            <select id="end-year" value={endYear} onChange={(e) => setEndYear(e.target.value)} className="input-field w-full py-1.5 px-3 sm:text-sm">
              <option value="">Any</option>
              {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
        {startYear && endYear && parseInt(startYear) > parseInt(endYear) && (
          <p className="text-xs mt-2 text-center" style={{ color: 'var(--color-accent-loud)' }}>Hey sorry to bug you but your start year is after end year.</p>
        )}
      </CollapsibleText>

      <CollapsibleText title="Buttons" isOpen={buttonsOpen} onToggle={() => setButtonsOpen(o => !o)}>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button onClick={expandAll} className="btn-primary w-full whitespace-nowrap">
            Expand All
          </button>
          <button onClick={collapseAll} className="btn-primary w-full whitespace-nowrap">
            Collapse All
          </button>
        </div>
        <a href="/placeholder-cv.pdf" download className="btn-primary w-full">
          Download PDF
        </a>
        <div className="mt-3">
          <ToggleSwitch
            id="gag-toggle"
            label="Show Full CV"
            isEnabled={showFullCV}
            onToggle={() => setShowFullCV(!showFullCV)}
          />
        </div>
      </CollapsibleText>
      <CollapsibleText title="About this page" isOpen={aboutOpen} onToggle={() => setAboutOpen(o => !o)}>
        <p className="text-base leading-relaxed">
          I made this page because it always made me sad to pick and
          choose what was on my CV. While some entries lost relevance, I was no
          less proud of myself then as I am now. I decided that I really
          wanted a complete list of everything I have done, going all the
          way back to elementary school.
          <br/><br/>
          Hit the toggle if you wanna see it going waaaaay back.
          Download the PDF if you want to consume it professionally.
        </p>
      </CollapsibleText>
    </div>
  );

  return (
    <PageWithSidebar id="cv" icon={FileText} title="Curriculum Vitae" sidebar={sidebar}>
      <div>
        <CollapsibleText title="Experience" isOpen={openSections.experience} onToggle={() => toggleSection('experience')} className="" variant="heading">
          <div className="space-y-4">
            {filteredExperience.length > 0 ? (
              filteredExperience.map((item) => <CVEntry key={item.title} {...item} />)
            ) : (
              <p className="italic">No experience found for the selected date range.</p>
            )}
          </div>
        </CollapsibleText>

        <CollapsibleText title="Education" isOpen={openSections.education} onToggle={() => toggleSection('education')} variant="heading">
          <div className="space-y-4">
            {filteredEducation.length > 0 ? (
              filteredEducation.map((item) => <CVEntry key={item.title} {...item} />)
            ) : (
              <p className="italic">No education found for the selected date range.</p>
            )}
          </div>
        </CollapsibleText>

        <CollapsibleText title="Distinctions" isOpen={openSections.awards} onToggle={() => toggleSection('awards')} variant="heading">
          <div className="space-y-4">
            {filteredAwards.length > 0 ? (
              filteredAwards.map((item) => <CVEntry key={item.title} {...item} />)
            ) : (
              <p className="italic">No distinctions found for the selected date range.</p>
            )}
          </div>
        </CollapsibleText>

        {/* TODO: wire up allServiceData in cvData.tsx to populate this section */}
        <CollapsibleText title="Community Service" isOpen={openSections.service} onToggle={() => toggleSection('service')} variant="heading">
          <p className="italic">No entries yet.</p>
        </CollapsibleText>
      </div>
    </PageWithSidebar>
  );
}
