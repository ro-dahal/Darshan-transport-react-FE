import React from 'react';
import { MetaTags } from '../../../../core/components/MetaTags';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <MetaTags
        title="Privacy Policy | Darshan Transport"
        description="Privacy Policy for Darshan Transport Pvt. Ltd. Learn how we collect, use, and protect your personal information."
        canonical="https://www.darshantransport.com/privacy-policy"
      />

      <main className="bg-white">
        {/* Hero */}
        <section className="bg-secondary-900 py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Effective Date: April 1, 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none text-gray-700">
              {/* 1. Introduction */}
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                1. Introduction
              </h2>
              <p>
                Darshan Transport Pvt. Ltd. (&quot;Darshan Transport,&quot;
                &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed
                to protecting the privacy of our customers, partners, and
                website visitors. This Privacy Policy explains how we collect,
                use, store, and protect your personal information when you
                interact with our services or visit our website.
              </p>

              {/* 2. Information We Collect */}
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                2. Information We Collect
              </h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Personal Information:</strong> Name, phone number,
                  email address, and business name provided through contact
                  forms, quote requests, or service inquiries.
                </li>
                <li>
                  <strong>Shipment Information:</strong> Pickup and delivery
                  addresses, cargo details, and tracking information related to
                  your shipments.
                </li>
                <li>
                  <strong>Business Information:</strong> Company name, PAN/VAT
                  number, and billing details for invoicing and service
                  agreements.
                </li>
                <li>
                  <strong>Usage Data:</strong> IP address, browser type, device
                  information, pages visited, and interaction data collected
                  through cookies and analytics tools.
                </li>
              </ul>

              {/* 3. How We Use Your Information */}
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                3. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  Process and fulfill your transport and logistics service
                  requests.
                </li>
                <li>
                  Provide shipment tracking updates and delivery confirmations.
                </li>
                <li>
                  Communicate with you regarding inquiries, quotes, and service
                  updates.
                </li>
                <li>Generate invoices and manage billing for our services.</li>
                <li>
                  Improve our website, services, and customer experience through
                  analytics.
                </li>
                <li>
                  Comply with legal obligations and regulatory requirements in
                  Nepal.
                </li>
              </ul>

              {/* 4. Data Sharing */}
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                4. Data Sharing
              </h2>
              <p>
                We do not sell, rent, or trade your personal information to
                third parties. We may share your information only in the
                following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Service Partners:</strong> With logistics and
                  transport partners directly involved in fulfilling your
                  shipment.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law,
                  court order, or government regulation in Nepal.
                </li>
                <li>
                  <strong>Business Operations:</strong> With service providers
                  who assist us in website hosting, analytics, or customer
                  communication, under confidentiality agreements.
                </li>
              </ul>

              {/* 5. Cookies and Tracking */}
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                5. Cookies and Tracking
              </h2>
              <p>
                Our website uses cookies and similar tracking technologies to
                improve your browsing experience and analyze website usage. You
                can control cookie preferences through your browser settings.
                Disabling cookies may affect certain features of the website.
              </p>

              {/* 6. Data Security */}
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                6. Data Security
              </h2>
              <p>
                We implement reasonable technical and organizational measures to
                protect your personal information from unauthorized access,
                alteration, disclosure, or destruction. However, no method of
                transmission over the internet or electronic storage is 100%
                secure, and we cannot guarantee absolute security.
              </p>

              {/* 7. Data Retention */}
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                7. Data Retention
              </h2>
              <p>
                We retain your personal information for as long as necessary to
                fulfill the purposes outlined in this policy, comply with legal
                obligations, resolve disputes, and enforce our agreements.
                Shipment and business records may be retained as required by
                Nepali law.
              </p>

              {/* 8. Your Rights */}
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                8. Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  Request access to the personal information we hold about you.
                </li>
                <li>
                  Request correction of inaccurate or incomplete information.
                </li>
                <li>
                  Request deletion of your personal data, subject to legal
                  retention requirements.
                </li>
                <li>
                  Withdraw consent for marketing communications at any time.
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us using the
                details provided below.
              </p>

              {/* 9. Third-Party Links */}
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                9. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices or content of those
                websites. We encourage you to review the privacy policies of any
                external sites you visit.
              </p>

              {/* 10. Changes to This Policy */}
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                10. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated effective date. We
                encourage you to review this page periodically.
              </p>

              {/* 11. Contact Us */}
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                11. Contact Us
              </h2>
              <p>
                If you have any questions or concerns about this Privacy Policy
                or how your information is handled, please contact us:
              </p>
              <ul className="list-none pl-0 space-y-2 mt-3">
                <li>
                  <strong>Darshan Transport Pvt. Ltd.</strong>
                </li>
                <li>Kathmandu, Nepal</li>
                <li>
                  Email:{' '}
                  <a
                    href="mailto:info@darshantransport.com.np"
                    className="text-primary hover:underline"
                  >
                    info@darshantransport.com.np
                  </a>
                </li>
                <li>
                  Phone:{' '}
                  <a
                    href="tel:+9779705422317"
                    className="text-primary hover:underline"
                  >
                    +977-9705422317
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
