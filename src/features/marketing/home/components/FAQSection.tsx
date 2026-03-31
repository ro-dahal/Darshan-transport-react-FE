import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What transport services do you provide?',
    answer:
      'We provide bulk cargo transport, full-truck shipments, warehousing, and distribution support across Nepal.',
  },
  {
    question: 'Who are your services for?',
    answer:
      'Our services are designed for manufacturers, distributors, retailers, and businesses needing regular cargo movement.',
  },
  {
    question: 'Do you handle bulk shipments?',
    answer:
      'Yes. We specialize in high-volume cargo and full-truck transport solutions.',
  },
  {
    question: 'Do you offer warehousing?',
    answer:
      'Yes. We provide warehousing and 3PL services for storage and logistics support.',
  },
  {
    question: 'Which locations do you serve?',
    answer: 'We serve major cities and business routes across Nepal.',
  },
  {
    question: 'How can I request a quote?',
    answer:
      'You can contact us through the website or phone to request a quote.',
  },
  {
    question: 'Can I track my shipment?',
    answer: 'Yes. Shipment tracking support is available.',
  },
];

const FAQ_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 px-5 max-w-[900px] mx-auto max-md:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_STRUCTURED_DATA),
        }}
      />
      <h2 className="text-3xl font-bold text-center text-[#2c3e50] mb-10 max-md:text-2xl">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col gap-3">
        {FAQ_ITEMS.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-none"
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
            >
              <span className="text-base font-semibold text-[#2c3e50] pr-4">
                {item.question}
              </span>
              <span
                className={`text-primary text-xl transition-transform duration-200 flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-4 pt-0 text-[15px] leading-relaxed text-gray-600">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
