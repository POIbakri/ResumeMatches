import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function CTASection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute -top-20 sm:-top-30 md:-top-40 -right-20 sm:-right-30 md:-right-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 sm:-bottom-30 md:-bottom-40 -left-20 sm:-left-30 md:-left-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-indigo-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Ready to Transform Your{' '}
          <span className="inline-block sm:hidden">Hiring Process?</span>
          <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200 sm:inline">
            {/* Only show "Hiring Process?" on larger screens */}
            <span className="hidden sm:inline">Hiring Process?</span>
          </span>
        </h2>
        <p className="text-lg xs:text-xl sm:text-2xl text-blue-100 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
          Join thousands of recruiters who are making better hiring decisions with AI-powered CV analysis.
        </p>
        <div className="flex flex-col xs:flex-row justify-center gap-4 sm:gap-6 px-4">
          <Link
            to="/signup"
            className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-base sm:text-lg font-medium rounded-xl text-blue-600 bg-white hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl w-full xs:w-auto"
          >
            Get Started Free
            <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-base sm:text-lg font-medium rounded-xl text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-1 w-full xs:w-auto"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}