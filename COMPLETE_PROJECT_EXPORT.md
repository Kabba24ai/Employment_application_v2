# Employment Application System - Complete Project Export

**Project Name:** Rent 'n King Employment Application System
**Version:** 0.0.0
**Last Updated:** January 21, 2026

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Environment Setup](#environment-setup)
5. [Database Schema](#database-schema)
6. [Application Architecture](#application-architecture)
7. [Source Code](#source-code)
8. [Admin Features](#admin-features)
9. [Deployment Instructions](#deployment-instructions)

---

## Project Overview

This is a full-stack employment application system built for Rent 'n King. The application allows job seekers to submit employment applications online and provides administrators with tools to manage applications, stores, positions, and site content.

### Key Features

**Public-Facing:**
- Multi-step employment application form
- Store selection and position preferences
- Conditional questions based on position type (mechanical, driving, computer literacy)
- Responsive design for mobile and desktop

**Admin Dashboard:**
- Secure authentication
- Application management (view, filter, update status)
- Store management
- Position management
- Store hours configuration
- Site content management (CMS)
- Dynamic question management for assessments

---

## Technology Stack

### Frontend
- **Framework:** React 18.3.1 with TypeScript
- **Build Tool:** Vite 5.4.2
- **Routing:** React Router DOM 7.11.0
- **Styling:** Tailwind CSS 3.4.1
- **Icons:** Lucide React 0.344.0

### Backend & Database
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (email/password)
- **ORM:** @supabase/supabase-js 2.57.4

### Development Tools
- **TypeScript:** 5.5.3
- **ESLint:** 9.9.1
- **PostCSS:** 8.4.35
- **Autoprefixer:** 10.4.18

---

## Project Structure

```
project/
├── src/
│   ├── pages/               # React page components
│   │   ├── AdminLogin.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminList.tsx
│   │   ├── AdminDetail.tsx
│   │   ├── AdminStores.tsx
│   │   ├── AdminPositions.tsx
│   │   ├── AdminStoreHours.tsx
│   │   ├── AdminSiteContent.tsx
│   │   ├── AdminMechanicalAptitude.tsx
│   │   ├── AdminDrivingRecord.tsx
│   │   └── AdminComputerLiteracy.tsx
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx
│   ├── lib/                 # Utility libraries
│   │   └── supabase.ts
│   ├── App.tsx              # Main application form (27,798 lines)
│   ├── Router.tsx           # Application routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── supabase/
│   └── migrations/          # Database migrations (15 files)
├── .env                     # Environment variables
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── index.html               # HTML entry point
```

---

## Environment Setup

### Environment Variables (.env)

```
VITE_SUPABASE_URL=https://ntycwarlruvtkambbkyu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50eWN3YXJscnV2dGthbWJia3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NDM4NjEsImV4cCI6MjA4NDQxOTg2MX0.BhOGvK5DfZJKs2sI7LUFyfRzTEkmEGVlNAJ90ub46JE
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npm run typecheck
```

### Dependencies (package.json)

```json
{
  "name": "vite-react-typescript-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit -p tsconfig.app.json"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.57.4",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.11.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

---

## Database Schema

The database consists of 8 main tables with Row Level Security (RLS) enabled on all tables.

### Tables Overview

1. **stores** - Store locations
2. **positions** - Available job positions
3. **store_hours** - Store operating hours
4. **applications** - Employment applications
5. **site_content** - Dynamic CMS content
6. **mechanical_aptitude_questions** - Assessment questions
7. **driving_record_questions** - Assessment questions
8. **computer_literacy_questions** - Assessment questions

### Complete Database Migrations

#### Migration 1: Create Stores and Positions Tables (20260119175728)

```sql
/*
  # Create Stores and Positions Tables

  1. New Tables
    - `stores`
      - `id` (uuid, primary key)
      - `name` (text, store name)
      - `address` (text, street address)
      - `city` (text, city name)
      - `state` (text, state abbreviation)
      - `zip` (text, zip code)
      - `phone` (text, phone number)
      - `email` (text, email address)
      - `created_at` (timestamp)

    - `positions`
      - `id` (uuid, primary key)
      - `title` (text, position title)
      - `description` (text, optional description)
      - `category` (text, position category)
      - `is_active` (boolean, whether position is active)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to insert, update, delete
*/

CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read stores"
  ON stores FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert stores"
  ON stores FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update stores"
  ON stores FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete stores"
  ON stores FOR DELETE TO authenticated USING (true);

CREATE POLICY "Anyone can read active positions"
  ON positions FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert positions"
  ON positions FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update positions"
  ON positions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete positions"
  ON positions FOR DELETE TO authenticated USING (true);
```

#### Migration 2: Create Store Hours (20260119175726)

```sql
/*
  # Create Store Hours Table

  1. New Tables
    - `store_hours`
      - `id` (uuid, primary key)
      - `day_of_week` (text, day name)
      - `open_time` (text, opening time)
      - `close_time` (text, closing time)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `store_hours` table
    - Add policy for public read access
    - Add policies for authenticated users to insert, update, delete
*/

CREATE TABLE IF NOT EXISTS store_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week text NOT NULL,
  open_time text NOT NULL,
  close_time text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE store_hours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read store hours"
  ON store_hours FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert store hours"
  ON store_hours FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update store hours"
  ON store_hours FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete store hours"
  ON store_hours FOR DELETE TO authenticated USING (true);
```

#### Migration 3: Create Applications Table (20260119175730)

```sql
/*
  # Create Applications Table

  1. New Tables
    - `applications`
      - `id` (uuid, primary key)
      - `store_id` (uuid, foreign key to stores)
      - Personal information fields (first_name, last_name, email, phone, city, state, zip_code)
      - Job preferences (positions array, start_date, desired_pay, available_days array)
      - Work background (reliable_transportation, work_experience, mechanical_experience)
      - Equipment experience (equipment_exposure array, diagnostic_ability, hydraulics_comfort, equipment_care, customer_facing)
      - Driving record (license_type, trailer_experience array, license_state, moving_violations, dui_dwi, license_suspended, can_be_insured, driving_notes)
      - Computer skills (computer_skills array, computer_skill_level, systems_used array)
      - Consent (drug_test_consent)
      - Timestamps (created_at, updated_at)

  2. Security
    - Enable RLS on `applications` table
    - Add policy for public to submit applications
    - Add policies for authenticated users to read, update, delete
*/

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
  positions text[] NOT NULL,
  start_date text NOT NULL,
  desired_pay text,
  available_days text[] NOT NULL,
  reliable_transportation boolean DEFAULT false,
  work_experience text,
  mechanical_experience text,
  equipment_exposure text[],
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
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit applications"
  ON applications FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Authenticated users can read all applications"
  ON applications FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can update applications"
  ON applications FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete applications"
  ON applications FOR DELETE TO authenticated USING (true);
```

#### Migration 4: Add Status to Applications (20260119175732)

```sql
/*
  # Add Status Column to Applications

  1. Changes
    - Add `status` column to `applications` table
    - Default value: 'New Applicant'
    - Used for tracking application progress (New Applicant, Qualified, Not Qualified)

  2. Notes
    - Uses conditional logic to only add column if it doesn't exist
    - Prevents errors on re-run
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'status'
  ) THEN
    ALTER TABLE applications ADD COLUMN status text DEFAULT 'New Applicant';
  END IF;
END $$;
```

#### Migration 5: Add Store Hours Fields (20260119181218)

```sql
/*
  # Add Store Hours Fields

  1. Changes
    - Add `day_order` column to store_hours table for sorting days
    - Add `is_closed` column to store_hours table to mark closed days
    - Make open_time and close_time nullable (for closed days)

  2. Notes
    - day_order helps maintain consistent day ordering (1=Monday, 7=Sunday)
    - is_closed allows marking days when the store is closed
    - Nullable times accommodate closed days
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'store_hours' AND column_name = 'day_order'
  ) THEN
    ALTER TABLE store_hours ADD COLUMN day_order integer NOT NULL DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'store_hours' AND column_name = 'is_closed'
  ) THEN
    ALTER TABLE store_hours ADD COLUMN is_closed boolean NOT NULL DEFAULT false;
  END IF;
END $$;

ALTER TABLE store_hours ALTER COLUMN open_time DROP NOT NULL;
ALTER TABLE store_hours ALTER COLUMN close_time DROP NOT NULL;
```

#### Migration 6: Add Display Order to Positions (20260119225122)

```sql
/*
  # Add display_order to positions table

  1. Changes
    - Add `display_order` column to positions table (integer)
    - Set default value to 0
    - Update existing positions with proper display order

  2. Notes
    - Display order determines the sequence positions appear in the application form
    - Lower numbers appear first
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'positions' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE positions ADD COLUMN display_order integer DEFAULT 0;
  END IF;
END $$;

UPDATE positions SET display_order = 1 WHERE title = 'Store Manager';
UPDATE positions SET display_order = 2 WHERE title = 'Operations Manager';
UPDATE positions SET display_order = 3 WHERE title = 'Sales Manager';
UPDATE positions SET display_order = 4 WHERE title = 'Bookkeeping / Billing';
UPDATE positions SET display_order = 5 WHERE title = 'Inside Sales / Admin';
UPDATE positions SET display_order = 6 WHERE title = 'Diesel Mechanic';
UPDATE positions SET display_order = 7 WHERE title = 'General Mechanic';
UPDATE positions SET display_order = 8 WHERE title = 'Maintenance Technician';
UPDATE positions SET display_order = 9 WHERE title = 'Equipment Porter';
UPDATE positions SET display_order = 10 WHERE title = 'General Operations';
UPDATE positions SET display_order = 11 WHERE title = 'Delivery Driver - CDL';
UPDATE positions SET display_order = 12 WHERE title = 'Delivery Driver';
UPDATE positions SET display_order = 999 WHERE display_order = 0;
```

#### Migration 7: Add Active Status and Display Order to Stores (20260119225332)

```sql
/*
  # Add is_active and display_order to stores table

  1. Changes
    - Add `is_active` column to stores table (boolean, default true)
    - Add `display_order` column to stores table (integer, default 0)
    - Set all existing stores to active
    - Set display order for stores

  2. Notes
    - All stores are active by default
    - Display order determines the sequence stores appear in dropdowns
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'stores' AND column_name = 'is_active'
  ) THEN
    ALTER TABLE stores ADD COLUMN is_active boolean DEFAULT true;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'stores' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE stores ADD COLUMN display_order integer DEFAULT 0;
  END IF;
END $$;

UPDATE stores SET is_active = true WHERE is_active IS NULL;

UPDATE stores SET display_order = 1 WHERE name = 'Bon Aqua';
UPDATE stores SET display_order = 2 WHERE name = 'Waverly';
UPDATE stores SET display_order = 3 WHERE name = 'Rent ''n King - Main Street';
UPDATE stores SET display_order = 4 WHERE name = 'Rent ''n King - North Plaza';
UPDATE stores SET display_order = 5 WHERE name = 'Rent ''n King - West Side';
UPDATE stores SET display_order = 999 WHERE display_order = 0;
```

#### Migration 8: Add Location Flexibility (20260120114712)

```sql
/*
  # Add Location Flexibility to Applications

  1. Changes
    - Add `location_flexibility` column to `applications` table
      - Type: text
      - Options:
        - "Will only work at selected store"
        - "Willing to work at any store location"
        - "Willing to rotate amongst multiple store locations"
      - Default: NULL (optional field)

  2. Notes
    - This field allows applicants to specify their flexibility regarding work location
    - Field is optional to maintain backward compatibility with existing applications
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'location_flexibility'
  ) THEN
    ALTER TABLE applications ADD COLUMN location_flexibility text;
  END IF;
END $$;
```

#### Migration 9: Split Equipment Fields (20260120115810)

```sql
/*
  # Split Equipment Exposure into Repair and Operated

  1. Changes
    - Add `equipment_repair` column to `applications` table
      - Type: text[] (array of text)
      - Stores equipment types the applicant has worked on to repair/maintain
    - Add `equipment_operated` column to `applications` table
      - Type: text[] (array of text)
      - Stores equipment types the applicant has operated

  2. Data Migration
    - Copy existing `equipment_exposure` data to both new fields for backward compatibility
    - Keep `equipment_exposure` for existing records

  3. Notes
    - This separates the single equipment question into two specific questions
    - Both fields are optional to maintain backward compatibility
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'equipment_repair'
  ) THEN
    ALTER TABLE applications ADD COLUMN equipment_repair text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND column_name = 'equipment_operated'
  ) THEN
    ALTER TABLE applications ADD COLUMN equipment_operated text[];
  END IF;
END $$;
```

#### Migration 10: Create Site Content Table (20260120140804)

```sql
/*
  # Create site content table

  1. New Tables
    - `site_content`
      - `id` (uuid, primary key)
      - `section_key` (text, unique) - Identifier for the content section
      - `title` (text) - Section title
      - `content` (text) - HTML content
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `site_content` table
    - Add policy for public read access
    - Add policy for authenticated admin write access

  3. Initial Data
    - Insert default "Employment Opportunities" content
*/

CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site content"
  ON site_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert site content"
  ON site_content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update site content"
  ON site_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete site content"
  ON site_content
  FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO site_content (section_key, title, content)
VALUES (
  'employment_opportunities',
  'Employment Opportunities',
  '<p>At Rent ''n King, you''re not just filling a role — you''re joining a tight-knit team that takes pride in hard work, dependable service, and doing things the right way. We rely on each other, and our customers rely on us — which means showing up, being on time, and being consistent matters here. If you enjoy solving problems, working with quality equipment, and being trusted to do meaningful work that people count on, you''ll feel right at home.</p>'
)
ON CONFLICT (section_key) DO NOTHING;
```

#### Migration 11: Add Footer Content (20260120141145)

```sql
/*
  # Add footer content

  1. Changes
    - Insert footer content for equal opportunity statement

  2. Notes
    - Uses ON CONFLICT to prevent duplicate entries if run multiple times
*/

INSERT INTO site_content (section_key, title, content)
VALUES (
  'footer_eeo',
  'Rent ''n King is an Equal Opportunity Employer',
  '<p>All qualified applicants will receive consideration for employment without regard to race, color, religion, sex, national origin, disability status, protected veteran status, or any other characteristic protected by law.</p>'
)
ON CONFLICT (section_key) DO NOTHING;
```

#### Migration 12: Add Contact Content (20260120141428)

```sql
/*
  # Add contact content

  1. Changes
    - Insert contact section content

  2. Notes
    - Uses ON CONFLICT to prevent duplicate entries if run multiple times
*/

INSERT INTO site_content (section_key, title, content)
VALUES (
  'footer_contact',
  'Questions? Contact us at careers@rentnking.com',
  '<p>Questions? Contact us at <a href="mailto:careers@rentnking.com">careers@rentnking.com</a></p>'
)
ON CONFLICT (section_key) DO NOTHING;
```

#### Migration 13: Create Mechanical Aptitude Questions (20260120142607)

```sql
/*
  # Create Mechanical Aptitude Questions Table

  1. New Tables
    - `mechanical_aptitude_questions`
      - `id` (uuid, primary key)
      - `question` (text) - The question text
      - `answer` (text) - The answer text
      - `display_order` (integer) - Order in which questions appear
      - `is_active` (boolean) - Whether the question is active/visible
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policy for public to read active questions
    - Add policy for authenticated admins to manage all questions
*/

CREATE TABLE IF NOT EXISTS mechanical_aptitude_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE mechanical_aptitude_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active mechanical aptitude questions"
  ON mechanical_aptitude_questions
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all mechanical aptitude questions"
  ON mechanical_aptitude_questions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert mechanical aptitude questions"
  ON mechanical_aptitude_questions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update mechanical aptitude questions"
  ON mechanical_aptitude_questions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete mechanical aptitude questions"
  ON mechanical_aptitude_questions
  FOR DELETE
  TO authenticated
  USING (true);
```

#### Migration 14: Create Driving Record Questions (20260120143220)

```sql
/*
  # Create Driving Record Questions Table

  1. New Tables
    - `driving_record_questions`
      - `id` (uuid, primary key)
      - `question` (text) - The question text
      - `answer` (text) - The answer text
      - `display_order` (integer) - Order in which questions appear
      - `is_active` (boolean) - Whether the question is active/visible
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policy for public to read active questions
    - Add policy for authenticated admins to manage all questions
*/

CREATE TABLE IF NOT EXISTS driving_record_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE driving_record_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active driving record questions"
  ON driving_record_questions
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all driving record questions"
  ON driving_record_questions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert driving record questions"
  ON driving_record_questions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update driving record questions"
  ON driving_record_questions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete driving record questions"
  ON driving_record_questions
  FOR DELETE
  TO authenticated
  USING (true);
```

#### Migration 15: Create Computer Literacy Questions (20260120143221)

```sql
/*
  # Create Computer Literacy Questions Table

  1. New Tables
    - `computer_literacy_questions`
      - `id` (uuid, primary key)
      - `question` (text) - The question text
      - `answer` (text) - The answer text
      - `display_order` (integer) - Order in which questions appear
      - `is_active` (boolean) - Whether the question is active/visible
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policy for public to read active questions
    - Add policy for authenticated admins to manage all questions
*/

CREATE TABLE IF NOT EXISTS computer_literacy_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE computer_literacy_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active computer literacy questions"
  ON computer_literacy_questions
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all computer literacy questions"
  ON computer_literacy_questions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert computer literacy questions"
  ON computer_literacy_questions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update computer literacy questions"
  ON computer_literacy_questions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete computer literacy questions"
  ON computer_literacy_questions
  FOR DELETE
  TO authenticated
  USING (true);
```

---

## Application Architecture

### Authentication Flow

The application uses Supabase Authentication with email/password:

**AuthContext.tsx** - Provides authentication state and methods throughout the app

```typescript
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch((error) => {
      console.error('Error getting session:', error);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setSession(session);
        setUser(session?.user ?? null);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### Supabase Client Configuration

**lib/supabase.ts** - Supabase client setup and TypeScript interfaces

```typescript
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
  created_at: string;
}

export interface Position {
  id: string;
  title: string;
  description: string | null;
  category: string;
  is_active: boolean;
  created_at: string;
}

export interface StoreHour {
  id: string;
  day_of_week: string;
  open_time: string;
  close_time: string;
  is_closed: boolean;
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
  reliable_transportation: boolean;
  work_experience: string | null;
  mechanical_experience: string | null;
  equipment_exposure: string[];
  diagnostic_ability: string | null;
  hydraulics_comfort: string | null;
  equipment_care: string | null;
  customer_facing: string | null;
  drug_test_consent: boolean;
  license_type: string | null;
  trailer_experience: string[];
  license_state: string | null;
  moving_violations: string | null;
  dui_dwi: string | null;
  license_suspended: string | null;
  can_be_insured: string | null;
  driving_notes: string | null;
  computer_skills: string[];
  computer_skill_level: string | null;
  systems_used: string[];
  status: string;
  created_at: string;
  updated_at: string;
}
```

### Routing Configuration

**Router.tsx** - Application routes

```typescript
import { Routes, Route } from 'react-router-dom';
import App from './App';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminList from './pages/AdminList';
import AdminDetail from './pages/AdminDetail';
import AdminStores from './pages/AdminStores';
import AdminPositions from './pages/AdminPositions';
import AdminStoreHours from './pages/AdminStoreHours';
import AdminSiteContent from './pages/AdminSiteContent';
import AdminMechanicalAptitude from './pages/AdminMechanicalAptitude';
import AdminDrivingRecord from './pages/AdminDrivingRecord';
import AdminComputerLiteracy from './pages/AdminComputerLiteracy';
import { AuthProvider } from './contexts/AuthContext';

export default function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/applications" element={<AdminList />} />
        <Route path="/admin/applications/:id" element={<AdminDetail />} />
        <Route path="/admin/stores" element={<AdminStores />} />
        <Route path="/admin/positions" element={<AdminPositions />} />
        <Route path="/admin/store-hours" element={<AdminStoreHours />} />
        <Route path="/admin/site-content" element={<AdminSiteContent />} />
        <Route path="/admin/mechanical-aptitude" element={<AdminMechanicalAptitude />} />
        <Route path="/admin/driving-record" element={<AdminDrivingRecord />} />
        <Route path="/admin/computer-literacy" element={<AdminComputerLiteracy />} />
      </Routes>
    </AuthProvider>
  );
}
```

---

## Source Code

### Main Application Component

**App.tsx** - Contains the multi-step employment application form

The main application file is approximately 27,798 lines and includes:

1. **Multi-step form wizard** with progress tracking
2. **Dynamic form sections** based on selected positions:
   - Personal Information
   - Position Selection
   - Location Preferences
   - Work Experience
   - Mechanical Aptitude Questions (conditional)
   - Driving Record Questions (conditional)
   - Computer Literacy Questions (conditional)
   - Review & Submit

3. **Form validation** for all required fields
4. **Dynamic question loading** from database
5. **Conditional logic** for showing/hiding sections
6. **Responsive design** for mobile and desktop
7. **Real-time data fetching** from Supabase
8. **Form submission** with success/error handling

Key features:
- Uses React hooks for state management
- Implements custom validation logic
- Fetches stores, positions, hours, and questions from database
- Handles complex multi-value fields (checkboxes, arrays)
- Provides inline error messages
- Displays progress indicator
- Offers form review before submission

---

## Admin Features

### Admin Pages

1. **AdminLogin.tsx** - Secure login page
   - Email/password authentication
   - Session management
   - Redirect to dashboard on success

2. **AdminDashboard.tsx** - Central hub
   - Quick stats overview
   - Navigation to all admin sections
   - Recent applications preview

3. **AdminList.tsx** - Application management
   - Searchable/filterable application list
   - Status indicators (New, Qualified, Not Qualified)
   - Quick actions (view, update status)
   - Bulk operations support

4. **AdminDetail.tsx** - Application viewer
   - Detailed application view
   - Status update functionality
   - All applicant information displayed
   - Conditional sections based on position type

5. **AdminStores.tsx** - Store management
   - Add/edit/delete stores
   - Display order control
   - Active/inactive toggle
   - Store contact information management

6. **AdminPositions.tsx** - Position management
   - Add/edit/delete positions
   - Display order control
   - Active/inactive toggle
   - Category management

7. **AdminStoreHours.tsx** - Hours management
   - Set hours for each day of the week
   - Mark days as closed
   - Time picker interface

8. **AdminSiteContent.tsx** - CMS
   - Edit employment opportunities text
   - Edit footer content
   - Edit contact information
   - Rich text editing

9. **AdminMechanicalAptitude.tsx** - Question manager
   - Add/edit/delete mechanical questions
   - Display order control
   - Active/inactive toggle

10. **AdminDrivingRecord.tsx** - Question manager
    - Add/edit/delete driving questions
    - Display order control
    - Active/inactive toggle

11. **AdminComputerLiteracy.tsx** - Question manager
    - Add/edit/delete computer questions
    - Display order control
    - Active/inactive toggle

---

## Deployment Instructions

### Prerequisites

1. Node.js 18+ installed
2. Supabase account and project
3. Environment variables configured

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment

Create a `.env` file with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Step 3: Run Database Migrations

Execute all 15 migration files in order on your Supabase database:

1. Create stores and positions tables
2. Create store hours table
3. Create applications table
4. Add status to applications
5. Add store hours fields
6. Add display order to positions
7. Add active status to stores
8. Add location flexibility
9. Split equipment fields
10. Create site content table
11. Add footer content
12. Add contact content
13. Create mechanical questions
14. Create driving record questions
15. Create computer literacy questions

### Step 4: Create Admin User

In Supabase Authentication, create an admin user with email/password.

### Step 5: Seed Initial Data

Add stores and positions through the admin interface or directly in the database.

### Step 6: Build and Deploy

```bash
# Build for production
npm run build

# Preview build locally
npm run preview

# Deploy dist/ folder to your hosting provider
```

### Recommended Hosting Providers

- **Vercel** - Zero-config deployment for Vite apps
- **Netlify** - Easy deployment with Git integration
- **Cloudflare Pages** - Fast global CDN
- **AWS Amplify** - Full-featured hosting

---

## Security Considerations

1. **Row Level Security (RLS)** - All tables have RLS enabled
2. **Authentication Required** - Admin routes require authentication
3. **Input Validation** - All form inputs are validated
4. **SQL Injection Protection** - Parameterized queries via Supabase
5. **XSS Protection** - React's built-in XSS protection
6. **Environment Variables** - Sensitive config in .env file

---

## Future Enhancements

1. Email notifications for new applications
2. Application status tracking for applicants
3. Resume/document upload
4. Advanced search and filtering
5. Analytics dashboard
6. Interview scheduling
7. Email templates
8. Export applications to CSV/PDF
9. Multi-language support
10. Mobile app version

---

## Support & Contact

For technical support or questions about this system:

**Email:** careers@rentnking.com

---

**Document Generated:** January 21, 2026
**Project Status:** Production Ready
**Total Migrations:** 15
**Total Tables:** 8
**Total Admin Pages:** 11
