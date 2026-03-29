import { type ReactElement } from 'react';

export default function HomePage(): ReactElement {
  return (
    <>
      <section id="hero" className="pt-24 pb-12 text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
          Hi, I'm Peter
        </h1>
        <h2 className="text-3xl text-accent mb-6">
          🐒 Welcome to my website! 🐒
        </h2>
      </section>

    </>
  );
}
