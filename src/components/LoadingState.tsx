
import React from "react";

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 animate-fade-in-up">
      <div className="mb-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-ideaincy-light-purple rounded-full border-t-ideaincy-purple animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-ideaincy-light-purple rounded-full border-t-ideaincy-dark-purple animate-spin"></div>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-medium mb-2 text-center">AI-agents sparren...</h3>
      
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 mt-4">
        <div className="flex items-start mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-xs font-medium">🤖1</span>
          </div>
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded animate-pulse-opacity mb-2 w-3/4"></div>
            <div className="h-2 bg-gray-200 rounded animate-pulse-opacity w-5/6"></div>
          </div>
        </div>
        
        <div className="flex items-start mb-4">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-xs font-medium">🤖2</span>
          </div>
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded animate-pulse-opacity mb-2 w-5/6"></div>
            <div className="h-2 bg-gray-200 rounded animate-pulse-opacity w-2/3"></div>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
            <span className="text-xs font-medium">🤖3</span>
          </div>
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded animate-pulse-opacity mb-2 w-4/5"></div>
            <div className="h-2 bg-gray-200 rounded animate-pulse-opacity w-3/4"></div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-4">Dit kan tot 5 minuten duren...</p>
    </div>
  );
};

export default LoadingState;

