
import { Input } from '../form/Input';
import { TextArea } from '../form/TextArea';
import { CandidateSelector } from './CandidateSelector';
import { isDuplicateCandidate } from '../../lib/utils';
import { useCandidateHistory } from './hooks/useCandidateHistory';
import { FileUpload } from './FileUpload';

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
  const { candidates = [] } = useCandidateHistory();

  const handleNameChange = (value: string) => {
    // If there's a duplicate candidate, you could show a warning here
    if (isDuplicateCandidate(value, cvText, candidates)) {
      return;
    }
    onNameChange(value);
  };

  const handleCvTextChange = (value: string) => {
    // If there's a duplicate candidate, you could show a warning here
    if (isDuplicateCandidate(candidateName, value, candidates)) {
      return;
    }
    onCvTextChange(value);
  };

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

      {/* Candidate Name */}
      <Input
        id="candidateName"
        label="Candidate Name"
        value={candidateName}
        onChange={(e) => handleNameChange(e.target.value)}
        error={errors.name}
        placeholder="Enter candidate's full name"
        required
      />

      {/* PDF Upload for CV */}
      <FileUpload
        type="cv"
        onFileSelect={() => {
          // If you need to handle the file itself, do so here.
        }}
        onTextExtracted={(text) => handleCvTextChange(text)}
        onTitleExtracted={(title) => handleNameChange(title)}
        label="Upload CV (PDF)"
      />

      {/* CV Text */}
      <TextArea
        id="cvText"
        label="CV Text"
        value={cvText}
        onChange={(e) => handleCvTextChange(e.target.value)}
        error={errors.cvText}
        placeholder="Paste the candidate's CV content here or upload a PDF above"
        required
      />
    </div>
  );
}
