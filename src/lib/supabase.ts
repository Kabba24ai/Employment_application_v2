import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface Position {
  id: string;
  title: string;
  description: string | null;
  category: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface StoreHour {
  id: string;
  day_of_week: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
  day_order: number;
  created_at: string;
}

export interface Application {
  id: string;
  store_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zip_code: string;
  positions: string[];
  start_date: string;
  desired_pay: string | null;
  available_days: string[];
  location_flexibility: string | null;
  reliable_transportation: boolean;
  work_experience: string | null;
  mechanical_experience: string | null;
  equipment_exposure: string[] | null;
  equipment_repair: string[] | null;
  equipment_operated: string[] | null;
  diagnostic_ability: string | null;
  hydraulics_comfort: string | null;
  equipment_care: string | null;
  customer_facing: string | null;
  drug_test_consent: boolean;
  license_type: string | null;
  trailer_experience: string[] | null;
  license_state: string | null;
  moving_violations: string | null;
  dui_dwi: string | null;
  license_suspended: string | null;
  can_be_insured: string | null;
  driving_notes: string | null;
  computer_skills: string[] | null;
  computer_skill_level: string | null;
  systems_used: string[] | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SiteContent {
  id: string;
  section_key: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface MechanicalAptitudeQuestion {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DrivingRecordQuestion {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ComputerLiteracyQuestion {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
