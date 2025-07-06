import React, { useState } from 'react';
import { 
  Apple, 
  Clock, 
  Target, 
  Utensils,
  ChefHat,
  Flame,
  Scale,
  Plus
} from 'lucide-react';
import { useFitness } from '../../contexts/FitnessContext';

const DietPlans = () => {
  const { dietPlans } = useFitness();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const getGoalColor = (goal: string) => {
    switch (goal) {
      case 'Build Muscle': return 'from-blue-500 to-purple-600';
      case 'Lose Weight': return 'from-red-500 to-orange-500';
      case 'Maintain': return 'from-green-500 to-emerald-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'Breakfast': return '🌅';
      case 'Lunch': return '☀️';
      case 'Dinner': return '🌙';
      case 'Snack': return '🍎';
      default: return '🍽️';
    }
  };

  const nutritionTips = [
    {
      icon: '💧',
      title: 'Stay Hydrated',
      tip: 'Drink at least 8 glasses of water daily for optimal performance and recovery.'
    },
    {
      icon: '🥗',
      title: 'Eat the Rainbow',
      tip: 'Include colorful fruits and vegetables to get a variety of nutrients.'
    },
    {
      icon: '⏰',
      title: 'Meal Timing',
      tip: 'Eat protein within 30 minutes post-workout for optimal muscle recovery.'
    },
    {
      icon: '🥜',
      title: 'Healthy Fats',
      tip: 'Include nuts, avocados, and olive oil for hormone production and satiety.'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Diet Plans</h1>
          <p className="text-gray-600 dark:text-gray-400">Fuel your body with the right nutrition for your goals</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all">
          <Plus className="h-4 w-4" />
          <span>Create Custom Plan</span>
        </button>
      </div>

      {/* Nutrition Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">💡 Nutrition Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {nutritionTips.map((tip, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="text-2xl mb-2">{tip.icon}</div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">{tip.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Diet Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dietPlans.map((plan) => (
          <div key={plan.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${getGoalColor(plan.goal)}`}></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${getGoalColor(plan.goal)}`}>
                    <Apple className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{plan.goal}</p>
                  </div>
                </div>
              </div>

              {/* Macros Overview */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg mx-auto mb-2">
                    <Flame className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{plan.calories}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Calories</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-2">
                    <Scale className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{plan.protein}g</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Protein</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg mx-auto mb-2">
                    <Target className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{plan.carbs}g</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Carbs</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-2">
                    <ChefHat className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{plan.fats}g</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Fats</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                {selectedPlan === plan.id ? 'Hide Meals' : 'View Meal Plan'}
              </button>
            </div>

            {selectedPlan === plan.id && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Daily Meal Plan</h4>
                <div className="space-y-4">
                  {plan.meals.map((meal) => (
                    <div key={meal.id} className="bg-white dark:bg-gray-600 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setSelectedMeal(selectedMeal === meal.id ? null : meal.id)}
                        className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{getMealIcon(meal.type)}</span>
                            <div>
                              <h5 className="font-medium text-gray-900 dark:text-white">{meal.name}</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{meal.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900 dark:text-white">{meal.calories} cal</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g
                            </p>
                          </div>
                        </div>
                      </button>

                      {selectedMeal === meal.id && (
                        <div className="border-t border-gray-200 dark:border-gray-500 p-4 bg-gray-50 dark:bg-gray-700">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h6 className="font-medium text-gray-900 dark:text-white mb-2">Ingredients:</h6>
                              <ul className="space-y-1">
                                {meal.ingredients.map((ingredient, index) => (
                                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                    <span>{ingredient}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h6 className="font-medium text-gray-900 dark:text-white mb-2">Instructions:</h6>
                              <ol className="space-y-1">
                                {meal.instructions.map((instruction, index) => (
                                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                                    {index + 1}. {instruction}
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietPlans;