import React from 'react';

export interface OrderLocationSelectorProps {
  seriesList: string[];
  selectedSeries: string;
  onSelect(series: string): void;
}

export const OrderLocationSelector: React.FC<OrderLocationSelectorProps> = ({ seriesList, selectedSeries, onSelect }) => (
  <section className="border border-[#ddd] rounded-md p-4 mb-5 bg-white shadow-sm">
    <h3 className="text-primary m-0 text-lg font-bold">Location</h3>
    <div className="mt-2.5 flex items-center">
      <label htmlFor="series" className="font-medium text-gray-700">Select Location: </label>
      <select
        id="series"
        value={selectedSeries}
        onChange={(event) => onSelect(event.target.value)}
        className="p-1.5 ml-1.5 border border-[#ccc] rounded text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      >
        {seriesList.map((series) => (
          <option key={series} value={series}>
            {series}
          </option>
        ))}
      </select>
    </div>
  </section>
);
