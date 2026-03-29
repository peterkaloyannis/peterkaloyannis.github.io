import { type ReactElement, useState, useEffect } from 'react';

const PHOTOS = [
  '/images/me/gazebo.jpg',
  '/images/me/dog.jpg',
  '/images/me/hot_couple.jpg',
  '/images/me/how_you_doin.jpg',
  '/images/me/window_chloe.jpg',
  '/images/me/baby.jpg',
  '/images/me/jet.jpg',
  '/images/me/modern_gothic.jpg',
  '/images/me/puck.jpg',
  '/images/me/stabbed.jpg',
];

export default function HomePage(): ReactElement {
  // Preload all photos so the browser has them cached before the carousel reaches them.
  useEffect(() => {
    PHOTOS.forEach(src => { new Image().src = src; });
  }, []);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [manualMode, setManualMode] = useState(false);

  // Auto-cycle until the user interacts. Re-runs whenever photoIndex changes
  // so the timer resets after each auto-advance.
  useEffect(() => {
    if (manualMode) return;
    const interval = setInterval(() => advance(), 3000);
    return () => clearInterval(interval);
  }, [manualMode, photoIndex]);

  // Stash the current index as "previous" so both images are briefly in the DOM,
  // allowing the slide-out / slide-in CSS animations to overlap seamlessly.
  const goTo = (next: number) => {
    setPrevIndex(photoIndex);
    setPhotoIndex(next);
  };

  const advance = () => goTo((photoIndex + 1) % PHOTOS.length);

  // Switch to click-driven mode on first user interaction, stopping the timer.
  const enterManual = () => setManualMode(true);

  return (
    <>
      {/* On mobile: fill viewport height so the image auto-sizes to fit without scrolling.
          On desktop: revert to natural padding-based layout. */}
      <section
        id="hero"
        className="flex flex-col text-center py-6 md:py-24"
        style={{ height: 'calc(100svh - 8rem)' }}
      >

        {/* Image grows to fill all remaining vertical space after the text content */}
        <div
          onClick={() => { enterManual(); advance(); }}
          className="portrait w-80 md:w-96 rounded-xl overflow-hidden mx-auto mb-4 cursor-pointer relative flex-1 min-h-0"
        >
          {/* Previous image — slides out left */}
          {prevIndex !== null && (
            <img
              key={`prev-${prevIndex}`}
              src={PHOTOS[prevIndex]}
              alt="The picture carousel is loading!"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ animation: 'slide-out 0.4s ease-out forwards' }}
              onAnimationEnd={() => setPrevIndex(null)}
            />
          )}
          {/* Current image — slides in from right */}
          <img
            key={`curr-${photoIndex}`}
            src={PHOTOS[photoIndex]}
            alt="The picture carousel is loading!"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ animation: prevIndex !== null ? 'slide-in 0.4s ease-out forwards' : 'none' }}
          />
        </div>

        {/* Dot indicator */}
        <div className="flex justify-center gap-2 mb-4 shrink-0">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => { enterManual(); goTo(i); }}
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{ background: i === photoIndex ? 'var(--color-accent)' : 'var(--color-border)' }}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-2 leading-tight shrink-0">
          Hi, I'm Peter
        </h1>

        <h2 className="text-xl md:text-2xl text-accent mb-3 shrink-0">
          🐒 Welcome to my website! 🐒
        </h2>

        <p className="text-lg leading-relaxed mx-auto shrink-0" style={{ color: 'var(--color-text)', maxWidth: '520px' }}>
          I am a fusion physicist/controls engineer at Commonwealth Fusion Systems.
          I am currently based out of Boston, but I'm a Montrealer at heart!
        </p>

      </section>
    </>
  );
}
