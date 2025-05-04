
import React from "react";
import { BusinessIdea } from "../utils/types";

// This is a mock PDF generator since we can't use PDF libraries directly
// In a real app, you would use a library like jsPDF or react-pdf
const PDFGenerator = () => {
  const generatePDF = (businessIdea: BusinessIdea) => {
    // In a real app, this would generate a PDF
    // For now, we'll simulate downloading by creating a text file with the business idea
    const content = `
    ${businessIdea.name}
    ${businessIdea.slogan}
    
    Positioning: ${businessIdea.positioning}
    
    Goal: ${businessIdea.goal}
    
    Features:
    ${businessIdea.features.map(f => `- ${f.title}: ${f.description}`).join('\n')}
    
    Target Audience:
    Segments: ${businessIdea.targetAudience.segments.join(', ')}
    Pain Points: ${businessIdea.targetAudience.painPoints.join(', ')}
    
    Business Model:
    ${businessIdea.businessModel.map(m => `- ${m.type}: ${m.details}`).join('\n')}
    
    Technical Stack:
    Frontend: ${businessIdea.technicalStack.frontend}
    Backend: ${businessIdea.technicalStack.backend}
    Integrations: ${businessIdea.technicalStack.integrations.join(', ')}
    
    Roadmap:
    ${businessIdea.roadmap.map(r => `- ${r.timeframe}: ${r.tasks.join(', ')}`).join('\n')}
    `;
    
    const element = document.createElement('a');
    const file = new Blob([content], {
      type: 'text/plain'
    });
    element.href = URL.createObjectURL(file);
    element.download = `${businessIdea.name.replace(/\s+/g, '_')}_BusinessPlan.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return { generatePDF };
};

export default PDFGenerator;
