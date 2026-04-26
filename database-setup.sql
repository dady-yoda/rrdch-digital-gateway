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
