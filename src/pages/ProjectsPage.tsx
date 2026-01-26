import { SectionTitle, ProjectCard } from '../components/Reusable';
import { Presentation, Code, CheckSquare, Joystick, Globe } from '../components/Icons';
import { type ReactElement } from 'react';

export default function ProjectsPage(): ReactElement {
  return (
    <section id="projects">
      <SectionTitle icon={Presentation} title="Projects" />
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-[350px] flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-xl sticky top-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">About this page</h3>
            <p className="text-base text-gray-700 leading-relaxed mb-1">
              I am sometimes hit with a lightning bolt of an idea that I must execute 
              at that instant.
              <br/><br/>
              Most of these <b><i>eureka moments</i></b> are actually super benign
              and contribute to an evergrowing pile of unfinished projects. Sometimes 
              though... well... judge for yourself. You may very well find a needle 
              in this haystack!
            </p>
          </div>
        </div>
      
      {/* Scrollable section. */}
      <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProjectCard 
          icon={Globe}
          title="This website."
          description="I made the website you are looking at. Wow. Click here to see the (admitedly rough) source code!"
          href="https://github.com/peterkaloyannis/peterkaloyannis.github-io"
          imageUrl='/images/projects/monkey.jpg'
        />
        <ProjectCard 
          icon={CheckSquare}
          title="FeedMe."
          description="FeedMe is a simple task management app I built to help me complete certain unstructured tasks."
          href="https://github.com/peter-maria-play-org/side_projects/tree/main/feed_me"
          imageUrl='/images/projects/feed_me.jpg'
        />
        <ProjectCard 
          icon={Joystick}
          title="Diamond Drive"
          description= "This was my first ever video game, put together in a week for the Bigmode Game Jam 2025. Diamond Drive placed in the top 2-8% of more than 800 entries. (category dependent)"
          href="https://itch.io/jam/bigmode-game-jam-2025/rate/3298422"
          imageUrl="https://img.itch.zone/aW1nLzE5Njk1MzYxLmpwZw==/315x250%23c/BIG1z1.jpg"
        />
        <ProjectCard 
          icon={Code}
          title="Disruption Statistics"
          description= "Disruption Statistics is a codebase that aims to provide a tokamak agnostic computing framework for computing disruptivity [1/s] values from time series data."
          href="https://github.com/peterkaloyannis/disruptionStatistics"
          imageUrl="/images/projects/cmod_trajectory.jpg"
        />
        <ProjectCard 
          icon={Code}
          title="CMBStraightStrings"
          description= "A Python 3 CMB anisotropy simulator with cosmic strings based on a scale invariant analytic model of long straight strings. This Python 3 program is the evolution of the C program CMBEdge but without any of the edge detection based on the Canny algorithm."
          href="https://gitlab.com/oscarhdz/cmbstraightstrings"
          imageUrl="/images/projects/cmbsim.jpg"
        />
        </div>
      </div></div>
    </section>
  );
}
