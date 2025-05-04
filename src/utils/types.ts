
export interface Country {
  name: string;
  code: string;
  flag: string;
}

export interface Niche {
  id: string;
  name: string;
  icon?: string;
}

export interface BusinessIdea {
  name: string;
  slogan: string;
  positioning: string;
  goal: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  targetAudience: {
    segments: string[];
    painPoints: string[];
  };
  businessModel: Array<{
    type: string;
    details: string;
  }>;
  technicalStack: {
    frontend: string;
    backend: string;
    integrations: string[];
  };
  roadmap: Array<{
    timeframe: string;
    tasks: string[];
  }>;
}

export interface FormData {
  country: Country | null;
  niche: Niche | null;
}
