
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PartnerLogo {
  name: string;
  src: string;
  alt: string;
}

const PartnerLogos = () => {
  const { t } = useLanguage();
  const [containerWidth, setContainerWidth] = useState(0);
  
  const partnerLogos: PartnerLogo[] = [
    {
      name: "ATB",
      src: "/lovable-uploads/67faa87f-a66b-406b-a2a8-2fee270384fb.png",
      alt: "ATB Logo"
    },
    {
      name: "E.va.ua",
      src: "/lovable-uploads/00f1962b-063e-44ab-9a41-3bc5fa13845a.png",
      alt: "E.va.ua Logo"
    },
    {
      name: "Step IT Academy",
      src: "/lovable-uploads/c68c6150-03ef-4d37-ae50-7d2c80bc6d75.png",
      alt: "Step IT Academy Logo"
    },
    {
      name: "Nova Poshta",
      src: "/lovable-uploads/7370d3f7-cae2-4cee-b8c6-0fbf32cf57ca.png",
      alt: "Nova Poshta Logo"
    },
    {
      name: "Prom",
      src: "/lovable-uploads/ee02d6e6-903e-45aa-a11b-5df495e12834.png",
      alt: "Prom Logo"
    },
    {
      name: "U.WIN Protect",
      src: "/lovable-uploads/4faf388a-43e4-41e8-8d3f-917c878f4eaf.png",
      alt: "U.WIN Protect Logo"
    }
  ];

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

        <div className="w-full overflow-hidden relative">
          <div className="logos-slide animate-marquee">
            {/* First set of logos */}
            {partnerLogos.map((logo, index) => (
              <div key={index} className="logo-item">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="max-h-16 max-w-full object-contain"
                />
              </div>
            ))}
            {/* Duplicate logos for seamless loop effect */}
            {partnerLogos.map((logo, index) => (
              <div key={`dup-${index}`} className="logo-item">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="max-h-16 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
