import type { Analysis } from '../../types/models';

interface TechnicalAnalysisProps {
  analysis: Analysis;
}

interface LegacyTechnicalSkill {
  [x: string]: string;
  name: string;
  proficiency: string;
  assessment: string;
}

interface DisplayTechnicalSkill {
  skill: string;
  proficiency: string;
  evidence: string;
  currency: string;
}

export function TechnicalAnalysis({ analysis }: TechnicalAnalysisProps) {
  const convertLegacySkill = (skill: LegacyTechnicalSkill): DisplayTechnicalSkill => {
    const getProficiencyLabel = (proficiency: number): string => {
      if (proficiency >= 90) return 'EXPERT';
      if (proficiency >= 80) return 'ADVANCED';
      if (proficiency >= 60) return 'INTERMEDIATE';
      if (proficiency >= 40) return 'BASIC';
      return 'BEGINNER';
    };

    return {
      skill: skill.name,
      proficiency: getProficiencyLabel(parseInt(skill.proficiency, 10)),
      evidence: skill.assessment,
      currency: skill.currency
    };
  };

  const skills: DisplayTechnicalSkill[] = (analysis.technical_skills || []).map(
    (skill: any) => {
      if ('skill' in skill && 'evidence' in skill && 'currency' in skill) {
        return skill as DisplayTechnicalSkill;
      }
      return convertLegacySkill(skill as LegacyTechnicalSkill);
    }
  );

  if (!skills.length) {
    return (
      <p className="text-sm text-gray-500 italic">Technical skills analysis not available</p>
    );
  }

  return (
    <div className="space-y-6">
      {skills.map((skill: DisplayTechnicalSkill, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Skill: {skill.skill}</h4>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Proficiency:</span>
                <span className="font-medium text-blue-600">{skill.proficiency}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-gray-600 mr-2">•</span>
                <div>
                  <span className="text-sm text-gray-600 font-medium">Evidence: </span>
                  <span className="text-sm text-gray-600">{skill.evidence}</span>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-gray-600 mr-2">•</span>
                <div>
                  <span className="text-sm text-gray-600 font-medium">Experience: </span>
                  <span className="text-sm text-gray-600">{skill.currency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}