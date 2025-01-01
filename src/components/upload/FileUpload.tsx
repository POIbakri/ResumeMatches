import React, { useRef, useState } from 'react';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';
import * as pdfjsLib from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';

// Set worker source to local file path
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.js';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onTextExtracted: (text: string) => void;
  onTitleExtracted?: (title: string) => void;
  accept?: string;
  label: string;
  type: 'cv' | 'job'; // "cv" or "job" to determine how to parse title
}

export function FileUpload({
  onFileSelect,
  onTextExtracted,
  onTitleExtracted,
  accept = '.pdf',
  label,
  type,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // This function extracts a "title" from the PDF text.
  // - If type === 'cv', it takes the first line and first 3 words as the "title"
  // - If type === 'job', it tries to find a line containing "position|job title|role"
  //   and extract the rest of that line as the "title".
  const extractTitle = (text: string): string => {
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

    if (type === 'cv') {
      // For CV, let's assume the first non-empty line is the candidate's name
      const firstLine = lines[0] || '';
      return firstLine.split(' ').slice(0, 3).join(' ');
    } else {
      // For Job, look for the line that contains "position", "job title", or "role"
      const titlePattern = /position|job title|role/i;
      const titleLine = lines.find(line => titlePattern.test(line));
      if (titleLine) {
        // Remove the matched keyword from the line
        return titleLine.replace(/(position|job title|role)[:|\s]+/i, '').trim();
      }
      // Fallback: just return the first line
      return lines[0] || '';
    }
  };

  // This function reads the PDF and extracts the full text.
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setError(null);

      // Let the parent know a file was selected (if needed).
      onFileSelect(file);

      // Convert the file into an ArrayBuffer for PDF.js
      const arrayBuffer = await file.arrayBuffer();

      // Load the PDF
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf: PDFDocumentProxy = await loadingTask.promise;

      let fullText = '';

      // Loop through all PDF pages and gather the text
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }

      const extractedText = fullText.trim();
      // Extract a "title" (i.e., candidate name or job title)
      const extractedTitle = extractTitle(extractedText);

      // Inform parent components
      onTextExtracted(extractedText);
      if (onTitleExtracted) {
        onTitleExtracted(extractedTitle);
      }
    } catch (err) {
      console.error('Error reading PDF:', err);
      setError('Failed to process PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10 cursor-pointer hover:border-gray-400"
      >
        <div className="text-center">
          <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
              <span>{isLoading ? 'Processing...' : 'Upload a file'}</span>
              <input
                ref={fileInputRef}
                type="file"
                className="sr-only"
                accept={accept}
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">{label}</p>
          {error && (
            <p className="text-xs text-red-600 mt-2">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
