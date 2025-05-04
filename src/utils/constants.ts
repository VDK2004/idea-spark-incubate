
import { Country, Niche } from "./types";

// A selection of countries with their flags
export const countries: Country[] = [
  { name: "Nederland", code: "NL", flag: "🇳🇱" },
  { name: "België", code: "BE", flag: "🇧🇪" },
  { name: "Duitsland", code: "DE", flag: "🇩🇪" },
  { name: "Frankrijk", code: "FR", flag: "🇫🇷" },
  { name: "Verenigd Koninkrijk", code: "GB", flag: "🇬🇧" },
  { name: "Verenigde Staten", code: "US", flag: "🇺🇸" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Australië", code: "AU", flag: "🇦🇺" },
  { name: "Nieuw-Zeeland", code: "NZ", flag: "🇳🇿" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "China", code: "CN", flag: "🇨🇳" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "Brazilië", code: "BR", flag: "🇧🇷" },
  { name: "Zuid-Afrika", code: "ZA", flag: "🇿🇦" },
  { name: "Spanje", code: "ES", flag: "🇪🇸" },
  { name: "Italië", code: "IT", flag: "🇮🇹" },
  { name: "Portugal", code: "PT", flag: "🇵🇹" },
  { name: "Zweden", code: "SE", flag: "🇸🇪" },
  { name: "Noorwegen", code: "NO", flag: "🇳🇴" },
  { name: "Denemarken", code: "DK", flag: "🇩🇰" },
  { name: "Finland", code: "FI", flag: "🇫🇮" },
  { name: "Polen", code: "PL", flag: "🇵🇱" },
  { name: "Oostenrijk", code: "AT", flag: "🇦🇹" },
  { name: "Zwitserland", code: "CH", flag: "🇨🇭" },
  { name: "Griekenland", code: "GR", flag: "🇬🇷" },
  { name: "Singapore", code: "SG", flag: "🇸🇬" },
  { name: "Zuid-Korea", code: "KR", flag: "🇰🇷" },
  { name: "Verenigde Arabische Emiraten", code: "AE", flag: "🇦🇪" },
  { name: "Israël", code: "IL", flag: "🇮🇱" },
  { name: "Turkije", code: "TR", flag: "🇹🇷" },
];

// List of niches
export const niches: Niche[] = [
  { id: "ai", name: "Artificial Intelligence" },
  { id: "energy", name: "Energie" },
  { id: "fintech", name: "FinTech" },
  { id: "healthcare", name: "Gezondheidszorg" },
  { id: "mobility", name: "Mobiliteit" },
  { id: "sustainability", name: "Duurzaamheid" },
  { id: "edtech", name: "Educatie Tech" },
  { id: "proptech", name: "Real Estate Tech" },
  { id: "agritech", name: "Agrarische Tech" },
  { id: "retail", name: "Retail & E-commerce" },
  { id: "logistics", name: "Logistiek & Supply Chain" },
  { id: "foodtech", name: "Food Tech" },
  { id: "entertainment", name: "Entertainment & Media" },
  { id: "cybersecurity", name: "Cybersecurity" },
  { id: "biotech", name: "Biotechnologie" },
  { id: "manufacturing", name: "Smart Manufacturing" },
  { id: "saas", name: "SaaS" },
  { id: "socialimpact", name: "Social Impact" },
];

export const API_URL = "https://kaiser1457.app.n8n.cloud/webhook/d8414532-8909-4f54-8d09-2836ffa835cc";

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
    segments: ["EV-producenten", "Defensiecontractoren", "Overheidsinstanties"],
    painPoints: ["Hoge grondstofkosten", "Onduidelijke wetgeving", "Gebrek aan transparantie"]
  },
  businessModel: [
    { type: "Abonnement", details: "€5k/maand" },
    { type: "Verkoop gerecycleerde materialen", details: "30% goedkoper dan nieuw" },
    { type: "Carbon credits", details: "€50/ton CO₂" },
    { type: "Licensing aan OEMs", details: "" }
  ],
  technicalStack: {
    frontend: "React.js + MUI",
    backend: "Node.js + Express",
    integrations: ["Stripe"]
  },
  roadmap: [
    { timeframe: "Week 1-2", tasks: ["API-integratie", "Datamodel"] },
    { timeframe: "Week 3-5", tasks: ["UI dashboard", "Marktplaats", "Rapportage"] },
    { timeframe: "Week 6", tasks: ["Bugfixing", "Pilot"] },
    { timeframe: "Week 7-8", tasks: ["AWS launch", "Onboarding van eerste klanten"] }
  ]
};
