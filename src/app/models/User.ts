export interface Skill {
  name: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date?: string;
  description?: string;
}
export interface Categories {
  main: string | null;
  sub_categories: string[];
}
export interface GeneralInfo {
  first_name?: string;
  last_name?: string;
  phone?: string;
  country?: string;
  city?: string;
  profile_image?: string;
}

export interface User {
  _id?: string;

  email: string;
  password: string;
  role: string;
  created_at: string;
  earnings: number;
  current_step: number;
  signup_completed: boolean;
  payment_completed: boolean;

  general_info: GeneralInfo;

  professional_role: string | null;

  experiences: Experience[];

  education: Education[];

  skills: Skill[];
  suggestedSkills: Skill[];
  categories: Categories;

  languages: Language[];

  bio: string | null;

  cv_url: string | null;

  subscription_plan: string | null;
}
