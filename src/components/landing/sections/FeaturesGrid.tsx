import { 
  SparklesIcon,
  ChartBarIcon,
  DocumentTextIcon,
  LightBulbIcon,
  BeakerIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms analyze CVs against job requirements with unprecedented accuracy.',
    icon: SparklesIcon,
    color: 'bg-blue-400'
  },
  {
    name: 'Smart Scoring',
    description: 'Get detailed candidate fit scores and comprehensive breakdowns of qualifications.',
    icon: ChartBarIcon,
    color: 'bg-blue-400'
  },
  {
    name: 'Instant Reports',
    description: 'Generate professional PDF reports with detailed analysis and recommendations.',
    icon: DocumentTextIcon,
    color: 'bg-blue-400'
  },
  {
    name: 'Interview Intelligence',
    description: "Get AI-generated interview questions tailored to each candidate's profile.",
    icon: LightBulbIcon,
    color: 'bg-blue-400'
  },
  {
    name: 'Technical Assessment',
    description: 'Deep analysis of technical skills and experience levels.',
    icon: BeakerIcon,
    color: 'bg-blue-400'
  },
  {
    name: 'Bias Prevention',
    description: 'Ensure fair and objective candidate evaluation with our AI system.',
    icon: ShieldCheckIcon,
    color: 'bg-blue-400'
  }
];

export function FeaturesGrid() {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-24 overflow-hidden border border-blue-500/20 rounded-lg" id="features">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 transform transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold text-white mb-4">
            Powerful Features for Modern Recruitment
          </h2>
          <p className="text-xl text-blue-100/90 max-w-3xl mx-auto">
            Everything you need to streamline your candidate evaluation process and make better hiring decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="group bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-300/30 hover:border-blue-400/50 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${feature.color} rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                <feature.icon className="h-6 w-6 text-white animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-200 transition-colors">
                {feature.name}
              </h3>
              <p className="text-blue-100/80 group-hover:text-blue-100 transition-colors">
                {feature.description}
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-20 transition-opacity rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}