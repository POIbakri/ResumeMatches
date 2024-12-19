import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

interface GrowthPotentialProps {
  potential?: {
    areas: string[];
    recommendations: string[];
  };
}

export function GrowthPotential({ potential }: GrowthPotentialProps) {
  if (!potential) {
    return (
      <p className="text-sm text-gray-500 italic">Growth potential analysis not available</p>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Growth Areas</h4>
        <div className="space-y-2">
          {potential.areas.map((area, index) => (
            <div key={index} className="flex items-start space-x-3">
              <ArrowTrendingUpIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">{area}</p>
            </div>
          ))}
        </div>
      </div>

      {potential.recommendations.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Development Recommendations</h4>
          <ul className="list-disc pl-5 space-y-1">
            {potential.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-600">{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}