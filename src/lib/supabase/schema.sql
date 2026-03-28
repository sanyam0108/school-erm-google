-- School ERP Supabase Database Schema
-- Run this script in the Supabase SQL Editor to initialize all tables

-- Enable UUID extension
create extension if not exists "uuid-ossp";

---------------------------------------------------
-- 1. ORGANIZATIONS (Multi-school Support)
---------------------------------------------------
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

---------------------------------------------------
-- 2. MANAGEMENT SESSIONS
---------------------------------------------------
CREATE TABLE IF NOT EXISTS public.academic_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    session_name VARCHAR(50) NOT NULL, -- e.g., '2024-25'
    start_month VARCHAR(20) NOT NULL DEFAULT 'April',
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

---------------------------------------------------
-- 3. FINANCIAL YEARS
---------------------------------------------------
CREATE TABLE IF NOT EXISTS public.financial_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    fy_name VARCHAR(50) NOT NULL, -- e.g., 'FY 2024-25'
    is_current BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

---------------------------------------------------
-- 4. STUDENTS
---------------------------------------------------
CREATE TYPE student_category AS ENUM ('New Student', 'Current Student', 'Ex Student / Alumni');

CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    
    -- Admission Info
    sr_no VARCHAR(50) NOT NULL,
    admission_no VARCHAR(50),
    admission_date DATE,
    student_category student_category DEFAULT 'New Student',
    
    -- Demographics
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    father_name VARCHAR(200),
    mother_name VARCHAR(200),
    dob DATE,
    gender VARCHAR(20),
    religion VARCHAR(50),
    caste VARCHAR(50),
    blood_group VARCHAR(10),
    contact_number VARCHAR(20),
    address TEXT,
    
    -- Academic Placement
    current_class VARCHAR(50),
    section VARCHAR(20),
    
    -- Status Tracker (For Dropouts/Release)
    is_discharged BOOLEAN DEFAULT false,
    discharge_date DATE,
    discharge_reason TEXT,
    last_session_studied UUID REFERENCES public.academic_sessions(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(org_id, sr_no)
);

---------------------------------------------------
-- 5. FEES CONFIGURATION & LEDGER
---------------------------------------------------
CREATE TABLE IF NOT EXISTS public.student_fees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    fy_id UUID REFERENCES public.financial_years(id),
    
    total_base_fees DECIMAL(10,2) NOT NULL DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    transport_fees DECIMAL(10,2) DEFAULT 0,
    
    installment_type VARCHAR(50) DEFAULT 'Monthly', -- Monthly, Yearly, Custom
    next_due_date DATE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

---------------------------------------------------
-- 6. PAYMENTS (Transactions)
---------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    fy_id UUID REFERENCES public.financial_years(id),
    
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_mode VARCHAR(50) NOT NULL, -- Cash, UPI, Bank Transfer
    transaction_notes TEXT,
    
    created_by UUID, -- References auth.users in standard supabase setup
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

---------------------------------------------------
-- RLS Policies (Basic Structure for Multi-Tenant)
---------------------------------------------------
-- Example of RLS mapping ensuring queries only pull data for the active organization
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Isolated Organization Data" ON public.students
    FOR ALL
    USING (org_id = current_setting('app.current_org')::uuid);
