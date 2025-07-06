import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Smartphone,
  Moon,
  Sun,
  Globe,
  Download,
  Trash2,
  HelpCircle,
  Mail,
  Lock
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Settings = () => {
  const { theme, setTheme, isDark } = useTheme();
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    goalDeadlines: true,
    achievements: true,
    weeklyReports: false,
    socialUpdates: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'friends',
    shareWorkouts: true,
    shareProgress: false,
    allowMessages: true
  });

  const [preferences, setPreferences] = useState({
    language: 'en',
    units: 'metric',
    startWeek: 'monday',
    timeFormat: '24h'
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const settingSections = [
    {
      id: 'appearance',
      title: 'Appearance',
      icon: isDark ? Sun : Moon,
      description: 'Customize the look and feel'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Manage your notification preferences'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Control your privacy settings'
    },
    {
      id: 'preferences',
      title: 'Preferences',
      icon: SettingsIcon,
      description: 'General app preferences'
    },
    {
      id: 'data',
      title: 'Data & Storage',
      icon: Download,
      description: 'Manage your data and storage'
    },
    {
      id: 'support',
      title: 'Help & Support',
      icon: HelpCircle,
      description: 'Get help and contact support'
    }
  ];

  const [activeSection, setActiveSection] = useState('appearance');

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'dark', label: 'Dark', icon: Moon },
            { id: 'system', label: 'System', icon: Smartphone }
          ].map((themeOption) => (
            <button
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id as any)}
              className={`p-4 rounded-lg border-2 transition-all ${
                theme === themeOption.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <themeOption.icon className={`h-6 w-6 mx-auto mb-2 ${
                theme === themeOption.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
              }`} />
              <p className={`text-sm font-medium ${
                theme === themeOption.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
              }`}>
                {themeOption.label}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Push Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'workoutReminders', label: 'Workout Reminders', description: 'Get notified about scheduled workouts' },
            { key: 'goalDeadlines', label: 'Goal Deadlines', description: 'Reminders when goals are due' },
            { key: 'achievements', label: 'Achievements', description: 'Celebrate your fitness milestones' },
            { key: 'weeklyReports', label: 'Weekly Reports', description: 'Summary of your weekly progress' },
            { key: 'socialUpdates', label: 'Social Updates', description: 'Updates from friends and community' }
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{notification.label}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[notification.key as keyof typeof notifications]}
                  onChange={(e) => handleNotificationChange(notification.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Profile Visibility
            </label>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          
          {[
            { key: 'shareWorkouts', label: 'Share Workouts', description: 'Allow others to see your workout activities' },
            { key: 'shareProgress', label: 'Share Progress', description: 'Share your fitness progress with others' },
            { key: 'allowMessages', label: 'Allow Messages', description: 'Let other users send you messages' }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{setting.label}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacy[setting.key as keyof typeof privacy] as boolean}
                  onChange={(e) => handlePrivacyChange(setting.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Security</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Lock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
            </div>
          </button>
          <button className="w-full flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Shield className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Language
          </label>
          <select
            value={preferences.language}
            onChange={(e) => handlePreferenceChange('language', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Units
          </label>
          <select
            value={preferences.units}
            onChange={(e) => handlePreferenceChange('units', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
          >
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lbs, ft)</option>
          </select>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Week Starts On
          </label>
          <select
            value={preferences.startWeek}
            onChange={(e) => handlePreferenceChange('startWeek', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
          >
            <option value="sunday">Sunday</option>
            <option value="monday">Monday</option>
          </select>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
            Time Format
          </label>
          <select
            value={preferences.timeFormat}
            onChange={(e) => handlePreferenceChange('timeFormat', e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
          >
            <option value="12h">12 Hour</option>
            <option value="24h">24 Hour</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Data Management</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div className="text-left">
              <p className="font-medium text-blue-900 dark:text-blue-300">Export Data</p>
              <p className="text-sm text-blue-700 dark:text-blue-400">Download all your fitness data</p>
            </div>
          </button>
          <button className="w-full flex items-center space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
            <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
            <div className="text-left">
              <p className="font-medium text-red-900 dark:text-red-300">Delete Account</p>
              <p className="text-sm text-red-700 dark:text-red-400">Permanently delete your account and data</p>
            </div>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Storage Usage</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Workout Data</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">2.3 MB</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Progress Photos</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">1.8 MB</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupportSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Help & Support</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <HelpCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">FAQ</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Find answers to common questions</p>
            </div>
          </button>
          <button className="w-full flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">Contact Support</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get help from our support team</p>
            </div>
          </button>
          <button className="w-full flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">Community Forum</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Connect with other users</p>
            </div>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About</h3>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Version</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Build</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">2024.01.15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Platform</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Web</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'appearance': return renderAppearanceSettings();
      case 'notifications': return renderNotificationSettings();
      case 'privacy': return renderPrivacySettings();
      case 'preferences': return renderPreferencesSettings();
      case 'data': return renderDataSettings();
      case 'support': return renderSupportSettings();
      default: return renderAppearanceSettings();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Customize your FitBot Pro experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <nav className="space-y-2">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                    activeSection === section.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <section.icon className="h-5 w-5" />
                  <div>
                    <p className="font-medium">{section.title}</p>
                    <p className="text-xs opacity-75">{section.description}</p>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {settingSections.find(s => s.id === activeSection)?.title}
            </h2>
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;