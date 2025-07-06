import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Target,
  Zap,
  Info
} from 'lucide-react';
import { useFitness } from '../../contexts/FitnessContext';

const ExerciseLibrary = () => {
  const { exercises } = useFitness();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMuscle, setFilterMuscle] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterEquipment, setFilterEquipment] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  const muscles = ['All', ...Array.from(new Set(exercises.map(e => e.muscle)))];
  const categories = ['All', ...Array.from(new Set(exercises.map(e => e.category)))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const equipment = ['All', ...Array.from(new Set(exercises.map(e => e.equipment)))];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscle = filterMuscle === 'All' || exercise.muscle === filterMuscle;
    const matchesCategory = filterCategory === 'All' || exercise.category === filterCategory;
    const matchesDifficulty = filterDifficulty === 'All' || exercise.difficulty === filterDifficulty;
    const matchesEquipment = filterEquipment === 'All' || exercise.equipment === filterEquipment;
    
    return matchesSearch && matchesMuscle && matchesCategory && matchesDifficulty && matchesEquipment;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getMuscleIcon = (muscle: string) => {
    switch (muscle) {
      case 'Chest': return '💪';
      case 'Back': return '🏋️';
      case 'Legs': return '🦵';
      case 'Shoulders': return '🤸';
      case 'Arms': return '💪';
      case 'Core': return '🎯';
      case 'Full Body': return '🔥';
      default: return '⚡';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Strength': return 'from-blue-500 to-purple-600';
      case 'Cardio': return 'from-red-500 to-orange-500';
      case 'Core': return 'from-green-500 to-emerald-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exercise Library</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover {exercises.length}+ exercises with detailed instructions</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-80 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="font-medium text-gray-900 dark:text-white">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Muscle Group</label>
            <select
              value={filterMuscle}
              onChange={(e) => setFilterMuscle(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {muscles.map(muscle => (
                <option key={muscle} value={muscle}>{muscle}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Equipment</label>
            <select
              value={filterEquipment}
              onChange={(e) => setFilterEquipment(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {equipment.map(eq => (
                <option key={eq} value={eq}>{eq}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${getCategoryColor(exercise.category)}`}></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getMuscleIcon(exercise.muscle)}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{exercise.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{exercise.muscle} • {exercise.equipment}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-1">
                    <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{exercise.sets} sets</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-1">
                    <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{exercise.reps}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg mx-auto mb-1">
                    <Clock className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{exercise.calories} cal</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedExercise(selectedExercise === exercise.id ? null : exercise.id)}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <Info className="h-4 w-4" />
                <span>{selectedExercise === exercise.id ? 'Hide Instructions' : 'View Instructions'}</span>
              </button>
            </div>

            {selectedExercise === exercise.id && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">How to perform:</h4>
                <ol className="space-y-2">
                  {exercise.instructions.map((instruction, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Recommended:</strong> {exercise.sets} sets of {exercise.reps} reps
                    {exercise.duration && ` for ${exercise.duration}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No exercises found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;