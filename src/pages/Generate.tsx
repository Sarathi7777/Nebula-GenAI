import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Wand2, Download, Sparkles, Zap, ImageIcon, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useMongoImages } from "@/hooks/useMongoImages";
import { useNavigate } from "react-router-dom";
import ImageConverter from "@/components/ImageConverter";

const Generate = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { user, isLoaded, isSignedIn } = useAuth();
  const { saveGeneratedImage } = useMongoImages();
  const navigate = useNavigate();

  // No API key required - using free Hugging Face Spaces via proxy server!

  // Function to enhance prompts for photorealistic output
  const enhancePromptForPhotorealism = (userPrompt: string): string => {
    // Check if the user explicitly wants artistic styles
    const artisticKeywords = [
      'painting', 'artwork', 'digital art', 'illustration', 'drawing', 'sketch',
      'anime', 'cartoon', 'abstract', 'impressionist', 'oil painting', 'watercolor',
      'artistic', 'stylized', 'fantasy art', 'concept art'
    ];

    const lowerPrompt = userPrompt.toLowerCase();
    const hasArtisticIntent = artisticKeywords.some(keyword => lowerPrompt.includes(keyword));

    // If user wants artistic style, don't override their intent
    if (hasArtisticIntent) {
      return userPrompt;
    }

    // Add photorealism enhancers
    const photorealismKeywords = [
      'photorealistic',
      'high resolution',
      'professional photography',
      'detailed',
      'realistic',
      'sharp focus',
      'natural lighting',
      'DSLR camera',
      '8K resolution',
      'ultra detailed',
      'lifelike'
    ];

    // Check if prompt already has photorealism keywords
    const hasPhotorealismKeywords = photorealismKeywords.some(keyword =>
      lowerPrompt.includes(keyword.toLowerCase())
    );

    if (hasPhotorealismKeywords) {
      // Already has some photorealism keywords, just add a few more
      return `${userPrompt}, photorealistic, high resolution, detailed`;
    } else {
      // Add comprehensive photorealism enhancement
      return `${userPrompt}, photorealistic, professional photography, high resolution, detailed, realistic, sharp focus, natural lighting, DSLR camera quality, 8K resolution`;
    }
  };



  const handleTextToImage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setShowSuccessMessage(false); // Clear any previous success message

    // Function to attempt image generation with retries for startup
    const attemptGeneration = async (retryCount = 0): Promise<any> => {
      try {
        // Enhance the prompt for photorealism
        const enhancedPrompt = enhancePromptForPhotorealism(prompt);

      toast.info("🎨 Generating photorealistic image with free AI...");

      // Use the proxy server for free Hugging Face Spaces integration
      const apiUrl = import.meta.env.VITE_PROXY_SERVER_URL
        ? `${import.meta.env.VITE_PROXY_SERVER_URL}/api/generate-image`
        : 'http://localhost:3001/api/generate-image';

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: enhancedPrompt
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 503 || errorData.error?.includes('starting up')) {
          if (retryCount < 3) {
            const waitTime = (retryCount + 1) * 15; // 15, 30, 45 seconds
            toast.info(`🚀 AI Space is starting up... Retrying in ${waitTime} seconds (${retryCount + 1}/3)`, {
              duration: waitTime * 1000
            });

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
            return attemptGeneration(retryCount + 1);
          } else {
            toast.error("🚀 Hugging Face Space is taking longer than expected. Please try again in a few minutes.", {
              duration: 8000
            });
            throw new Error("Hugging Face Space startup timeout");
          }
        } else if (response.status === 429) {
          toast.error("⏰ Rate limit exceeded, please try again later");
          throw new Error("Rate limit exceeded");
        } else {
          throw new Error(errorData.details || errorData.error || `API request failed: ${response.status}`);
        }
      }

        const result = await response.json();
        return result; // Return the result for the main function to handle
      } catch (error) {
        // If it's a startup error and we haven't exceeded retries, it will be handled above
        // Otherwise, re-throw the error
        throw error;
      }
    };

    try {
      // Attempt generation with automatic retries
      const result = await attemptGeneration();

      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
        setIsGenerating(false); // Clear loading state immediately
        setShowSuccessMessage(true); // Show success message

        // Save to MongoDB if user is logged in
        if (user) {
          try {
            await saveGeneratedImage(prompt, result.imageUrl);
          } catch (mongoError) {
            console.error('❌ MongoDB save failed:', mongoError);
            // Don't throw here, just log the error
          }
        }

        toast.success("🎉 Photorealistic HD image generated successfully with free AI!");

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        throw new Error(result.error || "Failed to generate image");
      }
      
    } catch (error) {
      console.error('❌ Error generating image:', error);

      // Check if it's a connection error (proxy server not running)
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        toast.error(`🔧 Proxy server connection failed. Please ensure the proxy server is running:

1. Open terminal in the 'server' directory
2. Run: npm install
3. Run: npm start
4. Refresh this page and try again

📋 The proxy server handles free Hugging Face Spaces API calls securely.

🆓 No API keys or billing required - completely free AI generation!`);
      } else {
        toast.error(`Failed to generate image: ${error.message}`);
      }
    } finally {
      // Ensure loading state is cleared in case of any errors
      setIsGenerating(false);
    }
  };



  const downloadImage = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ai-generated-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              {/* <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button> */}
              <Button onClick={() => navigate('/')} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Creative Studio
              </h1>
            </div>
            
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Powered by AI</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isSignedIn ? (
          <Card className="max-w-md mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="pt-8 text-center">
              <Wand2 className="h-12 w-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-xl font-semibold mb-2">Welcome to AI Studio</h3>
              <p className="text-gray-600 mb-6">Please sign in to start creating amazing images with AI</p>
              <Button className="w-full" onClick={() => navigate('/')}>
                Go to Sign In
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Creation Area */}
            <div className="lg:col-span-3 space-y-8">
              {/* AI Image Generation Section */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    AI Image Generation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="prompt" className="text-base font-medium">Describe Your Vision</Label>
                    <Textarea
                      id="prompt"
                      placeholder="A professional portrait of a person in a modern office, natural lighting, sharp focus, detailed facial features..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={4}
                      className="resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                    />
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Sparkles className="h-3 w-3" />
                      <span>AI automatically enhances prompts for photorealistic results. Describe scenes, people, or objects naturally.</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleTextToImage}
                      disabled={isGenerating}
                      className="w-full h-12 text-base font-medium bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Photorealistic Image...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" />
                          Generate Photorealistic Image
                        </>
                      )}
                    </Button>


                  </div>
                </CardContent>
              </Card>

              {/* Image Editing Section */}
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-blue-600" />
                    Image Style Transformation
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ImageConverter />
                </CardContent>
              </Card>


              {/* Success Message */}
              {showSuccessMessage && (
                <Card className="shadow-xl border-0 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-green-800">Image Generated Successfully!</h3>
                        <p className="text-green-600">Your photorealistic AI image has been created using free Hugging Face Spaces.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Generated Image Display */}
              {generatedImage && (
                <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-purple-600" />
                      Your AI Creation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="relative rounded-xl overflow-hidden shadow-lg group">
                        <img
                          src={generatedImage}
                          alt="AI Generated"
                          className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      </div>
                      <Button
                        onClick={downloadImage}
                        variant="outline"
                        className="w-full h-12 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download HD Image (1024×1024)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Zap className="h-4 w-4" />
                    Photorealistic AI Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Describe real-world scenes, people, and objects naturally</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p>Include lighting: "natural light", "golden hour", "studio lighting"</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p>AI automatically adds photorealistic enhancement keywords</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p>For artistic styles, explicitly mention "painting", "artwork", etc.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">AI-Powered Studio</h3>
                  <p className="text-white/90 text-sm">
                    Generate stunning images and transform existing photos with advanced AI
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Style Transformations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Available artistic styles:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Ghibli anime style</li>
                      <li>• Action hero cinematic</li>
                      <li>• Grayscale & Sepia tones</li>
                      <li>• Sketch & artistic effects</li>
                      <li>• Vintage & vibrant filters</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generate;
