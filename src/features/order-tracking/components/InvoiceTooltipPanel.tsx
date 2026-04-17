import React from 'react';

type InvoiceTooltipPanelProps = {
  imageMaxHeight: number;
  imageSrc: string;
};

export const InvoiceTooltipPanel: React.FC<InvoiceTooltipPanelProps> = ({
  imageMaxHeight,
  imageSrc,
}) => (
  <div className="overflow-hidden rounded-xl border border-black/5 bg-white p-1 shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
    <img
      src={imageSrc}
      alt="Darshan Transport invoice sample showing where the invoice number is located"
      className="block h-auto w-full max-w-full rounded-[0.65rem]"
      style={{ maxHeight: imageMaxHeight }}
      loading="lazy"
    />
  </div>
);
