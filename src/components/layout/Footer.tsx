
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-lg font-display font-medium">
              BizAd<span className="text-primary">Connect</span>
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t('footer.description')}
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {t('footer.platform')}
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t('footer.platform.browse')}</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t('footer.platform.post')}</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t('footer.platform.pricing')}</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t('footer.platform.stories')}</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t('footer.company.about')}</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t('footer.company.careers')}</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t('footer.company.blog')}</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t('footer.company.press')}</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {t('footer.support')}
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t('footer.support.help')}</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t('footer.support.contact')}</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t('footer.support.privacy')}</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">{t('footer.support.terms')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright').replace('{year}', currentYear.toString())}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.social.twitter')}
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.social.linkedin')}
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.social.instagram')}
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.social.facebook')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
