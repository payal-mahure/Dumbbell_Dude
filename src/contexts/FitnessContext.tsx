import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscle: string;
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructions: string[];
  sets: number;
  reps: string;
  duration?: string;
  calories: number;
  image?: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  goal: string;
  duration: string;
  difficulty: string;
  exercises: Exercise[];
  description: string;
}

export interface DietPlan {
  id: string;
  name: string;
  goal: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  instructions: string[];
}

interface FitnessContextType {
  currentView: string;
  setCurrentView: (view: string) => void;
  exercises: Exercise[];
  workoutPlans: WorkoutPlan[];
  dietPlans: DietPlan[];
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
}

export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  experience: string;
  preferences: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'workout' | 'diet' | 'general';
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};

export const FitnessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm your personal fitness assistant. I can help you with workouts, diet plans, and answer any fitness questions you have. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'general'
    }
  ]);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'John Doe',
    age: 25,
    weight: 70,
    height: 175,
    goal: 'Build Muscle',
    experience: 'Intermediate',
    preferences: ['Strength Training', 'HIIT']
  });

  const exercises: Exercise[] = [
    // Chest Exercises
    {
      id: 'chest-1',
      name: 'Push-ups',
      category: 'Strength',
      muscle: 'Chest',
      equipment: 'Bodyweight',
      difficulty: 'Beginner',
      instructions: [
        'Start in a plank position with hands shoulder-width apart',
        'Lower your body until chest nearly touches the floor',
        'Push back up to starting position',
        'Keep your core tight throughout the movement'
      ],
      sets: 3,
      reps: '10-15',
      calories: 50
    },
    {
      id: 'chest-2',
      name: 'Bench Press',
      category: 'Strength',
      muscle: 'Chest',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      instructions: [
        'Lie on bench with feet flat on floor',
        'Grip barbell slightly wider than shoulder-width',
        'Lower bar to chest with control',
        'Press bar back to starting position'
      ],
      sets: 4,
      reps: '8-12',
      calories: 80
    },
    {
      id: 'chest-3',
      name: 'Dumbbell Flyes',
      category: 'Strength',
      muscle: 'Chest',
      equipment: 'Dumbbells',
      difficulty: 'Intermediate',
      instructions: [
        'Lie on bench holding dumbbells above chest',
        'Lower weights in wide arc until chest stretch is felt',
        'Bring dumbbells back together above chest',
        'Keep slight bend in elbows throughout'
      ],
      sets: 3,
      reps: '12-15',
      calories: 60
    },
    // Back Exercises
    {
      id: 'back-1',
      name: 'Pull-ups',
      category: 'Strength',
      muscle: 'Back',
      equipment: 'Pull-up Bar',
      difficulty: 'Advanced',
      instructions: [
        'Hang from pull-up bar with overhand grip',
        'Pull body up until chin clears the bar',
        'Lower with control to starting position',
        'Keep core engaged throughout'
      ],
      sets: 3,
      reps: '5-10',
      calories: 70
    },
    {
      id: 'back-2',
      name: 'Bent-over Rows',
      category: 'Strength',
      muscle: 'Back',
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      instructions: [
        'Stand with feet hip-width apart, holding barbell',
        'Hinge at hips, keeping back straight',
        'Pull barbell to lower chest/upper abdomen',
        'Lower with control'
      ],
      sets: 4,
      reps: '8-12',
      calories: 75
    },
    {
      id: 'back-3',
      name: 'Lat Pulldowns',
      category: 'Strength',
      muscle: 'Back',
      equipment: 'Cable Machine',
      difficulty: 'Beginner',
      instructions: [
        'Sit at lat pulldown machine',
        'Grip bar wider than shoulder-width',
        'Pull bar down to upper chest',
        'Slowly return to starting position'
      ],
      sets: 3,
      reps: '10-15',
      calories: 65
    },
    // Leg Exercises
    {
      id: 'legs-1',
      name: 'Squats',
      category: 'Strength',
      muscle: 'Legs',
      equipment: 'Bodyweight',
      difficulty: 'Beginner',
      instructions: [
        'Stand with feet shoulder-width apart',
        'Lower body as if sitting back into a chair',
        'Keep chest up and knees behind toes',
        'Return to standing position'
      ],
      sets: 3,
      reps: '15-20',
      calories: 85
    },
    {
      id: 'legs-2',
      name: 'Deadlifts',
      category: 'Strength',
      muscle: 'Legs',
      equipment: 'Barbell',
      difficulty: 'Advanced',
      instructions: [
        'Stand with feet hip-width apart, barbell over mid-foot',
        'Hinge at hips and knees to grip bar',
        'Drive through heels to stand up straight',
        'Lower bar with control'
      ],
      sets: 4,
      reps: '6-10',
      calories: 100
    },
    {
      id: 'legs-3',
      name: 'Lunges',
      category: 'Strength',
      muscle: 'Legs',
      equipment: 'Bodyweight',
      difficulty: 'Beginner',
      instructions: [
        'Step forward with one leg',
        'Lower hips until both knees are at 90 degrees',
        'Push back to starting position',
        'Alternate legs'
      ],
      sets: 3,
      reps: '12 each leg',
      calories: 70
    },
    // Shoulder Exercises
    {
      id: 'shoulders-1',
      name: 'Overhead Press',
      category: 'Strength',
      muscle: 'Shoulders',
      equipment: 'Dumbbells',
      difficulty: 'Intermediate',
      instructions: [
        'Stand with dumbbells at shoulder height',
        'Press weights overhead until arms are straight',
        'Lower with control to starting position',
        'Keep core tight throughout'
      ],
      sets: 3,
      reps: '10-12',
      calories: 60
    },
    {
      id: 'shoulders-2',
      name: 'Lateral Raises',
      category: 'Strength',
      muscle: 'Shoulders',
      equipment: 'Dumbbells',
      difficulty: 'Beginner',
      instructions: [
        'Stand with dumbbells at sides',
        'Raise arms out to sides until parallel to floor',
        'Lower with control',
        'Keep slight bend in elbows'
      ],
      sets: 3,
      reps: '12-15',
      calories: 45
    },
    // Arms Exercises
    {
      id: 'arms-1',
      name: 'Bicep Curls',
      category: 'Strength',
      muscle: 'Arms',
      equipment: 'Dumbbells',
      difficulty: 'Beginner',
      instructions: [
        'Stand with dumbbells at sides',
        'Curl weights up to shoulders',
        'Lower with control',
        'Keep elbows stationary'
      ],
      sets: 3,
      reps: '12-15',
      calories: 40
    },
    {
      id: 'arms-2',
      name: 'Tricep Dips',
      category: 'Strength',
      muscle: 'Arms',
      equipment: 'Bench',
      difficulty: 'Intermediate',
      instructions: [
        'Sit on edge of bench, hands beside hips',
        'Slide off bench, supporting weight with arms',
        'Lower body by bending elbows',
        'Push back up to starting position'
      ],
      sets: 3,
      reps: '10-15',
      calories: 55
    },
    // Core Exercises
    {
      id: 'core-1',
      name: 'Plank',
      category: 'Core',
      muscle: 'Core',
      equipment: 'Bodyweight',
      difficulty: 'Beginner',
      instructions: [
        'Start in push-up position',
        'Hold body in straight line from head to heels',
        'Keep core tight and breathe normally',
        'Hold for specified time'
      ],
      sets: 3,
      reps: '30-60 seconds',
      duration: '30-60 seconds',
      calories: 25
    },
    {
      id: 'core-2',
      name: 'Crunches',
      category: 'Core',
      muscle: 'Core',
      equipment: 'Bodyweight',
      difficulty: 'Beginner',
      instructions: [
        'Lie on back with knees bent',
        'Place hands behind head',
        'Lift shoulders off ground',
        'Lower with control'
      ],
      sets: 3,
      reps: '15-25',
      calories: 35
    },
    // Cardio Exercises
    {
      id: 'cardio-1',
      name: 'Burpees',
      category: 'Cardio',
      muscle: 'Full Body',
      equipment: 'Bodyweight',
      difficulty: 'Advanced',
      instructions: [
        'Start standing, then squat down',
        'Jump feet back to plank position',
        'Do a push-up',
        'Jump feet forward and jump up'
      ],
      sets: 3,
      reps: '8-15',
      calories: 120
    },
    {
      id: 'cardio-2',
      name: 'Mountain Climbers',
      category: 'Cardio',
      muscle: 'Full Body',
      equipment: 'Bodyweight',
      difficulty: 'Intermediate',
      instructions: [
        'Start in plank position',
        'Bring one knee to chest',
        'Quickly switch legs',
        'Continue alternating at fast pace'
      ],
      sets: 3,
      reps: '30 seconds',
      duration: '30 seconds',
      calories: 90
    },
    {
      id: 'cardio-3',
      name: 'Jumping Jacks',
      category: 'Cardio',
      muscle: 'Full Body',
      equipment: 'Bodyweight',
      difficulty: 'Beginner',
      instructions: [
        'Start with feet together, arms at sides',
        'Jump feet apart while raising arms overhead',
        'Jump back to starting position',
        'Continue at steady pace'
      ],
      sets: 3,
      reps: '30-60 seconds',
      duration: '30-60 seconds',
      calories: 80
    },
    {
      id: 'cardio-4',
      name: 'High Knees',
      category: 'Cardio',
      muscle: 'Full Body',
      equipment: 'Bodyweight',
      difficulty: 'Beginner',
      instructions: [
        'Stand with feet hip-width apart',
        'Run in place lifting knees high',
        'Pump arms as you run',
        'Maintain quick pace'
      ],
      sets: 3,
      reps: '30 seconds',
      duration: '30 seconds',
      calories: 75
    },
    // Additional Strength Exercises
    {
      id: 'strength-1',
      name: 'Russian Twists',
      category: 'Core',
      muscle: 'Core',
      equipment: 'Bodyweight',
      difficulty: 'Intermediate',
      instructions: [
        'Sit with knees bent, lean back slightly',
        'Lift feet off ground',
        'Rotate torso left and right',
        'Keep core engaged throughout'
      ],
      sets: 3,
      reps: '20-30',
      calories: 45
    },
    {
      id: 'strength-2',
      name: 'Wall Sit',
      category: 'Strength',
      muscle: 'Legs',
      equipment: 'Wall',
      difficulty: 'Beginner',
      instructions: [
        'Stand with back against wall',
        'Slide down until thighs are parallel to floor',
        'Hold position with knees at 90 degrees',
        'Keep back flat against wall'
      ],
      sets: 3,
      reps: '30-60 seconds',
      duration: '30-60 seconds',
      calories: 50
    }
  ];

  const workoutPlans: WorkoutPlan[] = [
    {
      id: 'beginner-full-body',
      name: 'Beginner Full Body Workout',
      goal: 'Build Foundation',
      duration: '45 minutes',
      difficulty: 'Beginner',
      description: 'Perfect for those just starting their fitness journey. Focuses on basic movements and building strength.',
      exercises: [
        exercises.find(e => e.id === 'chest-1')!,
        exercises.find(e => e.id === 'legs-1')!,
        exercises.find(e => e.id === 'back-3')!,
        exercises.find(e => e.id === 'shoulders-2')!,
        exercises.find(e => e.id === 'core-1')!
      ]
    },
    {
      id: 'muscle-building',
      name: 'Muscle Building Program',
      goal: 'Build Muscle',
      duration: '60 minutes',
      difficulty: 'Intermediate',
      description: 'Designed to maximize muscle growth with compound movements and progressive overload.',
      exercises: [
        exercises.find(e => e.id === 'chest-2')!,
        exercises.find(e => e.id === 'legs-2')!,
        exercises.find(e => e.id === 'back-2')!,
        exercises.find(e => e.id === 'shoulders-1')!,
        exercises.find(e => e.id === 'arms-1')!,
        exercises.find(e => e.id === 'arms-2')!
      ]
    },
    {
      id: 'fat-loss-hiit',
      name: 'Fat Loss HIIT Circuit',
      goal: 'Lose Weight',
      duration: '30 minutes',
      difficulty: 'Advanced',
      description: 'High-intensity interval training to maximize calorie burn and improve cardiovascular fitness.',
      exercises: [
        exercises.find(e => e.id === 'cardio-1')!,
        exercises.find(e => e.id === 'cardio-2')!,
        exercises.find(e => e.id === 'cardio-3')!,
        exercises.find(e => e.id === 'cardio-4')!,
        exercises.find(e => e.id === 'strength-1')!
      ]
    },
    {
      id: 'strength-power',
      name: 'Strength & Power Training',
      goal: 'Build Strength',
      duration: '75 minutes',
      difficulty: 'Advanced',
      description: 'Focus on heavy compound movements to build maximum strength and power.',
      exercises: [
        exercises.find(e => e.id === 'legs-2')!,
        exercises.find(e => e.id === 'chest-2')!,
        exercises.find(e => e.id === 'back-1')!,
        exercises.find(e => e.id === 'shoulders-1')!
      ]
    },
    {
      id: 'home-bodyweight',
      name: 'Home Bodyweight Workout',
      goal: 'Stay Fit',
      duration: '40 minutes',
      difficulty: 'Intermediate',
      description: 'No equipment needed! Perfect for home workouts using just your bodyweight.',
      exercises: [
        exercises.find(e => e.id === 'chest-1')!,
        exercises.find(e => e.id === 'legs-1')!,
        exercises.find(e => e.id === 'legs-3')!,
        exercises.find(e => e.id === 'core-1')!,
        exercises.find(e => e.id === 'core-2')!,
        exercises.find(e => e.id === 'strength-2')!
      ]
    }
  ];

  const dietPlans: DietPlan[] = [
    {
      id: 'muscle-gain-diet',
      name: 'Muscle Gain Diet Plan',
      goal: 'Build Muscle',
      calories: 2800,
      protein: 180,
      carbs: 350,
      fats: 90,
      meals: [
        {
          id: 'breakfast-1',
          name: 'Power Breakfast',
          type: 'Breakfast',
          calories: 650,
          protein: 35,
          carbs: 60,
          fats: 20,
          ingredients: ['3 whole eggs', '2 egg whites', '1 cup oatmeal', '1 banana', '1 tbsp almond butter'],
          instructions: [
            'Cook eggs scrambled or over easy',
            'Prepare oatmeal with water or milk',
            'Slice banana on top of oatmeal',
            'Add almond butter to oatmeal'
          ]
        },
        {
          id: 'lunch-1',
          name: 'Protein-Packed Lunch',
          type: 'Lunch',
          calories: 750,
          protein: 50,
          carbs: 80,
          fats: 15,
          ingredients: ['6oz chicken breast', '1.5 cups brown rice', 'Mixed vegetables', 'Olive oil'],
          instructions: [
            'Grill or bake chicken breast',
            'Cook brown rice according to package',
            'Steam mixed vegetables',
            'Drizzle with olive oil'
          ]
        },
        {
          id: 'dinner-1',
          name: 'Recovery Dinner',
          type: 'Dinner',
          calories: 800,
          protein: 45,
          carbs: 70,
          fats: 25,
          ingredients: ['6oz salmon', '8oz sweet potato', 'Asparagus', 'Avocado'],
          instructions: [
            'Bake salmon with herbs',
            'Roast sweet potato',
            'Grill asparagus',
            'Add sliced avocado'
          ]
        },
        {
          id: 'snack-1',
          name: 'Post-Workout Shake',
          type: 'Snack',
          calories: 400,
          protein: 35,
          carbs: 45,
          fats: 8,
          ingredients: ['Protein powder', 'Banana', 'Berries', 'Almond milk'],
          instructions: [
            'Blend all ingredients',
            'Add ice if desired',
            'Consume within 30 minutes post-workout'
          ]
        }
      ]
    },
    {
      id: 'fat-loss-diet',
      name: 'Fat Loss Diet Plan',
      goal: 'Lose Weight',
      calories: 1800,
      protein: 140,
      carbs: 150,
      fats: 70,
      meals: [
        {
          id: 'breakfast-2',
          name: 'Lean Morning Start',
          type: 'Breakfast',
          calories: 350,
          protein: 25,
          carbs: 30,
          fats: 15,
          ingredients: ['Greek yogurt', 'Berries', 'Almonds', 'Chia seeds'],
          instructions: [
            'Mix Greek yogurt with berries',
            'Top with almonds and chia seeds',
            'Let sit for 5 minutes before eating'
          ]
        },
        {
          id: 'lunch-2',
          name: 'Light & Filling Lunch',
          type: 'Lunch',
          calories: 450,
          protein: 35,
          carbs: 40,
          fats: 18,
          ingredients: ['Grilled chicken salad', 'Mixed greens', 'Quinoa', 'Olive oil dressing'],
          instructions: [
            'Grill chicken breast',
            'Prepare quinoa',
            'Mix with greens and vegetables',
            'Add light olive oil dressing'
          ]
        },
        {
          id: 'dinner-2',
          name: 'Lean Dinner',
          type: 'Dinner',
          calories: 500,
          protein: 40,
          carbs: 35,
          fats: 20,
          ingredients: ['White fish', 'Cauliflower rice', 'Broccoli', 'Coconut oil'],
          instructions: [
            'Bake white fish with herbs',
            'Steam cauliflower rice',
            'Steam broccoli',
            'Cook with minimal coconut oil'
          ]
        },
        {
          id: 'snack-2',
          name: 'Healthy Snack',
          type: 'Snack',
          calories: 200,
          protein: 15,
          carbs: 20,
          fats: 8,
          ingredients: ['Apple', 'Almond butter', 'Cinnamon'],
          instructions: [
            'Slice apple',
            'Serve with almond butter',
            'Sprinkle with cinnamon'
          ]
        }
      ]
    }
  ];

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  return (
    <FitnessContext.Provider value={{
      currentView,
      setCurrentView,
      exercises,
      workoutPlans,
      dietPlans,
      userProfile,
      setUserProfile,
      chatMessages,
      addChatMessage
    }}>
      {children}
    </FitnessContext.Provider>
  );
};