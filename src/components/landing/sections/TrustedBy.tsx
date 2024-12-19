export function TrustedBy() {
  return (
    <div className="relative overflow-hidden bg-white border border-blue-500/20 rounded-lg py-16 sm:py-20">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-100 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm text-blue-600 text-sm font-medium mb-8">
            Trusted by Industry Leaders
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-12">
            Powering recruitment at world's leading companies
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
          {[
            { src: "/logos/microsoft.svg", alt: "Microsoft" },
            { src: "/logos/google.svg", alt: "Google" },
            { src: "/logos/amazon.svg", alt: "Amazon" },
            { src: "/logos/meta.svg", alt: "Meta" },
            { src: "/logos/apple.svg", alt: "Apple" }
          ].map((logo, i) => (
            <div key={i} className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-100/60 to-indigo-100/60 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <img 
                  className="relative h-12 opacity-50 group-hover:opacity-100 transition-opacity duration-300" 
                  src={logo.src} 
                  alt={logo.alt}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}