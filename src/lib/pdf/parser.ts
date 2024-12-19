import { ApiError } from '../errors';

export async function parsePdfText(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await fetch('https://api.pdf.co/v1/pdf/extract/text', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to parse PDF');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    throw new ApiError('Failed to parse PDF file', 500);
  }
}