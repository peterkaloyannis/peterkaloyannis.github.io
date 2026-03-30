import { type ReactElement, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

// Must match the Autoplay delay so the progress ring animation stays in sync.
const AUTOPLAY_DELAY = 5000;

export default function HomePage(): ReactElement {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  // ringKey is incremented to re-mount the SVG, restarting the CSS animation from zero.
  const [ringKey, setRingKey] = useState(0);
  const [ringPlaying, setRingPlaying] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onPlay   = () => { setRingKey(k => k + 1); setRingPlaying(true); };
    const onStop   = () => setRingPlaying(false);

    emblaApi.on('select',        onSelect);
    emblaApi.on('autoplay:play', onPlay);
    emblaApi.on('autoplay:stop', onStop);
    return () => {
      emblaApi.off('select',        onSelect);
      emblaApi.off('autoplay:play', onPlay);
      emblaApi.off('autoplay:stop', onStop);
    };
  }, [emblaApi]);

  // Force-restart the ring and reset the autoplay timer (e.g. on dot click).
  const resetRingAndTimer = () => {
    emblaApi?.plugins()?.autoplay?.reset();
    setRingKey(k => k + 1);
    setRingPlaying(true);
  };

  return (
    <section
      id="hero"
      className="flex flex-col text-center py-6 md:py-24"
      style={{ height: 'calc(100svh - 8rem)' }}
    >
      {/* Embla carousel — handles drag (touch + mouse), looping, and autoplay. */}
      <div
        ref={emblaRef}
        className="portrait w-80 md:w-96 rounded-xl overflow-hidden mx-auto mb-4 flex-1 min-h-0 cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex h-full">
          {PHOTOS.map((src, i) => (
            <div key={i} className="flex-none w-full h-full">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Controls row: prev chevron, dot indicators, next chevron */}
      <div className="flex items-center justify-center gap-2 mb-4 shrink-0">
        <button onClick={() => emblaApi?.scrollPrev()} className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:scale-125 transition-all duration-150">
          <ChevronLeft className="w-4 h-4" />
        </button>

        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => { emblaApi?.scrollTo(i); resetRingAndTimer(); }}
            aria-label={`Photo ${i + 1}`}
            className="relative flex items-center justify-center w-4 h-4 cursor-pointer hover:scale-125 transition-transform duration-150"
          >
            {i === selectedIndex ? (
              <>
                {/* Progress ring: stroke-dashoffset animates from full circumference (37.7 ≈ 2π×6)
                    to 0, drawing the ring. Remounting via key restarts it from zero. */}
                <svg key={ringKey} className="absolute inset-0 -rotate-90" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="6" fill="none" stroke="var(--color-border)" strokeWidth="1.5" />
                  <circle
                    cx="8" cy="8" r="6" fill="none"
                    stroke="var(--color-accent)" strokeWidth="1.5"
                    strokeDasharray="37.7"
                    strokeDashoffset="37.7"
                    style={{
                      animation: `progress-ring ${AUTOPLAY_DELAY}ms linear forwards`,
                      animationPlayState: ringPlaying ? 'running' : 'paused',
                    }}
                  />
                </svg>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-accent)' }} />
              </>
            ) : (
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--color-border)' }} />
            )}
          </button>
        ))}

        <button onClick={() => emblaApi?.scrollNext()} className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:scale-125 transition-all duration-150">
          <ChevronRight className="w-4 h-4" />
        </button>
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
  );
}
