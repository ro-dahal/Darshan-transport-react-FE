import React from 'react';

export interface ContactFormProps {
  onSubmit(): void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => (
  <div className="contact-form">
    <h3>Send Us a Message</h3>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" required />
      <button type="submit">Submit</button>
    </form>
  </div>
);
