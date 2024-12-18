import type { Industry } from '../types';

export const INDUSTRY_PROMPTS: Record<Industry, string> = {
  SOFTWARE_ENGINEERING: `
Focus on:
- Programming languages proficiency and years of experience
- Framework expertise and practical applications
- System design and architecture experience
- DevOps and deployment knowledge
- Code quality and best practices
- Technical problem-solving abilities
- Open source contributions and side projects`,

  FINANCE: `
Focus on:
- Financial modeling and analysis skills
- Risk assessment capabilities
- Regulatory compliance knowledge
- Financial software proficiency
- Market analysis experience
- Portfolio management track record
- Quantitative skills and certifications`,

  MARKETING: `
Focus on:
- Digital marketing campaign results
- Analytics and data-driven decisions
- Content strategy success metrics
- Social media performance
- SEO/SEM expertise
- Marketing automation tools
- Brand development experience`,

  SALES: `
Focus on:
- Sales targets and achievements
- Client relationship management
- Deal closure rates
- Territory management
- CRM software expertise
- Negotiation techniques
- Industry network strength`,

  HEALTHCARE: `
Focus on:
- Clinical experience and specializations
- Patient care metrics
- Medical technology proficiency
- Regulatory compliance
- Research contributions
- Certifications and continuing education
- Emergency response capabilities`
};