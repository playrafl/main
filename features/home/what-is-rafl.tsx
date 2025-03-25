import { KingWIRLgImg, KingWIRSmImg } from "@/assets/Images";
import ImageComp from "@/components/Image";

const WhatIsRaf = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-center w-full h-[800px] md:h-[600px] pt-[42px] md:pt-[94px] gap-y-[38px] gap-x-10 lg:gap-x-16 bg-rafl_violet-950 px-6 relative">
      <div className="h-fit relative">
        <h1 className="text-[96px] leading-[90px] md:text-[110px] lg:text-[144px] lg:leading-[130px] font-black text-rafl_violet-50 tracking-[-3px]">
          what
          <br />
          is rafl
        </h1>
        <ImageComp
          src={KingWIRLgImg}
          alt="KingWIRLgImg"
          className="absolute right-12 top-[calc(100%-35%)] hidden md:flex"
        />
      </div>
      <div className="flex flex-col w-full md:w-[340px] lg:w-[398px] gap-y-6 text-xl leading-6 lg:text-2xl lg:leading-7 font-bold text-rafl_violet-50">
        <p>
          Rafl is an online community where users pool their money and the
          winner takes all!
        </p>
        <p>
          You can choose how to play - either play daily games to win cash or
          sign up for a monthly subscription to win BIG!
        </p>
        <p>Monthly subscription of only $10 can win you $10,000</p>
      </div>
      <ImageComp
        src={KingWIRSmImg}
        alt="KingWIRSmImg"
        className="absolute right-0 bottom-0 md:hidden"
      />
    </div>
  );
};

export default WhatIsRaf;
