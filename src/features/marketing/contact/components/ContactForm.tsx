import React from 'react';

export interface ContactFormProps {
  onSubmit(): void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => (
  <div className="bg-white p-8 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] max-w-lg w-full max-sm:p-6 mx-auto">
    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send Us a Message</h3>
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        placeholder="Your Name"
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
      />
      <input
        type="email"
        placeholder="Your Email"
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
      />
      <textarea
        placeholder="Your Message"
        required
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[120px] resize-y"
      />
      <button
        type="submit"
        className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/30 mt-2"
      >
        Submit
      </button>
    </form>
  </div>
);
