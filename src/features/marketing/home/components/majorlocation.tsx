import React from 'react';
import { MAJOR_LOCATIONS } from '../data/homeContent';

const MajorLocation: React.FC = () => {
  return (
    <section className="bg-[#6e6e6e] py-14 px-5 text-white text-center">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-center text-primary tracking-[1px] font-light text-[25px] leading-[1.2] mb-1.5">
          WE DELIVER ACROSS NEPAL
        </h2>
        <h3 className="text-center text-primary mb-9 text-[25px] font-bold">
          FROM MAJOR CITIES TO REMOTE TOWNS
        </h3>

        <div className="flex justify-center gap-[50px] flex-wrap">
          {MAJOR_LOCATIONS.map((column, colIdx) => (
            <ul
              key={colIdx}
              className="list-none p-0 m-0 text-left min-w-[200px]"
            >
              {column.map((loc, locIdx) => (
                <li key={locIdx} className="mb-3.5">
                  {' '}
                  - {loc}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MajorLocation;
