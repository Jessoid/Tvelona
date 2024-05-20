import React, { createContext, useContext, useState } from 'react';

// Создаем контекст для хранения состояния авторизации
const AuthContext = createContext();

// Создаем хук для использования состояния авторизации
export function useAuth() {
  return useContext(AuthContext);
}

// Создаем провайдер для оборачивания приложения
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Оборачиваем детей в контекст провайдера
  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}