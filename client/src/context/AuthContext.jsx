import { createContext, useContext, useEffect, useState } from "react";


import authService from "@/services/authService";
import { getToken, removeToken, setToken } from "@/utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
 

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await authService.getMe();
        setUser(data.user);
      } catch (error) {
        removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
  const data = await authService.login(credentials);

  setToken(data.token);
  setUser(data.user);

  return data;
};

  const logout = () => {
  removeToken();
  setUser(null);
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}