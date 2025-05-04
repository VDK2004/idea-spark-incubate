
import React from "react";
import { BusinessIdea } from "../utils/types";
import { useToast } from "@/hooks/use-toast";

// This is a mock PDF generator since we can't use PDF libraries directly
const PDFGenerator = () => {
  const { toast } = useToast();

  const generatePDF = (businessIdea: BusinessIdea) => {
    try {
      // In a real app, this would use a library like jsPDF or react-pdf
      // For now, we'll simulate downloading by creating a text file with the business idea
      const content = `
      # ${businessIdea.name || "Unnamed Business"}
      ## ${businessIdea.slogan || "No slogan available"}
      
      **Positioning:** ${businessIdea.positioning || "No positioning defined"}
      
      ## Doel
      ${businessIdea.goal || "No goal defined"}
      
      ## Features
      ${businessIdea.features && businessIdea.features.length > 0 
        ? businessIdea.features.map(f => `* **${f.title || "Feature"}:** ${f.description || "No description"}`).join('\n')
        : "Geen features beschikbaar."}
      
      ## Doelgroep
      ### Segmenten: 
      ${businessIdea.targetAudience?.segments && businessIdea.targetAudience.segments.length > 0
        ? businessIdea.targetAudience.segments.map(s => `* ${s || "Segment"}`).join('\n')
        : "Geen doelgroepsegmenten beschikbaar."}
      
      ### Pijnpunten: 
      ${businessIdea.targetAudience?.painPoints && businessIdea.targetAudience.painPoints.length > 0
        ? businessIdea.targetAudience.painPoints.map(p => `* ${p || "Pijnpunt"}`).join('\n')
        : "Geen pijnpunten gedefinieerd."}
      
      ## Businessmodel
      ${businessIdea.businessModel && businessIdea.businessModel.length > 0
        ? businessIdea.businessModel.map(m => `* **${m.type || "Type"}:** ${m.details || "No details"}`).join('\n')
        : "Geen businessmodel beschikbaar."}
      
      ## Technical Stack
      * **Frontend:** ${businessIdea.technicalStack?.frontend || "Niet gespecificeerd"}
      * **Backend:** ${businessIdea.technicalStack?.backend || "Niet gespecificeerd"}
      * **Integraties:** ${businessIdea.technicalStack?.integrations && businessIdea.technicalStack.integrations.length > 0
        ? businessIdea.technicalStack.integrations.join(', ')
        : "Geen integraties gespecificeerd"}
      
      ## Roadmap
      ${businessIdea.roadmap && businessIdea.roadmap.length > 0
        ? businessIdea.roadmap.map(r => `### ${r.timeframe || "Phase"}\n${
            r.tasks && r.tasks.length > 0
              ? r.tasks.map(t => `* ${t || "Task"}`).join('\n')
              : "Geen taken gespecificeerd"
          }`).join('\n\n')
        : "Geen roadmap beschikbaar."}
      
      ---
      Gegenereerd door IdeaIncy | ${new Date().toLocaleDateString()}
      `;
      
      // Create downloadable text file (in a real app, this would be a PDF)
      const element = document.createElement('a');
      const file = new Blob([content], {
        type: 'text/plain'
      });
      element.href = URL.createObjectURL(file);
      element.download = `${businessIdea.name ? businessIdea.name.replace(/\s+/g, '_') : "Business_Idea"}_BusinessPlan.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      // Clean up the URL object to prevent memory leaks
      setTimeout(() => {
        URL.revokeObjectURL(element.href);
      }, 100);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Fout bij downloaden",
        description: "Er ging iets mis bij het genereren van het PDF bestand. Probeer het opnieuw.",
        variant: "destructive",
      });
    }
  };

  return { generatePDF };
};

export default PDFGenerator;
