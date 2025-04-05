
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ExternalLink, Facebook, Instagram, Linkedin, MapPin, Twitter, User, ArrowLeft, Star } from 'lucide-react';
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
  const navigate = useNavigate();

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

  const userData = id?.includes('advertiser') ? advertiserData : companyData;
  const listings = isBusiness(userData) ? businessListings : advertiserPortfolio;

  // Function to render star rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }

    return stars;
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="py-12 px-6 bg-black text-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6 text-white hover:bg-gray-800"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </Button>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userData.logo} alt={userData.name} />
              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold">{userData.name}</h1>
              <p className="text-gray-400">
                {isBusiness(userData) ? userData.type : t('account.advertiser')}
              </p>
            </div>
          </div>
          {userData.premium && (
            <Badge variant="secondary" className="bg-gray-800 text-white">
              {t('account.premium')}
            </Badge>
          )}
        </div>

        {/* Company Details Section */}
        <Card className="mb-8 bg-gray-900 border-gray-800 text-white">
          <CardHeader>
            <CardTitle>{t('company.aboutCompany')}</CardTitle>
            <CardDescription className="text-gray-300">{userData.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span>{userData.location}</span>
            </div>
            <div className="flex items-center">
              <ExternalLink className="h-4 w-4 mr-2 text-gray-400" />
              <a href={`https://${userData.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-400">
                {userData.website}
              </a>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span>{t('company.foundedIn')} {userData.foundedYear}</span>
            </div>
            {isBusiness(userData) && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                <span>{t('company.employeeCount')}: {userData.employeeCount}</span>
              </div>
            )}
            {isBusiness(userData) && userData.categories && (
              <div className="flex items-center">
                <span className="mr-2 text-gray-400">{t('company.categories')}:</span>
                <div className="flex flex-wrap gap-1">
                  {userData.categories.map((category, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-800 border-gray-700">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {/* Rating display */}
            <div className="flex items-center mt-2">
              <div className="flex items-center mr-2">
                {renderRating(userData.rating)}
              </div>
              <span className="font-medium">{userData.rating.toFixed(1)}</span>
              <span className="ml-2 text-gray-400">({userData.reviewCount} {t('common.reviews')})</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t border-gray-800 pt-4">
            {userData.socialLinks && (
              <div className="flex space-x-4">
                {isBusiness(userData) && userData.socialLinks.facebook && (
                  <a href={userData.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-5 w-5 hover:text-blue-400" />
                  </a>
                )}
                {isBusiness(userData) && userData.socialLinks.linkedin && (
                  <a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5 hover:text-blue-400" />
                  </a>
                )}
                {isBusiness(userData) && userData.socialLinks.twitter && (
                  <a href={userData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5 hover:text-blue-400" />
                  </a>
                )}
                {!isBusiness(userData) && 'instagram' in userData.socialLinks && (
                  <a href={userData.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5 hover:text-blue-400" />
                  </a>
                )}
              </div>
            )}
          </CardFooter>
        </Card>

        {/* Listings Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {isBusiness(userData) ? t('company.jobListings') : t('company.portfolio')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card key={listing.id} className="bg-gray-900 border-gray-800 text-white">
                <CardHeader>
                  <CardTitle className="text-lg">{listing.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {listing.company}, {listing.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{listing.experience}</p>
                  <p className="text-sm text-gray-400">{t('company.posted')} {listing.postedTime}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" className="border-gray-700 bg-gray-800 hover:bg-gray-700">
                    {t('company.viewDetails')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Portfolio Section (Advertiser only) */}
        {!isBusiness(userData) && advertiserData.portfolioImages && advertiserData.portfolioImages.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">{t('company.portfolioImages')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {advertiserData.portfolioImages.map((image, index) => (
                <img key={index} src={image} alt={`Portfolio ${index + 1}`} className="rounded-md shadow-md w-full" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;
