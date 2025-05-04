
import React, { useState, useEffect } from "react";
import { Country, Niche, BusinessIdea, FormData } from "../utils/types";
import CountryDropdown from "../components/CountryDropdown";
import NicheDropdown from "../components/NicheDropdown";
import AdvancedLoadingState from "../components/AdvancedLoadingState";
import BusinessStarterPack from "../components/BusinessStarterPack";
import PDFGenerator from "../components/PDFGenerator";
import { API_URL, mockBusinessIdea, loadingMessages } from "../utils/constants";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Index: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    country: null,
    niche: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [businessIdea, setBusinessIdea] = useState<BusinessIdea | null>(null);
  const { toast } = useToast();
  const { generatePDF } = PDFGenerator();

  const handleSelectCountry = (country: Country) => {
    setFormData({ ...formData, country });
  };

  const handleSelectNiche = (niche: Niche) => {
    setFormData({ ...formData, niche });
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

    setIsLoading(true);
    setBusinessIdea(null);

    try {
      const payload = {
        country: formData.country.name,
        countryCode: formData.country.code,
        niche: formData.niche.name,
        nicheId: formData.niche.id
      };

      console.log("Sending request to webhook:", payload);
      
      // Using axios with increased timeout (5 minutes)
      const response = await axios({
        method: 'post',
        url: API_URL,
        data: payload,
        timeout: 300000 // 5 minutes in milliseconds
      });

      console.log("Response received:", response.data);
      
      // For production, use the real response
      if (response.data) {
        setBusinessIdea(response.data);
      } else {
        // Fallback to mock data if response structure is unexpected
        console.warn("Using mock data due to unexpected response format");
        setBusinessIdea(mockBusinessIdea);
      }

      toast({
        title: "Succes!",
        description: "Je business idee is gegenereerd.",
      });
    } catch (error) {
      console.error("Error generating business idea:", error);
      
      // For demo purposes, we'll still show the mock data
      setBusinessIdea(mockBusinessIdea);
      
      toast({
        title: "Let op",
        description: "Er was een probleem met de API, we tonen een voorbeeldidee.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
    setFormData({
      country: null,
      niche: null,
    });
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
            
            {businessIdea && (
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
        {!businessIdea && !isLoading && (
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

        {businessIdea && !isLoading && (
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
