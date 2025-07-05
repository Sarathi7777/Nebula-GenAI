
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Mail, User } from "lucide-react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

const SignUpModal = ({ isOpen, onClose, onSwitchToSignIn }: SignUpModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signUp(email, password, name);
      onClose();
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // Error is already handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl border-0 shadow-2xl p-0 overflow-hidden">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-br from-actionhero-500 via-actionhero-600 to-ghibli-500 px-8 py-8 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <DialogHeader className="space-y-0">
              <DialogTitle className="text-3xl font-bold text-center">Join ImageMagic!</DialogTitle>
              <p className="text-white/90 text-center mt-2">Create your account and start transforming images</p>
            </DialogHeader>
          </div>
        </div>

        <div className="px-8 py-8 space-y-6">

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="pl-10 h-12 border-2 border-gray-200 focus:border-actionhero-400 rounded-lg transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 h-12 border-2 border-gray-200 focus:border-actionhero-400 rounded-lg transition-colors"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded border-2 border-gray-400"></div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password (min. 6 characters)"
                  className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-actionhero-400 rounded-lg transition-colors"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500">Must be at least 6 characters long</p>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-actionhero-500 to-ghibli-500 hover:from-actionhero-600 hover:to-ghibli-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-actionhero-600 hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-actionhero-600 hover:underline">Privacy Policy</a>
          </p>

          {/* Switch to Sign In */}
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={onSwitchToSignIn}
                className="text-actionhero-600 hover:text-actionhero-700 font-medium hover:underline transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
