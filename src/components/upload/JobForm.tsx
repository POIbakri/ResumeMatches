
import { Input } from '../form/Input';
import { TextArea } from '../form/TextArea';
import { JobSelector } from './JobSelector';
import { isDuplicateJob } from '../../lib/utils';
import { useJobHistory } from './hooks/useJobHistory';
import { FileUpload } from './FileUpload';

interface JobFormProps {
  jobTitle: string;
  jobDescription: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  errors?: {
    title?: string;
    description?: string;
  };
}

export function JobForm({
  jobTitle,
  jobDescription,
  onTitleChange,
  onDescriptionChange,
  errors = {},
}: JobFormProps) {
  const { jobs = [] } = useJobHistory();

  const handleTitleChange = (value: string) => {
    // If there's a duplicate job, you could show a warning here
    if (isDuplicateJob(value, jobDescription, jobs)) {
      return;
    }
    onTitleChange(value);
  };

  const handleDescriptionChange = (value: string) => {
    // If there's a duplicate job, you could show a warning here
    if (isDuplicateJob(jobTitle, value, jobs)) {
      return;
    }
    onDescriptionChange(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold">Job Information</h2>
          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-sm">2</span>
          </div>
        </div>
        <JobSelector
          onSelect={({ title, description }) => {
            onTitleChange(title);
            onDescriptionChange(description);
          }}
        />
      </div>

      {/* Job Title */}
      <Input
        id="jobTitle"
        label="Job Title"
        value={jobTitle}
        onChange={(e) => handleTitleChange(e.target.value)}
        error={errors.title}
        placeholder="Enter the job position title"
        required
      />

      {/* PDF Upload for Job Description */}
      <FileUpload
        type="job"
        onFileSelect={() => {
          // If you need to handle the file itself, do so here.
        }}
        onTextExtracted={(text) => handleDescriptionChange(text)}
        onTitleExtracted={(title) => handleTitleChange(title)}
        label="Upload Job Description (PDF)"
      />

      {/* Job Description */}
      <TextArea
        id="jobDescription"
        label="Job Description"
        value={jobDescription}
        onChange={(e) => handleDescriptionChange(e.target.value)}
        error={errors.description}
        placeholder="Paste the job description here or upload a PDF above"
        required
      />
    </div>
  );
}
