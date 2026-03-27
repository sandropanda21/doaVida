-- Script SQL para criar as tabelas do DoaVida no Supabase
-- Execute este script no Editor SQL do Supabase

-- 1. Criar tabela de perfis de usuários
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    blood_type TEXT,
    role TEXT NOT NULL DEFAULT 'donor' CHECK (role IN ('donor', 'recipient')),
    province TEXT,
    municipality TEXT,
    birth_date DATE,
    gender TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar tabela de pedidos de sangue
CREATE TABLE IF NOT EXISTS blood_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_name TEXT NOT NULL,
    blood_type TEXT NOT NULL,
    bags_quantity INTEGER NOT NULL DEFAULT 1,
    province TEXT NOT NULL,
    hospital TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'fulfilled', 'cancelled')),
    urgency TEXT NOT NULL DEFAULT 'medium' CHECK (urgency IN ('high', 'medium', 'low')),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar políticas de segurança (RLS - Row Level Security)

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_requests ENABLE ROW LEVEL SECURITY;

-- Políticas para perfis
-- Usuários podem ver todos os perfis
CREATE POLICY "Anyone can view all profiles" ON profiles
    FOR SELECT USING (true);

-- Usuários podem inserir seu próprio perfil
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Usuários podem atualizar seu próprio perfil
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Políticas para pedidos de sangue
-- Qualquer usuário logado pode ver pedidos pendentes
CREATE POLICY "Anyone can view pending requests" ON blood_requests
    FOR SELECT USING (status = 'pending');

-- Usuários podem ver seus próprios pedidos
CREATE POLICY "Users can view own requests" ON blood_requests
    FOR SELECT USING (auth.uid() = user_id);

-- Usuários logados podem criar pedidos
CREATE POLICY "Authenticated users can create requests" ON blood_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Usuários podem atualizar seus próprios pedidos (apenas status)
CREATE POLICY "Users can update own requests" ON blood_requests
    FOR UPDATE USING (auth.uid() = user_id);

-- Usuários podem excluir seus próprios pedidos
CREATE POLICY "Users can delete own requests" ON blood_requests
    FOR DELETE USING (auth.uid() = user_id);

-- 4. Criar função para criar perfil automaticamente ao registrar usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuário'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Criar trigger para executar a função
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_blood_requests_status ON blood_requests(status);
CREATE INDEX IF NOT EXISTS idx_blood_requests_user_id ON blood_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_blood_requests_province ON blood_requests(province);
CREATE INDEX IF NOT EXISTS idx_blood_requests_blood_type ON blood_requests(blood_type);
