import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface RiskFactor {
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  mitigation?: string;
}

interface RiskFactorsProps {
  factors?: string[] | RiskFactor[];
}

export function RiskFactors({ factors = [] }: RiskFactorsProps) {
  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('Raw factors input:', factors);
  }

  if (!factors?.length) {
    return (
      <div className="text-sm text-gray-500 italic">
        <p>No significant risk factors identified</p>
      </div>
    );
  }

  // Parse structured risk factors if they're in string format
  const parsedFactors: RiskFactor[] = factors.map(factor => {
    if (typeof factor === 'string') {
      const cleanFactor = factor.replace(/^RISK_FACTORS:\s*/i, '').trim();

      // 1) Attempt to match the multiline pattern
      const mainPattern = /^-\s*Severity:\s*\[?(HIGH|MEDIUM|LOW)\]?\s*\n\s*\*\s*Description:\s*\[?([^\n\]]+)\]?\s*\n\s*\*\s*Mitigation:\s*\[?([^\n\]]+)\]?/im;
      const match = cleanFactor.match(mainPattern);
      if (match) {
        const [, severity, description, mitigation] = match;
        return {
          severity: severity.toUpperCase() as RiskFactor['severity'],
          description: description.trim(),
          mitigation: mitigation.trim(),
        };
      }

      // 2) Attempt partial matching
      const severityMatch = cleanFactor.match(/Severity:\s*\[?(HIGH|MEDIUM|LOW)\]?/i);
      const descriptionMatch = cleanFactor.match(/Description:\s*\[?([^\n\]]+)\]?/i);
      const mitigationMatch = cleanFactor.match(/Mitigation:\s*\[?([^\n\]]+)\]?/i);

      if (severityMatch) {
        return {
          severity: severityMatch[1].toUpperCase() as RiskFactor['severity'],
          description: descriptionMatch?.[1]?.trim() || cleanFactor,
          mitigation: mitigationMatch?.[1]?.trim(),
        };
      }

      // 3) If none of the above matched, try JSON parsing
      try {
        const maybeJson = JSON.parse(cleanFactor);
        // If it parses successfully and looks like an object
        if (maybeJson && typeof maybeJson === 'object') {
          return {
            severity: (maybeJson.severity || 'MEDIUM').toUpperCase(),
            description: maybeJson.description || '',
            mitigation: maybeJson.mitigation || '',
          };
        }
      } catch (e) {
        // Not valid JSON, ignore
      }

      // 4) Final fallback
      return {
        severity: 'MEDIUM',
        description: cleanFactor,
      };
    }

    // If it's already a RiskFactor object
    return factor;
  });

  const getSeverityColor = (severity: RiskFactor['severity']) => {
    switch (severity) {
      case 'HIGH':
        return 'text-red-500';
      case 'MEDIUM':
        return 'text-amber-500';
      case 'LOW':
        return 'text-yellow-500';
      default:
        return 'text-amber-500';
    }
  };

  return (
    <div className="space-y-4">
      {parsedFactors.map((factor, index) => (
        <div key={index} className="rounded-lg bg-gray-50 p-4">
          <div className="flex items-start space-x-3">
            <ExclamationTriangleIcon
              className={`h-5 w-5 flex-shrink-0 mt-0.5 ${getSeverityColor(factor.severity)}`}
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-medium ${getSeverityColor(factor.severity)}`}>
                  {factor.severity}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-700">{factor.description}</p>
              {factor.mitigation && (
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Mitigation: </span>
                  {factor.mitigation}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
