
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

// Updated BusinessIdea type to match webhook response structure
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

// Interface for the raw API response structure
export interface WebhookResponse {
  [0]?: {
    output?: {
      core_features?: Array<{name?: string, benefit?: string}>;
      objective?: string;
      technical_stack?: {
        frontend?: string;
        backend?: string;
        integrations?: string[];
      };
      timeline?: Array<{phase?: string, activities?: string[]}>;
      target_audience?: {
        segments?: string[];
        pain_points?: string[];
      };
    }
  };
  [1]?: {
    output?: {
      key_partners?: string[];
      key_activities?: string[];
      value_propositions?: string[];
      cost_structure?: {[key: string]: string};
      revenue_streams?: {[key: string]: string};
      summary?: string;
    }
  };
  [2]?: {
    output?: {
      naam?: string;
      slogan?: string;
      merkgevoel?: string;
      uitleg?: string;
      positionering?: string;
    }
  };
}
