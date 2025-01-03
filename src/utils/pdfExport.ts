import jsPDF from 'jspdf';
import type { Analysis, RiskFactor } from '../types/models';

export function exportAnalysisToPDF(analysis: Analysis) {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 20;
  const margin = 20;
  const lineHeight = 7;
  let currentPage = 1;

  // Font size constants
  const FONT_SIZES = {
    title: 20,
    heading: 14,
    normal: 12,
    small: 10
  };

  // Helper function to set font style consistently
  const setFontStyle = (size: number) => {
    pdf.setFontSize(size);
    pdf.setTextColor(0, 0, 0);
  };

  // Helper function to add text with word wrap and page breaks
  const addWrappedText = (text: string, y: number, maxWidth: number = pageWidth - 2 * margin) => {
    const lines = pdf.splitTextToSize(text, maxWidth);
    let currentY = y;

    for (let i = 0; i < lines.length; i++) {
      if (currentY > pageHeight - 30) {
        addPageNumber(currentPage);
        pdf.addPage();
        currentPage++;
        addWatermark();
        setFontStyle(FONT_SIZES.normal); // Reset font style for new page
        currentY = 20;
      }
      pdf.text(lines[i], margin, currentY);
      currentY += lineHeight;
    }
    return currentY;
  };

  const addWatermark = () => {
    pdf.setTextColor(200, 200, 200);
    pdf.setFontSize(40);
    pdf.text('Plus+ Talent', pageWidth/2, pageHeight/2, {
      align: 'center',
      angle: 45
    });
    setFontStyle(FONT_SIZES.normal);
  };

  const addPageNumber = (pageNum: number) => {
    pdf.setFontSize(FONT_SIZES.small);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Page ${pageNum}`, pageWidth/2, pageHeight - 10, { align: 'center' });
    setFontStyle(FONT_SIZES.normal);
  };

  // Add this helper function at the top with other helpers
  const parseRiskFactor = (factor: string | RiskFactor): RiskFactor | null => {
    if (typeof factor === 'string') {
      const cleanFactor = factor.replace(/^RISK_FACTORS:\s*/i, '').trim();

      // Try parsing as JSON first
      try {
        const maybeJson = JSON.parse(cleanFactor);
        if (maybeJson && typeof maybeJson === 'object') {
          return {
            severity: (maybeJson.severity || 'MEDIUM').toUpperCase() as 'HIGH' | 'MEDIUM' | 'LOW',
            description: maybeJson.description || '',
            mitigation: maybeJson.mitigation || undefined
          };
        }
      } catch (e) {
        // Not JSON, continue with other parsing methods
      }

      // Try parsing structured text
      const mainPattern = /^-\s*Severity:\s*\[?(HIGH|MEDIUM|LOW)\]?\s*\n\s*\*\s*Description:\s*\[?([^\n\]]+)\]?\s*\n\s*\*\s*Mitigation:\s*\[?([^\n\]]+)\]?/im;
      const match = cleanFactor.match(mainPattern);
      
      if (match) {
        const [, severity, description, mitigation] = match;
        return {
          severity: severity.toUpperCase() as 'HIGH' | 'MEDIUM' | 'LOW',
          description: description.trim(),
          mitigation: mitigation?.trim()
        };
      }

      // Fallback to basic parsing
      const severityMatch = cleanFactor.match(/Severity:\s*\[?(HIGH|MEDIUM|LOW)\]?/i);
      const descriptionMatch = cleanFactor.match(/Description:\s*\[?([^\n\]]+)\]?/i);
      const mitigationMatch = cleanFactor.match(/Mitigation:\s*\[?([^\n\]]+)\]?/i);

      if (severityMatch || descriptionMatch) {
        return {
          severity: (severityMatch?.[1]?.toUpperCase() || 'MEDIUM') as 'HIGH' | 'MEDIUM' | 'LOW',
          description: descriptionMatch?.[1]?.trim() || cleanFactor,
          mitigation: mitigationMatch?.[1]?.trim()
        };
      }

      // Last resort fallback
      return {
        severity: 'MEDIUM',
        description: cleanFactor
      };
    }

    return factor as RiskFactor;
  };

  // Add initial watermark
  addWatermark();

  // Title
  setFontStyle(FONT_SIZES.title);
  pdf.text('Analysis Report', margin, yPosition);

  // Date
  yPosition += 15;
  setFontStyle(FONT_SIZES.normal);
  pdf.text('Date: ' + new Date(analysis.created_at ?? '').toLocaleDateString(), margin, yPosition);

  // Fit Score and Verdict
  yPosition += 15;
  setFontStyle(FONT_SIZES.heading);
  pdf.text('Fit Score: ' + analysis.fit_score + '/10', margin, yPosition);

  yPosition += 10;
  pdf.text('Verdict: ' + analysis.verdict.replace('_', ' '), margin, yPosition);

  // Key Findings
  yPosition += 15;
  setFontStyle(FONT_SIZES.heading);
  pdf.text('Key Findings:', margin, yPosition);
  yPosition += 7;
  setFontStyle(FONT_SIZES.normal);
  analysis.reasoning.forEach(reason => {
    yPosition = addWrappedText('• ' + reason, yPosition);
    yPosition += 3;
  });

  // Risk Factors
  yPosition += 10;
  setFontStyle(FONT_SIZES.heading);
  pdf.text('Risk Factors:', margin, yPosition);
  yPosition += 7;
  setFontStyle(FONT_SIZES.normal);
  
  if (!analysis.risk_factors || analysis.risk_factors.length === 0) {
    yPosition = addWrappedText('No significant risk factors identified.', yPosition);
  } else {
    const validFactors = analysis.risk_factors
      .map(factor => parseRiskFactor(factor))
      .filter((factor): factor is RiskFactor => factor !== null);

    if (validFactors.length === 0) {
      yPosition = addWrappedText('No significant risk factors identified.', yPosition);
    } else {
      validFactors.forEach(factor => {
        yPosition = addWrappedText(`• ${factor.severity}: ${factor.description}`, yPosition);
        if (factor.mitigation) {
          yPosition = addWrappedText(`  Mitigation: ${factor.mitigation}`, yPosition);
        }
        yPosition += 3;
      });
    }
  }

  // Interview Plan
  yPosition += 10;
  setFontStyle(FONT_SIZES.heading);
  pdf.text('Interview Plan:', margin, yPosition);
  yPosition += 7;
  setFontStyle(FONT_SIZES.normal);
  yPosition = addWrappedText(analysis.interview_plan, yPosition);

  // Add final page number and footer
  addPageNumber(currentPage);
  pdf.setFontSize(FONT_SIZES.small);
  pdf.setTextColor(128, 128, 128);
  const footer = 'Generated by Plus+ Talent CV Analyzer';
  pdf.text(footer, pageWidth/2, pageHeight - 20, { align: 'center' });

  // Save the PDF
  const filename = 'analysis-' + new Date().toISOString().split('T')[0] + '.pdf';
  pdf.save(filename);
}