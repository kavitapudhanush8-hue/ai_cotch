import { createContext, useContext, useState } from 'react'

type DemoUser = {
  id: string
  email: string
  full_name: string
}

type DemoSession = {
  access_token: string
  user: DemoUser
}

type AuthContextType = {
  user: DemoUser | null
  session: DemoSession | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  signOut: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DemoUser | null>(() => {
    const saved = localStorage.getItem('demo_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = async (email: string, _password: string) => {
    // Demo mode - accept any credentials
    const demoUser: DemoUser = {
      id: 'demo-user-001',
      email,
      full_name: email.split('@')[0].replace(/[._]/g, ' '),
    }
    setUser(demoUser)
    localStorage.setItem('demo_user', JSON.stringify(demoUser))
  }

  const register = async (email: string, _password: string, fullName: string) => {
    const demoUser: DemoUser = {
      id: 'demo-user-001',
      email,
      full_name: fullName,
    }
    setUser(demoUser)
    localStorage.setItem('demo_user', JSON.stringify(demoUser))
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('demo_user')
  }

  const session: DemoSession | null = user
    ? { access_token: 'demo-token-abc123', user }
    : null

  return (
    <AuthContext.Provider value={{ user, session, isAuthenticated: !!user, login, register, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
