
import React from "react";
import { BusinessIdea } from "../utils/types";

// This is a mock PDF generator since we can't use PDF libraries directly
const PDFGenerator = () => {
  const generatePDF = (businessIdea: BusinessIdea) => {
    // In a real app, this would use a library like jsPDF or react-pdf
    // For now, we'll simulate downloading by creating a text file with the business idea
    const content = `
    # ${businessIdea.name}
    ## ${businessIdea.slogan}
    
    **Positioning:** ${businessIdea.positioning}
    
    ## Doel
    ${businessIdea.goal}
    
    ## Features
    ${businessIdea.features.map(f => `* **${f.title}:** ${f.description}`).join('\n')}
    
    ## Doelgroep
    ### Segmenten: 
    ${businessIdea.targetAudience.segments.map(s => `* ${s}`).join('\n')}
    
    ### Pijnpunten: 
    ${businessIdea.targetAudience.painPoints.map(p => `* ${p}`).join('\n')}
    
    ## Businessmodel
    ${businessIdea.businessModel.map(m => `* **${m.type}:** ${m.details}`).join('\n')}
    
    ## Technical Stack
    * **Frontend:** ${businessIdea.technicalStack.frontend}
    * **Backend:** ${businessIdea.technicalStack.backend}
    * **Integraties:** ${businessIdea.technicalStack.integrations.join(', ')}
    
    ## Roadmap
    ${businessIdea.roadmap.map(r => `### ${r.timeframe}\n${r.tasks.map(t => `* ${t}`).join('\n')}`).join('\n\n')}
    
    ---
    Gegenereerd door IdeaIncy | ${new Date().toLocaleDateString()}
    `;
    
    // Create downloadable text file (in a real app, this would be a PDF)
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
