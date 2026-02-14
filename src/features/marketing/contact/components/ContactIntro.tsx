import { CONTACT_CONFIG } from '../../../../core/config/contactConfig';

export const ContactIntro: React.FC = () => (
  <div className="mb-10 text-center max-w-2xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
    <p className="text-gray-600 mb-8 text-lg">
      We’re here to help you with all your logistics and transport needs.
    </p>
    <ul className="flex flex-col gap-4 items-center bg-gray-50 py-6 px-8 rounded-2xl shadow-sm border border-gray-100">
      <li className="flex flex-col sm:flex-row gap-2 items-center text-gray-700">
        <strong className="text-primary font-bold">Address:</strong>
        <span>{CONTACT_CONFIG.address}</span>
      </li>
      <li className="flex flex-col sm:flex-row gap-2 items-center text-gray-700">
        <strong className="text-primary font-bold">Phone:</strong>
        <a
          href={`tel:${CONTACT_CONFIG.phoneDisplay.replace(/\s/g, '')}`}
          className="hover:text-primary transition-colors"
        >
          {CONTACT_CONFIG.phoneDisplay}
        </a>
      </li>
      <li className="flex flex-col sm:flex-row gap-2 items-center text-gray-700">
        <strong className="text-primary font-bold">Email:</strong>
        <a
          href={`mailto:${CONTACT_CONFIG.email}`}
          className="hover:text-primary transition-colors"
        >
          {CONTACT_CONFIG.email}
        </a>
      </li>
    </ul>
  </div>
);
