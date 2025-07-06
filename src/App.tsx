import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { FitnessProvider } from './contexts/FitnessContext';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import MainContent from './components/MainContent';

function App() {
  return (
    <ThemeProvider>
      <FitnessProvider>
        <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopNavigation />
            <MainContent />
          </div>
        </div>
      </FitnessProvider>
    </ThemeProvider>
  );
}

export default App;