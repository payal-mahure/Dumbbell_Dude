import React from 'react';
import { 
  Activity, 
  Target, 
  Calendar, 
  TrendingUp,
  Flame,
  Clock,
  Award,
  Zap
} from 'lucide-react';
import { useFitness } from '../../contexts/FitnessContext';

const Dashboard = () => {
  const { userProfile, workoutPlans, setCurrentView } = useFitness();

  const stats = [
    {
      icon: Flame,
      label: 'Calories Burned Today',
      value: '847',
      change: '+12%',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Activity,
      label: 'Workouts This Week',
      value: '4',
      change: '+25%',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clock,
      label: 'Total Exercise Time',
      value: '3h 45m',
      change: '+8%',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      label: 'Goals Achieved',
      value: '12/15',
      change: '+2',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const recentWorkouts = [
    { name: 'Upper Body Strength', date: 'Today', duration: '45 min', calories: 320 },
    { name: 'HIIT Cardio', date: 'Yesterday', duration: '30 min', calories: 280 },
    { name: 'Leg Day', date: '2 days ago', duration: '60 min', calories: 420 }
  ];

  const todaysGoals = [
    { task: 'Complete morning workout', completed: true },
    { task: 'Drink 8 glasses of water', completed: false },
    { task: 'Take 10,000 steps', completed: false },
    { task: 'Eat 5 servings of vegetables', completed: true }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {userProfile.name}! 🎯</h1>
            <p className="text-blue-100 mb-4">
              You're on track to achieve your {userProfile.goal.toLowerCase()} goal. Keep pushing!
            </p>
            <button 
              onClick={() => setCurrentView('chat')}
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Ask AI Coach
            </button>
          </div>
          <div className="text-6xl opacity-20">💪</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Workouts */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Workouts</h2>
            <button 
              onClick={() => setCurrentView('workouts')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentWorkouts.map((workout, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{workout.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{workout.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">{workout.duration}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{workout.calories} cal</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Goals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Today's Goals</h2>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {todaysGoals.map((goal, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  goal.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}>
                  {goal.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <span className={`text-sm ${
                  goal.completed 
                    ? 'text-gray-500 dark:text-gray-400 line-through' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {goal.task}
                </span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setCurrentView('goals')}
            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            Manage Goals
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setCurrentView('workouts')}
            className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105"
          >
            <Zap className="h-8 w-8 mb-2" />
            <span className="font-medium">Start Workout</span>
          </button>
          <button 
            onClick={() => setCurrentView('chat')}
            className="flex flex-col items-center p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105"
          >
            <Activity className="h-8 w-8 mb-2" />
            <span className="font-medium">Ask AI Coach</span>
          </button>
          <button 
            onClick={() => setCurrentView('diet')}
            className="flex flex-col items-center p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105"
          >
            <Calendar className="h-8 w-8 mb-2" />
            <span className="font-medium">Meal Plan</span>
          </button>
          <button 
            onClick={() => setCurrentView('progress')}
            className="flex flex-col items-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
          >
            <TrendingUp className="h-8 w-8 mb-2" />
            <span className="font-medium">View Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;