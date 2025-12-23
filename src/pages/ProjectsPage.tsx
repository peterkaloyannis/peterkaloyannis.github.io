import { SectionTitle, ProjectCard } from '../components/Reusable';
import { Presentation, Code } from '../components/Icons';

export default function ProjectsPage(): JSX.Element {
  return (
    <section id="projects">
      <SectionTitle icon={Presentation} title="Projects" />
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-[350px] flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-xl sticky top-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">About this page</h3>
            <p className="text-base text-gray-700 leading-relaxed mb-1">
              Over my short few years on this earth, I have tried to turn 
              my inability to sit still even for a moment into cool stuff.
              When I am sat doing nothing, I can suddenly be hit with a 
              lightning bolt of an idea that I must execute at that instant. 
              <br/><br/>
              
              Most of these <b><i>eureka moments</i></b> are actually super benign
              and amount to nothing (welcome to my life). Sometimes though... well...
              judge for yourself. You may very well still find most of this useless.
            </p>
          </div>
        </div>
      
      {/* Scrollable section. */}
      <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProjectCard 
          icon={Code}
          title="This website."
          description="I made the website you are looking at. Wow. Click here to see my likely strange source code."
          href="#/projects"
        />
        <ProjectCard 
          icon={Code}
          title="Diamond Drive"
          description= "This was my first ever video game, put together in a week for the Bigmode Game Jam 2025. Diamond Drive placed in the top 5-25% depending on the category."
          href="https://itch.io/jam/bigmode-game-jam-2025/rate/3298422"
          imageUrl="https://img.itch.zone/aW1nLzE5Njk1MzYxLmpwZw==/315x250%23c/BIG1z1.jpg"
        />
        <ProjectCard 
          icon={Code}
          title="Disruption Statistics"
          description= "Disruption Statistics is a codebase that aims to provide a tokamak agnostic computing framework for computing disruptibity values from time series data. Along with these computational routines, a plethora of plotting tools are available to conveniently visualize, save and share high quality figures. The repository is written in python with the intention of using it in jupyter notebooks or other similar apps."
          href="https://itch.io/jam/bigmode-game-jam-2025/rate/3298422"
          imageUrl="https://img.itch.zone/aW1nLzE5Njk1MzYxLmpwZw==/315x250%23c/BIG1z1.jpg"
        />
        <ProjectCard 
          icon={Code}
          title="CMBStraightStrings"
          description= "A Python 3 CMB anisotropy simulator with cosmic strings based on a scale invariant analytic model of long straight strings described in Perivolaropoulos L., 1993, Phys. Lett. B, 298, 305. This Python 3 program is the evolution of the C program CMBEdge but without any of the edge detection based on the Canny algorithm."
          href="https://gitlab.com/oscarhdz/cmbstraightstrings"
          imageUrl="/images/projects/cmbsim.jpg"
        />
        </div>
      </div></div>
    </section>
  );
}
