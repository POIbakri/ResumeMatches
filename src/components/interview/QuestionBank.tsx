import React, { useState } from 'react';
import { useInterviewQuestions } from './hooks/useInterviewQuestions';
import { Button } from '../form/Button';
import { LoadingSpinner } from '../feedback/LoadingSpinner';
import type { InterviewQuestion } from '../../types/models';

interface QuestionBankProps {
  onSelectQuestion: (question: InterviewQuestion) => void;
}

export function QuestionBank({ onSelectQuestion }: QuestionBankProps) {
  const [selectedCategory, setSelectedCategory] = useState<InterviewQuestion['category'] | 'all'>('all');
  const { questions, isLoading, error } = useInterviewQuestions(selectedCategory === 'all' ? undefined : selectedCategory);

  const categories: Array<{ value: typeof selectedCategory, label: string }> = [
    { value: 'all', label: 'All Questions' },
    { value: 'technical', label: 'Technical' },
    { value: 'behavioral', label: 'Behavioral' },
    { value: 'cultural', label: 'Cultural Fit' },
    { value: 'problem-solving', label: 'Problem Solving' }
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        {categories.map(category => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === category.value
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {questions.map(question => (
          <div
            key={question.id}
            className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelectQuestion(question)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{question.question}</p>
                {question.expectedAnswer && (
                  <p className="text-sm text-gray-600 mt-1">
                    Expected: {question.expectedAnswer}
                  </p>
                )}
              </div>
              <span className="text-sm text-gray-500">
                Used {question.times_used} times
              </span>
            </div>
            
            {(question.redFlags?.length || question.greenFlags?.length) && (
              <div className="mt-2 space-y-1">
                {question.redFlags?.length && (
                  <p className="text-sm text-red-600">
                    Red flags: {question.redFlags.join(', ')}
                  </p>
                )}
                {question.greenFlags?.length && (
                  <p className="text-sm text-green-600">
                    Green flags: {question.greenFlags.join(', ')}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}