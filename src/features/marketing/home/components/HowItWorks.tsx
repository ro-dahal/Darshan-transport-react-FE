import info1Img from '../../../../assets/img/optimized/info1.webp';
import bookPickupIcon from '../../../../assets/img/book pickup.png';
import weCollectYourGoodsIcon from '../../../../assets/img/we collect your goods.png';
import trackAndReceiveIcon from '../../../../assets/img/track and receive.png';

const HOW_IT_WORKS_STEPS = [
  {
    title: 'Book Pickup',
    description: 'Call or message us.',
    icon: bookPickupIcon,
  },
  {
    title: 'We Collect Your Goods',
    description: 'From your home or office.',
    icon: weCollectYourGoodsIcon,
  },
  {
    title: 'Track & Receive',
    description: 'Delivered on time.',
    icon: trackAndReceiveIcon,
  },
] as const;

const HowItWorks: React.FC = () => {
  return (
    <section className="pt-16 text-center">
      <h2 className="text-primary font-[550] mb-2">HOW IT WORKS</h2>

      <div className="h-10" />

      <div className="flex gap-7 justify-center items-center flex-wrap">
        {HOW_IT_WORKS_STEPS.map((step) => (
          <div
            key={step.title}
            className="bg-[#f6b434] text-[#111] w-[240px] h-[200px] pt-[18px] pb-4 px-4 rounded-[20px] flex flex-col items-center justify-start text-center gap-2 transition-all duration-200 hover:shadow-[10px_14px_0_0_#e0e0e0] hover:-translate-y-1 hover:scale-[1.03] max-sm:w-full max-sm:max-w-[280px]"
          >
            <div className="bg-white w-16 h-16 rounded-[20px] flex items-center justify-center mb-3 overflow-hidden">
              <img
                src={step.icon}
                alt=""
                loading="lazy"
                decoding="async"
                aria-hidden="true"
                className="w-full h-full object-contain"
              />
            </div>
            <h4 className="m-0 font-bold text-white text-base leading-[1.1] text-center whitespace-nowrap overflow-hidden text-ellipsis">
              {step.title}
            </h4>
            <p className="m-0 text-white opacity-95 text-sm text-center mt-2">
              {step.description}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-[60px] -mb-px">
        <img
          src={info1Img}
          alt="How It Works Info 1"
          loading="lazy"
          decoding="async"
          className="max-w-[900px] w-full h-auto block"
        />
      </div>
    </section>
  );
};

export default HowItWorks;
