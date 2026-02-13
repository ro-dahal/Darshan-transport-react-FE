import React, { useState } from 'react';
import type { ReviewTestimonial, VideoTestimonial } from '../data/homeContent';

export interface TestimonialsSectionProps {
  videos: VideoTestimonial[];
  reviews: ReviewTestimonial[];
}


export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ reviews }) => {
  const [index, setIndex] = useState(0);

  // Dynamic maxVisible based on screen width
  const [maxVisible, setMaxVisible] = React.useState(3);
  const [cardDimensions, setCardDimensions] = useState({ width: 300, gap: 40 });
  const [containerWidth, setContainerWidth] = useState(980);

  React.useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let newMaxVisible = 3;
      let newCardWidth = 300;
      let newGap = 40;

      if (screenWidth < 768) {
        newMaxVisible = 1;
        // Mobile: Buttons move below, card takes full width minus section padding
        newCardWidth = screenWidth - 80;
        newGap = 20;
      } else if (screenWidth < 1024) {
        newMaxVisible = 2;
        newCardWidth = 280;
        newGap = 24;
      } else if (screenWidth < 1280) {
        newMaxVisible = 3;
        newCardWidth = 260; // Slightly smaller to fit 3 in typical laptop width
        newGap = 24;
      } else {
        newMaxVisible = 3;
        newCardWidth = 300;
        newGap = 40;
      }

      const newContainerWidth = (newCardWidth * newMaxVisible) + (newGap * Math.max(0, newMaxVisible - 1));

      setMaxVisible(newMaxVisible);
      setCardDimensions({ width: newCardWidth, gap: newGap });
      setContainerWidth(newContainerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = reviews.length;
  const showScroll = total > maxVisible;
  const canScrollLeft = showScroll && index > 0;
  const canScrollRight = showScroll && index < total - maxVisible;

  const handlePrev = () => {
    if (canScrollLeft) setIndex(index - 1);
  };
  const handleNext = () => {
    if (canScrollRight) setIndex(index + 1);
  };

  const NavButton = ({ direction, disabled, onClick }: { direction: 'left' | 'right', disabled: boolean, onClick: () => void }) => (
    <button
      className="bg-primary text-white border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-200 p-0 disabled:bg-[#eee] disabled:text-[#aaa] disabled:cursor-not-allowed shadow-md hover:bg-secondary active:scale-95"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Scroll testimonials ${direction}`}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="none" />
        <path d={direction === 'left' ? "M15.5 12H8.5" : "M8.5 12H15.5"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={direction === 'left' ? "M11 9L8.5 12L11 15" : "M13 9L15.5 12L13 15"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );

  return (
    <section className="relative bg-[#e6e6e6] pt-20 px-5 pb-0 overflow-hidden max-md:pt-[60px] max-md:px-[15px]">
      {/* Wave background */}
      <div className="absolute bottom-0 left-0 w-full h-[150px] bg-white rounded-tl-[50%_20%] rounded-tr-[50%_20%]" />

      <div className="relative max-w-[1200px] mx-auto z-[1]">
        <h2 className="text-center text-primary text-sm mb-2.5">Testimonials</h2>
        <h3 className="text-center text-[28px] font-bold text-[#2c3e50] mb-[50px]">The Voice of Our Customers</h3>

        {/* Responsive flex container: Wraps on mobile (buttons below), row on desktop */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center justify-center w-full gap-0 md:gap-5">
            {/* Desktop Previous Button */}
            {showScroll && (
              <div className="hidden md:block">
                <NavButton direction="left" disabled={!canScrollLeft} onClick={handlePrev} />
              </div>
            )}

            <div
              className="overflow-hidden pt-[50px] px-[15px] box-border transition-[width] duration-300 ease-in-out"
              style={{ width: containerWidth + 30 }} // +30 for padding
            >
              <div
                className="flex flex-nowrap justify-start items-stretch overflow-visible transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                style={{
                  transform: showScroll ? `translateX(-${index * (cardDimensions.width + cardDimensions.gap)}px)` : 'none',
                  justifyContent: showScroll ? 'flex-start' : 'center',
                  width: showScroll ? 'max-content' : '100%',
                  gap: cardDimensions.gap
                }}
              >
                {reviews.map((review, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg pt-[30px] px-5 pb-5 shadow-[0_2px_12px_rgba(0,0,0,0.1)] relative text-center"
                    style={{
                      flex: `0 0 ${cardDimensions.width}px`,
                      maxWidth: `${cardDimensions.width}px`
                    }}
                  >
                    <div className="absolute -top-[35px] left-1/2 -translate-x-1/2 w-[70px] h-[70px] rounded-full overflow-hidden border-[3px] border-white shadow-[0_0_0_4px_var(--color-primary)]">
                      <img src={review.image} alt={`Customer reviewer ${review.name}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm text-[#555] mt-10 mb-5">{review.quote}</p>
                    <h4 className="text-base font-semibold text-primary m-0">{review.name}</h4>
                    <span className="text-[13px] text-[#888]">{review.company}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Next Button */}
            {showScroll && (
              <div className="hidden md:block">
                <NavButton direction="right" disabled={!canScrollRight} onClick={handleNext} />
              </div>
            )}
          </div>

          {/* Mobile Navigation Buttons */}
          {showScroll && (
            <div className="flex md:hidden justify-center gap-10 mt-8">
              <NavButton direction="left" disabled={!canScrollLeft} onClick={handlePrev} />
              <NavButton direction="right" disabled={!canScrollRight} onClick={handleNext} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
