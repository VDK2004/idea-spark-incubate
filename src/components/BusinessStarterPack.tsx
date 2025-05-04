
import React from "react";
import { Download } from "lucide-react";
import { BusinessIdea } from "../utils/types";

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
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Doel</h2>
          <p className="text-gray-700">{businessIdea.goal}</p>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {businessIdea.features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-ideaincy-light-purple p-4 rounded-lg"
              >
                <h3 className="font-semibold text-lg mb-2">✅ {feature.title}</h3>
                <p className="text-gray-700 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Target Audience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Segmenten</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {businessIdea.targetAudience.segments.map((segment, index) => (
                  <li key={index}>{segment}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Pijnpunten</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {businessIdea.targetAudience.painPoints.map((painPoint, index) => (
                  <li key={index}>{painPoint}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Business Model */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Businessmodel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businessIdea.businessModel.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="mr-2 mt-1">💰</div>
                <div>
                  <span className="font-medium">{item.type}:</span>{" "}
                  <span className="text-gray-700">{item.details}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Stack */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Technical Stack (voor MVP)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border border-gray-200 rounded-lg">
              <h3 className="font-medium mb-1">Frontend</h3>
              <p className="text-gray-700">{businessIdea.technicalStack.frontend}</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg">
              <h3 className="font-medium mb-1">Backend</h3>
              <p className="text-gray-700">{businessIdea.technicalStack.backend}</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg">
              <h3 className="font-medium mb-1">Integraties</h3>
              <p className="text-gray-700">{businessIdea.technicalStack.integrations.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Roadmap</h2>
          <div className="space-y-4">
            {businessIdea.roadmap.map((phase, index) => (
              <div key={index} className="border-l-2 border-ideaincy-purple pl-4 ml-3">
                <h3 className="font-medium text-lg">{phase.timeframe}</h3>
                <ul className="mt-1 text-gray-700">
                  {phase.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-center mb-1">
                      <span className="w-1.5 h-1.5 bg-ideaincy-purple rounded-full mr-2"></span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
          <button 
            className="w-full sm:w-auto py-3 px-6 bg-ideaincy-purple text-white font-medium rounded-lg hover:bg-ideaincy-dark-purple transition-colors"
          >
            Start je business met dit idee
          </button>
          <button 
            onClick={onDownloadPDF}
            className="w-full sm:w-auto py-3 px-6 flex items-center justify-center gap-2 bg-white border border-ideaincy-purple text-ideaincy-purple font-medium rounded-lg hover:bg-ideaincy-light-purple transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessStarterPack;
