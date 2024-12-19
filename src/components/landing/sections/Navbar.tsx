import { Link } from 'react-router-dom';

export function Navbar() {
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
                className="h-12 w-auto scale-110 transform hover:scale-105 transition-transform duration-200"
                style={{ marginTop: '-4px', marginBottom: '-4px' }}
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">Pricing</a>
            <Link 
              to="/login" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}