export type Skill = string;

export interface Language {
  language: string;
  proficiency: string;
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  currently:boolean;
  startDate: string;
  endDate?: string;
  description?:string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  country?:string;
  description?: string;
  currentlyInRole?:boolean;

}

export interface CategoryMain {
  id: number;
  name: string;
  open?: boolean;
}

export interface Categories {
  main: CategoryMain | null;
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

export interface SubscriptionPlan {
  name: string;
  billing: string;
  autoRenew: boolean;
  [key: string]: any;
}

export interface User {
  _id?: string;

  email: string;
  password?: string;
  role: string;
  created_at?: string;
  earnings?: number;
  current_step?: number;
  signup_completed?: boolean;
  payment_completed?: boolean;

  general_info?: GeneralInfo;

  professional_role?: string | null;

  experience  ?: Experience[];

  education?: Education[];

  skills?: Skill[];
  suggestedSkills?: Skill[];
  categories?: Categories;

  languages?: Language[];

  bio?: string | null;

  cv_url?: string | null;

  subscription_plan?: SubscriptionPlan | null;
}
