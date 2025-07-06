import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Weight, 
  Ruler,
  Activity,
  Target,
  Camera,
  Plus
} from 'lucide-react';

const Progress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3M');
  const [activeTab, setActiveTab] = useState('overview');

  const periods = ['1W', '1M', '3M', '6M', '1Y'];
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'weight', label: 'Weight' },
    { id: 'measurements', label: 'Measurements' },
    { id: 'workouts', label: 'Workouts' },
    { id: 'photos', label: 'Progress Photos' }
  ];

  const progressStats = [
    {
      icon: Weight,
      label: 'Weight Lost',
      value: '7.2 kg',
      change: '-2.1 kg this month',
      color: 'from-green-500 to-emerald-600',
      positive: true
    },
    {
      icon: Activity,
      label: 'Workouts Completed',
      value: '28',
      change: '+4 this week',
      color: 'from-blue-500 to-cyan-600',
      positive: true
    },
    {
      icon: Target,
      label: 'Goals Achieved',
      value: '12/15',
      change: '80% success rate',
      color: 'from-purple-500 to-pink-600',
      positive: true
    },
    {
      icon: TrendingUp,
      label: 'Strength Increase',
      value: '15%',
      change: '+5% this month',
      color: 'from-orange-500 to-red-500',
      positive: true
    }
  ];

  const weightData = [
    { date: '2024-01-01', weight: 77.0 },
    { date: '2024-01-08', weight: 76.5 },
    { date: '2024-01-15', weight: 76.2 },
    { date: '2024-01-22', weight: 75.8 },
    { date: '2024-01-29', weight: 75.5 },
    { date: '2024-02-05', weight: 75.1 },
    { date: '2024-02-12', weight: 74.8 },
    { date: '2024-02-19', weight: 74.5 },
    { date: '2024-02-26', weight: 74.2 },
    { date: '2024-03-05', weight: 73.8 },
    { date: '2024-03-12', weight: 73.5 },
    { date: '2024-03-19', weight: 73.2 },
    { date: '2024-03-26', weight: 72.8 }
  ];

  const measurements = [
    { part: 'Chest', current: 102, previous: 105, unit: 'cm' },
    { part: 'Waist', current: 85, previous: 92, unit: 'cm' },
    { part: 'Arms', current: 35, previous: 33, unit: 'cm' },
    { part: 'Thighs', current: 58, previous: 60, unit: 'cm' },
    { part: 'Body Fat', current: 15.2, previous: 18.5, unit: '%' }
  ];

  const workoutStats = [
    { exercise: 'Bench Press', current: '85kg', previous: '75kg', improvement: '+10kg' },
    { exercise: 'Squat', current: '120kg', previous: '100kg', improvement: '+20kg' },
    { exercise: 'Deadlift', current: '140kg', previous: '120kg', improvement: '+20kg' },
    { exercise: '5K Run', current: '28:30', previous: '32:15', improvement: '-3:45' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {progressStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Weight Chart Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Weight Progress</h2>
          <div className="flex space-x-2">
            {periods.map(period => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">Weight chart visualization</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Showing {selectedPeriod} data</p>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Achievements 🏆</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🎯</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Weight Loss Milestone</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lost 7kg - halfway to your goal!</p>
            </div>
            <span className="text-sm text-green-600 dark:text-green-400">2 days ago</span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">💪</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Strength PR</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">New bench press record: 85kg!</p>
            </div>
            <span className="text-sm text-blue-600 dark:text-blue-400">1 week ago</span>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🔥</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Consistency Streak</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">14 days workout streak!</p>
            </div>
            <span className="text-sm text-purple-600 dark:text-purple-400">Ongoing</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMeasurements = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Body Measurements</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Measurement</span>
          </button>
        </div>
        <div className="space-y-4">
          {measurements.map((measurement, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{measurement.part}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current: {measurement.current}{measurement.unit}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-white">
                  {measurement.current > measurement.previous ? '+' : ''}
                  {(measurement.current - measurement.previous).toFixed(1)}{measurement.unit}
                </p>
                <p className={`text-sm ${
                  measurement.current < measurement.previous ? 'text-green-600' : 'text-blue-600'
                }`}>
                  vs. last month
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWorkouts = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Strength Progress</h2>
        <div className="space-y-4">
          {workoutStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{stat.exercise}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Previous: {stat.previous}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">{stat.current}</p>
                <p className="text-sm text-green-600 dark:text-green-400">{stat.improvement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPhotos = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Progress Photos</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Camera className="h-4 w-4" />
            <span>Add Photo</span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((photo) => (
            <div key={photo} className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Photo {photo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Progress Tracking</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor your fitness journey and celebrate your achievements</p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="flex space-x-1 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'weight' && renderOverview()}
      {activeTab === 'measurements' && renderMeasurements()}
      {activeTab === 'workouts' && renderWorkouts()}
      {activeTab === 'photos' && renderPhotos()}
    </div>
  );
};

export default Progress;