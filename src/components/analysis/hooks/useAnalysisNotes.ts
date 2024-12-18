import { useState } from 'react';
import { useToast } from '../../../hooks/useToast';
import { updateAnalysisNotes } from '../../../services/analysis';

export function useAnalysisNotes(analysisId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const updateNotes = async (notes: string) => {
    setIsLoading(true);
    try {
      await updateAnalysisNotes(analysisId, notes);
      addToast('Notes updated successfully', 'success');
    } catch (error) {
      addToast(
        error instanceof Error ? error.message : 'Failed to update notes',
        'error'
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    updateNotes
  };
}