import React from 'react';
import { 
  Home,
  MessageCircle,
  Dumbbell,
  Apple,
  Target,
  TrendingUp,
  Calendar,
  Settings,
  User,
  BookOpen,
  Activity
} from 'lucide-react';
import { useFitness } from '../contexts/FitnessContext';

const Sidebar = () => {
  const { currentView, setCurrentView } = useFitness();

  const navigationItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: MessageCircle, label: 'AI Fitness Chat', id: 'chat' },
    { icon: Dumbbell, label: 'Workouts', id: 'workouts' },
    { icon: Apple, label: 'Diet Plans', id: 'diet' },
    { icon: BookOpen, label: 'Exercise Library', id: 'exercises' },
    { icon: Target, label: 'Goals', id: 'goals' },
    { icon: TrendingUp, label: 'Progress', id: 'progress' },
    { icon: Calendar, label: 'Schedule', id: 'schedule' },
    { icon: Activity, label: 'Analytics', id: 'analytics' },
    { icon: User, label: 'Profile', id: 'profile' },
    { icon: Settings, label: 'Settings', id: 'settings' }
  ];

  const quickStats = [
    { emoji: '🔥', label: 'Calories Burned', value: '2,450' },
    { emoji: '💪', label: 'Workouts Done', value: '28' },
    { emoji: '🎯', label: 'Goals Achieved', value: '12' },
    { emoji: '⏱️', label: 'Total Time', value: '45h' }
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 h-screen flex flex-col border-r border-gray-200 dark:border-gray-700 shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Dumbbell className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">FitBot Pro</h1>
            <p className="text-xs text-blue-100">Your AI Fitness Coach</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1 px-3">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-105'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:scale-102'
              }`}
            >
              <item.icon className={`mr-3 h-5 w-5 ${currentView === item.id ? 'text-white' : ''}`} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 px-3">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 mb-3">
            Quick Stats
          </h3>
          <div className="space-y-2">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{stat.emoji}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-300">{stat.label}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-3 text-white text-center">
          <p className="text-xs font-medium">💎 Premium Member</p>
          <p className="text-xs opacity-90">Unlimited Access</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;