
import info1Img from '../../../../assets/img/info1.png';

const HowItWorks: React.FC = () => {
  return (
    <section className="pt-16 text-center">
      <h2 className="text-primary font-[550] mb-2">HOW IT WORKS</h2>

      <div className="h-10" />

      <div className="flex gap-7 justify-center items-center flex-wrap">
        <div className="bg-[#f6b434] text-[#111] w-[240px] h-[200px] pt-[18px] pb-4 px-4 rounded-[20px] flex flex-col items-center justify-start text-center gap-2 transition-all duration-200 hover:shadow-[10px_14px_0_0_#e0e0e0] hover:-translate-y-1 hover:scale-[1.03]">
          <div className="bg-white w-16 h-16 rounded-[20px] flex items-center justify-center mb-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <path d="M12 1L12 12" stroke="#f6b434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 8L12 12L18 8" stroke="#f6b434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 className="m-0 font-bold text-white text-base leading-[1.1] text-center whitespace-nowrap overflow-hidden text-ellipsis">Book Pickup</h4>
          <p className="m-0 text-white opacity-95 text-sm text-center mt-2">Call or message us.</p>
        </div>

        <div className="bg-[#f6b434] text-[#111] w-[240px] h-[200px] pt-[18px] pb-4 px-4 rounded-[20px] flex flex-col items-center justify-start text-center gap-2 transition-all duration-200 hover:shadow-[10px_14px_0_0_#e0e0e0] hover:-translate-y-1 hover:scale-[1.03]">
          <div className="bg-white w-16 h-16 rounded-[20px] flex items-center justify-center mb-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <path d="M3 7H21" stroke="#f6b434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 7V17C5 18.1046 5.89543 19 7 19H17C18.1046 19 19 18.1046 19 17V7" stroke="#f6b434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 className="m-0 font-bold text-white text-base leading-[1.1] text-center whitespace-nowrap overflow-hidden text-ellipsis">We Collect Your Goods</h4>
          <p className="m-0 text-white opacity-95 text-sm text-center mt-2">From your home or office.</p>
        </div>

        <div className="bg-[#f6b434] text-[#111] w-[240px] h-[200px] pt-[18px] pb-4 px-4 rounded-[20px] flex flex-col items-center justify-start text-center gap-2 transition-all duration-200 hover:shadow-[10px_14px_0_0_#e0e0e0] hover:-translate-y-1 hover:scale-[1.03]">
          <div className="bg-white w-16 h-16 rounded-[20px] flex items-center justify-center mb-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <path d="M3 12H21" stroke="#f6b434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 12L8 15L13 10L19 16" stroke="#f6b434" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 className="m-0 font-bold text-white text-base leading-[1.1] text-center whitespace-nowrap overflow-hidden text-ellipsis">Track & Receive</h4>
          <p className="m-0 text-white opacity-95 text-sm text-center mt-2">Delivered on time.</p>
        </div>
      </div>
      <div className="flex justify-center mt-[60px] -mb-px">
        <img src={info1Img} alt="Info" className="max-w-[900px] w-full h-auto block" />
      </div>
    </section>
  )
}

export default HowItWorks
