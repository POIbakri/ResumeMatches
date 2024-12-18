import React from 'react';
import { Input } from '../form/Input';
import { TextArea } from '../form/TextArea';
import { CandidateSelector } from './CandidateSelector';

interface CandidateFormProps {
  candidateName: string;
  cvText: string;
  onNameChange: (value: string) => void;
  onCvTextChange: (value: string) => void;
  errors?: {
    name?: string;
    cvText?: string;
  };
}

export function CandidateForm({
  candidateName,
  cvText,
  onNameChange,
  onCvTextChange,
  errors = {},
}: CandidateFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">Candidate Information</h2>
          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-sm">1</span>
          </div>
        </div>
        <CandidateSelector
          onSelect={({ name, cvText }) => {
            onNameChange(name);
            onCvTextChange(cvText);
          }}
        />
      </div>
      
      <Input
        id="candidateName"
        label="Candidate Name"
        value={candidateName}
        onChange={(e) => onNameChange(e.target.value)}
        error={errors.name}
        placeholder="Enter candidate's full name"
        required
      />
      <TextArea
        id="cvText"
        label="CV Text"
        value={cvText}
        onChange={(e) => onCvTextChange(e.target.value)}
        error={errors.cvText}
        placeholder="Paste the candidate's CV content here..."
        required
      />
    </div>
  );
}