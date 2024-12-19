import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
//import { formatDate } from '../../lib/utils';

interface InterviewSection {
  title: string;
  duration: string;
  questions: {
    main: string;
    followUp: string[];
    redFlags?: string[];
    greenFlags?: string[];
  }[];
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
        
        const questions: InterviewSection['questions'] = [];
        let currentQuestion: any = null;

        lines.forEach(line => {
          if (line.startsWith('Q:') || line.startsWith('-')) {
            if (currentQuestion) {
              questions.push(currentQuestion);
            }
            currentQuestion = {
              main: line.replace(/^Q:|^-/, '').trim(),
              followUp: [],
              redFlags: [],
              greenFlags: []
            };
          } else if (line.startsWith('Follow-up:') && currentQuestion) {
            currentQuestion.followUp.push(line.replace('Follow-up:', '').trim());
          } else if (line.toLowerCase().includes('red flag') && currentQuestion) {
            currentQuestion.redFlags.push(line.replace(/^[^:]*:\s*/, '').trim());
          } else if (line.toLowerCase().includes('green flag') && currentQuestion) {
            currentQuestion.greenFlags.push(line.replace(/^[^:]*:\s*/, '').trim());
          }
        });

        if (currentQuestion) {
          questions.push(currentQuestion);
        }

        return {
          title: title.trim(),
          duration: `${duration} minutes`,
          questions
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
            <div className="mt-4 space-y-6">
              {section.questions.map((question, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{i + 1}</span>
                    </span>
                    <p className="text-gray-900 font-medium">{question.main}</p>
                  </div>

                  {question.followUp.length > 0 && (
                    <div className="ml-8 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Follow-up Questions:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        {question.followUp.map((followUp, j) => (
                          <li key={j} className="text-sm text-gray-600">{followUp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.redFlags && question.redFlags.length > 0 && (
                      <div className="bg-red-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-red-800 mb-2">Watch out for:</p>
                        <ul className="space-y-1">
                          {question.redFlags.map((flag, j) => (
                            <li key={j} className="text-sm text-red-600 flex items-start space-x-2">
                              <span className="text-red-500">⚠</span>
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {question.greenFlags && question.greenFlags.length > 0 && (
                      <div className="bg-green-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-green-800 mb-2">Positive Indicators:</p>
                        <ul className="space-y-1">
                          {question.greenFlags.map((flag, j) => (
                            <li key={j} className="text-sm text-green-600 flex items-start space-x-2">
                              <span className="text-green-500">✓</span>
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}