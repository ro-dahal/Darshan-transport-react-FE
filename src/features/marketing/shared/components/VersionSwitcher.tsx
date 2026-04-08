import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Map of original routes ↔ v2 routes.
 * The switcher reads the current pathname and toggles to the corresponding version.
 */
const ROUTE_MAP: Record<string, string> = {
  '/': '/v2',
  '/v2': '/',
  '/about': '/about/v2',
  '/about/v2': '/about',
  '/services': '/services/v2',
  '/services/v2': '/services',
  '/contact': '/contact/v2',
  '/contact/v2': '/contact',
  '/faq': '/faq/v2',
  '/faq/v2': '/faq',
  '/get-quote': '/get-quote/v2',
  '/get-quote/v2': '/get-quote',
  '/order': '/order/v2',
  '/order/v2': '/order',
};

const V2_ROUTES = new Set([
  '/v2',
  '/about/v2',
  '/services/v2',
  '/contact/v2',
  '/faq/v2',
  '/get-quote/v2',
  '/order/v2',
]);

export const VersionSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const targetPath = ROUTE_MAP[pathname];

  // Only show the switcher on pages that have a v2 counterpart
  if (!targetPath) return null;

  const isV2 = V2_ROUTES.has(pathname);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="fixed bottom-6 left-6 z-[9999] flex items-center gap-3 bg-[#1a1a1a]/90 backdrop-blur-md text-white rounded-full pl-5 pr-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.25)] border border-white/10"
      >
        <span className="text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
          {isV2 ? 'V2' : 'V1'}
        </span>

        {/* Toggle track */}
        <button
          onClick={() => navigate(targetPath)}
          aria-label={`Switch to ${isV2 ? 'original' : 'v2'} version`}
          className="relative w-12 h-7 rounded-full cursor-pointer border-none p-0 transition-colors duration-300"
          style={{ backgroundColor: isV2 ? '#fcaf17' : '#555' }}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md"
            style={{ left: isV2 ? 'calc(100% - 25px)' : '1px' }}
          />
        </button>

        <span className="text-xs text-white/50 font-medium whitespace-nowrap pr-2">
          {isV2 ? 'Original' : 'New Look'}
        </span>
      </motion.div>
    </AnimatePresence>
  );
};
