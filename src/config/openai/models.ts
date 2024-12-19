export const OPENAI_MODELS = {
  GPT_4: 'gpt-4',
  GPT_4_TURBO: 'gpt-4-turbo-preview',
  GPT_3_5_TURBO: 'gpt-3.5-turbo',
  GPT_4O_MINI: 'gpt-4o-mini'
} as const;

export const DEFAULT_MODEL = OPENAI_MODELS.GPT_4O_MINI;

export const MODEL_CONFIGS = {
  [OPENAI_MODELS.GPT_4]: {
    maxTokens: 4000,
    temperature: 0.7,
    presencePenalty: 0.1,
    frequencyPenalty: 0.1
  },
  [OPENAI_MODELS.GPT_4_TURBO]: {
    maxTokens: 4000,
    temperature: 0.7,
    presencePenalty: 0.1,
    frequencyPenalty: 0.1
  },
  [OPENAI_MODELS.GPT_3_5_TURBO]: {
    maxTokens: 2000,
    temperature: 0.7,
    presencePenalty: 0,
    frequencyPenalty: 0
  },
  [OPENAI_MODELS.GPT_4O_MINI]: {
    maxTokens: 4000,
    temperature: 0.7,
    presencePenalty: 0.1,
    frequencyPenalty: 0.1
  }
} as const;