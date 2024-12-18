import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface InterviewSection {
  title: string;
  duration: string;
  questions: string[];
  redFlags?: string[];
  greenFlags?: string[];
}

interface InterviewPlanProps {
  plan: string;
}

export function InterviewPlan({ plan }: InterviewPlanProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const parseSections = (plan: string): InterviewSection[] => {
    const sections = plan.split(/(?=\w+\s*\(\d+\s*minutes?\):)/i);
    return sections
      .filter(Boolean)
      .map(section => {
        const titleMatch = section.match(/^(.*?)(?:\((\d+)\s*minutes?\):)(.*)/is);
        if (!titleMatch) return null;

        const [, title, duration, content] = titleMatch;
        const lines = content.split('\n').filter(Boolean).map(line => line.trim());
        
        const questions = lines
          .filter(line => line.startsWith('-'))
          .map(line => line.slice(1).trim());

        const redFlags = lines
          .filter(line => line.toLowerCase().includes('red flag'))
          .map(line => line.replace(/^[^:]*:\s*/, ''));
        
        const greenFlags = lines
          .filter(line => line.toLowerCase().includes('green flag'))
          .map(line => line.replace(/^[^:]*:\s*/, ''));

        return {
          title: title.trim(),
          duration: `${duration} minutes`,
          questions,
          redFlags,
          greenFlags
        };
      })
      .filter((section): section is InterviewSection => section !== null);
  };

  const sections = parseSections(plan);

  return (
    <div className="divide-y divide-gray-200">
      {sections.map((section, index) => (
        <div key={index} className="py-4 first:pt-0 last:pb-0">
          <button
            onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
            className="w-full flex items-center justify-between text-left"
          >
            <div>
              <h4 className="text-lg font-medium text-gray-900">{section.title}</h4>
              <p className="text-sm text-gray-500">{section.duration}</p>
            </div>
            {expandedSection === section.title ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {expandedSection === section.title && (
            <div className="mt-4 space-y-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Questions:</h5>
                <ul className="space-y-2">
                  {section.questions.map((question, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-600">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {section.redFlags && section.redFlags.length > 0 && (
                <div>
                  <h5 className="font-medium text-red-600 mb-2">Watch out for:</h5>
                  <ul className="space-y-2">
                    {section.redFlags.map((flag, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-red-600 mt-1">⚠</span>
                        <span className="text-red-600">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {section.greenFlags && section.greenFlags.length > 0 && (
                <div>
                  <h5 className="font-medium text-green-600 mb-2">Positive Indicators:</h5>
                  <ul className="space-y-2">
                    {section.greenFlags.map((flag, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-green-600">{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}