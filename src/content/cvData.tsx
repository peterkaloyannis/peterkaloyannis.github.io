import type { CVEntryProps } from '../components/Reusable';
import { IceCreamCone, Trophy, Bot, Zap, BookOpen } from 'lucide-react';

// --- EXPERIENCE DATA ---

export const allExperienceData: CVEntryProps[] = [
  {
    startYear: 2022,
    endYear: 'Present',
    title: 'Intern ➡ Plasma Control Engineer II',
    location: 'Commonwealth Fusion Systems (CFS)',
    description: `Currently developing the SPARC control software and operational procedures.
Control work involves designing, implementing, and testing novel real-time capable
plasma control and simulation algorithms with thousands of measurements and hundreds of actuators.
Procedural work encompasses the design of the CONOPS for the SPARC control room and plasma
experiment proposals. Also significantly contributed to deployment, data acquisition
and visualization, machine learning, alarm systems, and facility wide system coordination.
This work spans a wide array of tools including Python, C++, Go, CUDA, React+Vite, Matlab,
Epsilon3, Rust, Ignition, Bash, Github, Jira and many more.`,
    renderByDefault: true,
    iconUrl: '/images/cv/cfs.svg',
  },
  {
    startYear: 2021,
    endYear: "",
    title: 'Physics Research Intern',
    location: 'Ubisoft Laforge',
    description: `Worked to develop fluid physics simulations with hardware independent
adaptive resolution for the next generation of video games. Techniques involved both 
analytical and deep learning methods. Implementation done in Python, OpenGl and CUDA.`,
    renderByDefault: true,
    iconUrl: '/images/cv/laforge.png',
  },
  {
    startYear: 2019,
    endYear: 2021,
    title: 'Research Assistant',
    location: 'McGill University',
    description: `Research assistant at the McGill sTGC lab with Dr. Brigitte Vachon
under an NSERC USRA and an IPP CERN Summer Student Fellowship (see Awards and Distinctions). Developed
[Wire-Support Position Analysis](https://particlephysics.ca/wp/wp-content/uploads/CERN_summer_student_report_2020_Panagiotis_Kaloyannis.pdf).
Also supported Dr. Oscar Hernández and developed [CMBStraightStrings](https://gitlab.com/oscarhdz/cmbstraightstrings).
Work was done in C++, ROOT, and Python.`,
    renderByDefault: true,
    iconUrl: '/images/cv/mcgill.svg',
  },
  {
    startYear: 2019,
    endYear: "",
    title: 'Substitute Teacher',
    location: 'Selwyn House School',
    description: `I was a substitute teacher at my high school for 
a year to build funds for my Master's Degree! My popularity among 
students was hit or miss because I actually made them work.`,
    renderByDefault: false,
    iconUrl: '/images/cv/selwyn.jpg',
  },
  {
    startYear: 2019,
    endYear: "",
    title: 'Teaching Assistant',
    location: 'Marianopolis College',
    description: `I was a TA for an Waves and Electrostatics class at 
my CEGEP that was being taught by Dr. Oscar Hernández to build up
funds for my Master's Degree. I helped with correcting mostly and
did not host any tutorial sessions.`,
    renderByDefault: false,
    iconUrl: '/images/cv/marianopolis.webp',
  },
  {
    startYear: 2017,
    endYear: 2018,
    title: 'Hospital Researcher',
    location: 'MUHC Research Institute',
    description: `This was my first foire into academia at the MUCH
Research Institute's drug development lab. Here I worked with Dr. 
Sanjoy Kumar Das as he guided me through reading my first white 
papers and assembling a review article on MALDI and HR MAS machines.
This never got published, but working here is a fond memory of mine.`,
    renderByDefault: false,
    iconUrl: '/images/cv/muhc.jpg',
  },
  {
    startYear: 2013,
    endYear: 2021,
    title: 'Tutor',
    location: 'Various Institutions (Selwyn, House',
    description: `Mentored and tutored High School, CEGEP, and Undergraduate
students in Math, Physics and English. This was done privately, but also
through college (Marianopolis) and university (McGill) programs.`,
    renderByDefault: false,
    icon:BookOpen,
  },
  {
    startYear: 2014,
    endYear: 2017,
    title: 'Hockey Referee',
    location: 'Mont Royal Outremont (MRO)',
    description: `Refereed children aged 8-16 years. Encouraged team 
spirit, practiced conflict resolution and kept kids safe. 
Admittedly I had to keep the parents from fighting more often
than the kids though...`,
    renderByDefault: false,
    iconUrl: '/images/cv/mro.png',
  },
  {
    startYear: 2014,
    endYear: "",
    title: 'Froyo Guy',
    location: 'Ahys',
    description: `I served ice cream and froyo at my neighborhood ice cream shop.
    I can't seem to find a CV old enough to have this entry to see what I said
    about it then, but it was probably something like: ***Acquired basic People Skills,
    Mastered Cleaning Toilets, Cut Hands Multiple times inside ice cream machine.***`,
    renderByDefault: false,
    icon: IceCreamCone,
  },
];

