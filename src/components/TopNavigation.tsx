import React from 'react';
import { 
  Search, 
  Bell, 
  Settings,
  User,
  Moon,
  Sun,
  Zap
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useFitness } from '../contexts/FitnessContext';

const TopNavigation = () => {
  const { theme, setTheme, isDark } = useTheme();
  const { userProfile, currentView } = useFitness();

  const getViewTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard';
      case 'chat': return 'AI Fitness Chat';
      case 'workouts': return 'Workout Plans';
      case 'diet': return 'Diet Plans';
      case 'exercises': return 'Exercise Library';
      case 'goals': return 'Fitness Goals';
      case 'progress': return 'Progress Tracking';
      case 'schedule': return 'Workout Schedule';
      case 'analytics': return 'Fitness Analytics';
      case 'profile': return 'User Profile';
      case 'settings': return 'Settings';
      default: return 'FitBot Pro';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{getViewTitle()}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome back, {userProfile.name}! Ready to crush your fitness goals? 💪
            </p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search exercises, workouts, or ask me anything..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Quick Action Button */}
          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
            <Zap className="h-4 w-4" />
            <span>Quick Workout</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <Settings className="h-5 w-5" />
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">{userProfile.name.charAt(0)}</span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{userProfile.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{userProfile.goal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;