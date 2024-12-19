import type { Analysis } from '../../types/models';

export function parseAnalysisResponse(content: string): Omit<Analysis, 'id' | 'candidate_id' | 'job_id' | 'created_at'> {
  const fitScoreMatch = content.match(/FIT_SCORE:\s*(\d+)/i);
  const verdictMatch = content.match(/VERDICT:\s*(GOOD_FIT|NEEDS_CONSIDERATION|BAD_FIT)/i);
  const reasoningMatch = content.match(/REASONING:([\s\S]*?)(?=TECHNICAL_SKILLS:)/i);
  const technicalSkillsMatch = content.match(/TECHNICAL_SKILLS:([\s\S]*?)(?=RISK_FACTORS:)/i);
  const riskFactorsMatch = content.match(/RISK_FACTORS:([\s\S]*?)(?=GROWTH_POTENTIAL:)/i);
  const growthPotentialMatch = content.match(/GROWTH_POTENTIAL:([\s\S]*?)(?=INTERVIEW_PLAN:)/i);
  const interviewPlanMatch = content.match(/INTERVIEW_PLAN:([\s\S]*$)/i);

  if (!fitScoreMatch || !verdictMatch || !reasoningMatch || !interviewPlanMatch) {
    throw new Error('Invalid response format from OpenAI');
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
    risk_factors: parseList(riskFactorsMatch?.[1] || ''),
    growth_potential: parseGrowthPotential(growthPotentialMatch?.[1] || ''),
    interview_plan: interviewPlanMatch[1].trim(),
    cv_summary: '',
    job_requirements: '',
    questions_used: [],
    suggestions: [], // Added missing required field
    status: 'pending'
  };
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