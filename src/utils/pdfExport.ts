import jsPDF from 'jspdf';
import type { Analysis, RiskFactor } from '../types/models';
import { supabase } from '../lib/supabase';

export async function exportAnalysisToPDF(analysis: Analysis) {
  // Fetch candidate and job details
  const { data: candidateData } = await supabase
    .from('candidates')
    .select('name')
    .eq('id', analysis.candidate_id)
    .single();

  const { data: jobData } = await supabase
    .from('jobs')
    .select('title')
    .eq('id', analysis.job_id)
    .single();

  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPosition = 30; // Increased initial spacing
  const margin = 25; // Increased margins
  const lineHeight = 8; // Increased line height
  let currentPage = 1;

  // Enhanced font size constants
  const FONT_SIZES = {
    title: 24, // Increased title size
    subTitle: 18, // New subtitle size
    heading: 16, // Increased heading size
    subHeading: 14, // New subheading size
    normal: 12,
    small: 10
  };

  // Helper function to set font style consistently
  const setFontStyle = (size: number, isBold: boolean = false) => {
    pdf.setFontSize(size);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", isBold ? 'bold' : 'normal');
  };

  // Helper function to add text with word wrap and page breaks
  const addWrappedText = (text: string, y: number, maxWidth: number = pageWidth - 2 * margin) => {
    const lines = pdf.splitTextToSize(text, maxWidth);
    let currentY = y;

    for (let i = 0; i < lines.length; i++) {
      if (currentY > pageHeight - 40) { // Increased bottom margin
        addPageNumber(currentPage);
        pdf.addPage();
        currentPage++;
        addWatermark();
        setFontStyle(FONT_SIZES.normal);
        currentY = 30; // Increased top margin on new pages
      }
      pdf.text(lines[i], margin, currentY);
      currentY += lineHeight;
    }
    return currentY;
  };

  const addWatermark = () => {
    pdf.setTextColor(220, 220, 220); // Lighter watermark
    pdf.setFontSize(50); // Larger watermark
    pdf.text('TopMatchTalent.com', pageWidth/2, pageHeight/2, {
      align: 'center',
      angle: 45
    });
    setFontStyle(FONT_SIZES.normal);
  };

  const addPageNumber = (pageNum: number) => {
    pdf.setFontSize(FONT_SIZES.small);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Page ${pageNum}`, pageWidth/2, pageHeight - 15, { align: 'center' });
    setFontStyle(FONT_SIZES.normal);
  };

  // Risk factor parsing helper
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

  // Enhanced title section with better spacing
  setFontStyle(FONT_SIZES.title, true);
  pdf.text('Analysis Report', margin, yPosition);
  
  yPosition += 20; // Increased spacing after title
  setFontStyle(FONT_SIZES.subTitle, true);
  const candidateName = candidateData?.name || `Candidate ID: ${analysis.candidate_id}`;
  pdf.text(`Candidate: ${candidateName}`, margin, yPosition);

  yPosition += 10;
  const jobTitle = jobData?.title || `Job ID: ${analysis.job_id}`;
  pdf.text(`Position: ${jobTitle}`, margin, yPosition);

  // Date with better spacing
  yPosition += 20;
  setFontStyle(FONT_SIZES.normal);
  pdf.text('Date: ' + new Date(analysis.created_at ?? '').toLocaleDateString(), margin, yPosition);

  // Enhanced score and verdict section
  yPosition += 25;
  setFontStyle(FONT_SIZES.subHeading, true);
  pdf.text('Fit Score:', margin, yPosition);
  setFontStyle(FONT_SIZES.subTitle);
  pdf.text(analysis.fit_score + '/10', margin + 70, yPosition);

  yPosition += 15;
  setFontStyle(FONT_SIZES.subHeading, true);
  pdf.text('Verdict:', margin, yPosition);
  setFontStyle(FONT_SIZES.subTitle);
  pdf.text(analysis.verdict.replace(/_/g, ' '), margin + 70, yPosition);

  // Key Findings section with enhanced spacing
  yPosition += 25;
  setFontStyle(FONT_SIZES.heading, true);
  pdf.text('Key Findings', margin, yPosition);
  yPosition += 10;
  setFontStyle(FONT_SIZES.normal);
  analysis.reasoning.forEach(reason => {
    yPosition = addWrappedText('• ' + reason, yPosition);
    yPosition += 5; // Increased spacing between points
  });

  // Risk Factors section with enhanced spacing
  yPosition += 15;
  setFontStyle(FONT_SIZES.heading, true);
  pdf.text('Risk Factors', margin, yPosition);
  yPosition += 10;
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
        setFontStyle(FONT_SIZES.normal, true);
        yPosition = addWrappedText(`• ${factor.severity}:`, yPosition);
        setFontStyle(FONT_SIZES.normal);
        yPosition = addWrappedText(factor.description, yPosition);
        if (factor.mitigation) {
          yPosition = addWrappedText(`  Mitigation: ${factor.mitigation}`, yPosition);
        }
        yPosition += 5;
      });
    }
  }

  // Interview Plan section with enhanced spacing
  yPosition += 15;
  setFontStyle(FONT_SIZES.heading, true);
  pdf.text('Interview Plan', margin, yPosition);
  yPosition += 10;
  setFontStyle(FONT_SIZES.normal);
  yPosition = addWrappedText(analysis.interview_plan, yPosition);

  // Enhanced footer
  addPageNumber(currentPage);
  pdf.setFontSize(FONT_SIZES.small);
  pdf.setTextColor(100, 100, 100);
  const footer = 'Generated by TopMatchTalent.com';
  pdf.text(footer, pageWidth/2, pageHeight - 25, { align: 'center' });

  // Save the PDF with new naming format
  const formattedDate = new Date().toISOString().split('T')[0];
  const sanitizedCandidateName = candidateData?.name?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'unnamed';
  const sanitizedJobTitle = jobData?.title?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'no_position';
  const filename = `analysis_report_${sanitizedCandidateName}_x_${sanitizedJobTitle}_${formattedDate}.pdf`;
  
  pdf.save(filename);
}