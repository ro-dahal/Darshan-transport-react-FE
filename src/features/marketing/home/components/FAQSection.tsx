import React, { useState } from 'react';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import supportIllustration from '../../../../assets/img/support.png';
import { TransitionLink } from '../../../../core/components/TransitionLink';

type FAQCategory = 'Services' | 'Operations' | 'Support';
type FAQFilter = 'All' | FAQCategory;

interface FAQItem {
  id: string;
  category: FAQCategory;
  badge: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: readonly FAQItem[] = [
  {
    id: 'transport-services',
    category: 'Services',
    badge: 'What we handle',
    question: 'What transport services do you provide?',
    answer:
      'We provide bulk cargo transport, full-truck shipments, warehousing, and distribution support across Nepal for businesses that need dependable movement of goods.',
  },
  {
    id: 'who-we-serve',
    category: 'Services',
    badge: 'Ideal clients',
    question: 'Who are your services for?',
    answer:
      'Our services are designed for manufacturers, distributors, retailers, and businesses that need regular cargo movement, delivery coordination, or storage support.',
  },
  {
    id: 'bulk-shipments',
    category: 'Services',
    badge: 'High volume freight',
    question: 'Do you handle bulk shipments?',
    answer:
      'Yes. Bulk cargo and full-truck transport are core parts of our operation, so we can support recurring large-volume movement as well as one-off commercial loads.',
  },
  {
    id: 'warehousing',
    category: 'Operations',
    badge: 'Storage support',
    question: 'Do you offer warehousing?',
    answer:
      'Yes. We provide warehousing and 3PL support to help businesses store inventory, organize dispatches, and streamline day-to-day logistics operations.',
  },
  {
    id: 'service-areas',
    category: 'Operations',
    badge: 'Coverage',
    question: 'Which locations do you serve?',
    answer:
      'We serve major cities and business routes across Nepal. If you have a specific pickup or delivery corridor in mind, our team can confirm coverage quickly.',
  },
  {
    id: 'request-quote',
    category: 'Support',
    badge: 'Getting started',
    question: 'How can I request a quote?',
    answer:
      'You can request a quote through the website or by contacting our team directly. Sharing your route, cargo type, shipment frequency, and timing helps us respond faster.',
  },
  {
    id: 'shipment-tracking',
    category: 'Support',
    badge: 'Visibility',
    question: 'Can I track my shipment?',
    answer:
      'Yes. Shipment tracking support is available so you can stay informed on movement status and coordinate downstream delivery or receiving plans with more confidence.',
  },
];

const FAQ_FILTERS: ReadonlyArray<{
  value: FAQFilter;
  label: string;
  description: string;
}> = [
  {
    value: 'All',
    label: 'All Questions',
    description: 'Browse the complete support library.',
  },
  {
    value: 'Services',
    label: 'Services',
    description: 'Explore transport, bulk cargo, and warehousing.',
  },
  {
    value: 'Operations',
    label: 'Operations',
    description: 'Understand routes, storage, and delivery flow.',
  },
  {
    value: 'Support',
    label: 'Support',
    description: 'Find quote, tracking, and contact guidance.',
  },
];

const HIGHLIGHT_PILLARS = [
  {
    title: 'Bulk Cargo Ready',
    description: 'Built for heavy, recurring, and full-truck commercial loads.',
  },
  {
    title: 'Warehousing Support',
    description: 'Storage and 3PL services to keep inventory moving smoothly.',
  },
  {
    title: 'Shipment Guidance',
    description: 'Practical support from quote request to delivery follow-up.',
  },
] as const;

const CONTACT_OPTIONS = [
  {
    label: 'Phone',
    value: '+977 9801914226',
    href: 'tel:+9779801914226',
  },
  {
    label: 'Email',
    value: 'info@darshantransport.com.np',
    href: 'mailto:info@darshantransport.com.np',
  },
  {
    label: 'Coverage',
    value: 'Major cities and business routes across Nepal',
    href: '/contact',
  },
] as const;

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

const getItemsForFilter = (filter: FAQFilter): readonly FAQItem[] =>
  filter === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === filter);

