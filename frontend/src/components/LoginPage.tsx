import React, { useState } from 'react';
import { LogIn, UserPlus, ArrowRight, Mail, Lock } from 'lucide-react';
import { GamePage, User } from '../types';
import { apiService } from '../services/api';

interface LoginPageProps {
  onNavigate: (page: GamePage) => void;
  onLogin: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password');
      return;
    }
    setError('');

    try {
      const user = await apiService.login({ 
        email: email.trim().toLowerCase(), 
        password 
      }) as User;
      localStorage.setItem('currentUser', JSON.stringify(user));
      onLogin(user);
      onNavigate('home');
    } catch (e: any) {
      if (e.message.includes('404') && !isNew) {
        setIsNew(true);
        setError('No account found. Click Login again to create one.');
        return;
      }
      setError('Login failed. Please check your credentials.');
    }

    if (isNew) {
      // Create account quickly
      try {
        const user2 = await apiService.register({ 
          username: email.trim().split('@')[0], 
          email: email.trim().toLowerCase(), 
          password 
        }) as User;
        localStorage.setItem('currentUser', JSON.stringify(user2));
        onLogin(user2);
        onNavigate('home');
      } catch (e) {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="relative bg-white/90 backdrop-blur rounded-3xl shadow-2xl w-full max-w-md p-8 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-teal-200/40 rounded-full blur-3xl" />

        <div className="relative text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-gray-600 mt-1">Login or create a new account to start playing</p>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-5">
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2"><Mail className="inline w-4 h-4 mr-1" /> Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
            />
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2"><Lock className="inline w-4 h-4 mr-1" /> Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg"
          >
            {isNew ? (
              <>
                <UserPlus className="w-5 h-5" />
                Create Account
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Login
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('registration')}
            className="w-full inline-flex items-center justify-center gap-2 bg-white text-green-700 font-medium py-3 rounded-xl border border-green-200 hover:bg-green-50 transition-colors"
          >
            Go to Registration
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};


