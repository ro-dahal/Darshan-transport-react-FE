import React from 'react';
import type { OfficeRow } from '../data/contactDirectory';

type DirectoryType = 'booking' | 'delivery';

export interface ContactDirectoryTableProps {
  title: string;
  type: DirectoryType;
  offices: OfficeRow[];
  selected: OfficeRow;
  isActive: boolean;
  onSelect(row: OfficeRow, type: DirectoryType): void;
}

export const ContactDirectoryTable: React.FC<ContactDirectoryTableProps> = ({
  title,
  type,
  offices,
  selected,
  isActive,
  onSelect,
}) => (
  <div className="contact-table-wrapper">
    <h3>{title}</h3>
    <p className="table-instruction">Click on any location below to view it on the map</p>
    <table className="contact-table contact-table--responsive">
      <thead>
        <tr>
          <th>S.no.</th>
          <th>Office</th>
          <th>Address</th>
          <th>Contact</th>
        </tr>
      </thead>
      <tbody>
        {offices.map((row) => (
          <tr
            key={row.sn}
            className={`location-row${isActive && row.sn === selected.sn ? ' selected' : ''}`}
            tabIndex={0}
            role="button"
            aria-label={`View ${row.address} on map`}
            onClick={() => onSelect(row, type)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                onSelect(row, type);
              }
            }}
          >
            <td>{row.sn}.</td>
            <td>{row.office}</td>
            <td>{row.address}</td>
            <td>{row.contact}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
