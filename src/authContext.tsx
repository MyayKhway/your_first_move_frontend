import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define User type
export interface User {
  id: number,
  userName: string;
  email: string,
  type: string;
  verified: boolean,
}

// Define AuthContext data and methods
export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isUser: () => boolean;
  isDealer: () => boolean;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider props type (ReactNode allows us to use this component as a wrapper)
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  // Login function
  const login = (userData: User) => {
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => user != null;
  const isUser = () => user?.type === "user"
  const isDealer = () => user?.type === "dealer"

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isUser, isDealer }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
