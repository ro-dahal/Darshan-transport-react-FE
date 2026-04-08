import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_CONFIG } from '../config/contactConfig';

type FormState = {
  from: string;
  to: string;
  cargoType: string;
  weight: string;
  phone: string;
};

const INITIAL_FORM: FormState = {
  from: '',
  to: '',
  cargoType: '',
  weight: '',
  phone: '',
};

const CARGO_TYPES = [
  'Parcel / Courier',
  'Freight / Bulk Cargo',
  'E-commerce Goods',
  'Perishable Goods',
  'Industrial Equipment',
  'Other',
];

export const QuotationRatePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Build a pre-filled WhatsApp message with the quotation details
    const message = [
      '📦 *Rate Quotation Request*',
      `From: ${form.from}`,
      `To: ${form.to}`,
      `Cargo: ${form.cargoType}`,
      `Weight: ${form.weight}`,
      `Phone: ${form.phone}`,
    ].join('\n');

    const encodedMessage = encodeURIComponent(message);
    const cleaned = CONTACT_CONFIG.whatsapp.replace(/\D/g, '');
    window.open(
      `https://wa.me/${cleaned}?text=${encodedMessage}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset state after the close animation finishes
    setTimeout(() => {
      setForm(INITIAL_FORM);
      setSubmitted(false);
    }, 300);
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        aria-label="Get a rate quotation"
        className="fixed bottom-24 right-4 z-[1500] flex items-center gap-2 bg-primary text-black font-semibold text-sm px-4 py-2.5 rounded-full shadow-lg hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 shrink-0"
          aria-hidden="true"
        >
          <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
        </svg>
        Get Rate
      </motion.button>

      {/* Modal overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[1600] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              aria-hidden="true"
            />

            <motion.div
              key="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="quotation-popup-title"
              className="fixed inset-0 z-[1700] flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
                role="presentation"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
                  <h2
                    id="quotation-popup-title"
                    className="text-lg font-bold text-gray-800"
                  >
                    Request a Rate Quotation
                  </h2>
                  <button
                    onClick={handleClose}
                    aria-label="Close quotation popup"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                  {submitted ? (
                    <div className="flex flex-col items-center gap-3 py-6 text-center">
                      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-8 h-8 text-green-600"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-medium">
                        Your request has been sent via WhatsApp!
                      </p>
                      <p className="text-sm text-gray-500">
                        Our team will get back to you shortly.
                      </p>
                      <button
                        onClick={handleClose}
                        className="mt-2 px-5 py-2 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors text-sm"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-3"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="qr-from"
                            className="text-xs font-medium text-gray-600"
                          >
                            From (Origin)
                          </label>
                          <input
                            id="qr-from"
                            name="from"
                            type="text"
                            required
                            placeholder="e.g. Kathmandu"
                            value={form.from}
                            onChange={handleChange}
                            className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="qr-to"
                            className="text-xs font-medium text-gray-600"
                          >
                            To (Destination)
                          </label>
                          <input
                            id="qr-to"
                            name="to"
                            type="text"
                            required
                            placeholder="e.g. Pokhara"
                            value={form.to}
                            onChange={handleChange}
                            className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="qr-cargo"
                          className="text-xs font-medium text-gray-600"
                        >
                          Cargo Type
                        </label>
                        <select
                          id="qr-cargo"
                          name="cargoType"
                          required
                          value={form.cargoType}
                          onChange={handleChange}
                          className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                        >
                          <option value="" disabled>
                            Select cargo type
                          </option>
                          {CARGO_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="qr-weight"
                            className="text-xs font-medium text-gray-600"
                          >
                            Approx. Weight
                          </label>
                          <input
                            id="qr-weight"
                            name="weight"
                            type="text"
                            required
                            placeholder="e.g. 50 kg"
                            value={form.weight}
                            onChange={handleChange}
                            className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="qr-phone"
                            className="text-xs font-medium text-gray-600"
                          >
                            Your Phone
                          </label>
                          <input
                            id="qr-phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="98XXXXXXXX"
                            value={form.phone}
                            onChange={handleChange}
                            autoComplete="tel"
                            className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="mt-1 w-full py-2.5 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Send via WhatsApp
                      </button>

                      <p className="text-center text-xs text-gray-400">
                        Your request will be sent directly to our team.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
