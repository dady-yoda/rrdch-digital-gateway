-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  role TEXT CHECK (role IN ('patient', 'doctor', 'admin')) DEFAULT 'patient',
  phone TEXT,
  avatar_url TEXT,
  department TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- 2. Doctors Table
CREATE TABLE IF NOT EXISTS public.doctors (
  id UUID PRIMARY KEY REFERENCES public.profiles(id),
  specialty TEXT,
  qualification TEXT,
  experience_years INTEGER,
  available BOOLEAN DEFAULT true,
  rating NUMERIC(3, 2),
  patients_today INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.doctors DISABLE ROW LEVEL SECURITY;

-- 3. Medical Records Table
CREATE TABLE IF NOT EXISTS public.medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.profiles(id),
  doctor_id UUID REFERENCES public.profiles(id),
  record_name TEXT NOT NULL,
  ipfs_hash TEXT,
  blockchain_tx TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.medical_records DISABLE ROW LEVEL SECURITY;

-- 4. Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  target_user_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.audit_logs DISABLE ROW LEVEL SECURITY;

-- 5. Slots Table (managed by doctors / admin)
CREATE TABLE IF NOT EXISTS public.slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TEXT NOT NULL,                    -- "09:00" 24-hr
  display_time TEXT NOT NULL,            -- "9:00 AM"
  status TEXT CHECK (status IN ('Open', 'Booked', 'Busy')) DEFAULT 'Open',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (doctor_id, date, time)
);

ALTER TABLE public.slots DISABLE ROW LEVEL SECURITY;

-- 6. Appointments Table (one row per confirmed booking)
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_id TEXT NOT NULL UNIQUE,
  patient_id UUID REFERENCES public.profiles(id),   -- NULL = walk-in / pre-auth
  doctor_id UUID NOT NULL REFERENCES public.profiles(id),
  slot_id UUID REFERENCES public.slots(id),
  date DATE NOT NULL,
  time TEXT NOT NULL,
  display_time TEXT NOT NULL,
  complaint TEXT,
  patient_name TEXT,
  patient_phone TEXT,
  patient_dob DATE,
  patient_email TEXT,
  department TEXT,
  status TEXT CHECK (status IN ('Confirmed','Completed','Cancelled','No-Show')) DEFAULT 'Confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.appointments DISABLE ROW LEVEL SECURITY;
