import { 
  CheckCircleIcon, 
  XCircleIcon,
  QuestionMarkCircleIcon 
} from '@heroicons/react/24/outline';
import type { Verdict } from '../../types/models';

interface VerdictCardProps {
  verdict: Verdict;
  reasoning: string[];
}

export function VerdictCard({ verdict, reasoning }: VerdictCardProps) {
  const verdictStyles = {
    STRONG_FIT: {
      border: 'border-green-200',
      bg: 'bg-green-50',
      icon: CheckCircleIcon,
      iconColor: 'text-green-600',
      title: 'Strong Fit',
      titleColor: 'text-green-800',
      textColor: 'text-green-700',
      dotColor: 'bg-green-600'
    },
    POTENTIAL_FIT: {
      border: 'border-yellow-200',
      bg: 'bg-yellow-50',
      icon: QuestionMarkCircleIcon,
      iconColor: 'text-yellow-600',
      title: 'Potential Fit',
      titleColor: 'text-yellow-800',
      textColor: 'text-yellow-700',
      dotColor: 'bg-yellow-600'
    },
    NEEDS_CONSIDERATION: {
      border: 'border-yellow-200',
      bg: 'bg-yellow-50',
      icon: QuestionMarkCircleIcon,
      iconColor: 'text-yellow-600',
      title: 'Needs Consideration',
      titleColor: 'text-yellow-800',
      textColor: 'text-yellow-700',
      dotColor: 'bg-yellow-600'
    },
    NOT_RECOMMENDED: {
      border: 'border-red-200',
      bg: 'bg-red-50',
      icon: XCircleIcon,
      iconColor: 'text-red-600',
      title: 'Not Recommended',
      titleColor: 'text-red-800',
      textColor: 'text-red-700',
      dotColor: 'bg-red-600'
    }
  } as const;

  const style = verdictStyles[verdict];
  const Icon = style.icon;
  
  return (
    <div className={`p-6 rounded-lg border ${style.border} ${style.bg}`}>
      <div className="flex items-center space-x-3 mb-4">
        <Icon className={`h-6 w-6 ${style.iconColor}`} />
        <h3 className={`font-semibold ${style.titleColor}`}>
          {style.title}
        </h3>
      </div>
      
      <div className="space-y-2">
        {reasoning.map((reason, index) => (
          <div key={index} className="flex items-start space-x-2">
            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${style.dotColor}`} />
            <p className={`text-sm ${style.textColor}`}>
              {reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}