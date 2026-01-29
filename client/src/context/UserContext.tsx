import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Role = 'student' | 'teacher' | null;

interface User {
  name: string;
  role: Role;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User>(() => {
    const saved = localStorage.getItem('poll_user');
    return saved ? JSON.parse(saved) : { name: '', role: null };
  });

  const setUser = (newUser: User) => {
    setUserState(newUser);
    localStorage.setItem('poll_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUserState({ name: '', role: null });
    localStorage.removeItem('poll_user');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
