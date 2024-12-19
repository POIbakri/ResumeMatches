import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface RiskFactorsProps {
  factors?: string[];
}

export function RiskFactors({ factors = [] }: RiskFactorsProps) {
  if (!factors?.length) {
    return (
      <p className="text-sm text-gray-500 italic">No significant risk factors identified</p>
    );
  }

  return (
    <div className="space-y-3">
      {factors.map((factor, index) => (
        <div key={index} className="flex items-start space-x-3">
          <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-700">{factor}</p>
        </div>
      ))}
    </div>
  );
}