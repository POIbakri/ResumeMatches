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
    description: 'Match accuracy'
  },
  {
    label: 'Time Saved',
    value: '75%',
    icon: ClockIcon,
    description: 'Recruitment efficiency'
  },
  {
    label: 'CVs Analyzed',
    value: '100K+',
    icon: DocumentTextIcon,
    description: 'And counting'
  },
  {
    label: 'Happy Recruiters',
    value: '5000+',
    icon: UserGroupIcon,
    description: 'Trusted by professionals'
  }
];

export function StatsSection() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-lg p-6 backdrop-blur-lg">
              <div className="flex items-center space-x-3">
                <stat.icon className="h-6 w-6 text-blue-200" />
                <h3 className="text-lg font-medium text-white">{stat.label}</h3>
              </div>
              <p className="mt-4 text-4xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-blue-200">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}