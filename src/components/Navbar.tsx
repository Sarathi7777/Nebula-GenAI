
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import UserButton from "@/components/auth/UserButton";
import SignInModal from "@/components/auth/SignInModal";
import SignUpModal from "@/components/auth/SignUpModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => navigate('/')}
              >
                <img
                  src="/logo.svg"
                  alt="ImageMagic Logo"
                  className="w-8 h-8"
                />
                <h1 className="text-2xl font-bold text-gradient">
                  ImageMagic
                </h1>
              </div>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {isSignedIn && (
                <button 
                  onClick={() => navigate('/generate')}
                  className="text-gray-700 hover:text-ghibli-600 transition-colors"
                >
                  Generate
                </button>
              )}
              <a href="#features" className="text-gray-700 hover:text-ghibli-600 transition-colors">
                Features
              </a>
              <a href="#examples" className="text-gray-700 hover:text-ghibli-600 transition-colors">
                Examples
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-ghibli-600 transition-colors">
                Pricing
              </a>
              <a href="#faq" className="text-gray-700 hover:text-ghibli-600 transition-colors">
                FAQ
              </a>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {!isSignedIn ? (
                <>
                  <Button variant="ghost" onClick={() => setShowSignIn(true)}>
                    Log in
                  </Button>
                  <GradientButton onClick={() => setShowSignUp(true)}>
                    Sign up
                  </GradientButton>
                </>
              ) : (
                <UserButton />
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isSignedIn && (
                <button
                  onClick={() => {
                    navigate('/generate');
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 w-full text-left"
                >
                  Generate
                </button>
              )}
              <a
                href="#features"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#examples"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Examples
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
            </div>
            <div className="px-4 py-3 space-y-2">
              {!isSignedIn ? (
                <>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-center"
                    onClick={() => setShowSignIn(true)}
                  >
                    Log in
                  </Button>
                  <GradientButton 
                    className="w-full justify-center"
                    onClick={() => setShowSignUp(true)}
                  >
                    Sign up
                  </GradientButton>
                </>
              ) : (
                <div className="flex justify-center">
                  <UserButton />
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSwitchToSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />

      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />
    </>
  );
};

export default Navbar;
