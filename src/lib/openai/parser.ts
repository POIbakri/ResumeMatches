import type { Analysis } from '../../types/models';

const DEBUG = process.env.NODE_ENV === 'development';

function validateOpenAIResponse(content: string) {
  const expectedSections = [
    'FIT_SCORE',
    'VERDICT',
    'REASONING',
    'TECHNICAL_SKILLS',
    'RISK_FACTORS',
    'GROWTH_POTENTIAL',
    'INTERVIEW_PLAN'
  ];

  const foundSections = expectedSections.map(section => {
    const found = content.includes(section + ':');
    if (DEBUG && !found) {
      console.warn(`Missing section: ${section}`);
    }
    return { section, found };
  });

  if (DEBUG) {
    console.log('Raw OpenAI Response:', content);
    console.log('Section validation:', foundSections);
  }

  const missingSection = foundSections.find(s => !s.found);
  if (missingSection) {
    throw new Error(`Invalid response format from OpenAI: Missing ${missingSection.section} section`);
  }

  // Validate specific format requirements
  const validations = [
    {
      check: /FIT_SCORE:\s*(\d+(\.\d+)?)/i,
      message: 'FIT_SCORE must be a number'
    },
    {
      check: /VERDICT:\s*(STRONG_FIT|POTENTIAL_FIT|NEEDS_CONSIDERATION|NOT_RECOMMENDED)/i,
      message: 'VERDICT must be one of: STRONG_FIT, POTENTIAL_FIT, NEEDS_CONSIDERATION, NOT_RECOMMENDED'
    },
    {
      check: /REASONING:[\s\S]*?(-\s+.+(\n|$))+/,
      message: 'REASONING must contain bullet points'
    }
  ];

  validations.forEach(({ check, message }) => {
    if (!check.test(content)) {
      if (DEBUG) {
        console.warn(`Validation failed: ${message}`);
        console.warn('Content snippet:', content.substring(0, 200) + '...');
      }
      throw new Error(`Invalid response format from OpenAI: ${message}`);
    }
  });

  return true;
}

const parseRiskFactors = (text: string) => {
  if (!text) return [];

  return text
    .split(/(?=^-\s*Severity:)/m)
    .filter(Boolean)
    .map(factor => {
      const severityMatch = factor.match(/Severity:\s*\[?(HIGH|MEDIUM|LOW)\]?/i);
      const descriptionMatch = factor.match(/\*\s*Description:\s*\[?([^\n\]]+)\]?/i);
      const mitigationMatch = factor.match(/\*\s*Mitigation:\s*\[?([^\n\]]+)\]?/i);

      if (severityMatch && descriptionMatch) {
        return {
          severity: severityMatch[1].toUpperCase() as 'HIGH' | 'MEDIUM' | 'LOW',
          description: descriptionMatch[1].trim(),
          mitigation: mitigationMatch?.[1]?.trim()
        };
      }
      return null;
    })
    .filter((f): f is NonNullable<typeof f> => f !== null);
};

export function parseAnalysisResponse(content: string): Omit<Analysis, 'id' | 'candidate_id' | 'job_id' | 'created_at'> {
  try {
    // Validate the response format first
    validateOpenAIResponse(content);

    const fitScoreMatch = content.match(/FIT_SCORE:\s*(\d+(\.\d+)?)/i);
    const verdictMatch = content.match(/VERDICT:\s*(STRONG_FIT|POTENTIAL_FIT|NEEDS_CONSIDERATION|NOT_RECOMMENDED)/i);
    const reasoningMatch = content.match(/REASONING:([\s\S]*?)(?=TECHNICAL_SKILLS:)/i);
    const technicalSkillsMatch = content.match(/TECHNICAL_SKILLS:([\s\S]*?)(?=RISK_FACTORS:)/i);
    const riskFactorsMatch = content.match(/RISK_FACTORS:([\s\S]*?)(?=GROWTH_POTENTIAL:)/i);
    const growthPotentialMatch = content.match(/GROWTH_POTENTIAL:([\s\S]*?)(?=INTERVIEW_PLAN:)/i);
    const interviewPlanMatch = content.match(/INTERVIEW_PLAN:([\s\S]*$)/i);

    if (!fitScoreMatch || !verdictMatch || !reasoningMatch || !interviewPlanMatch) {
      const missingFields = [
        !fitScoreMatch && 'FIT_SCORE',
        !verdictMatch && 'VERDICT',
        !reasoningMatch && 'REASONING',
        !interviewPlanMatch && 'INTERVIEW_PLAN'
      ].filter(Boolean);

      if (DEBUG) {
        console.error('Failed to match required fields:', missingFields);
        console.error('Content:', content);
      }

      throw new Error(`Invalid response format from OpenAI: Missing ${missingFields.join(', ')}`);
    }

    const parseList = (text: string) => {
      return text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('-'))
        .map(line => line.slice(1).trim());
    };

    const parseGrowthPotential = (text: string) => {
      const areas = text.match(/Areas:([\s\S]*?)(?=Recommendations:)/i)?.[1] || '';
      const recommendations = text.match(/Recommendations:([\s\S]*$)/i)?.[1] || '';

      return {
        areas: parseList(areas),
        recommendations: parseList(recommendations)
      };
    };

    const parseTechnicalSkills = (text: string) => {
      return text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.startsWith('-'))
        .map(line => {
          const [name, assessment] = line.slice(1).split(':').map(s => s.trim());
          return {
            name,
            proficiency: calculateProficiency(assessment),
            assessment
          };
        });
    };

    return {
      fit_score: parseInt(fitScoreMatch[1], 10),
      verdict: verdictMatch[1] as Analysis['verdict'],
      reasoning: parseList(reasoningMatch[1]),
      technical_skills: parseTechnicalSkills(technicalSkillsMatch?.[1] || ''),
      risk_factors: parseRiskFactors(riskFactorsMatch?.[1] || ''),
      growth_potential: parseGrowthPotential(growthPotentialMatch?.[1] || ''),
      interview_plan: interviewPlanMatch[1].trim(),
      cv_summary: '',
      job_requirements: '',
      questions_used: [],
      suggestions: [], // Added missing required field
      status: 'pending'
    };
  } catch (error) {
    if (DEBUG) {
      console.error('Parser error:', error);
      console.error('Raw content:', content);
    }
    throw error;
  }
}

function calculateProficiency(assessment: string): number {
  const proficiencyKeywords = {
    expert: 90,
    advanced: 80,
    strong: 75,
    good: 70,
    intermediate: 60,
    basic: 40,
    limited: 30,
    beginner: 20
  };

  const assessment_lower = assessment.toLowerCase();
  for (const [keyword, score] of Object.entries(proficiencyKeywords)) {
    if (assessment_lower.includes(keyword)) {
      return score;
    }
  }

  return 50; // Default score
}