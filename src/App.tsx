import { useState } from 'react';
import { Login } from './components/Login';
import { MainLayout } from './components/MainLayout';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Auto-login for preview
  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'John Doe',
    email: 'john.doe@example.com'
  });

  const handleLogin = (email: string, password: string) => {
    // Mock authentication
    setUser({
      name: 'John Doe',
      email: email
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <MainLayout user={user!} onLogout={handleLogout} />;
}