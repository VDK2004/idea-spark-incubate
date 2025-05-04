
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface AdvancedLoadingStateProps {
  messages: string[];
  countryName?: string;
}

const AdvancedLoadingState: React.FC<AdvancedLoadingStateProps> = ({ 
  messages,
  countryName = ""
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Replace [LAND] placeholder with actual country name
  const formatMessage = (message: string) => {
    return message.replace("[LAND]", countryName);
  };

  useEffect(() => {
    // Progress slowly increases over time
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // Cap at 95% to show we're still waiting for response
        const newProgress = prev + 0.2;
        return newProgress > 95 ? 95 : newProgress;
      });
      
      // Track elapsed time for UX messaging
      setElapsedTime(prev => prev + 1);
    }, 1000);

    // Rotate through messages
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % messages.length);
    }, 7000); // Change message every 7 seconds

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center p-10 min-h-[70vh] animate-fade-in">
      {/* Animated logo/spinner */}
      <div className="mb-8">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 border-4 border-ideaincy-light-purple rounded-full border-t-ideaincy-purple animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 border-4 border-ideaincy-light-purple rounded-full border-t-ideaincy-dark-purple animate-spin"></div>
          </div>
        </div>
      </div>
      
      {/* Message display */}
      <h3 className="text-2xl font-medium mb-4 text-center">
        {formatMessage(messages[currentMessageIndex])}
      </h3>
      
      {/* Progress bar */}
      <div className="w-full max-w-md mb-6">
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* AI agents visualization */}
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 mt-4 w-full">
        <div className="flex items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-xs font-medium">🤖1</span>
          </div>
          <div className="flex-1">
            <div className="h-2.5 bg-gray-200 rounded animate-pulse-opacity mb-2 w-3/4"></div>
            <div className="h-2.5 bg-gray-200 rounded animate-pulse-opacity w-5/6"></div>
          </div>
        </div>
        
        <div className="flex items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-xs font-medium">🤖2</span>
          </div>
          <div className="flex-1">
            <div className="h-2.5 bg-gray-200 rounded animate-pulse-opacity mb-2 w-5/6"></div>
            <div className="h-2.5 bg-gray-200 rounded animate-pulse-opacity w-2/3"></div>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-xs font-medium">🤖3</span>
          </div>
          <div className="flex-1">
            <div className="h-2.5 bg-gray-200 rounded animate-pulse-opacity mb-2 w-4/5"></div>
            <div className="h-2.5 bg-gray-200 rounded animate-pulse-opacity w-3/4"></div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-6">
        {elapsedTime < 60 ? (
          "Dit kan tot 5 minuten duren..."
        ) : elapsedTime < 120 ? (
          "Even geduld, onze AI-agents werken hard..."
        ) : elapsedTime < 180 ? (
          "Bijna klaar, we ronden de laatste details af..."
        ) : (
          "Bedankt voor je geduld, de berekeningen duren langer dan verwacht..."
        )}
      </p>
    </div>
  );
};

export default AdvancedLoadingState;
