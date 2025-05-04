
import { Country, Niche, BusinessIdea } from "./types";

// Countries with flags
export const countries: Country[] = [
  { name: "Nederland", code: "NL", flag: "🇳🇱" },
  { name: "België", code: "BE", flag: "🇧🇪" },
  { name: "Duitsland", code: "DE", flag: "🇩🇪" },
  { name: "Frankrijk", code: "FR", flag: "🇫🇷" },
  { name: "Verenigd Koninkrijk", code: "GB", flag: "🇬🇧" },
  { name: "Spanje", code: "ES", flag: "🇪🇸" },
  { name: "Italië", code: "IT", flag: "🇮🇹" },
  { name: "Verenigde Staten", code: "US", flag: "🇺🇸" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Australië", code: "AU", flag: "🇦🇺" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "China", code: "CN", flag: "🇨🇳" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "Brazilië", code: "BR", flag: "🇧🇷" },
  { name: "Zuid-Afrika", code: "ZA", flag: "🇿🇦" },
  { name: "Zweden", code: "SE", flag: "🇸🇪" },
  { name: "Noorwegen", code: "NO", flag: "🇳🇴" },
  { name: "Denemarken", code: "DK", flag: "🇩🇰" },
  { name: "Polen", code: "PL", flag: "🇵🇱" },
  { name: "Oostenrijk", code: "AT", flag: "🇦🇹" },
];

// Niches
export const niches: Niche[] = [
  { id: "ai", name: "Artificial Intelligence" },
  { id: "fintech", name: "FinTech" },
  { id: "sustainability", name: "Duurzaamheid" },
  { id: "health", name: "Gezondheid & Welzijn" },
  { id: "energy", name: "Energie" },
  { id: "mobility", name: "Mobiliteit" },
  { id: "logistics", name: "Logistiek" },
  { id: "education", name: "Educatie" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "manufacturing", name: "Productie" },
  { id: "food", name: "Voeding & Landbouw" },
  { id: "realestate", name: "Vastgoed" },
  { id: "entertainment", name: "Entertainment & Media" },
  { id: "tourism", name: "Toerisme & Hospitality" },
  { id: "construction", name: "Bouw & Architectuur" },
  { id: "cybersecurity", name: "Cybersecurity" },
  { id: "retail", name: "Retail" },
  { id: "biotech", name: "Biotechnologie" },
  { id: "blockchain", name: "Blockchain & Web3" },
  { id: "sharing", name: "Deeleconomie" },
];

// API endpoint
export const API_URL = "https://kaiser1457.app.n8n.cloud/webhook/d8414532-8909-4f54-8d09-2836ffa835cc";

// Loading messages
export const loadingMessages = [
  "AI-experts overleggen...",
  "Trendanalyse wordt uitgevoerd...",
  "ESG-vereisten worden geverifieerd...",
  "Businessmodel wordt opgesteld...",
  "Marktpotentieel wordt ingeschat...",
  "Naam en branding worden gegenereerd...",
  "Concurrentieanalyse wordt uitgevoerd...",
  "Revenue streams worden ontwikkeld...",
  "MVP-requirements worden opgesteld...",
  "Tech stack wordt samengesteld..."
];

// Mock business idea for demo/testing
export const mockBusinessIdea: BusinessIdea = {
  name: "VoltCycle",
  slogan: "Powering the future, twice.",
  positioning: "De Tesla van batterijrecycling",
  goal: "VoltCycle lost inefficiënte batterijrecycling op door tracking en een marktplaats voor hergebruik, met directe ESG-compliance en kostenbesparing voor EV- en defensie-industrie.",
  features: [
    {
      title: "Battery Recycling Dashboard",
      description: "Realtime metrics, CO₂ credits en besparingen"
    },
    {
      title: "Recycled Battery Marketplace",
      description: "B2B-marktplaats met tot 40% goedkopere grondstoffen"
    },
    {
      title: "ESG Compliance Tracker",
      description: "Auditklare rapporten voor CO₂-verlaging"
    }
  ],
  targetAudience: {
    segments: [
      "EV-producenten",
      "Defensiecontractoren",
      "Overheidsinstanties"
    ],
    painPoints: [
      "Hoge grondstofkosten",
      "Onduidelijke wetgeving",
      "Gebrek aan transparantie"
    ]
  },
  businessModel: [
    {
      type: "Abonnement",
      details: "€5k/maand"
    },
    {
      type: "Verkoop gerecycleerde materialen",
      details: "30% goedkoper dan nieuw"
    },
    {
      type: "Carbon credits",
      details: "€50/ton CO₂"
    },
    {
      type: "Licensing aan OEMs",
      details: "Royalty-based model"
    }
  ],
  technicalStack: {
    frontend: "React.js + MUI",
    backend: "Node.js + Express",
    integrations: ["Stripe", "AWS", "Carbon Analytics API"]
  },
  roadmap: [
    {
      timeframe: "Week 1–2",
      tasks: ["API-integratie", "Datamodel ontwikkeling"]
    },
    {
      timeframe: "Week 3–5",
      tasks: ["UI dashboard", "Marktplaats implementatie", "Rapportage module"]
    },
    {
      timeframe: "Week 6",
      tasks: ["Bugfixing", "Pilot lancering"]
    },
    {
      timeframe: "Week 7–8",
      tasks: ["AWS launch", "Onboarding eerste klanten"]
    }
  ]
};
