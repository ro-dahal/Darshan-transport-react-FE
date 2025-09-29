import React from 'react';

export interface OrderLocationSelectorProps {
  seriesList: string[];
  selectedSeries: string;
  onSelect(series: string): void;
}

export const OrderLocationSelector: React.FC<OrderLocationSelectorProps> = ({ seriesList, selectedSeries, onSelect }) => (
  <section
    style={{
      border: '1px solid #ddd',
      borderRadius: 6,
      padding: 16,
      marginBottom: 20,
      background: '#fff',
    }}
  >
    <h3 style={{ color: '#fcaf17', margin: 0 }}>Location</h3>
    <div style={{ marginTop: 10 }}>
      <label htmlFor="series">Select Location: </label>
      <select
        id="series"
        value={selectedSeries}
        onChange={(event) => onSelect(event.target.value)}
        style={{
          padding: 6,
          marginLeft: 5,
          border: '1px solid #ccc',
          borderRadius: 4,
        }}
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
