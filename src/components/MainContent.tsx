import React from 'react';
import { useFitness } from '../contexts/FitnessContext';
import Dashboard from './views/Dashboard';
import ChatBot from './views/ChatBot';
import WorkoutPlans from './views/WorkoutPlans';
import DietPlans from './views/DietPlans';
import ExerciseLibrary from './views/ExerciseLibrary';
import Goals from './views/Goals';
import Progress from './views/Progress';
import Schedule from './views/Schedule';
import Analytics from './views/Analytics';
import Profile from './views/Profile';
import Settings from './views/Settings';

const MainContent = () => {
  const { currentView } = useFitness();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <ChatBot />;
      case 'workouts':
        return <WorkoutPlans />;
      case 'diet':
        return <DietPlans />;
      case 'exercises':
        return <ExerciseLibrary />;
      case 'goals':
        return <Goals />;
      case 'progress':
        return <Progress />;
      case 'schedule':
        return <Schedule />;
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
      {renderView()}
    </div>
  );
};

export default MainContent;