// --- EDUCATION DATA ---

export const allEducationData: CVEntryProps[] = [
  {
    startYear: 2021,
    endYear: 2023,
    title: 'MSc. In Applied Physics',
    location: 'École polytechnique fédérale de Lausanne (EPFL)',
    description: `Graduated as a student in Applied Physics with a Masters
Fellowship and a final GPA of 5.41/6. Conducted a geometric optimization study on the
Fast Ion Loss Detector (FILD) and did initial scoping of a planned avalanche photodiode upgrade
([now in service](https://pubs.aip.org/aip/rsi/article/96/8/083504/3358340/Design-and-upgrades-of-the-TCV-fast-ion-loss)).
Thesis was supervised by Dr. Ambrogio Fasoli of EPFL and Dr. Cristina Rea of MIT on the disruptivity
metric. Find the repository [here](https://github.com/peterkaloyannis/disruptionStatistics).`,
    renderByDefault: true,
    iconUrl: '/images/cv/epfl.svg',
  },
  {
    startYear: 2022,
    endYear: 2023,
    title: 'Visiting Student',
    location: 'Massachusetts Institute of Technology (MIT)',
    description: `Undertook a 6 month research collaboration at the MIT Plasma
Science and Fusion Center (PSFC) with Dr. Cristina Rea. Explored the disruptivity
metric as a reliable and human interpretable indicator of plasma stability. Thesis
analyzed disruption data from the DIII-D and TCV tokamaks.
Work largely involved Bayesian statistics and Python optimization.
Find the repository [here](https://github.com/peterkaloyannis/disruptionStatistics).`,
    renderByDefault: true,
    iconUrl: '/images/cv/mit.svg',
  },
  {
    startYear: 2018,
    endYear: 2021,
    title: 'BSc. In Honors Math and Physics',
    location: 'McGill University',
    description: `Graduated as a student in an Honors Mathematics and
Physics degree at McGill University with Dean's Honour
List & Distinction. Final GPA of 3.96/4 and collaborated with
professors in cosmology and particle physics research.
Did extra curricular work in machining and passed machine shop certification.
Given the ***Couldn't Live Without You*** award at the graduation ceremony!`,
    renderByDefault: true,
    iconUrl: '/images/cv/mcgill.svg',
  },
  {
    startYear: 2016,
    endYear: 2018,
    title: 'Natural Science GED',
    location: 'Marianopolis College',
    description: `Graduated Dean’s List (GPA equivalent of >85%) in Honors Health 
Sciences. Did a personal side project into Fourier Transforms of
space filling curves with Dr. Jean-Christophe Nave. Led the robotics 
team to a 2nd place victory in the CRC and was recognized for contributions
to student life and clubs.`,
    renderByDefault: false,
    iconUrl: '/images/cv/marianopolis.webp',
  },
  {
    startYear: 2016,
    endYear: 2018,
    title: 'Secondary School Diploma (SSD)',
    location: 'Selwyn House School',
    description: `Graduated with high honors (GPA >90%). Organized 
wellness events for students and was team captain in 
multiple sports teams. Contrary to popular belief, I did
in fact complete high school.`,
    renderByDefault: false,
    iconUrl: '/images/cv/selwyn.jpg',
  },
];

// --- TALKS & PUBLICATIONS DATA ---

export const allTalksAndPublicationsData: CVEntryProps[] = [
  {
    startYear: 2024,
    endYear: "",
    title: 'Real time plasma facing component modeling and responses in the SPARC plasma control system',
    location: 'APS Division of Plasma Physics (DPP24)',
    description: `Talk presented at the High Field Session of the APS
DPP meeting. Explores real time algorithms for heat flux modeling in
the SPARC tokamak and its uses in operational planning and machine
protection. [Link to Abstract](https://meetings.aps.org/Meeting/DPP24/Session/TO06.14).`,
    renderByDefault: true,
    iconUrl: '/images/cv/aps.png',
  },
  {
    startYear: 2023,
    endYear: "",
    title: 'A Deep Dive Into Disruptivity: Learning to Predict and Avoid Disruptions',
    location: 'APS Division of Plasma Physics (DPP23)',
    description: `Poster presented at the High Field poster session of the APS DPP meeting.
Explores disruptivity metrics for tokamak operations, presenting data-driven methods
for boundary mapping and real-time disruption avoidance.
[Link to Abstract](https://meetings.aps.org/Meeting/DPP24/Session/TO06.14)`,
    renderByDefault: true,
    iconUrl: '/images/cv/aps.png',
  },
];

// --- COMMUNITY SERVICE DATA ---

