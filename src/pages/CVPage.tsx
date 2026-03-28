// src/pages/CVPage.tsx

import { useState, useMemo, type ReactElement } from 'react';
import {
  PageWithSidebar,
  CVEntry,
  ToggleSwitch,
  TextInput,
  CollapsibleSection,
  type CVEntryProps,
  getNumericEndYear,
} from '../components/Reusable';
import { FileText } from '../components/Icons';

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

  const sidebar = (
    <div className="card">
      <h3 className="panel-heading">Filters</h3>
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
      <h3 className="panel-heading">Buttons</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button onClick={expandAll} className="btn-primary w-full">
          Expand All
        </button>
        <button onClick={collapseAll} className="btn-primary w-full">
          Collapse All
        </button>
      </div>
      <a href="/placeholder-cv.pdf" download className="btn-primary w-full">
        Download PDF
      </a>
      <hr className="my-6 border-gray-200" />
      <h3 className="panel-heading">About this page</h3>
      <p className="text-base text-gray-700 leading-relaxed mb-6">
        I made this page because it always made me sad to pick and
        choose what was on my CV. While some entries lost relevance, I was no
        less proud of myself then as I am now. I decided that I really
        wanted a complete list of everything I have done, going all the
        way back to elementary school. <br/> <br/>

        Hit the toggle if you wanna see it going waaaaay back.
        Download the PDF if you want to consume it professionally.
      </p>
    </div>
  );

  return (
    <PageWithSidebar id="cv" icon={FileText} title="Curriculum Vitae" sidebar={sidebar}>
      <div className="space-y-8">
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

        <CollapsibleSection
          title="Distinctions"
          isOpen={openSections.awards}
          onToggle={() => toggleSection('awards')}
        >
          {filteredAwards.length > 0 ? (
            filteredAwards.map((item) => <CVEntry key={item.title} {...item} />)
          ) : (
            <p className="text-gray-500 italic">No distinctions found for the selected date range.</p>
          )}
        </CollapsibleSection>

        {/* TODO: wire up allServiceData in cvData.tsx to populate this section */}
        <CollapsibleSection
          title="Community Service"
          isOpen={openSections.service}
          onToggle={() => toggleSection('service')}
        >
          <p className="text-gray-500 italic">No entries yet.</p>
        </CollapsibleSection>
      </div>
    </PageWithSidebar>
  );
}
