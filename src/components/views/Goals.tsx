import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Calendar, 
  TrendingUp,
  CheckCircle,
  Clock,
  Edit3,
  Trash2
} from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'Strength' | 'Cardio' | 'Weight' | 'Habit';
  target: number;
  current: number;
  unit: string;
  deadline: string;
  completed: boolean;
  createdAt: string;
}

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Bench Press 100kg',
      description: 'Increase bench press to 100kg for 1 rep max',
      category: 'Strength',
      target: 100,
      current: 85,
      unit: 'kg',
      deadline: '2024-03-15',
      completed: false,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      title: 'Run 5K in under 25 minutes',
      description: 'Improve 5K running time to under 25 minutes',
      category: 'Cardio',
      target: 25,
      current: 28,
      unit: 'minutes',
      deadline: '2024-02-28',
      completed: false,
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      title: 'Lose 10kg',
      description: 'Reach target weight of 70kg',
      category: 'Weight',
      target: 10,
      current: 7,
      unit: 'kg lost',
      deadline: '2024-04-01',
      completed: false,
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      title: 'Workout 4 times per week',
      description: 'Maintain consistent workout schedule',
      category: 'Habit',
      target: 16,
      current: 16,
      unit: 'workouts this month',
      deadline: '2024-01-31',
      completed: true,
      createdAt: '2024-01-01'
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'Strength' as Goal['category'],
    target: 0,
    unit: '',
    deadline: ''
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Strength': return 'from-blue-500 to-purple-600';
      case 'Cardio': return 'from-red-500 to-orange-500';
      case 'Weight': return 'from-green-500 to-emerald-600';
      case 'Habit': return 'from-yellow-500 to-amber-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Strength': return '💪';
      case 'Cardio': return '🏃‍♂️';
      case 'Weight': return '⚖️';
      case 'Habit': return '📅';
      default: return '🎯';
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target || !newGoal.deadline) return;

    const goal: Goal = {
      id: Date.now().toString(),
      ...newGoal,
      current: 0,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      description: '',
      category: 'Strength',
      target: 0,
      unit: '',
      deadline: ''
    });
    setShowAddGoal(false);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, completed: !goal.completed, current: goal.completed ? 0 : goal.target }
        : goal
    ));
  };

  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fitness Goals</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your progress and achieve your fitness targets</p>
        </div>
        <button
          onClick={() => setShowAddGoal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Goal</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{goals.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Goals</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedGoals.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeGoals.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round((completedGoals.length / goals.length) * 100)}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add New Goal</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., Bench Press 100kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="Describe your goal..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as Goal['category'] })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Weight">Weight</option>
                    <option value="Habit">Habit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target</label>
                  <input
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unit</label>
                  <input
                    type="text"
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="kg, minutes, reps..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deadline</label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddGoal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Goals */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Goals</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeGoals.map((goal) => (
            <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${getCategoryColor(goal.category)}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getCategoryIcon(goal.category)}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{goal.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{goal.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(goal.category)}`}
                      style={{ width: `${getProgressPercentage(goal.current, goal.target)}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.round(getProgressPercentage(goal.current, goal.target))}% complete
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {getDaysUntilDeadline(goal.deadline)} days left
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                  <button
                    onClick={() => handleToggleComplete(goal.id)}
                    className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Mark Complete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Completed Goals 🎉</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedGoals.map((goal) => (
              <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm opacity-75 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-2xl">✅</div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white line-through">{goal.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{goal.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      ✓ Completed {goal.target} {goal.unit}
                    </span>
                    <button
                      onClick={() => handleToggleComplete(goal.id)}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Reactivate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;