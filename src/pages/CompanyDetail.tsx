
import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ExternalLink, Facebook, Instagram, Linkedin, MapPin, Twitter, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Define a common interface for business and advertiser properties
interface BaseUserData {
  id: number;
  name: string;
  logo: string;
  website: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  rating: number;
  reviewCount: number;
  foundedYear: number;
  verified: boolean;
  premium: boolean;
  socialLinks: Record<string, string>;
}

// Business-specific properties
interface BusinessData extends BaseUserData {
  type: string;
  employeeCount: string;
  categories: string[];
  socialLinks: {
    facebook: string;
    linkedin: string;
    twitter: string;
    [key: string]: string;
  };
}

// Advertiser-specific properties
interface AdvertiserData extends BaseUserData {
  specialties: string[];
  portfolioImages: string[];
  socialLinks: {
    instagram: string;
    behance: string;
    dribbble: string;
    [key: string]: string;
  };
}

// Union type that represents either a business or an advertiser
type UserDataType = BusinessData | AdvertiserData;

// Helper function to check if the data is for a business
const isBusiness = (data: UserDataType): data is BusinessData => {
  return 'type' in data && 'categories' in data;
};

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();

  // Sample company data (in a real app, this would come from an API)
  const companyData: BusinessData = {
    id: 1,
    name: 'Діфоменко О. М.',
    type: 'ФОП',
    logo: 'https://placehold.co/100x100/jpeg',
    website: 'difomenko.com.ua',
    email: 'contact@difomenko.com.ua',
    phone: '+380 97 123 4567',
    location: 'Дніпро, Україна',
    description: 'Компанія Діфоменко О. М. спеціалізується на розробці бізнес-рішень для малого та середнього бізнесу. Наша команда з 15 спеціалістів має багаторічний досвід у створенні ефективних та інноваційних IT-рішень.',
    rating: 4.7,
    reviewCount: 23,
    foundedYear: 2015,
    employeeCount: '10-49',
    verified: true,
    premium: true,
    categories: ['IT', 'Software Development', 'Web Development'],
    socialLinks: {
      facebook: 'https://facebook.com/difomenko',
      linkedin: 'https://linkedin.com/company/difomenko',
      twitter: 'https://twitter.com/difomenko'
    }
  };

  // Sample data for advertiser
  const advertiserData: AdvertiserData = {
    id: 2,
    name: 'Марина Костенко',
    logo: 'https://placehold.co/100x100/jpeg',
    website: 'marinakostenko.design',
    email: 'marina.kostenko@design.ua',
    phone: '+380 50 987 6543',
    location: 'Київ, Україна',
    description: 'Професійний дизайнер і консультант з маркетингу з 5-річним досвідом у сфері реклами. Спеціалізуюсь на створенні ефективних візуальних комунікацій для брендів та маркетингових кампаній.',
    rating: 4.9,
    reviewCount: 31,
    foundedYear: 2018,
    verified: true,
    premium: false,
    specialties: ['Graphic Design', 'Brand Identity', 'Marketing Campaigns'],
    portfolioImages: [
      'https://placehold.co/800x600/jpeg',
      'https://placehold.co/800x600/jpeg',
      'https://placehold.co/800x600/jpeg',
      'https://placehold.co/800x600/jpeg'
    ],
    socialLinks: {
      instagram: 'https://instagram.com/marina.design',
      behance: 'https://behance.net/marina.kostenko',
      dribbble: 'https://dribbble.com/marina_kostenko'
    }
  };

  // Sample job listings for business
  const businessListings = [
    { id: 1, title: 'Front-end розробник', company: 'Діфоменко О. М., ФОП', location: 'Дніпро', experience: '2 роки', postedTime: '16 год. тому', isNew: true, progress: 6, categories: ['digital', 'social'] },
    { id: 2, title: 'Back-end розробник', company: 'Діфоменко О. М., ФОП', location: 'Дніпро', experience: '3 роки', postedTime: '2 дні тому', isNew: false, progress: 0, categories: ['digital', 'print'] },
    { id: 3, title: 'DevOps інженер', company: 'Діфоменко О. М., ФОП', location: 'Дніпро', experience: '4 роки', postedTime: '3 дні тому', isNew: false, progress: 0, categories: ['digital'] }
  ];

  // Sample portfolio for advertiser
  const advertiserPortfolio = [
    { id: 1, title: 'Рекламна кампанія для "Еко-маркет"', company: 'Еко-маркет', location: 'Київ', experience: '2 міс.', postedTime: '3 міс. тому', isNew: false, progress: 0, categories: ['print', 'outdoor'] },
    { id: 2, title: 'Брендинг для "Світоч"', company: 'Світоч', location: 'Львів', experience: '3 міс.', postedTime: '6 міс. тому', isNew: false, progress: 0, categories: ['digital', 'print'] },
    { id: 3, title: 'Дизайн упаковки "Моршинська"', company: 'Моршинська', location: 'Київ', experience: '1 міс.', postedTime: '8 міс. тому', isNew: false, progress: 0, categories: ['print'] }
  ];

  const userData = companyData !== null ? companyData : advertiserData;
  const listings = isBusiness(userData) ? businessListings : advertiserPortfolio;

  return (
    <div className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userData.logo} alt={userData.name} />
              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold">{userData.name}</h1>
              <p className="text-muted-foreground">
                {isBusiness(userData) ? userData.type : t('account.advertiser')}
              </p>
            </div>
          </div>
          {userData.premium && (
            <Badge variant="secondary">{t('account.premium')}</Badge>
          )}
        </div>

        {/* Company Details Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('company.aboutCompany')}</CardTitle>
            <CardDescription>{userData.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{userData.location}</span>
            </div>
            <div className="flex items-center">
              <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
              <a href={userData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {userData.website}
              </a>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{t('company.foundedIn')} {userData.foundedYear}</span>
            </div>
            {isBusiness(userData) && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{t('company.employeeCount')}: {userData.employeeCount}</span>
              </div>
            )}
            {isBusiness(userData) && userData.categories && (
              <div className="flex items-center">
                <span className="mr-2 text-muted-foreground">{t('company.categories')}:</span>
                <span>{userData.categories.join(', ')}</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            {userData.socialLinks && (
              <div className="flex space-x-4">
                {isBusiness(userData) && userData.socialLinks.facebook && (
                  <a href={userData.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-5 w-5 hover:text-primary" />
                  </a>
                )}
                {isBusiness(userData) && userData.socialLinks.linkedin && (
                  <a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5 hover:text-primary" />
                  </a>
                )}
                {isBusiness(userData) && userData.socialLinks.twitter && (
                  <a href={userData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5 hover:text-primary" />
                  </a>
                )}
                {!isBusiness(userData) && 'instagram' in userData.socialLinks && (
                  <a href={userData.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5 hover:text-primary" />
                  </a>
                )}
              </div>
            )}
          </CardFooter>
        </Card>

        {/* Listings Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {isBusiness(userData) ? t('company.jobListings') : t('company.portfolio')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card key={listing.id}>
                <CardHeader>
                  <CardTitle>{listing.title}</CardTitle>
                  <CardDescription>
                    {listing.company}, {listing.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{listing.experience}</p>
                  <p className="text-sm text-muted-foreground">{t('company.posted')} {listing.postedTime}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline">{t('company.viewDetails')}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Portfolio Section (Advertiser only) */}
        {!isBusiness(userData) && advertiserData.portfolioImages && advertiserData.portfolioImages.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">{t('company.portfolio')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advertiserData.portfolioImages.map((image, index) => (
                <img key={index} src={image} alt={`Portfolio ${index + 1}`} className="rounded-md" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;
