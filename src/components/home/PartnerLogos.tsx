"use client";
import React, { useEffect, useRef } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PartnerLogo {
  name: string;
  src: string;
  alt: string;
	href: string;
}

const PartnerLogos = () => {
  const { t } = useLanguage();

  const partnerLogos: PartnerLogo[] = [
    { name: "ATB", src: "/lovable-uploads/atb.svg", alt: "ATB Logo", href: "https://www.atbmarket.com" },
    { name: "Eva.ua", src: "/lovable-uploads/eva.svg", alt: "Eva.ua Logo", href: "https://eva.ua/ua/" },
    { name: "Nova Poshta", src: "/lovable-uploads/new-post.svg", alt: "Nova Poshta Logo", href: "https://novaposhta.ua/" },
    { name: "Prom", src: "/lovable-uploads/prom.svg", alt: "Prom Logo", href: "https://prom.ua/ua/" },
		{ name: "Step IT Academy", src: "/lovable-uploads/it-step.svg", alt: "Step IT Academy Logo", href: "https://itstep.org/uk" },
    { name: "U.WIN Protect", src: "/lovable-uploads/u-win.svg", alt: "U.WIN Protect Logo", href: "https://u-win.com.ua/" },
  ];

  const timer = useRef<ReturnType<typeof setInterval>>();
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    // dragFree: true,
    slides: {
      perView: 3.5,
      spacing: 24,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 2.8,
          spacing: 20,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 2.2,
          spacing: 16,
        },
      },
    },
    created(slider) {
      slider.moveToIdx(0, true);
    },
    defaultAnimation: {
      duration: 5000,
      easing: (t: number) => t, // Исправлено: используем функцию linear
    },
  });

  useEffect(() => {
    if (!slider) return;

    timer.current = setInterval(() => {
      if (slider.current) {
        slider.current.next();
      }
    }, 5000);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [slider]);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-display font-bold">
            {t('partners.title') || 'Trusted by Leading Companies'}
          </h3>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            {t('partners.description') || 'Join thousands of businesses who trust our platform for their advertising needs'}
          </p>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {partnerLogos.map((logo, index) => (
            <div key={index} className="keen-slider__slide flex items-center justify-center h-24 p-2">
              <a href={logo.href} target='blank'>
              	<img
	                src={logo.src}
	                alt={logo.alt}
	                className="max-h-16 max-w-full object-contain"
	              />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;