export const allServiceData: CVEntryProps[] = [
  {
    startYear: 2012,
    endYear: "Present",
    title: 'Volunteer',
    location: 'Hellenic Appeal Foundation',
    description: `The [Hellenic Appeal Foundation](https://www.hellenicappeal.org/) 
is a charity run by close family friends that does holiday food drives for Easter 
and Christmas. I helped pack and deliver baskets consistently when I was younger. 
Now I live in another city and so I help with deliveries if I happen to be around
on the special weekend!`,
    renderByDefault: true,
    iconUrl: '/images/cv/hellenic_appeal.png',
  },
  {
    startYear: 2019,
    endYear: 2019,
    title: 'Note Taker',
    location: 'McGill University',
    description: `I did some note taking while at McGill to support classmates who
had fallen ill or had disabilities!`,
    renderByDefault: false,
    iconUrl: '/images/cv/mcgill.svg',
  },
];

// --- EXTRACURRICULARS DATA ---

export const allExtracurricularsData: CVEntryProps[] = [
  {
    startYear: 2013,
    endYear: 2022,
    title: 'Team Robotics',
    location: 'Various Teams (EPFL Xplore, McGill Submarine, Marianopolis, etc.)',
    description: `While with the EPFL Xplore mars rover team, built the Astra rover science bay control system.
Participated in McGill robotics, was captain of Marianopolis Robotics and Selwyn Robotics.
As captain, brought two 2nd place victories home! I may start mentoring in the future so this
door is not quite closed yet!`,
    renderByDefault: true,
    icon: Bot,
  },
  {
    startYear: 2008,
    endYear: 'Present',
    title: 'Sports',
    location: 'Various Leagues (RSEQ, GMAA, Lac St. Louis, etc.)',
    description: `Over the year I have played many sports competitively, examples are
football, rugby, baseball, hockey, soccer, and ultimate frisbee. I was the captain
of many of those teams and had a couple of MVP awards under my belt! While I am not the
athlete I used to be, I actually still regularly play most in that list casually!
Fun fact, if you google my name and look hard enough you can actually find random
sports stats about me and a HUDL profile.`,
    renderByDefault: true,
    icon:Trophy,
  },
  {
    startYear: 2017,
    endYear: "Present",
    title: 'Hackathons & Game Jams',
    location: 'Various Organizations (McGill, CERN, itch.io, etc.)',
    description: `I always love a good time boxed window to turn a vague prompt into a
realized idea! I have completed in many hackathons over the years where I built things from
[galactic orbit simulators](https://github.com/peterkaloyannis/McGillHackathon2019) 
to [snowflake generators](https://github.com/Beau-Coup/phys-hackathon-2020) 
(the latter won second place)! I am now dipping my toes into 
[game jams](https://itch.io/jam/bigmode-game-jam-2025/rate/3298422) 
and we will see where that takes us!`,
    renderByDefault: true,
    icon:Zap,
  },
];

// --- AWARDS DATA ---

export const allAwardsData: CVEntryProps[] = [
  {
    startYear: 2021,
    endYear: 2022,
    title: 'Masters Fellowship',
    location: 'École polytechnique fédérale de Lausanne (EPFL)',
    description: `Recieved an EPFL Masters Fellowship, for a total
of 40 000 CHF over two years. This grant is given to
outstanding applicants to the Faculty of Basic Sciences (FSB) and
was renewed upon demonstrated excellence.`,
    renderByDefault: true,
    iconUrl: '/images/cv/epfl.svg',
  },
  {
    startYear: 2021,
    endYear: "",
    title: 'Undergraduate Student Research Award (USRA)',
    location: 'Natural Sciences and Engineering Research Council (NSERC)',
    description: `Granted an Undergraduate Student Research Award (USRA) by
NSERC for work characterizing the LHC at CERN with Professor
Brigitte Vachon. The grant paid CA$4500 from NSERC and CA$1500 
from the Fonds de Recherche de Québec (FRQNT) for the 16 week project. Find the
grants linked [here](https://nserc-crsng.canada.ca/en/awards-database/703541)
and [here](https://doi.org/10.69777/297074).`,
    renderByDefault: true,
    iconUrl: '/images/cv/NSERC_RGB.svg',
  },
  {
    startYear: 2020,
    endYear: "",
    title: 'CERN Summer Student Fellowship',
    location: 'Institute of Particle Physics',
    description: `Earned a Fellowship to work on upgrades to the LHC
at CERN. The scoped project originally included working directly on the
ATLAS detector installation, but had to be scoped down due to COVID-19.`,
    renderByDefault: true,
    iconUrl: '/images/cv/ipp_can.png',
  },
  {
    startYear: 2020,
    endYear: "",
    title: `Member of the Cum Laude Society`,
    location: 'Cum Laude Society',
    description: `Inducted member of the Cum Laude Society which 
recognizes students of high academic caliber all around the 
world. Elected by members of Selwyn House faculty.`,
    renderByDefault: false,
    iconUrl: '/images/cv/laude.jpg',
  },
];
