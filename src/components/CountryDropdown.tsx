
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Country } from "../utils/types";
import { countries } from "../utils/constants";

interface CountryDropdownProps {
  selectedCountry: Country | null;
  onSelect: (country: Country) => void;
}

const CountryDropdown = ({ selectedCountry, onSelect }: CountryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-3 text-left bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-ideaincy-purple"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedCountry ? (
          <div className="flex items-center">
            <span className="mr-2 text-lg">{selectedCountry.flag}</span>
            <span>{selectedCountry.name}</span>
          </div>
        ) : (
          <span className="text-gray-500">Selecteer een land</span>
        )}
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-2 sticky top-0 bg-white border-b border-gray-200">
            <input
              type="text"
              placeholder="Zoek land..."
              className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-ideaincy-purple"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul 
            className="max-h-60 overflow-auto py-1" 
            role="listbox"
          >
            {filteredCountries.map((country) => (
              <li
                key={country.code}
                onClick={() => {
                  onSelect(country);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-ideaincy-light-purple ${
                  selectedCountry?.code === country.code ? 'bg-ideaincy-light-purple' : ''
                }`}
                role="option"
                aria-selected={selectedCountry?.code === country.code}
              >
                <div className="flex items-center">
                  <span className="mr-2 text-lg">{country.flag}</span>
                  <span>{country.name}</span>
                </div>
                {selectedCountry?.code === country.code && <Check className="h-4 w-4 text-ideaincy-purple" />}
              </li>
            ))}
            {filteredCountries.length === 0 && (
              <li className="px-3 py-2 text-gray-500">Geen resultaten gevonden</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountryDropdown;
