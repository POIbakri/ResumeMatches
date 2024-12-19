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
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Loved by Recruiters
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what hiring professionals are saying about our AI-powered CV analyzer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-gray-600 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}