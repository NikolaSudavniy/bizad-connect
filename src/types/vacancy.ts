
export interface VacancyType {
  id: number;
  title: string;
  company: string;
  location: string;
  experience?: string;
  salary?: string;
  postedTime: string;
  progress?: number;
  isNew?: boolean;
  categories: string[];
}
