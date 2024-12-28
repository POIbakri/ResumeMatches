export function TrustedBy() {
  return (
    <div className="relative overflow-hidden bg-white border border-blue-500/20 rounded-lg py-8 xs:py-12 sm:py-16 lg:py-20">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="absolute -top-20 xs:-top-30 sm:-top-40 -right-20 xs:-right-30 sm:-right-40 w-40 xs:w-60 sm:w-80 h-40 xs:h-60 sm:h-80 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 xs:-bottom-30 sm:-bottom-40 -left-20 xs:-left-30 sm:-left-40 w-40 xs:w-60 sm:w-80 h-40 xs:h-60 sm:h-80 bg-indigo-100 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="inline-flex items-center px-3 xs:px-4 py-1 xs:py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm text-blue-600 text-xs xs:text-sm font-medium mb-4 xs:mb-6 sm:mb-8">
            Trusted by Industry Leaders
          </p>
          <p className="text-lg xs:text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-8 xs:mb-10 sm:mb-12">
            Powering recruitment at world's leading companies
          </p>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-6 lg:grid-cols-5 gap-4 xs:gap-6 sm:gap-8">
          {[
            { src: "/logos/microsoft.svg", alt: "Microsoft" },
            { src: "/logos/google.svg", alt: "Google" },
            { src: "/logos/amazon.svg", alt: "Amazon" },
            { src: "/logos/meta.svg", alt: "Meta" },
            { src: "/logos/apple.svg", alt: "Apple" }
          ].map((logo, i) => (
            <div key={i} className="col-span-1 flex justify-center items-center md:col-span-2 lg:col-span-1">
              <div className="relative group w-full max-w-[120px] xs:max-w-[140px] sm:max-w-[160px]">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-100/60 to-indigo-100/60 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <img 
                  className="relative w-full h-8 xs:h-10 sm:h-12 object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-300" 
                  src={logo.src} 
                  alt={logo.alt}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}