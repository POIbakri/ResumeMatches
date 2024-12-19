import { 
  UserGroupIcon, 
  DocumentTextIcon,
  ClockIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';

const stats = [
  {
    label: 'Accuracy Rate',
    value: '95%',
    icon: SparklesIcon,
    description: 'Match accuracy',
    gradient: 'from-blue-400 to-indigo-400'
  },
  {
    label: 'Time Saved', 
    value: '75%',
    icon: ClockIcon,
    description: 'Recruitment efficiency',
    gradient: 'from-indigo-400 to-purple-400'
  },
  {
    label: 'CVs Analyzed',
    value: '100K+',
    icon: DocumentTextIcon,
    description: 'And counting',
    gradient: 'from-purple-400 to-pink-400'
  },
  {
    label: 'Happy Recruiters',
    value: '5000+',
    icon: UserGroupIcon,
    description: 'Trusted by professionals',
    gradient: 'from-pink-400 to-red-400'
  }
];

export function StatsSection() {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-24 overflow-hidden border border-blue-500/20 rounded-lg">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Proven Track Record
          </h2>
          <p className="text-xl text-blue-100/90 max-w-3xl mx-auto">
            Our platform delivers measurable results for recruitment teams worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative bg-white/10 rounded-xl p-8 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                    <stat.icon className="h-6 w-6 text-white group-hover:scale-110 transform transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-blue-200 transition-colors duration-300">
                    {stat.label}
                  </h3>
                </div>
                
                <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 mb-3">
                  {stat.value}
                </p>
                <p className="text-sm text-blue-200 group-hover:text-blue-100 transition-colors duration-300">
                  {stat.description}
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}