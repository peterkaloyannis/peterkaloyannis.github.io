// src/pages/CVPage.tsx

import { useState, useMemo } from 'react';
import {
  SectionTitle,
  CVEntry,
  ToggleSwitch,
  TextInput,
  CollapsibleSection,
  type CVEntryProps,
  getNumericEndYear,
} from '../components/Reusable';
import { FileText } from '../components/Icons';

// Load data.
import { 
  allExperienceData, 
  allEducationData,
  allAwardsData,
 } from '../content/cvData';

type SectionState = {
  experience: boolean;
  education: boolean;
  awards: boolean;
  service: boolean;
}

function filterCVEntry(
  startYear:string , 
  endYear:string,
  showFullCV: boolean,
  entries:CVEntryProps[]
) : CVEntryProps[] {
  const start = parseInt(startYear) || 0;
  const end = parseInt(endYear) || 9999;

  return entries.filter((item) => {
    // Use the renderByDefault flag
    if (!item.renderByDefault && !showFullCV) {
      return false;
    }
    
    const itemStart = item.startYear;
    const itemEnd = getNumericEndYear(item);

    return Math.max(start, itemStart) <= Math.min(end, itemEnd);
  });
}

export default function CVPage(): JSX.Element {
  // --- State ---
  const [showFullCV, setShowFullCV] = useState(false);
  const [startYear, setStartYear] = useState(''); // e.g. "2019"
  const [endYear, setEndYear] = useState('');     // e.g. "2023"
  
  // State for collapsible sections
  const [openSections, setOpenSections] = useState<SectionState>({
    experience: true,
    education: true,
    awards: true,
    service: true,
  });

  // Handler to toggle a single section
  const toggleSection = (section: keyof SectionState) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handlers to expand/collapse all
  const expandAll = () => {
    setOpenSections({ experience: true, education: true, awards: true, service: true});
  };

  const collapseAll = () => {
    setOpenSections({ experience: false, education: false, awards: false, service: false});
  };

  // --- Filtering Logic ---
  const filteredExperience = useMemo(
    () => filterCVEntry(startYear, endYear, showFullCV, allExperienceData), 
    [startYear, endYear, showFullCV]
  ); 
  const filteredEducation = useMemo(
    () => filterCVEntry(startYear, endYear, showFullCV, allEducationData), 
    [startYear, endYear, showFullCV]
  ); 
  const filteredAwards = useMemo(
    ()=> filterCVEntry(startYear, endYear, showFullCV, allAwardsData),
    [startYear, endYear, showFullCV]
  )

  // --- Render ---
  return (
    <section id="cv">
      <SectionTitle icon={FileText} title="Curriculum Vitae" />
      
      {/* --- Two-Column Layout --- */}
      {/* We use flex instead of grid for a fixed-width sidebar */}
      <div className="flex flex-col md:flex-row gap-12">

        {/* --- Column 1: Filters (Sticky) --- */}
        {/* Fixed width on desktop, full width on mobile */}
        <div className="md:w-[350px] flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-xl sticky top-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <TextInput
                label="From Year"
                id="start-year"
                placeholder="e.g. 2019"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
              />
              <TextInput
                label="To Year"
                id="end-year"
                placeholder="e.g. 2023"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
              />
            </div>
            <ToggleSwitch
              id="gag-toggle"
              label="Show Full CV"
              isEnabled={showFullCV}
              onToggle={() => setShowFullCV(!showFullCV)}
            />

            <hr className="my-6 border-gray-200" />
            <h3 className="text-lg font-bold text-gray-900 mb-4">Buttons</h3>
            {/* Expand/Collapse Toggles */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={expandAll}
                className="inline-block w-full text-center bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="inline-block w-full text-center bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Collapse All
              </button>
            </div>
            <a 
              href="/placeholder-cv.pdf" 
              download
              className="inline-block w-full text-center bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Download CV (PDF)
            </a>
            <hr className="my-6 border-gray-200" />
            <h3 className="text-lg font-bold text-gray-900 mb-4">About this page</h3>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              I have never particularly liked the feeling of time passing,
              especially after moving far away from home. I watch as the 
              people I grew up with change and experience life without my 
              participation. <br/> <br/> 

              I made this CV page because it always made me sad to pick and 
              choose what was on my CV. While not that important, I was no 
              less proud of myself then as I am now. I decided that I really 
              wanted a complete list of everything I have done, going all the
              way back to elementary school. <br/> <br/> 

              Hit the toggle if you wanna see it going waaaaay back. 
              Download the PDF if you want to consume it professionally.
            </p>
          </div>
        </div>

        {/* --- Column 2: Content (Scrollable) --- */}
        <div className="flex-1 space-y-8">
          
          {/* Collapsible Experience Section */}
          <CollapsibleSection 
            title="Experience"
            isOpen={openSections.experience}
            onToggle={() => toggleSection('experience')}
          >
            {filteredExperience.length > 0 ? (
              filteredExperience.map((item) => <CVEntry key={item.title} {...item} />)
            ) : (
              <p className="text-gray-500 italic">No experience found for the selected date range.</p>
            )}
          </CollapsibleSection>
          
          {/* Collapsible Education Section */}
          <CollapsibleSection 
            title="Education"
            isOpen={openSections.education}
            onToggle={() => toggleSection('education')}
          >
            {filteredEducation.length > 0 ? (
              filteredEducation.map((item) => <CVEntry key={item.title} {...item} />)
            ) : (
               <p className="text-gray-500 italic">No education found for the selected date range.</p>
            )}
          </CollapsibleSection>

          {/* Awards and Distinctions Section */}
          <CollapsibleSection 
            title="Distinctions"
            isOpen={openSections.awards}
            onToggle={() => toggleSection('awards')}
          >
            {filteredAwards.length > 0 ? (
              filteredAwards.map((item) => <CVEntry key={item.title} {...item} />)
            ) : (
               <p className="text-gray-500 italic">No education found for the selected date range.</p>
            )}
          </CollapsibleSection>

          {/* Service to Community Section */}
          <CollapsibleSection 
            title="Community Service"
            isOpen={openSections.service}
            onToggle={() => toggleSection('service')}
          >
            {filteredAwards.length > 0 ? (
              filteredAwards.map((item) => <CVEntry key={item.title} {...item} />)
            ) : (
               <p className="text-gray-500 italic">No education found for the selected date range.</p>
            )}
          </CollapsibleSection>
        </div>
      </div>
    </section>
  );
}
