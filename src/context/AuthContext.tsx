import { Session, User } from '@supabase/supabase-js'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Profile, supabase } from '../lib/supabase'
const userData: User = {
  id: "a1b2c3d4-5678-90ab-cdef-1234567890ab",
  aud: "authenticated",
  role: "authenticated",

  email: "sandro@example.com",
  phone: "+244900000000",

  created_at: "2026-03-25T10:00:00.000Z",
  updated_at: "2026-03-25T12:00:00.000Z",
  last_sign_in_at: "2026-03-25T12:00:00.000Z",

  confirmed_at: "2026-03-25T10:05:00.000Z",
  email_confirmed_at: "2026-03-25T10:05:00.000Z",
  phone_confirmed_at: "2026-03-25T10:06:00.000Z",

  app_metadata: {
    provider: "email",
    providers: ["email"]
  },

  user_metadata: {
    full_name: "Sandro Panda",
    avatar_url: "https://example.com/avatar.png"
  },

  identities: [],

  is_anonymous: false,
  is_sso_user: false,

  factors: [],

  deleted_at: undefined,
  banned_until: undefined
}
interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, profileData: Partial<Profile>) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(userData)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      console.error('Error fetching profile:', error)
    } else if (data) {
      setProfile(data as Profile)
    }
    setLoading(false)
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  async function signUp(email: string, password: string, profileData: Partial<Profile>) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: profileData.full_name,
        }
      }
    })

    if (error) return { error }

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          email: email,
          full_name: profileData.full_name || '',
          phone: profileData.phone || '',
          blood_type: profileData.blood_type || null,
          role: profileData.role || 'donor',
          province: profileData.province || null,
          municipality: profileData.municipality || null,
          birth_date: profileData.birth_date || null,
          gender: profileData.gender || null,
          avatar_url: profileData.avatar_url || null,
        })

      if (profileError) return { error: profileError }
      await fetchProfile(data.user.id)
    }

    return { error: null }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setProfile(null)
    setUser(null)
  }

  async function updateProfile(updates: Partial<Profile>) {
    if (!user) return { error: new Error('Usuário não autenticado') }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) return { error }
    setProfile(data as Profile)
    return { error: null }
  }

  async function refreshProfile() {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signIn, signUp, signOut, refreshProfile, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
