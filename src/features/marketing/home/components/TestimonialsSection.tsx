import React from 'react';
import type { ReviewTestimonial, VideoTestimonial } from '../data/homeContent';

export interface TestimonialsSectionProps {
  videos: VideoTestimonial[];
  reviews: ReviewTestimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ videos, reviews }) => (
  <section className="testimonials-section">
    <div className="wave-bg"></div>
    <div className="testimonials-content">
      <h2 className="subtitle">Testimonials</h2>
      <h3 className="title">The Voice of Our Customers</h3>
      {/* <div className="videos">
        {videos.map((video) => (
          <div className="video-card" key={video.name}>
            <video controls poster={video.poster}>
              <source src={video.source} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="caption">
              <strong>{video.name}</strong>, {video.title}
              <br />
              {video.company}
            </div>
          </div>
        ))}
      </div> */}

      <div className="reviews">
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
  </section>
);
