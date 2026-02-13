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
  <div className="bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-6 mb-8 max-md:p-4">
    <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
    <p className="text-sm text-gray-500 mb-4 italic">Click on any location below to view it on the map</p>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse max-md:min-w-full max-md:block">
        <thead className="max-md:hidden">
          <tr className="bg-gray-50 border-b border-gray-200 text-left">
            <th className="py-3 px-4 font-semibold text-gray-700 w-[60px]">S.no.</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Office</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Address</th>
            <th className="py-3 px-4 font-semibold text-gray-700">Contact</th>
          </tr>
        </thead>
        <tbody className="max-md:block">
          {offices.map((row) => (
            <tr
              key={row.sn}
              className={`border-b border-gray-100 cursor-pointer transition-colors duration-200 hover:bg-yellow-50 max-md:block max-md:p-4 max-md:border-b-4 max-md:border-gray-50 ${isActive && row.sn === selected.sn ? 'bg-primary/10 border-l-4 border-l-primary' : ''}`}
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
              <td className="py-3 px-4 text-gray-600 max-md:block max-md:px-0 max-md:py-1 max-md:font-bold max-md:before:content-['S.no:'] max-md:before:font-medium max-md:before:mr-2 max-md:before:text-gray-400 max-md:hidden">{row.sn}.</td>
              <td className="py-3 px-4 font-medium text-gray-800 max-md:block max-md:px-0 max-md:py-1 max-md:before:content-['Office:'] max-md:before:font-medium max-md:before:mr-2 max-md:before:text-gray-400">{row.office}</td>
              <td className="py-3 px-4 text-gray-600 max-md:block max-md:px-0 max-md:py-1 max-md:before:content-['Address:'] max-md:before:font-medium max-md:before:mr-2 max-md:before:text-gray-400">{row.address}</td>
              <td className="py-3 px-4 text-gray-600 font-mono max-md:block max-md:px-0 max-md:py-1 max-md:before:content-['Contact:'] max-md:before:font-medium max-md:before:mr-2 max-md:before:text-gray-400">{row.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
