
import React from "react";
import { Download, ArrowRight } from "lucide-react";
import { BusinessIdea } from "../utils/types";
import { Progress } from "@/components/ui/progress";

interface BusinessStarterPackProps {
  businessIdea: BusinessIdea;
  onDownloadPDF: () => void;
}

const BusinessStarterPack: React.FC<BusinessStarterPackProps> = ({
  businessIdea,
  onDownloadPDF,
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in-up">
      {/* Header section */}
      <div className="bg-ideaincy-purple text-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{businessIdea.name}</h1>
            <p className="text-xl mt-2 italic">{businessIdea.slogan}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-block px-4 py-2 rounded-full bg-white text-ideaincy-purple font-semibold text-sm">
              {businessIdea.positioning}
            </span>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-6 md:p-8">
        {/* Goal */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <span className="mr-2 text-ideaincy-purple">🎯</span> Doel
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-gray-700">{businessIdea.goal}</p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2 text-ideaincy-purple">✨</span> Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {businessIdea.features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-5 rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="font-semibold text-lg mb-2 flex items-start">
                  <span className="text-ideaincy-purple mr-2 text-lg">✅</span> 
                  <span>{feature.title}</span>
                </h3>
                <p className="text-gray-700 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2 text-ideaincy-purple">👥</span> Doelgroep
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
              <h3 className="font-medium mb-3 text-ideaincy-dark-purple">Marktsegmenten</h3>
              <ul className="space-y-2">
                {businessIdea.targetAudience.segments.map((segment, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-ideaincy-purple rounded-full mr-2"></span>
                    <span className="text-gray-700">{segment}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
              <h3 className="font-medium mb-3 text-ideaincy-dark-purple">Pijnpunten</h3>
              <ul className="space-y-2">
                {businessIdea.targetAudience.painPoints.map((painPoint, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">{painPoint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Business Model */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2 text-ideaincy-purple">💰</span> Businessmodel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {businessIdea.businessModel.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">{item.type}</p>
                <p className="font-semibold text-ideaincy-dark-purple">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Stack */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2 text-ideaincy-purple">💻</span> Technical Stack (voor MVP)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-medium mb-1 text-ideaincy-dark-purple">Frontend</h3>
              <p className="text-gray-700">{businessIdea.technicalStack.frontend}</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-medium mb-1 text-ideaincy-dark-purple">Backend</h3>
              <p className="text-gray-700">{businessIdea.technicalStack.backend}</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-medium mb-1 text-ideaincy-dark-purple">Integraties</h3>
              <p className="text-gray-700">{businessIdea.technicalStack.integrations.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2 text-ideaincy-purple">🗓️</span> Roadmap
          </h2>
          <div className="space-y-4">
            {businessIdea.roadmap.map((phase, index) => (
              <div key={index} className="relative">
                {/* Progress bar between timeline items */}
                {index < businessIdea.roadmap.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-ideaincy-light-purple"></div>
                )}
                
                <div className="flex items-start">
                  <div className="bg-ideaincy-purple text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 z-10">
                    {index + 1}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-lg">{phase.timeframe}</h3>
                    <div className="mt-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <ul className="space-y-1">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center text-gray-700">
                            <span className="w-1.5 h-1.5 bg-ideaincy-purple rounded-full mr-2"></span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar showing completion status */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">MVP Development Progress</span>
            <span className="text-ideaincy-purple font-medium">100%</span>
          </div>
          <Progress value={100} className="h-1.5" />
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <button 
            className="w-full sm:w-auto py-3 px-6 bg-ideaincy-purple text-white font-medium rounded-lg hover:bg-ideaincy-dark-purple transition-colors flex items-center justify-center"
          >
            <span>Start je business met dit idee</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <button 
            onClick={onDownloadPDF}
            className="w-full sm:w-auto py-3 px-6 flex items-center justify-center gap-2 bg-white border border-ideaincy-purple text-ideaincy-purple font-medium rounded-lg hover:bg-ideaincy-light-purple transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Business Starter Pack</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessStarterPack;
