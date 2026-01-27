/*
  # Create Job Application System Tables

  1. New Tables
    - `stores`
      - `id` (uuid, primary key)
      - `name` (text) - Store name
      - `address` (text) - Street address
      - `city` (text) - City
      - `state` (text) - State abbreviation
      - `zip` (text) - ZIP code
      - `phone` (text) - Contact phone
      - `email` (text) - Contact email
      - `is_active` (boolean) - Whether accepting applications
      - `display_order` (integer) - Sort order for display
      - `created_at` (timestamptz) - Creation timestamp
    
    - `positions`
      - `id` (uuid, primary key)
      - `title` (text) - Position title
      - `description` (text, nullable) - Position description
      - `category` (text) - Position category
      - `is_active` (boolean) - Whether position is available
      - `display_order` (integer) - Sort order for display
      - `created_at` (timestamptz) - Creation timestamp
    
    - `store_hours`
      - `id` (uuid, primary key)
      - `day_of_week` (text) - Day name
      - `open_time` (text, nullable) - Opening time
      - `close_time` (text, nullable) - Closing time
      - `is_closed` (boolean) - Whether closed that day
      - `day_order` (integer) - Day sort order
      - `created_at` (timestamptz) - Creation timestamp
    
    - `applications`
      - `id` (uuid, primary key)
      - `store_id` (uuid, nullable, foreign key to stores)
      - Personal information fields
      - Position and availability fields
      - Experience and skills fields
      - Driving record fields
      - Computer skills fields
      - `status` (text) - Application status
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on all tables
    - Public read access for stores, positions, and store_hours
    - Public insert access for applications (anonymous job submissions)
    - No update/delete access for public users
*/

-- Create stores table
CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create positions table
CREATE TABLE IF NOT EXISTS positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create store_hours table
CREATE TABLE IF NOT EXISTS store_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week text NOT NULL,
  open_time text,
  close_time text,
  is_closed boolean DEFAULT false,
  day_order integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid REFERENCES stores(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  positions text[] DEFAULT '{}',
  start_date text,
  desired_pay text,
  available_days text[] DEFAULT '{}',
  location_flexibility text,
  reliable_transportation boolean DEFAULT false,
  work_experience text,
  mechanical_experience text,
  equipment_exposure text[],
  equipment_repair text[],
  equipment_operated text[],
  diagnostic_ability text,
  hydraulics_comfort text,
  equipment_care text,
  customer_facing text,
  drug_test_consent boolean DEFAULT false,
  license_type text,
  trailer_experience text[],
  license_state text,
  moving_violations text,
  dui_dwi text,
  license_suspended text,
  can_be_insured text,
  driving_notes text,
  computer_skills text[],
  computer_skill_level text,
  systems_used text[],
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for stores (public read access)
CREATE POLICY "Anyone can view active stores"
  ON stores FOR SELECT
  USING (true);

-- RLS Policies for positions (public read access)
CREATE POLICY "Anyone can view active positions"
  ON positions FOR SELECT
  USING (true);

-- RLS Policies for store_hours (public read access)
CREATE POLICY "Anyone can view store hours"
  ON store_hours FOR SELECT
  USING (true);

-- RLS Policies for applications (public insert only)
CREATE POLICY "Anyone can submit applications"
  ON applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view applications"
  ON applications FOR SELECT
  TO authenticated
  USING (true);