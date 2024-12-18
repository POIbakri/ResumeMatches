import React from 'react';

interface SuggestionsListProps {
  suggestions: string[];
}

export function SuggestionsList({ suggestions }: SuggestionsListProps) {
  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">{index + 1}</span>
            </div>
            <span className="text-gray-700">{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}