import type { Analysis, TechnicalSkill } from '../../types/models';

interface TechnicalAnalysisProps {
  analysis: Analysis;
}

export function TechnicalAnalysis({ analysis }: TechnicalAnalysisProps) {
  const skills: TechnicalSkill[] = analysis.technical_skills || [];

  if (!skills.length) {
    return (
      <p className="text-sm text-gray-500 italic">Technical skills analysis not available</p>
    );
  }

  return (
    <div className="space-y-6">
      {skills.map((skill: TechnicalSkill, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">{skill.name}</h4>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">{skill.proficiency}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">{skill.assessment}</p>
          {skill.recommendations && (
            <div className="mt-2 text-sm text-blue-600">
              Recommendation: {skill.recommendations}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}