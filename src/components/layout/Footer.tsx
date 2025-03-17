
import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-lg font-display font-medium">
              BizAd<span className="text-primary">Connect</span>
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              The most convenient platform for business and advertising interactions.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Platform
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Browse Ads</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Post an Ad</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Success Stories</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Support
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BizAdConnect. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Instagram
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
