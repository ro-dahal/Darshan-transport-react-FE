import React from 'react';
import { useNavigate } from 'react-router-dom';

const locations = [
  {
    city: 'Kathmandu',
    area: 'PepsiCola',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    city: 'Pokhara',
    area: 'Ramghat',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
  },
  {
    city: 'Chitwan',
    area: 'Beltadi - 2',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
  },
  {
    city: 'Hetauda',
    area: 'Hupra Chour-4',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
];


export const OfficeLocationsSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="mt-16 flex flex-col items-center px-4">
      <h2 className="text-center text-3xl font-bold mb-10 text-[#222] max-md:text-2xl">
        We are pleased to have an in-person conversation if you are<br className="max-md:hidden" />
        near any of our office sites.
      </h2>
      <div className="flex gap-8 justify-center mb-8 flex-wrap max-lg:gap-5 max-md:flex-col max-md:items-center">
        {locations.map((loc) => (
          <div
            className="w-[260px] h-[300px] rounded-[10px] bg-cover bg-center relative overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.08)] flex items-end transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.16)] max-lg:w-[210px] max-lg:h-[240px]"
            key={loc.city + loc.area}
            style={{ backgroundImage: `url(${loc.image})` }}
          >
            <div className="w-full pt-6 px-4 pb-5 bg-gradient-to-t from-black/70 to-black/10 text-white flex flex-col items-start">
              <span className="text-[1.1rem] font-medium opacity-85">{loc.city}</span>
              <span className="text-2xl font-bold mt-1">{loc.area}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <span className="inline-block w-3 h-3 rounded-full bg-[#222] mx-1"></span>
      </div>
      <div className="mb-8">
        <button
          className="py-3 px-9 text-[1.1rem] border-2 border-[#222] bg-white text-[#222] rounded-md cursor-pointer font-medium transition-colors duration-200 hover:bg-[#222] hover:text-white"
          onClick={() => navigate('/get-quote')}
        >
          View All Locations
        </button>
      </div>
    </section>
  );
};
