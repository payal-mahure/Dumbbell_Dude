import React, { useState } from 'react';
import { 
  User, 
  Edit3, 
  Camera, 
  Target, 
  Activity,
  Calendar,
  Award,
  Settings,
  Save
} from 'lucide-react';
import { useFitness } from '../../contexts/FitnessContext';

const Profile = () => {
  const { userProfile, setUserProfile } = useFitness();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

  const handleSave = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const fitnessStats = [
    { label: 'Workouts Completed', value: '84', icon: Activity, color: 'from-blue-500 to-cyan-600' },
    { label: 'Goals Achieved', value: '12', icon: Target, color: 'from-green-500 to-emerald-600' },
    { label: 'Days Active', value: '156', icon: Calendar, color: 'from-purple-500 to-pink-600' },
    { label: 'Achievements', value: '8', icon: Award, color: 'from-orange-500 to-red-500' }
  ];

  const achievements = [
    { title: 'First Workout', description: 'Completed your first workout', icon: '🎯', date: '2023-08-15' },
    { title: 'Week Warrior', description: '7-day workout streak', icon: '🔥', date: '2023-09-01' },
    { title: 'Strength Builder', description: 'Increased bench press by 20kg', icon: '💪', date: '2023-10-15' },
    { title: 'Consistency King', description: '30-day workout streak', icon: '👑', date: '2023-11-20' },
    { title: 'Goal Crusher', description: 'Achieved 5 fitness goals', icon: '🏆', date: '2023-12-10' },
    { title: 'Endurance Expert', description: 'Ran 5K under 25 minutes', icon: '🏃‍♂️', date: '2024-01-05' }
  ];

  const preferences = [
    'Strength Training',
    'HIIT',
    'Cardio',
    'Yoga',
    'Bodyweight',
    'Powerlifting',
    'CrossFit',
    'Running'
  ];

  const getBMI = () => {
    const heightInM = editedProfile.height / 100;
    const bmi = editedProfile.weight / (heightInM * heightInM);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const bmi = parseFloat(getBMI());
  const bmiInfo = getBMICategory(bmi);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your personal information and fitness preferences</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-6 mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {editedProfile.name.charAt(0)}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <Camera className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{editedProfile.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{editedProfile.goal}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{editedProfile.experience} Level</p>
              </div>
            </div>

            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
                  <input
                    type="number"
                    value={editedProfile.age}
                    onChange={(e) => setEditedProfile({ ...editedProfile, age: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={editedProfile.weight}
                    onChange={(e) => setEditedProfile({ ...editedProfile, weight: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={editedProfile.height}
                    onChange={(e) => setEditedProfile({ ...editedProfile, height: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Goal</label>
                  <select
                    value={editedProfile.goal}
                    onChange={(e) => setEditedProfile({ ...editedProfile, goal: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Build Muscle">Build Muscle</option>
                    <option value="Lose Weight">Lose Weight</option>
                    <option value="Build Strength">Build Strength</option>
                    <option value="Stay Fit">Stay Fit</option>
                    <option value="Improve Endurance">Improve Endurance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Experience</label>
                  <select
                    value={editedProfile.experience}
                    onChange={(e) => setEditedProfile({ ...editedProfile, experience: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{editedProfile.age}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Years Old</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{editedProfile.weight}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">kg</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{editedProfile.height}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">cm</p>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className={`text-2xl font-bold ${bmiInfo.color}`}>{getBMI()}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">BMI</p>
                </div>
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Workout Preferences</h3>
            {isEditing ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {preferences.map((pref) => (
                  <label key={pref} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editedProfile.preferences.includes(pref)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditedProfile({
                            ...editedProfile,
                            preferences: [...editedProfile.preferences, pref]
                          });
                        } else {
                          setEditedProfile({
                            ...editedProfile,
                            preferences: editedProfile.preferences.filter(p => p !== pref)
                          });
                        }
                      }}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{pref}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {editedProfile.preferences.map((pref) => (
                  <span
                    key={pref}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Fitness Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Fitness Stats</h3>
            <div className="space-y-4">
              {fitnessStats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Metrics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Health Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">BMI</span>
                <div className="text-right">
                  <span className={`font-bold ${bmiInfo.color}`}>{getBMI()}</span>
                  <p className={`text-xs ${bmiInfo.color}`}>{bmiInfo.category}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Body Fat</span>
                <span className="font-bold text-gray-900 dark:text-white">15.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Muscle Mass</span>
                <span className="font-bold text-gray-900 dark:text-white">42.1kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Water %</span>
                <span className="font-bold text-gray-900 dark:text-white">58.7%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Account Settings</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Privacy Settings</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <Activity className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Export Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;