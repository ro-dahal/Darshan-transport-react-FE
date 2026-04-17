export const FOOTER_LAYOUT_CLASSES = {
  grid: 'grid gap-y-12 gap-x-10 grid-cols-[auto_1fr] md:grid-cols-12 md:gap-x-12',
  brand: 'col-span-2 md:col-span-5',
  company: 'col-span-1 md:col-start-6 md:col-span-2',
  contact:
    'col-span-1 md:col-start-9 md:col-span-4 md:w-full md:justify-self-end',
} as const;

export const FOOTER_BRAND_COPY_CLASS =
  'text-sm leading-relaxed text-white/50 max-w-xs mb-6 text-justify' as const;
