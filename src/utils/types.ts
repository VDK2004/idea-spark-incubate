
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

// Interface for the raw API response structure - updated to match the new format
export interface WebhookResponse {
  data?: Array<{
    output?: {
      objective?: string;
      core_features?: Array<{
        name?: string;
        benefit?: string;
      }>;
      target_audience?: {
        user_types?: string[];
        pain_points?: string[];
        early_adopter_reason?: string;
      };
      technical_stack?: {
        frontend?: string;
        backend?: string;
        database?: string;
        hosting?: string;
        integrations?: string[];
        justification?: string;
      };
      timeline?: {
        week_1_2?: string;
        week_3_5?: string;
        week_6?: string;
        week_7_8?: string;
      };
      key_partners?: string[];
      key_activities?: string[];
      value_propositions?: string[];
      customer_relationships?: string[];
      customer_segments?: string[];
      key_resources?: string[];
      channels?: string[];
      revenue_streams?: string[];
      cost_structure?: string[];
      summary?: string;
      naam?: string;
      positionering?: string;
      slogan?: string;
      merkgevoel?: string[] | string;
      uitleg?: string;
    }
  }>
}

