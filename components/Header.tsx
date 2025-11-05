import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { IconFilePlus, IconSun, IconMoon } from './common/Icon';
import type { View } from '../types';

interface HeaderProps {
  onNavigate: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('list')}>
            <div className="bg-blue-600 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">ScamShield Rail</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            {theme === 'light' ? <IconMoon className="w-6 h-6" /> : <IconSun className="w-6 h-6" />}
          </button>
          {user && (
            <>
              <span className="text-slate-600 dark:text-slate-300 hidden md:inline">Welcome, {user.name}</span>
              {user.role === 'admin' && (
                 <button onClick={() => onNavigate('dashboard')} className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Admin</button>
              )}
              <button
                onClick={() => onNavigate('form')}
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out flex items-center space-x-2"
              >
                <IconFilePlus className="w-5 h-5" />
                <span className="hidden sm:inline">File Complaint</span>
              </button>
               <button onClick={logout} className="font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};