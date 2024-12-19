import { useState } from 'react';
import { useAnalysisNotes } from './hooks/useAnalysisNotes';
import { Button } from '../form/Button';
import { TextArea } from '../form/TextArea';
import type { Analysis } from '../../types/models';

interface AnalysisNotesProps {
  analysis: Analysis;
}

export function AnalysisNotes({ analysis }: AnalysisNotesProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { updateNotes, isLoading } = useAnalysisNotes(analysis.id);
  const [notes, setNotes] = useState(analysis.notes || '');

  const handleSave = async () => {
    await updateNotes(notes);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Interview Notes</h3>
        {!isEditing && (
          <Button
            variant="secondary"
            onClick={() => setIsEditing(true)}
          >
            Edit Notes
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <TextArea
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your interview notes here..."
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              isLoading={isLoading}
            >
              Save Notes
            </Button>
          </div>
        </div>
      ) : (
        <div className="prose max-w-none">
          {analysis.notes ? (
            <p className="whitespace-pre-wrap">{analysis.notes}</p>
          ) : (
            <p className="text-gray-500 italic">No notes added yet</p>
          )}
        </div>
      )}
    </div>
  );
}