export const FAQSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FAQFilter>('All');
  const [openItemId, setOpenItemId] = useState<string | null>(
    FAQ_ITEMS[0]?.id ?? null
  );

  const filteredItems = getItemsForFilter(activeFilter);

  const handleFilterChange = (filter: FAQFilter) => {
    const nextItems = getItemsForFilter(filter);

    setActiveFilter(filter);
    setOpenItemId((currentItemId) =>
      nextItems.some((item) => item.id === currentItemId)
        ? currentItemId
        : (nextItems[0]?.id ?? null)
    );
  };

  const toggleItem = (itemId: string) => {
    setOpenItemId((currentItemId) =>
      currentItemId === itemId ? null : itemId
    );
  };

  return (
    <section className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_STRUCTURED_DATA),
        }}
      />
      <div className="bg-bg-light border-b border-border-light">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] lg:py-20">
          <div>
            <span className="text-primary text-[26px] font-normal tracking-[1px]">
              FAQ
            </span>
            <h2 className="mt-2 text-[30px] font-bold text-text-dark max-sm:text-[26px]">
              Clear answers for transport and logistics support
            </h2>
            <p className="mt-5 max-w-[60ch] text-base leading-[1.8] text-text-medium">
              Find practical guidance on cargo movement, warehousing, quote
              requests, and shipment support. The page keeps the most common
              answers in one place and points you to the right next step when
              you need direct help.
            </p>

            <div className="mt-8 space-y-5">
              {HIGHLIGHT_PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="border-l-[4px] border-primary pl-4"
                >
                  <h3 className="text-[1.08rem] font-bold text-text-dark">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-[0.98rem] leading-[1.7] text-text-medium">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <dl className="mt-8 flex flex-col gap-4 border-y border-border-light py-5 text-sm text-text-medium sm:grid sm:grid-cols-3 sm:gap-6">
              {CONTACT_OPTIONS.map((option) => {
                const content = (
                  <>
                    <dt className="text-primary text-xs font-bold uppercase tracking-[0.14em]">
                      {option.label}
                    </dt>
                    <dd className="mt-2 break-words text-sm font-semibold text-text-dark">
                      {option.value}
                    </dd>
                  </>
                );

                return option.href.startsWith('/') ? (
                  <TransitionLink
                    key={option.label}
                    to={option.href}
                    className="no-underline"
                  >
                    {content}
                  </TransitionLink>
                ) : (
                  <a
                    key={option.label}
                    href={option.href}
                    className="text-inherit no-underline"
                  >
                    {content}
                  </a>
                );
              })}
            </dl>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={supportIllustration}
              alt="Darshan Transport support illustration"
              className="max-h-[420px] w-full max-w-[420px] object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-5 py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_290px]">
          <div>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c98300]">
                  Browse by topic
                </span>
                <h3 className="mt-3 text-3xl font-bold text-[#11253e] sm:text-[2.35rem]">
                  Frequently asked questions
                </h3>
              </div>
              <p className="max-w-[42ch] text-sm leading-6 text-[#5f7187] sm:text-right">
                Filter the most common questions by service, operations, or
                support to get to the right answer faster.
              </p>
            </div>

            <div className="mb-8 flex flex-wrap gap-6 border-b border-border-light">
              {FAQ_FILTERS.map((filter) => {
                const isActive = filter.value === activeFilter;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    className={`border-b-[3px] pb-4 text-left transition-colors duration-200 ${
                      isActive
                        ? 'border-primary text-text-dark'
                        : 'border-transparent text-text-medium hover:text-text-dark'
                    }`}
                    onClick={() => handleFilterChange(filter.value)}
                  >
                    <span className="block text-sm font-semibold uppercase tracking-[0.08em]">
                      {filter.label}
                    </span>
                    <span className="mt-1 block max-w-[24ch] text-xs leading-5 text-text-medium">
                      {filter.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-border-light">
              {filteredItems.map((item, index) => {
                const isOpen = openItemId === item.id;
                const answerPanelId = `${item.id}-panel`;
                const toggleButtonId = `${item.id}-button`;

                return (
                  <article
                    key={item.id}
                    className="border-b border-border-light"
                  >
                    <button
                      id={toggleButtonId}
                      type="button"
                      className="flex w-full items-start gap-4 py-6 text-left transition-colors duration-200 hover:text-primary"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={answerPanelId}
                    >
                      <span className="min-w-[44px] text-sm font-bold text-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="mb-3 flex flex-wrap gap-2">
                          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary">
                            {item.category}
                          </span>
                          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-text-medium">
                            {item.badge}
                          </span>
                        </span>
                        <span className="block text-lg font-semibold leading-snug text-text-dark sm:text-[1.35rem]">
                          {item.question}
                        </span>
                      </span>

                      <span
                        className={`mt-1 shrink-0 text-primary transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        <FaChevronDown aria-hidden="true" />
                      </span>
                    </button>

                    <div
                      id={answerPanelId}
                      role="region"
                      aria-labelledby={toggleButtonId}
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden pl-[60px]">
                        <div className="pb-6 pr-2">
                          <p className="max-w-[65ch] text-[0.98rem] leading-8 text-text-medium">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="h-fit lg:sticky lg:top-[calc(var(--head-height,90px)+24px)]">
            <div className="border-l-[4px] border-primary pl-5">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                Need more than an FAQ?
              </span>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-text-dark">
                We can help with route-specific or business-specific questions.
              </h3>
              <p className="mt-4 text-sm leading-7 text-text-medium">
                For pricing, recurring logistics support, or a route
                confirmation, our team can review your exact requirement and
                point you to the right next step.
              </p>
            </div>

            <div className="mt-8 space-y-6 text-sm leading-7 text-text-medium">
              <div>
                <h4 className="text-base font-semibold text-text-dark">
                  Best for quote requests
                </h4>
                <p className="mt-2">
                  Share route, cargo type, shipment size, and preferred
                  timeline.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold text-text-dark">
                  Best for service checks
                </h4>
                <p className="mt-2">
                  Confirm coverage, warehousing fit, and operational support.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <TransitionLink
                to="/contact"
                className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.14em] text-primary no-underline transition-colors duration-200 hover:text-primary-hover"
              >
                Contact Support
                <FaArrowRight aria-hidden="true" />
              </TransitionLink>
              <TransitionLink
                to="/get-quote"
                className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.14em] text-text-dark no-underline transition-colors duration-200 hover:text-primary"
              >
                Start a Quote
                <FaArrowRight aria-hidden="true" />
              </TransitionLink>
            </div>
          </aside>
        </div>
      </div>

      <section className="bg-primary py-9 px-4">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 max-md:flex-col max-md:text-center max-md:gap-5">
          <h3 className="text-4xl font-black leading-[1.2] text-black max-md:text-[28px] max-sm:text-2xl">
            Still need help with your shipment?
          </h3>
          <div className="flex flex-wrap gap-3 max-md:justify-center">
            <TransitionLink
              to="/contact"
              className="bg-white text-[#666] font-bold no-underline py-3.5 px-7 rounded-[10px] text-base transition-all duration-300 hover:bg-[#e6e6e6] hover:text-black"
            >
              Contact Us
            </TransitionLink>
            <TransitionLink
              to="/get-quote"
              className="bg-white text-[#666] font-bold no-underline py-3.5 px-7 rounded-[10px] text-base transition-all duration-300 hover:bg-[#e6e6e6] hover:text-black"
            >
              Request a Quote
            </TransitionLink>
          </div>
        </div>
      </section>
    </section>
  );
};
