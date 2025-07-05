
import { GradientButton } from "@/components/ui/gradient-button";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import SignUpModal from "@/components/auth/SignUpModal";
import { Sparkles, Zap, Palette, ArrowRight, Play } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <>
      <div className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
        {/* Enhanced background decorations */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-r from-purple-200/40 to-purple-300/40 blur-3xl opacity-60 animate-pulse-slow"></div>
          <div className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-r from-blue-200/40 to-blue-300/40 blur-3xl opacity-60 animate-pulse-slow"></div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-float"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-60 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-purple-500 rounded-full opacity-60 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-full mb-8 shadow-sm">
              <Sparkles className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Powered by Advanced AI Technology</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-tight">
              <span className="block mb-2">Create</span>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent inline-flex items-center gap-4">
                Magical Images
                <Zap className="h-12 w-12 md:h-16 md:w-16 text-blue-500 animate-pulse" />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Transform your ideas into stunning high-definition artwork with our cutting-edge AI. 
              From photorealistic images to artistic masterpieces, create anything you can imagine.
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                <Palette className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">HD Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">AI Powered</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
              {!isSignedIn ? (
                <GradientButton 
                  size="xl" 
                  onClick={() => setShowSignUp(true)}
                  className="group text-lg px-8 py-4 h-auto"
                >
                  Start Creating for Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </GradientButton>
              ) : (
                <GradientButton 
                  size="xl" 
                  onClick={() => navigate('/generate')}
                  className="group text-lg px-8 py-4 h-auto"
                >
                  Open AI Studio
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </GradientButton>
              )}
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-300 h-auto px-8 py-4 text-lg hover:bg-white/80 backdrop-blur-sm group"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
          </div>
          
          {/* Enhanced showcase with real images */}
          <div className="relative mx-auto max-w-6xl">
            <div className="glass-effect rounded-3xl overflow-hidden shadow-2xl animate-float">
              <div className="aspect-[16/10] relative bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Mock interface with sample images */}
                <div className="absolute inset-0 p-8">
                  <div className="grid md:grid-cols-3 gap-6 h-full">
                    {/* Left side - Sample Images */}
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-3 text-sm">AI Gallery</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <img 
                            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop" 
                            alt="Mountain landscape" 
                            className="rounded-lg w-full h-16 object-cover"
                          />
                          <img 
                            src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop" 
                            alt="Forest sunlight" 
                            className="rounded-lg w-full h-16 object-cover"
                          />
                          <img 
                            src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop" 
                            alt="Starry night" 
                            className="rounded-lg w-full h-16 object-cover"
                          />
                          <img 
                            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop" 
                            alt="Lake reflection" 
                            className="rounded-lg w-full h-16 object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Center - Input */}
                    <div className="space-y-4">
                      <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold text-gray-800 mb-3">AI Prompt</h3>
                        <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                          "A magical forest with glowing flowers under starlight, digital art style"
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-4 text-center font-medium">
                        ✨ Generating Magic...
                      </div>
                    </div>
                    
                    {/* Right side - Output */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h3 className="font-semibold text-gray-800 mb-3">Generated Result</h3>
                      <div className="aspect-square rounded-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=400&fit=crop" 
                          alt="AI generated forest" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute -left-8 top-1/4 bg-white/90 backdrop-blur border border-gray-200/50 shadow-lg rounded-2xl px-6 py-4 hidden lg:block">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">50K+</div>
                <div className="text-sm text-gray-600">Images Created</div>
              </div>
            </div>
            
            <div className="absolute -right-8 bottom-1/4 bg-white/90 backdrop-blur border border-gray-200/50 shadow-lg rounded-2xl px-6 py-4 hidden lg:block">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">4.9★</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
            </div>
          </div>

          {/* Feature showcase grid */}
          <div className="mt-32 grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Generation</h3>
              <p className="text-gray-600">Create stunning images from text descriptions using advanced AI models</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Palette className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Style Conversion</h3>
              <p className="text-gray-600">Transform your photos with artistic filters and style effects</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-100 to-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">HD Quality</h3>
              <p className="text-gray-600">Professional-quality results with high-definition output</p>
            </div>
          </div>
        </div>
      </div>

      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSwitchToSignIn={() => {}}
      />
    </>
  );
};

export default Hero;
