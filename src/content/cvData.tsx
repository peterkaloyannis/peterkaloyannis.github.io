import type { CVEntryProps } from '../components/Reusable';

// --- EXPERIENCE DATA ---

export const allExperienceData: CVEntryProps[] = [
  {
    startYear: 2022,
    endYear: 'Present',
    title: 'Plasma Control Engineer II',
    location: 'Commonwealth Fusion Systems (CFS)',
    description: 'Currently developing the SPARC control software and operational procedures. \
      Control work involves designing, implementing, and testing novel real-time capable \
      plasma control algorithms with thousands of measurements and hundreds of actuators. \
      Procedural work encompases the design of the CONOPS for the SPARC control room and plasma \
      experiment proposals. Also significantly contributed to deployment, data aquisition \
      and visualization, machine learning, alarm systems, and facility wide system coordination. \
      This work spans a wide array of tools including Python, C++, Go, CUDA, React+Vite, Matlab, \
      Epsilon3, Rust, Ignition, Bash, Github, Jira and many more.',
    renderByDefault: true,
  },
    {
    startYear: 2021,
    endYear: "",
    title: 'Physics Research Intern',
    location: 'Ubisoft Laforge',
    description: 'Worked to develop fluid physics simulations with hardware independent \
      adaptive resolution. Techniques involved both analyticical and deep learning methods. \
      Implementation done in Python, OpenGl and CUDA.',
    renderByDefault: true,
  },
  {
    startYear: 2020,
    endYear: 2022,
    title: 'Research Assistant',
    location: 'McGill University',
    description: 'Research assistant to at the McGill sTGC lab with Dr. Brigitte Vachon \
under an NSERC USRA and an IPP CERN Summer Student Fellowship (see Awards and Distinctions). Developed \
[Wire-Support Position Analysis](https://particlephysics.ca/wp/wp-content/uploads/CERN_summer_student_report_2020_Panagiotis_Kaloyannis.pdf). \
Also supported Dr. Oscar Hernández and developed [CMBStraightStrings](https://gitlab.com/oscarhdz/cmbstraightstrings). \
Work was done in C++, ROOT, and Python.',
    renderByDefault: false,
  },
  {
    startYear: 2013,
    endYear: 2021,
    title: 'Tutor',
    location: 'Kinda whenever anyone would pay me lol.',
    description: 'Mentored High School and CEGEP students in Math, Physics and English.',
    renderByDefault: false,
  },
];

// --- EDUCATION DATA ---

export const allEducationData: CVEntryProps[] = [
  {
    startYear: 2021,
    endYear: 2023,
    title: 'MSc. In Applied Physics',
    location: 'École polytechnique fédérale de Lausanne (EPFL)',
    description: 'Graduated as a student in Applied Physics with a Masters \
Fellowship and a final GPA of 5.41/6. Conducted an geometric optimization study on the \
Fast Ion Loss Detector (FILD) and did initial scoping of a planned avalanche photodiode upgrade \
([now in service](https://pubs.aip.org/aip/rsi/article/96/8/083504/3358340/Design-and-upgrades-of-the-TCV-fast-ion-loss)). \
Thesis was supervised by Dr. Ambrogio Fasoli of EPFL and Dr. Cristina Rea of MIT on the disruptivity \
metric. Find the repository [here](https://github.com/pkaloyannis-cfs/disruptionStatistics).',
    renderByDefault: true,
  },
  {
    startYear: 2022,
    endYear: 2023,
    title: 'Visiting Student',
    location: 'Massachusetts Institute of Technology (MIT)',
    description: 'Undertook a 6 month research collaboration at the MIT Plasma \
Science and Fusion Center (PSFC) with Dr. Cristina Rea. Explored the disruptivity \
metric as reliable and human interpretable indicator of plasma stability. Thesis \
analyzed disruption data from the DIII-D and TCV tokamaks Find the thesis here \
and the github repository here. Work largely involved Bayesian statistics \
and a Python optomization. Find the repository [here](https://github.com/pkaloyannis-cfs/disruptionStatistics).',
    renderByDefault: true,
  },
  {
    startYear: 2018,
    endYear: 2021,
    title: 'BSc. In Honors Math and Physics',
    location: 'McGill University',
    description: 'Graduated as a student in an Honors Mathematics and \
Physics degree at McGill University with Dean’s Honour \
List distinction. Final GPA of 3.96/4 and collaborated with \
professors in cosmology and particle physics research.',
  renderByDefault: true,
  },
  {
    startYear: 2016,
    endYear: 2018,
    title: 'Natural Science GED',
    location: 'Marianopolis College',
    description: `TODO`,
    renderByDefault: false,
  },
  {
    startYear: 2016,
    endYear: 2018,
    title: 'Secondary School Diploma (SSD)',
    location: 'Selwyn House School',
    description: `TODO`,
    renderByDefault: false,
  },
];

// --- EDUCATION DATA ---

export const allAwardsData: CVEntryProps[] = [
  {
    startYear: 2021,
    endYear: 2022,
    title: 'Masters Fellowship',
    location: 'École polytechnique fédérale de Lausanne (EPFL)',
    description: 'Recieved an EPFL Masters Fellowship, a 20 000 CHF \
grant for outstanding applicants to the faculty of Basic \
Sciences. This scholarship was renewed for a second year.',
    renderByDefault: true,
  },
  {
    startYear: 2021,
    endYear: "",
    title: "Deans List",
    location: "McGill University",
    description: "TODO",
    renderByDefault: true,
  },
  {
    startYear: 2020,
    endYear: "",
    title: 'NSERC USRA',
    location: 'Natural Sciences and Engineering Research Council (NSERC)',
    description: 'Granted an Undergraduate Student Research Award by \
NSERC for 2020 with Professor Brigitte Vachon.',
  renderByDefault: true,
  },
  {
    startYear: 2020,
    endYear: "",
    title: 'IPP CERN Summer Student Fellowship',
    location: 'Institute of Particle Physics',
    description: 'Granted an internship in Switzerland by the IPP to work \
at the European Organization for Nuclear Research that \
was unfortunately cancelled for COVID-19. ',
  renderByDefault: true,
  },
];
