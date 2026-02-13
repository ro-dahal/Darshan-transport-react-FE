import React from 'react';

const CtaSection: React.FC = () => (
  <section className="bg-primary text-white text-center py-12 pb-14 mt-8 relative">
    <h2 className="text-[2rem] font-bold mb-8">Ready for faster, smoother logistics?</h2>
    <div className="flex justify-center gap-6 flex-wrap">
      <a href="/get-quote" className="bg-white text-primary font-semibold py-4 px-8 rounded-lg no-underline text-[1.1rem] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-colors duration-200 border-2 border-primary hover:bg-[#c98300] hover:text-white">Get a Quote</a>
      <a href="/contact" className="bg-white text-primary font-semibold py-4 px-8 rounded-lg no-underline text-[1.1rem] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-colors duration-200 border-none hover:bg-[#c98300] hover:text-white">Contact Us</a>
      <a href="tel:+9779809991233" className="bg-white text-primary font-semibold py-4 px-8 rounded-lg no-underline text-[1.1rem] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-colors duration-200 border-none hover:bg-[#c98300] hover:text-white">Call Now</a>
    </div>
  </section>
);

export default CtaSection;
