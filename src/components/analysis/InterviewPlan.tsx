import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface InterviewSection {
  title: string;
  duration: string;
  questions: string[];
  redFlags: string[];
  greenFlags: string[];
}

interface InterviewPlanProps {
  plan?: string;
}

export function InterviewPlan({ plan }: InterviewPlanProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const parseSections = (planText: string | undefined): InterviewSection[] => {
    if (!planText) {
      return [];
    }

    try {
      // Remove "INTERVIEW_PLAN:" prefix and normalize line endings
      const normalizedPlan = planText
        .replace(/^INTERVIEW_PLAN:\s*/i, '')
        .replace(/\r\n/g, '\n')
        .trim();
      
      // Split by numbered sections (e.g., "1.", "2.", etc.)
      const rawSections = normalizedPlan.split(/(?=\d+\.\s*Question Category:)/i)
        .filter(section => section.trim());

      return rawSections
        .map(rawSection => {
          // Extract title and duration
          const titleMatch = rawSection.match(/Question Category:\s*(.*?)\((\d+)\s*minutes\)/i);
          if (!titleMatch) return null;

          const [, title, duration] = titleMatch;
          
          const questions: string[] = [];
          const redFlags: string[] = [];
          const greenFlags: string[] = [];

          // Split into subsections
          const lines = rawSection.split('\n').map(line => line.trim());
          
          let currentSection = '';
          lines.forEach(line => {
            if (line.startsWith('Primary Question:')) {
              currentSection = 'primary';
              const question = line.replace(/^Primary Question:\s*/i, '').trim();
              if (question) questions.unshift(question);
            } else if (line.startsWith('Follow-up Questions:')) {
              currentSection = 'followup';
            } else if (line.startsWith('Red Flags:')) {
              currentSection = 'red';
            } else if (line.startsWith('Green Flags:')) {
              currentSection = 'green';
            } else if (line.startsWith('Expected Answer:') || line.startsWith('Evaluation Criteria:')) {
              currentSection = 'other';
            } else if (line.startsWith('-') && line.length > 1) {
              const content = line.replace(/^-\s*/, '').trim();
              switch (currentSection) {
                case 'followup':
                  questions.push(content);
                  break;
                case 'red':
                  redFlags.push(content);
                  break;
                case 'green':
                  greenFlags.push(content);
                  break;
              }
            }
          });

          return {
            title: title.trim(),
            duration: `${duration} minutes`,
            questions,
            redFlags,
            greenFlags
          };
        })
        .filter((section): section is InterviewSection => section !== null);

    } catch (error) {
      console.error('Error parsing interview plan:', error);
      return [];
    }
  };

  const sections = parseSections(plan);

  if (!plan) {
    return (
      <p className="text-sm text-gray-500 italic">Interview plan not available</p>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="text-gray-500 italic">
        <p>No interview plan sections found</p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify({ rawPlan: plan }, null, 2)}
          </pre>
        )}
      </div>
    );
  }

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
              {section.questions.length > 0 && (
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
              )}

              {section.redFlags.length > 0 && (
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

              {section.greenFlags.length > 0 && (
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