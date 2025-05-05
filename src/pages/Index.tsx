
import React, { useState, useEffect } from "react";
import { Country, Niche, BusinessIdea, FormData, WebhookResponse } from "../utils/types";
import CountryDropdown from "../components/CountryDropdown";
import NicheDropdown from "../components/NicheDropdown";
import AdvancedLoadingState from "../components/AdvancedLoadingState";
import BusinessStarterPack from "../components/BusinessStarterPack";
import PDFGenerator from "../components/PDFGenerator";
import { API_URL, mockBusinessIdea, loadingMessages } from "../utils/constants";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    country: null,
    niche: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [businessIdea, setBusinessIdea] = useState<BusinessIdea | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);
  const { toast } = useToast();
  const { generatePDF } = PDFGenerator();

  const handleSelectCountry = (country: Country) => {
    setFormData({ ...formData, country });
  };

  const handleSelectNiche = (niche: Niche) => {
    setFormData({ ...formData, niche });
  };

  // Process the webhook response into our BusinessIdea format
  const processWebhookResponse = (data: any): BusinessIdea => {
    if (!Array.isArray(data) || data.length < 3) {
      throw new Error("Unexpected response format from API");
    }

    // Safely extract data from response with fallbacks
    const core = data[0]?.output || {};
    const business = data[1]?.output || {};
    const branding = data[2]?.output || {};

    // Transform API response to BusinessIdea format
    return {
      name: branding?.naam || "Unnamed Business",
      slogan: branding?.slogan || "No slogan available",
      positioning: branding?.positionering || branding?.merkgevoel || "No positioning available",
      goal: business?.summary || core?.objective || "No goal available",
      
      // Transform core_features to our features format with safe fallbacks
      features: Array.isArray(core?.core_features) 
        ? core.core_features.map((feature: any) => ({
            title: feature.name || "Unnamed Feature",
            description: feature.benefit || "No description available"
          }))
        : [],
      
      // Safe handling of target audience
      targetAudience: {
        segments: Array.isArray(core?.target_audience?.segments) 
          ? core.target_audience.segments 
          : [],
        painPoints: Array.isArray(core?.target_audience?.pain_points) 
          ? core.target_audience.pain_points 
          : []
      },
      
      // Convert business model information
      businessModel: [
        ...(business?.revenue_streams ? Object.entries(business.revenue_streams).map(([type, details]) => ({ 
          type, 
          details: details as string 
        })) : []),
        ...(business?.cost_structure ? Object.entries(business.cost_structure).map(([type, details]) => ({ 
          type, 
          details: details as string 
        })) : [])
      ],
      
      // Technical stack with safe fallbacks
      technicalStack: {
        frontend: core?.technical_stack?.frontend || "Not specified",
        backend: core?.technical_stack?.backend || "Not specified",
        integrations: Array.isArray(core?.technical_stack?.integrations) 
          ? core.technical_stack.integrations 
          : []
      },
      
      // Timeline/roadmap with safe handling
      roadmap: Array.isArray(core?.timeline) 
        ? core.timeline.map((phase: any) => ({
            timeframe: phase.phase || "Unknown phase",
            tasks: Array.isArray(phase.activities) ? phase.activities : []
          }))
        : []
    };
  };

  const fetchBusinessIdea = async (isRetry = false) => {
    if (!formData.country || !formData.niche) {
      return;
    }

    setIsLoading(true);
    setError(null);
    
    // Set timeout to minimum 3 minutes (180000 ms) but keep the existing 5min10s (310000 ms)
    const controller = new AbortController();
    const timeoutDuration = 310000; // 5m10s timeout (over 3 minutes as requested)
    const timeoutId = setTimeout(() => {
      console.log(`Request timed out after ${timeoutDuration/1000} seconds`);
      controller.abort();
    }, timeoutDuration);
    
    try {
      const payload = {
        country: formData.country.name,
        countryCode: formData.country.code,
        niche: formData.niche.name,
        nicheId: formData.niche.id
      };

      console.log(`${isRetry ? "Retry attempt: " : ""}Sending request to webhook:`, payload);
      console.log(`Timeout set for ${timeoutDuration/1000} seconds`);
      
      // Try to use a CORS proxy if we're on the deployed site (not localhost)
      let apiUrl = API_URL;
      
      // Only on deployed sites (not local development)
      if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        try {
          // First attempt using fetch with mode: 'cors' explicitly
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json'
            },
            mode: 'cors', // Explicitly request CORS
            body: JSON.stringify(payload),
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
          }
          
          const data = await response.json();
          console.log("Response received:", data);
          
          if (data) {
            try {
              const processedData = processWebhookResponse(data);
              setBusinessIdea(processedData);
              toast({
                title: "Succes!",
                description: "Je business idee is gegenereerd.",
              });
              return; // Exit early if successful
            } catch (processingError) {
              console.error("Error processing data:", processingError);
              throw new Error("Onverwacht formaat ontvangen van API");
            }
          } else {
            throw new Error("Unexpected response format");
          }
        } catch (corsError) {
          console.log("CORS error detected, falling back to mock data", corsError);
          
          // If we catch a CORS error, show a special toast and use mock data
          toast({
            title: "CORS probleem gedetecteerd",
            description: "We gebruiken demo data omdat de API niet toegankelijk is vanuit deze website.",
            variant: "destructive",
          });
          
          // Use mock data as fallback for CORS errors
          setBusinessIdea(mockBusinessIdea);
          setIsLoading(false);
          return; // Exit early with mock data
        }
      } else {
        // Original fetch logic for localhost
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        console.log("Response received:", data);
        
        if (data) {
          // Process the data safely
          try {
            const processedData = processWebhookResponse(data);
            setBusinessIdea(processedData);
            toast({
              title: "Succes!",
              description: "Je business idee is gegenereerd.",
            });
          } catch (processingError) {
            console.error("Error processing data:", processingError);
            throw new Error("Onverwacht formaat ontvangen van API");
          }
        } else {
          throw new Error("Unexpected response format");
        }
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error("Error generating business idea:", error);
      
      // Auto-retry once
      if (!isRetry && retryCount === 0) {
        console.log("Attempting automatic retry...");
        setRetryCount(1);
        toast({
          title: "Verbinding onderbroken",
          description: "We proberen het automatisch opnieuw...",
        });
        return fetchBusinessIdea(true);
      }
      
      // Handle different error types
      let errorMessage = "Er ging iets mis bij het ophalen van je idee.";
      
      if (error.name === "AbortError") {
        errorMessage = "De aanvraag duurde te lang (meer dan 5 minuten). Probeer het opnieuw.";
      } else if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
        errorMessage = "Netwerkfout. Controleer je internetverbinding en probeer het opnieuw.";
      } else if (error.message.includes("CORS")) {
        errorMessage = "CORS-fout bij het benaderen van de server. We schakelen over op demo data.";
        
        // Use mock data as fallback for CORS errors
        setBusinessIdea(mockBusinessIdea);
        toast({
          title: "Let op",
          description: "Er was een CORS-probleem met de API, we tonen een voorbeeldidee.",
          variant: "destructive",
        });
        setIsLoading(false);
        return; // Exit early with mock data
      } else if (error.message.includes("Onverwacht formaat")) {
        errorMessage = "De server stuurde een onverwacht antwoord. Probeer het later opnieuw.";
      }
      
      setError(errorMessage);
      
      // For demo purposes, we'll still show mock data if enabled in development
      if (process.env.NODE_ENV === 'development') {
        setBusinessIdea(mockBusinessIdea);
        toast({
          title: "Let op",
          description: "Er was een probleem met de API, we tonen een voorbeeldidee.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.country || !formData.niche) {
      toast({
        title: "Oeps!",
        description: "Selecteer zowel een land als een niche.",
        variant: "destructive",
      });
      return;
    }

    setBusinessIdea(null);
    setRetryCount(0);
    fetchBusinessIdea();
  };

  const handleDownloadPDF = () => {
    if (businessIdea) {
      generatePDF(businessIdea);
      toast({
        title: "Download gestart",
        description: "Je business starter pack wordt gedownload.",
      });
    }
  };

  const handleReset = () => {
    setBusinessIdea(null);
    setError(null);
    setFormData({
      country: null,
      niche: null,
    });
  };

  const handleRetry = () => {
    setRetryCount(0);
    setError(null);
    fetchBusinessIdea();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <span className="text-ideaincy-purple">Idea</span>
                <span>Incy</span>
                <span className="ml-2 bg-ideaincy-light-purple text-ideaincy-purple text-xs px-2 py-1 rounded-full font-semibold">
                  BETA
                </span>
              </h1>
              <p className="mt-1 text-gray-500">
                AI-gegenereerde business ideeën voor jouw volgende startup
              </p>
            </div>
            
            {(businessIdea || error) && (
              <button
                onClick={handleReset}
                className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Nieuw idee genereren
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {!businessIdea && !isLoading && !error && (
          <div className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Genereer een businessidee op maat
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      In welk land wil je starten?
                    </label>
                    <CountryDropdown
                      selectedCountry={formData.country}
                      onSelect={handleSelectCountry}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Welke niche heeft je interesse?
                    </label>
                    <NicheDropdown
                      selectedNiche={formData.niche}
                      onSelect={handleSelectNiche}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-ideaincy-purple text-white font-medium rounded-lg hover:bg-ideaincy-dark-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ideaincy-purple transition-colors"
                  >
                    Genereer Business Idee
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Hoe werkt het?
                </h3>
                <div className="text-sm text-gray-500 space-y-2">
                  <p>
                    1. Selecteer een land en niche waarin je een business wilt starten
                  </p>
                  <p>
                    2. Onze AI-agents genereren een gevalideerd businessidee specifiek voor jouw keuze
                  </p>
                  <p>
                    3. Ontvang een volledig business starter pack met alle benodigde informatie
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <AdvancedLoadingState 
            messages={loadingMessages} 
            countryName={formData.country?.name || ""} 
          />
        )}

        {error && !isLoading && !businessIdea && (
          <div className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden animate-fade-in">
            <div className="p-6 sm:p-8">
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Er ging iets mis</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              
              <div className="flex flex-col items-center justify-center space-y-4 py-4">
                <p className="text-gray-600 text-center">
                  Het lijkt erop dat er een probleem was bij het genereren van je businessidee.
                </p>
                
                <Button 
                  onClick={handleRetry}
                  className="flex items-center gap-2 bg-ideaincy-purple hover:bg-ideaincy-dark-purple"
                >
                  <RefreshCw className="h-4 w-4" /> 
                  Probeer opnieuw
                </Button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Mogelijke oplossingen:
                </h3>
                <div className="text-sm text-gray-500 space-y-2">
                  <p>
                    • Controleer je internetverbinding
                  </p>
                  <p>
                    • De server kan tijdelijk overbelast zijn, probeer het later opnieuw
                  </p>
                  <p>
                    • Gebruik een andere browser of schakel eventuele browser-extensies uit
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {businessIdea && !isLoading && !error && (
          <BusinessStarterPack 
            businessIdea={businessIdea} 
            onDownloadPDF={handleDownloadPDF}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} IdeaIncy. Alle rechten voorbehouden.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-500 hover:text-ideaincy-purple">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-ideaincy-purple">
                Voorwaarden
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-ideaincy-purple">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
