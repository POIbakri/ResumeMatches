import { 
  ArrowUpTrayIcon,
  SparklesIcon,
  DocumentTextIcon,
  UserGroupIcon 
} from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Upload CV & Job Description',
    description: 'Simply upload a CV and job description to get started.',
    icon: ArrowUpTrayIcon,
    color: 'bg-blue-500',
    gradient: 'from-blue-500/10 to-blue-600/10'
  },
  {
    title: 'AI Analysis', 
    description: 'Our advanced AI analyzes the match and generates insights.',
    icon: SparklesIcon,
    color: 'bg-purple-500',
    gradient: 'from-purple-500/10 to-purple-600/10'
  },
  {
    title: 'Get Detailed Report',
    description: 'Receive a comprehensive analysis with actionable insights.',
    icon: DocumentTextIcon,
    color: 'bg-green-500',
    gradient: 'from-green-500/10 to-green-600/10'
  },
  {
    title: 'Make Better Decisions',
    description: 'Use data-driven insights to make informed hiring decisions.',
    icon: UserGroupIcon,
    color: 'bg-indigo-500',
    gradient: 'from-indigo-500/10 to-indigo-600/10'
  }
];

export function HowItWorks() {
  return (
    <div className="relative bg-white py-24 overflow-hidden border border-blue-500/20 rounded-lg">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 transform transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in minutes with our simple, powerful CV analysis process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative h-full">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-gray-200 transform translate-x-1/2" />
              )}
              <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-400/50 transform hover:-translate-y-2 relative z-10 h-full flex flex-col">
                {/* Gradient background that shows on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className={`absolute w-2 h-2 ${step.color} rounded-full top-1/4 left-1/4 animate-float opacity-0 group-hover:opacity-30`}></div>
                  <div className={`absolute w-3 h-3 ${step.color} rounded-full top-3/4 right-1/4 animate-float-delayed opacity-0 group-hover:opacity-30`}></div>
                  <div className={`absolute w-2 h-2 ${step.color} rounded-full bottom-1/4 right-1/3 animate-float-slow opacity-0 group-hover:opacity-30`}></div>
                </div>

                {/* Icon container with enhanced animation */}
                <div className={`${step.color} rounded-full p-3 w-14 h-14 flex items-center justify-center mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg relative z-10`}>
                  <step.icon className="h-7 w-7 text-white group-hover:animate-pulse" />
                </div>

                {/* Content with enhanced typography */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors relative z-10">
                  {step.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors flex-grow relative z-10">
                  {step.description}
                </p>

                {/* Subtle line decoration */}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 ${step.color} group-hover:w-1/2 transition-all duration-300 rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}