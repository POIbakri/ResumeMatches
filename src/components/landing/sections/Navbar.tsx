import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" onClick={handleLogoClick} className="flex items-center">
              <img 
                src="/images/logo.png"
                alt="Company Logo"
                className="h-8 xs:h-10 sm:h-12 w-auto scale-110 transform hover:scale-105 transition-transform duration-200"
                style={{ marginTop: '-4px', marginBottom: '-4px' }}
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <a href="#features" className="text-sm lg:text-base text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">Features</a>
            <a href="#pricing" className="text-sm lg:text-base text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">Pricing</a>
            <Link 
              to="/login" 
              className="inline-flex items-center px-3 lg:px-4 py-1.5 lg:py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3">
            <div className="flex flex-col space-y-3 px-2">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium px-3 py-2 rounded-md hover:bg-gray-100">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium px-3 py-2 rounded-md hover:bg-gray-100">Pricing</a>
              <Link 
                to="/login"
                className="text-center text-white bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md font-medium shadow-sm hover:shadow-md"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}