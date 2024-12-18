export const TECHNICAL_SKILLS_MAPPING = {
  PROGRAMMING_LANGUAGES: [
    { name: 'JavaScript', keywords: ['js', 'javascript', 'ecmascript'] },
    { name: 'Python', keywords: ['python', 'django', 'flask'] },
    { name: 'Java', keywords: ['java', 'spring', 'hibernate'] },
    { name: 'C++', keywords: ['c++', 'cpp', 'stl'] },
    { name: 'Ruby', keywords: ['ruby', 'rails', 'rake'] }
  ],
  
  FRAMEWORKS: [
    { name: 'React', keywords: ['react', 'jsx', 'hooks'] },
    { name: 'Angular', keywords: ['angular', 'ng', 'typescript'] },
    { name: 'Vue', keywords: ['vue', 'vuex', 'nuxt'] },
    { name: 'Django', keywords: ['django', 'drf', 'python web'] },
    { name: 'Spring', keywords: ['spring', 'spring boot', 'java web'] }
  ],

  DATABASES: [
    { name: 'PostgreSQL', keywords: ['postgres', 'postgresql', 'psql'] },
    { name: 'MongoDB', keywords: ['mongo', 'mongodb', 'nosql'] },
    { name: 'MySQL', keywords: ['mysql', 'mariadb', 'sql'] },
    { name: 'Redis', keywords: ['redis', 'cache', 'in-memory'] },
    { name: 'Elasticsearch', keywords: ['elastic', 'elasticsearch', 'elk'] }
  ],

  CLOUD_SERVICES: [
    { name: 'AWS', keywords: ['aws', 'amazon web services', 'ec2', 's3'] },
    { name: 'Azure', keywords: ['azure', 'microsoft cloud', 'azure devops'] },
    { name: 'GCP', keywords: ['gcp', 'google cloud', 'cloud platform'] },
    { name: 'Heroku', keywords: ['heroku', 'paas', 'platform as a service'] },
    { name: 'Digital Ocean', keywords: ['digitalocean', 'droplet', 'spaces'] }
  ],

  TOOLS: [
    { name: 'Git', keywords: ['git', 'github', 'gitlab', 'version control'] },
    { name: 'Docker', keywords: ['docker', 'container', 'dockerfile'] },
    { name: 'Kubernetes', keywords: ['k8s', 'kubernetes', 'container orchestration'] },
    { name: 'Jenkins', keywords: ['jenkins', 'ci/cd', 'pipeline'] },
    { name: 'Terraform', keywords: ['terraform', 'iac', 'infrastructure as code'] }
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