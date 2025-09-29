import React, { useEffect, useRef, useState } from 'react';
import { Menu, User, Gift, LogOut, ChevronDown, Leaf } from 'lucide-react';
import { GamePage, User as AppUser } from '../types';

interface NavbarProps {
  onNavigate: (page: GamePage) => void;
  currentUser: AppUser | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-green-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group"
            aria-label="Go to home"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 text-white shadow">
              <Leaf className="w-5 h-5" />
            </span>
            <div className="text-left">
              <div className="text-sm leading-tight font-semibold text-gray-800">SwachhGuru</div>
              <div className="text-[11px] -mt-0.5 text-green-700/80">Play • Learn • Segregate</div>
            </div>
          </button>

          {/* Right actions */}
          <div className="flex items-center gap-2" ref={menuRef}>
            {!currentUser ? (
              <button
                onClick={() => onNavigate('login')}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-medium shadow hover:from-green-600 hover:to-green-700 transition-colors"
              >
                <User className="w-4 h-4" />
                Login / Register
              </button>
            ) : (
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-50 text-green-800 hover:bg-green-100 transition-colors"
                aria-haspopup="menu"
                aria-expanded={isMenuOpen}
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-semibold">
                  {currentUser.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
                <span className="max-w-[120px] truncate">{currentUser.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            )}

            {/* Hamburger visible on all sizes, adjacent to Login/Profile */}
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
              aria-label="Open menu"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Dropdown */}
            {isMenuOpen && (
              <div
                className="absolute right-4 top-14 w-56 origin-top-right bg-white border border-green-100 rounded-2xl shadow-xl overflow-hidden animate-[fadeIn_120ms_ease-out]"
                role="menu"
              >
                <div className="p-1">
                  {!currentUser && (
                    <>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          onNavigate('login');
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 text-gray-700 transition-colors"
                        role="menuitem"
                      >
                        <User className="w-4 h-4 text-green-700" />
                        <span>Login / Register</span>
                      </button>
                      <div className="my-1 h-px bg-green-100" />
                    </>
                  )}
                  {/* Profile and Rewards available; if not logged, navigate will still route (Profile prompts login there) */}
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onNavigate('profile');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 text-gray-700 transition-colors"
                    role="menuitem"
                  >
                    <User className="w-4 h-4 text-green-700" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onNavigate('rewards');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-50 text-gray-700 transition-colors"
                    role="menuitem"
                  >
                    <Gift className="w-4 h-4 text-green-700" />
                    <span>Rewards</span>
                  </button>
                  {currentUser && (
                    <>
                      <div className="my-1 h-px bg-green-100" />
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 transition-colors"
                        role="menuitem"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};


