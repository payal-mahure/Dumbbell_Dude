import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Dumbbell, Apple, Target } from 'lucide-react';
import { useFitness, ChatMessage } from '../../contexts/FitnessContext';

const ChatBot = () => {
  const { chatMessages, addChatMessage, exercises, workoutPlans, dietPlans, userProfile } = useFitness();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Workout-related responses
    if (message.includes('workout') || message.includes('exercise')) {
      if (message.includes('beginner')) {
        return "🏋️‍♂️ Great! For beginners, I recommend starting with bodyweight exercises like push-ups, squats, and planks. Would you like me to create a beginner workout plan for you?";
      }
      if (message.includes('muscle') || message.includes('strength')) {
        return "💪 For muscle building, focus on compound movements like bench press, squats, and deadlifts. Aim for 3-4 sets of 8-12 reps with progressive overload. Should I show you our muscle-building workout plans?";
      }
      if (message.includes('cardio') || message.includes('fat loss') || message.includes('weight loss')) {
        return "🔥 For fat loss, combine HIIT workouts with steady-state cardio. Try burpees, mountain climbers, and jumping jacks. Aim for 20-30 minutes, 3-4 times per week. Want to see our fat-burning workout plans?";
      }
      return "🏃‍♂️ I can help you with various workout types! Are you looking for strength training, cardio, or something specific? Tell me your fitness goal and I'll recommend the perfect workout plan.";
    }

    // Diet-related responses
    if (message.includes('diet') || message.includes('nutrition') || message.includes('food') || message.includes('meal')) {
      if (message.includes('muscle') || message.includes('gain')) {
        return "🍗 For muscle gain, focus on high protein intake (1g per lb bodyweight), complex carbs, and healthy fats. Eat in a slight caloric surplus. Key foods: chicken, fish, eggs, oats, rice, nuts. Want to see our muscle-gain meal plans?";
      }
      if (message.includes('lose') || message.includes('fat') || message.includes('weight')) {
        return "🥗 For weight loss, create a caloric deficit while maintaining protein intake. Focus on lean proteins, vegetables, and complex carbs. Avoid processed foods and sugary drinks. Should I show you our fat-loss diet plans?";
      }
      return "🍎 Nutrition is crucial for your fitness goals! Are you looking to gain muscle, lose fat, or maintain your current weight? I can provide personalized meal plans and nutrition advice.";
    }

    // Specific exercise questions
    if (message.includes('push up') || message.includes('pushup')) {
      return "💪 Push-ups are excellent for chest, shoulders, and triceps! Start with 3 sets of 8-12 reps. Keep your body straight, hands shoulder-width apart. Can't do full push-ups? Try knee push-ups or wall push-ups first!";
    }
    if (message.includes('squat')) {
      return "🦵 Squats are the king of leg exercises! Keep feet shoulder-width apart, chest up, and sit back like you're sitting in a chair. Aim for 3 sets of 15-20 reps. Great for quads, glutes, and core!";
    }
    if (message.includes('plank')) {
      return "🏋️‍♀️ Planks are perfect for core strength! Hold for 30-60 seconds, keep your body straight from head to heels. Start with 3 sets. It works your entire core, shoulders, and back!";
    }

    // Motivation and general fitness
    if (message.includes('motivat') || message.includes('inspire')) {
      return "🔥 You've got this! Remember, every expert was once a beginner. Consistency beats perfection every time. Your future self will thank you for the work you put in today! 💪";
    }
    if (message.includes('tired') || message.includes('lazy')) {
      return "😴 Feeling tired? That's normal! Try a light 10-minute walk or some gentle stretching. Sometimes the hardest part is just starting. You don't have to be perfect, just consistent! 🌟";
    }

    // Specific body parts
    if (message.includes('abs') || message.includes('core')) {
      return "🔥 For strong abs, try planks, crunches, Russian twists, and mountain climbers. Remember, abs are made in the kitchen too - diet is crucial for visible abs! Want a core workout routine?";
    }
    if (message.includes('arm') || message.includes('bicep') || message.includes('tricep')) {
      return "💪 For bigger arms, focus on bicep curls, tricep dips, and push-ups. Don't forget compound movements like pull-ups and bench press work your arms too! Should I show you an arm workout?";
    }

    // Time-based questions
    if (message.includes('how long') || message.includes('time')) {
      return "⏰ Workout duration depends on your goals! Beginners: 30-45 minutes, Intermediate: 45-60 minutes, Advanced: 60-90 minutes. Quality over quantity - a focused 30-minute workout beats a lazy 2-hour session!";
    }

    // Frequency questions
    if (message.includes('how often') || message.includes('frequency')) {
      return "📅 For beginners: 3-4 times per week. Intermediate: 4-5 times per week. Advanced: 5-6 times per week. Always include rest days for recovery! Your muscles grow during rest, not just during workouts.";
    }

    // Equipment questions
    if (message.includes('home') || message.includes('no equipment')) {
      return "🏠 No equipment? No problem! Try bodyweight exercises: push-ups, squats, lunges, planks, burpees, mountain climbers. You can get an amazing workout at home! Want a home workout plan?";
    }

    // Progress questions
    if (message.includes('progress') || message.includes('result')) {
      return "📈 Results take time! You might feel stronger in 2-3 weeks, see changes in 4-6 weeks, and others notice in 8-12 weeks. Track your workouts, take photos, and measure your body. Progress isn't always visible on the scale!";
    }

    // Default responses
    const defaultResponses = [
      "🤖 I'm here to help with all your fitness questions! Ask me about workouts, nutrition, exercises, or motivation. What would you like to know?",
      "💪 I can help you with workout plans, diet advice, exercise techniques, and fitness motivation. What's your fitness goal?",
      "🏋️‍♂️ Whether you want to build muscle, lose fat, or get stronger, I'm here to guide you! What specific area would you like help with?",
      "🎯 I have tons of workout plans, diet tips, and exercise guidance ready for you! What's your current fitness challenge?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    addChatMessage(userMessage);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      addChatMessage(botResponse);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { icon: Dumbbell, text: "Show me a beginner workout plan", category: "workout" },
    { icon: Apple, text: "What should I eat to build muscle?", category: "diet" },
    { icon: Target, text: "How often should I exercise?", category: "general" },
    { icon: Sparkles, text: "I need motivation to start working out", category: "motivation" }
  ];

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI Fitness Coach</h1>
            <p className="text-blue-100">Your personal trainer, nutritionist, and motivator</p>
          </div>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Quick questions to get started:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question.text)}
              className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
            >
              <question.icon className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{question.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-600'
              }`}>
                {message.sender === 'user' ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-white" />
                )}
              </div>
              <div className={`p-4 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-3xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about fitness, workouts, nutrition, or motivation..."
              className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;