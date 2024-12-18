import React from 'react';

export function TrustedBy() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wide mb-8">
          Trusted by leading companies worldwide
        </p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img className="h-12 opacity-50" src="/logos/microsoft.svg" alt="Microsoft" />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img className="h-12 opacity-50" src="/logos/google.svg" alt="Google" />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img className="h-12 opacity-50" src="/logos/amazon.svg" alt="Amazon" />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img className="h-12 opacity-50" src="/logos/meta.svg" alt="Meta" />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img className="h-12 opacity-50" src="/logos/apple.svg" alt="Apple" />
          </div>
        </div>
      </div>
    </div>
  );
}