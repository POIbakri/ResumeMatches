import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 border border-blue-500/20 rounded-lg">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute -top-20 xs:-top-30 sm:-top-40 -right-20 xs:-right-30 sm:-right-40 w-40 xs:w-60 sm:w-80 h-40 xs:h-60 sm:h-80 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 xs:-bottom-30 sm:-bottom-40 -left-20 xs:-left-30 sm:-left-40 w-40 xs:w-60 sm:w-80 h-40 xs:h-60 sm:h-80 bg-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 xs:py-12 sm:py-16">
          {/* Badge */}
          <div className="inline-flex items-center px-3 xs:px-4 py-1 xs:py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm mb-6 xs:mb-8">
            <span className="text-xs xs:text-sm text-blue-200 font-medium">✨ AI-Powered Recruitment Solution</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              {/* Main heading with gradient text */}
              <h1>
                <span className="block text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200 leading-tight mb-2 xs:mb-4">
                  Transform Your Hiring Process
                </span>
                <span className="block text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  With Intelligent CV Analysis
                </span>
              </h1>

              {/* Description with improved typography */}
              <p className="mt-4 xs:mt-6 text-sm xs:text-base sm:text-lg text-blue-100/90 max-w-2xl leading-relaxed">
                Make better hiring decisions faster with our advanced AI technology.
                Match candidates to jobs with precision and generate tailored interview plans instantly.
              </p>

              {/* CTA buttons with enhanced design */}
              <div className="mt-6 xs:mt-8">
                <Link
                  to="/signup"
                  className="group relative inline-flex items-center justify-center px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 text-sm xs:text-base sm:text-lg font-semibold text-blue-900 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                >
                  <span className="relative z-10">Start Free Trial</span>
                  <ArrowRightIcon className="ml-2 h-4 xs:h-5 w-4 xs:w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              </div>
            </div>

            {/* Enhanced Animated CV Analysis Visual */}
            <div className="relative w-full max-w-[280px] xs:max-w-lg mx-auto order-1 lg:order-2 h-[16rem] xs:h-[20rem] sm:h-[24rem]">
              {/* CV Document */}
              <div className="absolute top-0 left-0 w-56 xs:w-64 sm:w-72 h-[16rem] xs:h-[20rem] sm:h-[24rem] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl transform -rotate-6 animate-float">
                <div className="p-3 xs:p-4 sm:p-6 space-y-3 xs:space-y-4">
                  {/* Header with profile-like layout */}
                  <div className="flex items-center space-x-2 xs:space-x-3">
                    <div className="w-8 xs:w-10 sm:w-12 h-8 xs:h-10 sm:h-12 rounded-full bg-blue-200/30 animate-pulse"></div>
                    <div className="space-y-1.5 xs:space-y-2">
                      <div className="h-2 xs:h-3 sm:h-4 w-24 xs:w-28 sm:w-32 bg-blue-200/30 rounded animate-pulse"></div>
                      <div className="h-1.5 xs:h-2 sm:h-3 w-16 xs:w-20 sm:w-24 bg-blue-200/20 rounded animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Contact info section */}
                  <div className="space-y-1.5 xs:space-y-2 pt-2 xs:pt-3">
                    <div className="flex items-center space-x-1.5 xs:space-x-2">
                      <div className="w-2 xs:w-3 sm:w-4 h-2 xs:h-3 sm:h-4 rounded bg-blue-200/30 animate-pulse"></div>
                      <div className="h-1.5 xs:h-2 sm:h-3 w-24 xs:w-28 sm:w-32 bg-blue-200/20 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center space-x-1.5 xs:space-x-2">
                      <div className="w-2 xs:w-3 sm:w-4 h-2 xs:h-3 sm:h-4 rounded bg-blue-200/30 animate-pulse"></div>
                      <div className="h-1.5 xs:h-2 sm:h-3 w-32 xs:w-36 sm:w-40 bg-blue-200/20 rounded animate-pulse"></div>
                    </div>
                  </div>

                  {/* Experience section */}
                  <div className="space-y-2 xs:space-y-3 pt-2 xs:pt-3">
                    <div className="h-2 xs:h-3 sm:h-4 w-16 xs:w-20 sm:w-24 bg-blue-200/30 rounded"></div>
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="space-y-1.5 xs:space-y-2">
                        <div className="h-1.5 xs:h-2 sm:h-3 bg-blue-200/20 rounded w-full"></div>
                        <div className="h-1.5 xs:h-2 sm:h-3 bg-blue-200/20 rounded w-5/6"></div>
                        <div className="h-1.5 xs:h-2 sm:h-3 bg-blue-200/20 rounded w-4/6"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Job Description Card */}
              <div className="absolute top-4 right-0 w-56 xs:w-64 sm:w-72 h-[16rem] xs:h-[20rem] sm:h-[24rem] bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl transform rotate-6 animate-float delay-500">
                <div className="p-3 xs:p-4 sm:p-6 space-y-3 xs:space-y-4">
                  {/* Job header */}
                  <div className="space-y-2 xs:space-y-3">
                    <div className="h-3 xs:h-4 sm:h-5 bg-indigo-200/30 rounded w-3/4"></div>
                    <div className="h-2 xs:h-3 sm:h-4 bg-indigo-200/20 rounded w-1/2"></div>
                  </div>

                  {/* Company info */}
                  <div className="flex items-center space-x-2 xs:space-x-3 pt-1.5 xs:pt-2">
                    <div className="w-6 xs:w-8 sm:w-10 h-6 xs:h-8 sm:h-10 rounded bg-indigo-200/30"></div>
                    <div className="space-y-1.5 xs:space-y-2">
                      <div className="h-1.5 xs:h-2 sm:h-3 w-16 xs:w-20 sm:w-24 bg-indigo-200/20 rounded"></div>
                      <div className="h-1.5 xs:h-2 sm:h-3 w-24 xs:w-28 sm:w-32 bg-indigo-200/20 rounded"></div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="space-y-2 xs:space-y-3 pt-2 xs:pt-3">
                    <div className="h-2 xs:h-3 sm:h-4 w-24 xs:w-28 sm:w-32 bg-indigo-200/30 rounded"></div>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-1.5 xs:space-x-2">
                        <div className="w-1.5 xs:w-2 sm:w-3 h-1.5 xs:h-2 sm:h-3 rounded-full bg-indigo-200/30"></div>
                        <div className="h-1.5 xs:h-2 sm:h-3 bg-indigo-200/20 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced connecting animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 xs:w-16 sm:w-20 h-12 xs:h-16 sm:h-20 rounded-full bg-blue-500/20 animate-ping"></div>
                <div className="absolute w-8 xs:w-12 sm:w-16 h-8 xs:h-12 sm:h-16 rounded-full bg-indigo-400/20 animate-pulse"></div>
                <div className="absolute w-6 xs:w-8 sm:w-12 h-6 xs:h-8 sm:h-12 rounded-full bg-blue-400/30 animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}