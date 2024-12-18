import React from 'react';
import { 
  SparklesIcon,
  ChartBarIcon,
  DocumentTextIcon,
  LightBulbIcon,
  BeakerIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms analyze CVs against job requirements with unprecedented accuracy.',
    icon: SparklesIcon,
    color: 'bg-blue-500'
  },
  {
    name: 'Smart Scoring',
    description: 'Get detailed candidate fit scores and comprehensive breakdowns of qualifications.',
    icon: ChartBarIcon,
    color: 'bg-green-500'
  },
  {
    name: 'Instant Reports',
    description: 'Generate professional PDF reports with detailed analysis and recommendations.',
    icon: DocumentTextIcon,
    color: 'bg-purple-500'
  },
  {
    name: 'Interview Intelligence',
    description: "Get AI-generated interview questions tailored to each candidate's profile.",
    icon: LightBulbIcon,
    color: 'bg-yellow-500'
  },
  {
    name: 'Technical Assessment',
    description: 'Deep analysis of technical skills and experience levels.',
    icon: BeakerIcon,
    color: 'bg-red-500'
  },
  {
    name: 'Bias Prevention',
    description: 'Ensure fair and objective candidate evaluation with our AI system.',
    icon: ShieldCheckIcon,
    color: 'bg-indigo-500'
  }
];

export function FeaturesGrid() {
  return (
    <div className="bg-white py-24" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Recruitment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline your candidate evaluation process and make better hiring decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className={`${feature.color} rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-6`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.name}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}