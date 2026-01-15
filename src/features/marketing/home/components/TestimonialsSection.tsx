import React, { useState } from 'react';
import type { ReviewTestimonial, VideoTestimonial } from '../data/homeContent';

export interface TestimonialsSectionProps {
  videos: VideoTestimonial[];
  reviews: ReviewTestimonial[];
}


export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ reviews }) => {
  const [index, setIndex] = useState(0); // index of first visible card
  const maxVisible = 3;
  const total = reviews.length;
  const canScrollLeft = index > 0;
  const canScrollRight = index < total - maxVisible;

  const handlePrev = () => {
    if (canScrollLeft) setIndex(index - 1);
  };
  const handleNext = () => {
    if (canScrollRight) setIndex(index + 1);
  };

  return (
    <section className="testimonials-section">
      <div className="wave-bg"></div>
      <div className="testimonials-content">
        <h2 className="subtitle">Testimonials</h2>
        <h3 className="title">The Voice of Our Customers</h3>
        <div className="reviews-carousel-wrapper">
          <button
            className="reviews-arrow left"
            onClick={handlePrev}
            disabled={!canScrollLeft}
            aria-label="Scroll testimonials left"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="none" />
              <path d="M15.5 12H8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 9L8.5 12L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="reviews-carousel">
            <div
              className="reviews reviews-carousel-track"
              style={{ transform: `translateX(-${index * 340}px)` }}
            >
              {reviews.map((review) => (
                <div className="review-card" key={review.name}>
                  <div className="profile-pic">
                    <img src={review.image} alt={`Customer reviewer ${review.name}`} loading="lazy" decoding="async" />
                  </div>
                  <p>{review.quote}</p>
                  <h4>{review.name}</h4>
                  <span>{review.company}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            className="reviews-arrow right"
            onClick={handleNext}
            disabled={!canScrollRight}
            aria-label="Scroll testimonials right"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="none" />
              <path d="M8.5 12H15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 9L15.5 12L13 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
