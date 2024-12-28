import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    quote: "This tool has revolutionized our hiring process. We're making better decisions faster than ever.",
    author: "Sarah Johnson",
    role: "Head of Recruitment", 
    company: "TechCorp Inc.",
    rating: 5
  },
  {
    quote: "The AI analysis is incredibly accurate. It helps us identify the best candidates quickly and efficiently.",
    author: "Michael Chen",
    role: "Technical Recruiter",
    company: "Innovation Labs",
    rating: 5
  },
  {
    quote: "The interview suggestions are spot-on. It's like having an expert recruiter guiding you through the process.",
    author: "Emma Williams",
    role: "HR Director",
    company: "Global Solutions",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <div className="relative bg-white py-12 xs:py-16 sm:py-20 lg:py-24 overflow-hidden border border-blue-500/20 rounded-lg">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="absolute -top-20 xs:-top-30 sm:-top-40 -right-20 xs:-right-30 sm:-right-40 w-40 xs:w-60 sm:w-80 h-40 xs:h-60 sm:h-80 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 xs:-bottom-30 sm:-bottom-40 -left-20 xs:-left-30 sm:-left-40 w-40 xs:w-60 sm:w-80 h-40 xs:h-60 sm:h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 xs:mb-12 lg:mb-16">
          <p className="inline-flex items-center px-3 xs:px-4 py-1 xs:py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm text-blue-600 text-xs xs:text-sm font-medium mb-3 xs:mb-4">
            Client Testimonials
          </p>
          <h2 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-2 xs:mb-4">
            Loved by Recruiters
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            See what hiring professionals are saying about our AI-powered CV analyzer
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="group relative bg-white rounded-xl p-4 xs:p-6 sm:p-8 shadow-lg border border-blue-100 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="relative z-10">
                <div className="flex space-x-0.5 xs:space-x-1 mb-3 xs:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-4 xs:h-5 w-4 xs:w-5 text-blue-400 group-hover:text-blue-500 transition-colors duration-300" />
                  ))}
                </div>
                <blockquote className="text-sm xs:text-base text-gray-600 mb-4 xs:mb-6 group-hover:text-gray-700 transition-colors">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-semibold text-sm xs:text-base text-gray-900 group-hover:text-blue-600 transition-colors">{testimonial.author}</p>
                  <p className="text-xs xs:text-sm text-gray-500 group-hover:text-gray-600 transition-colors">{testimonial.role}</p>
                  <p className="text-xs xs:text-sm text-gray-500 group-hover:text-gray-600 transition-colors">{testimonial.company}</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 xs:h-1 bg-blue-400 group-hover:w-1/2 transition-all duration-300 rounded-full"></div>
              <div className="absolute top-4 right-4 w-8 xs:w-12 h-8 xs:h-12 bg-blue-400/5 rounded-full blur group-hover:bg-blue-400/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}