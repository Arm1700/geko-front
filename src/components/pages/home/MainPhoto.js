import {useTranslation} from 'react-i18next';

export default function MainPhoto({ image, text1, text2 }) {
  const {t} = useTranslation()

  return (
    <section className="h-[80vh]  flex uppercase justify-center flex-col text-pseudo px-20 relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 min-w-full min-h-full object-cover"
        // playsinline=""
        // class="mui-1se970o-video"
        // controls=""
        // data-automation="VideoPlayer"
        // height="100%"
        // loop=""
        // muted=""
        // autoplay=""
        // width="100%"
        poster="https://www.shutterstock.com/shutterstock/videos/1093083365/thumb/9.jpg?ip=x480"
        // preload="auto"
        // aria-label="video-player"
        // controlslist="nodownload"
      >
        <source
          src={image}
          type="video/webm"
        />
     
      </video>
      <div className="relative z-10">
        <h5 className="font-roboto-slab text-white no-underline whitespace-no-wrap min-h-0 min-w-0 text-left leading-60 tracking-normal font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl w-[800px] backdrop-filter-none filter-none transform-origin-center opacity-100 translate-x-0 translate-y-0 visible">{t(text1)}</h5>
        <h1 className="font-roboto-slab text-white no-underline whitespace-no-wrap min-h-0 min-w-0 text-left leading-60 tracking-normal font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl w-[800px] backdrop-filter-none filter-none transform-origin-center opacity-100 translate-x-0 translate-y-0 visible">
          {t(text2)}
        </h1>
      </div>
    </section>

    //   <section style={backgroundImageStyle} className="h-[80vh] bg-no-repeat bg-cover bg-primary flex uppercase justify-center flex-col text-pseudo px-20 ">
    //     <h5 className="text-bold  sm:text-xl mb-5">{text1}</h5>
    //     <h1 className=" font-roboto-slab h-auto w-auto text-white no-underline whitespace-no-wrap min-h-0 min-w-0 text-left leading-60 tracking-normal font-bold  text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl  backdrop-filter-none filter-none transform-origin-center opacity-100 translate-x-0 translate-y-0 visible">{text2}</h1>
    //   </section>
  );
}
