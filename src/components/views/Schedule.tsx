import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit3, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Apple,
  Target
} from 'lucide-react';

interface ScheduleEvent {
  id: string;
  title: string;
  type: 'workout' | 'meal' | 'goal';
  time: string;
  duration: number;
  description: string;
  completed: boolean;
}

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const [events, setEvents] = useState<{ [key: string]: ScheduleEvent[] }>({
    '2024-01-15': [
      {
        id: '1',
        title: 'Upper Body Workout',
        type: 'workout',
        time: '07:00',
        duration: 60,
        description: 'Chest, shoulders, and triceps focus',
        completed: true
      },
      {
        id: '2',
        title: 'Protein Shake',
        type: 'meal',
        time: '08:30',
        duration: 15,
        description: 'Post-workout recovery shake',
        completed: true
      }
    ],
    '2024-01-16': [
      {
        id: '3',
        title: 'Cardio Session',
        type: 'workout',
        time: '18:00',
        duration: 45,
        description: '30 min HIIT + 15 min cool down',
        completed: false
      }
    ],
    '2024-01-17': [
      {
        id: '4',
        title: 'Leg Day',
        type: 'workout',
        time: '07:00',
        duration: 75,
        description: 'Squats, deadlifts, and leg accessories',
        completed: false
      },
      {
        id: '5',
        title: 'Meal Prep',
        type: 'meal',
        time: '10:00',
        duration: 120,
        description: 'Prepare meals for the week',
        completed: false
      }
    ]
  });

  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'workout' as ScheduleEvent['type'],
    time: '07:00',
    duration: 60,
    description: ''
  });

  const getWeekDays = (date: Date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day;
    startDate.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'workout': return Dumbbell;
      case 'meal': return Apple;
      case 'goal': return Target;
      default: return Calendar;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'workout': return 'from-blue-500 to-purple-600';
      case 'meal': return 'from-green-500 to-emerald-600';
      case 'goal': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleAddEvent = () => {
    const dateKey = formatDate(selectedDate);
    const event: ScheduleEvent = {
      id: Date.now().toString(),
      ...newEvent,
      completed: false
    };

    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), event]
    }));

    setNewEvent({
      title: '',
      type: 'workout',
      time: '07:00',
      duration: 60,
      description: ''
    });
    setShowAddEvent(false);
  };

  const toggleEventComplete = (dateKey: string, eventId: string) => {
    setEvents(prev => ({
      ...prev,
      [dateKey]: prev[dateKey]?.map(event =>
        event.id === eventId ? { ...event, completed: !event.completed } : event
      ) || []
    }));
  };

  const deleteEvent = (dateKey: string, eventId: string) => {
    setEvents(prev => ({
      ...prev,
      [dateKey]: prev[dateKey]?.filter(event => event.id !== eventId) || []
    }));
  };

  const weekDays = getWeekDays(currentDate);
  const today = new Date();
  const todayKey = formatDate(today);
  const selectedDateKey = formatDate(selectedDate);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Workout Schedule</h1>
          <p className="text-gray-600 dark:text-gray-400">Plan and track your fitness activities</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'week'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'month'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Month
            </button>
          </div>
          <button
            onClick={() => setShowAddEvent(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(currentDate.getDate() - 7);
              setCurrentDate(newDate);
            }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(currentDate.getDate() + 7);
              setCurrentDate(newDate);
            }}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Week View */}
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day, index) => {
            const dayKey = formatDate(day);
            const dayEvents = events[dayKey] || [];
            const isToday = dayKey === todayKey;
            const isSelected = dayKey === selectedDateKey;

            return (
              <div key={index} className="space-y-2">
                <button
                  onClick={() => setSelectedDate(day)}
                  className={`w-full p-3 rounded-lg text-center transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : isToday
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className={`text-lg font-bold ${
                    isSelected ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}>
                    {day.getDate()}
                  </div>
                </button>
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => {
                    const Icon = getEventIcon(event.type);
                    return (
                      <div
                        key={event.id}
                        className={`p-2 rounded text-xs text-white bg-gradient-to-r ${getEventColor(event.type)} ${
                          event.completed ? 'opacity-60' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-1">
                          <Icon className="h-3 w-3" />
                          <span className="truncate">{event.title}</span>
                        </div>
                        <div className="text-xs opacity-80">{event.time}</div>
                      </div>
                    );
                  })}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Events */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>
        
        {events[selectedDateKey]?.length ? (
          <div className="space-y-3">
            {events[selectedDateKey].map((event) => {
              const Icon = getEventIcon(event.type);
              return (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    event.completed 
                      ? 'bg-gray-50 dark:bg-gray-700 border-green-500' 
                      : 'bg-gray-50 dark:bg-gray-700 border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${getEventColor(event.type)}`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className={`font-medium ${
                          event.completed 
                            ? 'text-gray-500 dark:text-gray-400 line-through' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {event.time} • {event.duration} min
                        </p>
                        {event.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleEventComplete(selectedDateKey, event.id)}
                        className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                          event.completed
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                        }`}
                      >
                        {event.completed ? 'Completed' : 'Mark Done'}
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteEvent(selectedDateKey, event.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No events scheduled for this day</p>
            <button
              onClick={() => setShowAddEvent(true)}
              className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first event
            </button>
          </div>
        )}
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add New Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., Upper Body Workout"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as ScheduleEvent['type'] })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="workout">Workout</option>
                    <option value="meal">Meal</option>
                    <option value="goal">Goal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={newEvent.duration}
                  onChange={(e) => setNewEvent({ ...newEvent, duration: Number(e.target.value) })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="60"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="Optional description..."
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddEvent(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;