// components/CompactSlider.jsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import img1 from '../../public/img/carousel1.jpg'; // YOUR IMAGE

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    title: 'Elegance Redefined',
    subtitle: 'Premium fabrics that speak luxury',
    description: 'Where timeless elegance meets contemporary design',
  },
  {
    id: 2,
    image: img1, // YOUR IMPORTED IMAGE HERE
    title: 'Style Elevated',
    subtitle: 'Crafted for the modern individual',
    description: 'Experience comfort wrapped in sophistication',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    title: 'Fashion Forward',
    subtitle: 'Trendsetting collections for every occasion',
    description: 'Your journey to impeccable style begins here',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1558769132-cb1c458e4222?w=1920&q=80',
    title: 'Artisanal Craftsmanship',
    subtitle: 'Handcrafted with precision and passion',
    description: 'Every stitch tells a story of excellence',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1920&q=80',
    title: 'Sustainable Fashion',
    subtitle: 'Eco-friendly fabrics, ethical production',
    description: 'Style that cares for people and planet',
  },
];

const CompactSlider = ({ height = 'h-[460px]', maxWidth = 'max-w-7xl' }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const nextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className={`relative mx-auto ${maxWidth} ${height} overflow-hidden group mt-3`}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        loop={true}
        navigation={false}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={typeof slide.image === 'string' ? slide.image : slide.image.src}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
              </div>
              
              {/* Main Content - Centered */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
                {/* Main Title - Elegant Styling */}
                <div className="mb-8">
                  <h1 className="text-5xl md:text-6xl font-light text-white tracking-widest mb-4 animate-fadeIn">
                    HT-GARMENTS
                  </h1>
                  <div className="h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6" />
                </div>
                
                {/* Beautiful Sentence - Different for each slide */}
                <div className="max-w-2xl mx-auto">
                  <p className="text-xl md:text-2xl text-white/95 font-serif italic mb-6 animate-fadeInUp delay-100">
                    "{slide.description}"
                  </p>
                  
                  {/* Slide-specific content */}
                  <div className="animate-fadeInUp delay-200">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-8 left-8 z-10">
                <div className="text-white/80 text-sm tracking-widest font-light">
                  PREMIUM COLLECTION
                </div>
              </div>
              
              <div className="absolute bottom-8 right-8 z-10">
                <div className="text-white/80 text-sm tracking-widest font-light">
                  SINCE 2024
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows - Elegant Styling */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/20"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-white/20"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicator Dots - Minimal */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideTo(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              swiperRef.current?.realIndex === index 
                ? 'w-6 bg-white' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Add these styles to your global CSS for animations
const styles = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out;
}

.delay-100 {
  animation-delay: 100ms;
}

.delay-200 {
  animation-delay: 200ms;
}

.swiper-slide-active .animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}

.swiper-slide-active .animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out;
}
`;

export default CompactSlider;