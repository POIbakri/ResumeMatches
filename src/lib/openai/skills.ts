export const TECHNICAL_SKILLS_MAPPING = {
  SALES_AND_BUSINESS: [
    { name: 'Sales Management', keywords: ['sales management', 'sales team', 'revenue growth', 'sales strategy', 'business development'] },
    { name: 'Account Management', keywords: ['account management', 'client relationship', 'portfolio management', 'key accounts'] },
    { name: 'Business Development', keywords: ['business development', 'lead generation', 'market expansion', 'partnership'] },
    { name: 'Sales Operations', keywords: ['sales operations', 'sales process', 'sales workflow', 'pipeline management'] },
    { name: 'Contract Negotiation', keywords: ['contract negotiation', 'deal closing', 'commercial terms', 'pricing negotiation'] }
  ],
  
  COMMUNICATION: [
    { name: 'Client Communication', keywords: ['client communication', 'stakeholder management', 'client relationship', 'customer interaction'] },
    { name: 'Presentation Skills', keywords: ['presentation', 'public speaking', 'pitch', 'demo'] },
    { name: 'Written Communication', keywords: ['written communication', 'documentation', 'report writing', 'business writing'] },
    { name: 'Interpersonal Skills', keywords: ['interpersonal', 'relationship building', 'networking', 'team collaboration'] },
    { name: 'Negotiation Skills', keywords: ['negotiation', 'conflict resolution', 'mediation', 'deal making'] }
  ],

  SOFTWARE_DEVELOPMENT: [
    { name: 'JavaScript', keywords: ['javascript', 'js', 'es6', 'typescript', 'node.js', 'react', 'angular', 'vue'] },
    { name: 'Python', keywords: ['python', 'django', 'flask', 'fastapi', 'pandas', 'numpy', 'scikit-learn'] },
    { name: 'Java', keywords: ['java', 'spring', 'hibernate', 'j2ee', 'maven', 'gradle'] },
    { name: 'C++', keywords: ['c++', 'cpp', 'stl', 'boost', 'qt', 'unreal engine'] },
    { name: 'Go', keywords: ['golang', 'go programming', 'gin', 'gorm'] },
    { name: 'Ruby', keywords: ['ruby', 'rails', 'rake', 'rspec'] }
  ],

  DATA_AND_AI: [
    { name: 'Machine Learning', keywords: ['machine learning', 'ml', 'deep learning', 'neural networks', 'ai'] },
    { name: 'Data Analysis', keywords: ['data analysis', 'data analytics', 'statistical analysis', 'data visualization'] },
    { name: 'Big Data', keywords: ['big data', 'hadoop', 'spark', 'kafka', 'data pipeline'] },
    { name: 'Data Science', keywords: ['data science', 'predictive modeling', 'data mining', 'statistical modeling'] },
    { name: 'Business Intelligence', keywords: ['bi', 'business intelligence', 'tableau', 'power bi', 'data reporting'] }
  ],

  CLOUD_AND_DEVOPS: [
    { name: 'AWS', keywords: ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'cloudformation'] },
    { name: 'Azure', keywords: ['azure', 'microsoft cloud', 'azure devops', 'azure functions'] },
    { name: 'GCP', keywords: ['gcp', 'google cloud', 'cloud platform', 'app engine'] },
    { name: 'DevOps', keywords: ['devops', 'ci/cd', 'continuous integration', 'continuous deployment'] },
    { name: 'Infrastructure', keywords: ['infrastructure', 'terraform', 'ansible', 'kubernetes', 'docker'] }
  ],

  BUSINESS_SOFTWARE: [
    { name: 'CRM Systems', keywords: ['crm', 'salesforce', 'hubspot', 'zoho', 'pipedrive', 'zendesk', 'capsulecrm'] },
    { name: 'Microsoft Office', keywords: ['microsoft office', 'excel', 'powerpoint', 'word', 'outlook', 'office 365'] },
    { name: 'Project Management', keywords: ['project management', 'asana', 'trello', 'jira', 'basecamp', 'monday.com'] },
    { name: 'ERP Systems', keywords: ['erp', 'sap', 'oracle', 'netsuite', 'dynamics'] },
    { name: 'Collaboration Tools', keywords: ['slack', 'teams', 'zoom', 'confluence', 'sharepoint'] }
  ],

  MANAGEMENT: [
    { name: 'Team Leadership', keywords: ['team leadership', 'team management', 'staff supervision', 'people management'] },
    { name: 'Project Management', keywords: ['project management', 'agile', 'scrum', 'waterfall', 'prince2'] },
    { name: 'Strategic Planning', keywords: ['strategic planning', 'strategy development', 'business strategy'] },
    { name: 'Resource Management', keywords: ['resource management', 'budget management', 'resource allocation'] },
    { name: 'Change Management', keywords: ['change management', 'transformation', 'process improvement'] }
  ],

  MARKETING: [
    { name: 'Digital Marketing', keywords: ['digital marketing', 'seo', 'sem', 'ppc', 'social media marketing'] },
    { name: 'Content Marketing', keywords: ['content marketing', 'content strategy', 'copywriting', 'content creation'] },
    { name: 'Marketing Analytics', keywords: ['marketing analytics', 'google analytics', 'marketing metrics', 'attribution'] },
    { name: 'Brand Management', keywords: ['brand management', 'brand strategy', 'brand development'] },
    { name: 'Marketing Automation', keywords: ['marketing automation', 'mailchimp', 'marketo', 'hubspot marketing'] }
  ],

  FINANCE: [
    { name: 'Financial Analysis', keywords: ['financial analysis', 'financial modeling', 'valuation', 'forecasting'] },
    { name: 'Accounting', keywords: ['accounting', 'bookkeeping', 'financial reporting', 'audit'] },
    { name: 'Investment', keywords: ['investment', 'portfolio management', 'asset management', 'wealth management'] },
    { name: 'Risk Management', keywords: ['risk management', 'risk assessment', 'compliance', 'internal controls'] },
    { name: 'Banking', keywords: ['banking', 'credit analysis', 'lending', 'financial services'] }
  ],

  DESIGN: [
    { name: 'UI/UX Design', keywords: ['ui design', 'ux design', 'user interface', 'user experience', 'wireframing'] },
    { name: 'Graphic Design', keywords: ['graphic design', 'adobe creative suite', 'illustrator', 'photoshop'] },
    { name: 'Web Design', keywords: ['web design', 'responsive design', 'css', 'html', 'web development'] },
    { name: 'Product Design', keywords: ['product design', 'industrial design', 'prototyping', 'design thinking'] },
    { name: 'Motion Design', keywords: ['motion design', 'animation', 'after effects', 'motion graphics'] }
  ]
};

export function extractTechnicalSkills(text: string): string[] {
  const skills = new Set<string>();
  const lowerText = text.toLowerCase();

  Object.values(TECHNICAL_SKILLS_MAPPING).flat().forEach(skill => {
    if (skill.keywords.some(keyword => lowerText.includes(keyword.toLowerCase()))) {
      skills.add(skill.name);
    }
  });

  return Array.from(skills);
}

export function calculateSkillProficiency(text: string, skill: string): number {
  const lowerText = text.toLowerCase();
  const experienceMatch = lowerText.match(
    new RegExp(`(\\d+)\\s*(?:years?|yrs?).*?(?:experience|working with).*?${skill.toLowerCase()}`)
  );

  if (experienceMatch) {
    const years = parseInt(experienceMatch[1]);
    return Math.min(Math.round((years / 10) * 100), 100);
  }

  const proficiencyKeywords = {
    expert: 90,
    advanced: 80,
    intermediate: 60,
    basic: 40,
    beginner: 20
  };

  for (const [keyword, score] of Object.entries(proficiencyKeywords)) {
    if (lowerText.includes(`${keyword} ${skill.toLowerCase()}`)) {
      return score;
    }
  }

  return 50; // Default score
}