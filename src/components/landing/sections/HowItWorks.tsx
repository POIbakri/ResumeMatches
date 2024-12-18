import React from 'react';
import { 
  ArrowUpTrayIcon,
  SparklesIcon,
  DocumentTextIcon,
  UserGroupIcon 
} from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Upload CV & Job Description',
    description: 'Simply upload a CV and job description to get started.',
    icon: ArrowUpTrayIcon,
    color: 'bg-blue-500'
  },
  {
    title: 'AI Analysis',
    description: 'Our advanced AI analyzes the match and generates insights.',
    icon: SparklesIcon,
    color: 'bg-purple-500'
  },
  {
    title: 'Get Detailed Report',
    description: 'Receive a comprehensive analysis with actionable insights.',
    icon: DocumentTextIcon,
    color: 'bg-green-500'
  },
  {
    title: 'Make Better Decisions',
    description: 'Use data-driven insights to make informed hiring decisions.',
    icon: UserGroupIcon,
    color: 'bg-indigo-500'
  }
];

export function HowItWorks() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in minutes with our simple, powerful CV analysis process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-gray-200 transform translate-x-1/2" />
              )}
              <div className="bg-white rounded-xl p-8 shadow-lg relative z-10">
                <div className={`${step.color} rounded-full p-3 w-12 h-12 flex items-center justify-center mb-6`}>
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}