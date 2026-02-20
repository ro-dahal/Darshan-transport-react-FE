import React from 'react';

type ContactFormPayload = {
  name: string;
  email: string;
  message: string;
};

export interface ContactFormProps {
  onSubmit(payload: ContactFormPayload): Promise<void> | void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: ContactFormPayload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    };

    try {
      await onSubmit(payload);
      form.reset();
      setSubmitStatus({
        type: 'success',
        message:
          'Message submitted successfully. We will get back to you soon.',
      });
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Could not submit your message right now. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] max-w-lg w-full max-sm:p-6 mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Send Us a Message
      </h3>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
      >
        <label htmlFor="contact-name" className="sr-only">
          Your Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Your Name"
          required
          autoComplete="name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
        <label htmlFor="contact-email" className="sr-only">
          Your Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="Your Email"
          required
          autoComplete="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
        />
        <label htmlFor="contact-message" className="sr-only">
          Your Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Your Message"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[120px] resize-y"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-primary-hover transition-colors shadow-lg shadow-primary/30 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </form>

      {submitStatus && (
        <p
          role={submitStatus.type === 'error' ? 'alert' : 'status'}
          className={`mt-4 text-sm ${submitStatus.type === 'error' ? 'text-red-600' : 'text-secondary'}`}
        >
          {submitStatus.message}
        </p>
      )}
    </div>
  );
};
