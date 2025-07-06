import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Target,
  Activity,
  Flame,
  Clock,
  Award
} from 'lucide-react';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3M');
  const [selectedMetric, setSelectedMetric] = useState('workouts');

  const periods = ['1W', '1M', '3M', '6M', '1Y'];
  const metrics = [
    { id: 'workouts', label: 'Workouts', icon: Activity },
    { id: 'calories', label: 'Calories', icon: Flame },
    { id: 'duration', label: 'Duration', icon: Clock },
    { id: 'strength', label: 'Strength', icon: Target }
  ];

  const analyticsData = {
    workouts: {
      total: 84,
      average: 4.2,
      change: '+12%',
      unit: 'per week',
      chartData: [3, 4, 5, 4, 6, 5, 4, 5, 6, 4, 5, 6]
    },
    calories: {
      total: 15680,
      average: 784,
      change: '+8%',
      unit: 'per workout',
      chartData: [650, 720, 800, 750, 850, 780, 720, 800, 900, 750, 820, 880]
    },
    duration: {
      total: 63,
      average: 52,
      change: '+5%',
      unit: 'minutes avg',
      chartData: [45, 50, 60, 55, 65, 58, 50, 60, 70, 55, 62, 68]
    },
    strength: {
      total: 25,
      average: 2.1,
      change: '+18%',
      unit: 'kg increase',
      chartData: [1, 2, 3, 2, 4, 3, 2, 3, 4, 3, 4, 5]
    }
  };

  const weeklyStats = [
    { day: 'Mon', workouts: 1, calories: 450, duration: 45 },
    { day: 'Tue', workouts: 0, calories: 0, duration: 0 },
    { day: 'Wed', workouts: 1, calories: 520, duration: 60 },
    { day: 'Thu', workouts: 0, calories: 0, duration: 0 },
    { day: 'Fri', workouts: 1, calories: 380, duration: 40 },
    { day: 'Sat', workouts: 1, calories: 650, duration: 75 },
    { day: 'Sun', workouts: 0, calories: 0, duration: 0 }
  ];

  const achievements = [
    {
      title: 'Consistency Champion',
      description: '7 days workout streak',
      icon: '🔥',
      date: '2024-01-15',
      type: 'streak'
    },
    {
      title: 'Strength Milestone',
      description: 'Bench press 85kg PR',
      icon: '💪',
      date: '2024-01-12',
      type: 'strength'
    },
    {
      title: 'Calorie Crusher',
      description: '1000+ calories burned',
      icon: '⚡',
      date: '2024-01-10',
      type: 'calories'
    },
    {
      title: 'Time Master',
      description: '2 hours workout completed',
      icon: '⏰',
      date: '2024-01-08',
      type: 'duration'
    }
  ];

  const currentData = analyticsData[selectedMetric as keyof typeof analyticsData];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fitness Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Detailed insights into your fitness journey</p>
        </div>
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

      {/* Metric Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`p-4 rounded-lg transition-all ${
                selectedMetric === metric.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white transform scale-105'
                  : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <metric.icon className={`h-6 w-6 mx-auto mb-2 ${
                selectedMetric === metric.id ? 'text-white' : 'text-gray-600 dark:text-gray-400'
              }`} />
              <p className={`font-medium ${
                selectedMetric === metric.id ? 'text-white' : 'text-gray-900 dark:text-white'
              }`}>
                {metric.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {metrics.find(m => m.id === selectedMetric)?.label} Trend
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Last {selectedPeriod}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentData.total}</p>
            <p className="text-sm text-green-600 dark:text-green-400">{currentData.change}</p>
          </div>
        </div>
        
        {/* Chart Placeholder */}
        <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">Chart visualization</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Average: {currentData.average} {currentData.unit}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">This Week</h2>
          <div className="space-y-4">
            {weeklyStats.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    day.workouts > 0 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}></div>
                  <span className="font-medium text-gray-900 dark:text-white">{day.day}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{day.workouts} workout{day.workouts !== 1 ? 's' : ''}</span>
                  <span>{day.calories} cal</span>
                  <span>{day.duration}min</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-blue-900 dark:text-blue-300">Week Total</span>
              <div className="flex items-center space-x-4 text-sm text-blue-800 dark:text-blue-400">
                <span>4 workouts</span>
                <span>2000 cal</span>
                <span>220min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Achievements</h2>
            <Award className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {new Date(achievement.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Best Performance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Saturday workouts burn 23% more calories</p>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Consistency</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">You're most consistent on weekdays</p>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Target className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Goal Progress</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">80% of monthly goals achieved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;