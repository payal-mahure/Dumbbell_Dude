import React, { useState } from 'react';
import { 
  Clock, 
  Target, 
  Zap, 
  Users, 
  Play,
  Star,
  Filter,
  Search
} from 'lucide-react';
import { useFitness } from '../../contexts/FitnessContext';

const WorkoutPlans = () => {
  const { workoutPlans, exercises } = useFitness();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [filterGoal, setFilterGoal] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const goals = ['All', 'Build Muscle', 'Lose Weight', 'Build Strength', 'Stay Fit', 'Build Foundation'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredPlans = workoutPlans.filter(plan => {
    const matchesGoal = filterGoal === 'All' || plan.goal === filterGoal;
    const matchesDifficulty = filterDifficulty === 'All' || plan.difficulty === filterDifficulty;
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGoal && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getGoalIcon = (goal: string) => {
    switch (goal) {
      case 'Build Muscle': return '💪';
      case 'Lose Weight': return '🔥';
      case 'Build Strength': return '⚡';
      case 'Stay Fit': return '🏃‍♂️';
      case 'Build Foundation': return '🏗️';
      default: return '🎯';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Workout Plans</h1>
          <p className="text-gray-600 dark:text-gray-400">Choose from our expertly designed workout programs</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search workouts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="font-medium text-gray-900 dark:text-white">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Goal</label>
            <select
              value={filterGoal}
              onChange={(e) => setFilterGoal(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {goals.map(goal => (
                <option key={goal} value={goal}>{goal}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Workout Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{getGoalIcon(plan.goal)}</div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(plan.difficulty)}`}>
                  {plan.difficulty}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{plan.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{plan.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4" />
                  <span>{plan.exercises.length} exercises</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">4.8 (124 reviews)</span>
                </div>
                <button
                  onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  <Play className="h-4 w-4" />
                  <span>View Plan</span>
                </button>
              </div>
            </div>
            
            {selectedPlan === plan.id && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Exercises in this plan:</h4>
                <div className="space-y-3">
                  {plan.exercises.map((exercise, index) => (
                    <div key={exercise.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">{exercise.name}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {exercise.sets} sets × {exercise.reps} | {exercise.muscle}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {exercise.calories} cal
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all">
                  Start This Workout
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏋️‍♂️</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No workout plans found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlans;