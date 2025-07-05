import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Download, Palette, Sparkles, Camera } from "lucide-react";
import { toast } from "sonner";

// AI-powered transformation examples for user guidance
export const transformationExamples = [
  { prompt: "convert to Ghibli anime style", description: "Studio Ghibli animation with soft pastels and dreamy atmosphere" },
  { prompt: "make it look like a vintage photograph", description: "Classic retro film aesthetic with warm sepia tones" },
  { prompt: "transform into a watercolor painting", description: "Artistic watercolor with flowing colors and paper texture" },
  { prompt: "convert to oil painting style", description: "Rich textures with visible brushstrokes and vibrant colors" },
  { prompt: "make it action hero cinematic style", description: "Dramatic lighting with bold colors and movie poster aesthetic" },
  { prompt: "turn into comic book style", description: "Bold colors with clean lines and graphic novel appearance" },
  { prompt: "convert to cyberpunk style", description: "Neon lighting with futuristic high-tech atmosphere" },
  { prompt: "make it black and white", description: "High contrast monochrome with dramatic shadows" }
];

// Function to validate and enhance natural language prompts for AI transformation
export const validateAndEnhancePrompt = (prompt: string): { isValid: boolean; enhancedPrompt: string; category: string } => {
  const trimmedPrompt = prompt.trim();

  if (!trimmedPrompt || trimmedPrompt.length < 3) {
    return { isValid: false, enhancedPrompt: "", category: "invalid" };
  }

  const lowerPrompt = trimmedPrompt.toLowerCase();

  // Detect transformation categories and enhance prompts for better AI results
  let category = "general";
  let enhancedPrompt = trimmedPrompt;

  // Anime/Ghibli style - optimized for FLUX Kontext Pro
  if (lowerPrompt.includes('ghibli') || lowerPrompt.includes('anime') || lowerPrompt.includes('studio ghibli') ||
      lowerPrompt.includes('spirited away') || lowerPrompt.includes('totoro') || lowerPrompt.includes('miyazaki')) {
    category = 'anime';
    enhancedPrompt = `Convert this image to Studio Ghibli anime style with soft pastels, dreamy atmosphere, hand-drawn animation aesthetic, warm lighting, gentle watercolor-like textures, and whimsical details. Maintain the original composition while applying the distinctive Ghibli art style.`;
  }

  // Vintage/Retro style
  else if (lowerPrompt.includes('vintage') || lowerPrompt.includes('retro') || lowerPrompt.includes('old film') ||
           lowerPrompt.includes('film look') || lowerPrompt.includes('nostalgic') || lowerPrompt.includes('classic') ||
           lowerPrompt.includes('sepia') || lowerPrompt.includes('antique')) {
    category = 'vintage';
    enhancedPrompt = `Transform this image into a vintage photograph with classic retro film aesthetic, warm sepia tones, aged paper texture, nostalgic atmosphere, subtle film grain, and the characteristic look of old photographs from the 1970s-80s.`;
  }

  // Black and white/Monochrome
  else if (lowerPrompt.includes('black and white') || lowerPrompt.includes('monochrome') || lowerPrompt.includes('grayscale') ||
           lowerPrompt.includes('b&w') || lowerPrompt.includes('greyscale')) {
    category = 'monochrome';
    enhancedPrompt = `Convert this image to dramatic black and white with high contrast, professional monochrome photography aesthetic, rich shadows and highlights, and classic black and white film look.`;
  }

  // Watercolor painting style
  else if (lowerPrompt.includes('watercolor')) {
    category = 'artistic';
    enhancedPrompt = `Transform this image into a watercolor painting with soft flowing colors, artistic brushstrokes, paper texture, delicate color bleeding effects, and the characteristic look of professional watercolor artwork.`;
  }

  // Oil painting style
  else if (lowerPrompt.includes('oil painting') || lowerPrompt.includes('oil paint')) {
    category = 'artistic';
    enhancedPrompt = `Convert this image to an oil painting with rich textures, visible brushstrokes, thick paint application, vibrant colors, and the classic look of traditional oil painting artwork.`;
  }

  // Other artistic styles
  else if (lowerPrompt.includes('painting') || lowerPrompt.includes('sketch') || lowerPrompt.includes('drawing') ||
           lowerPrompt.includes('artistic') || lowerPrompt.includes('impressionist') || lowerPrompt.includes('abstract')) {
    category = 'artistic';
    enhancedPrompt = `Transform this image into artistic style: ${trimmedPrompt}. High quality artistic rendering, detailed brushwork, professional art style with rich textures and artistic details.`;
  }

  // Comic/Cartoon style
  else if (lowerPrompt.includes('comic') || lowerPrompt.includes('cartoon') || lowerPrompt.includes('superhero') ||
           lowerPrompt.includes('action hero') || lowerPrompt.includes('marvel') || lowerPrompt.includes('dc comics')) {
    category = 'comic';
    enhancedPrompt = `Transform this image into comic book style with bold colors, dramatic lighting, clean illustration lines, vibrant comic book aesthetic, and professional graphic novel appearance.`;
  }

  // Action hero/cinematic style
  else if (lowerPrompt.includes('action') || lowerPrompt.includes('hero') || lowerPrompt.includes('cinematic') ||
           lowerPrompt.includes('movie') || lowerPrompt.includes('epic')) {
    category = 'cinematic';
    enhancedPrompt = `Transform this image into action hero cinematic style with dramatic lighting, bold colors, movie poster aesthetic, high contrast, and epic film-like atmosphere.`;
  }

  // Cyberpunk/Futuristic
  else if (lowerPrompt.includes('cyberpunk') || lowerPrompt.includes('futuristic') || lowerPrompt.includes('neon') ||
           lowerPrompt.includes('sci-fi') || lowerPrompt.includes('blade runner')) {
    category = 'cyberpunk';
    enhancedPrompt = `Convert this image to cyberpunk style with neon lighting, futuristic aesthetic, high-tech atmosphere, electric blue and purple colors, and sci-fi movie lighting effects.`;
  }

  // General enhancement for other prompts
  else {
    enhancedPrompt = `Apply the following transformation to this image: ${trimmedPrompt}. Maintain high quality and professional results while preserving the original composition.`;
  }

  return { isValid: true, enhancedPrompt, category };
};

// AI-powered image transformation using Hugging Face Spaces (completely free!)
// Note: This implementation uses a backend proxy to handle CORS restrictions
export const transformImageWithAI = async (imageDataUrl: string, enhancedPrompt: string): Promise<string> => {
  // No API key required for Hugging Face Spaces - completely free!
  const HF_TOKEN = import.meta.env.VITE_HF_TOKEN; // Optional token for faster processing

  try {
    console.log('🤖 AI Processing with Hugging Face Spaces (Neural Style Transfer):', enhancedPrompt);
    console.log('🆓 Using free Hugging Face Spaces - no billing required!');
    if (HF_TOKEN) {
      console.log('🚀 HF Token available for faster processing');
    }

    // Use proxy server for Hugging Face Spaces API calls
    console.log('🔄 Using proxy server for Hugging Face Spaces API call...');
    const apiUrl = import.meta.env.VITE_PROXY_SERVER_URL
      ? `${import.meta.env.VITE_PROXY_SERVER_URL}/api/transform-image`
      : 'http://localhost:3001/api/transform-image';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageDataUrl: imageDataUrl,
        prompt: enhancedPrompt,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Proxy server error:', errorData);

      if (response.status === 503) {
        throw new Error('Hugging Face Space is starting up. Please wait a moment and try again.');
      } else if (response.status === 504) {
        throw new Error('AI transformation is taking longer than expected. Please try again.');
      } else {
        throw new Error(errorData.error || `API error: ${response.status}`);
      }
    }

    const result = await response.json();
    console.log('✅ Hugging Face Spaces transformation completed');

    if (result.success && result.imageUrl) {
      return result.imageUrl;
    } else {
      throw new Error('Unexpected response format from Hugging Face Spaces API');
    }

  } catch (error) {
    console.error('❌ AI transformation error:', error);
    // Handle specific error types
    if (error.message.includes('Failed to fetch')) {
      throw new Error(`🚫 Connection Error: Unable to connect to the proxy server.

🔧 **Solution**: Start the proxy server to enable AI transformations:

1. **Open a new terminal** in the project directory
2. **Navigate to server folder**: cd server
3. **Install dependencies**: npm install
4. **Start proxy server**: npm start
5. **Refresh this page** and try again

📋 **Note**: The proxy server handles Hugging Face Spaces API calls securely and bypasses CORS restrictions.

🆓 **Free Service**: No API keys or billing required - completely free AI transformations!`);
    }

    throw error;
  }
};



const ImageConverter = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [transformPrompt, setTransformPrompt] = useState<string>("");
  const [detectedStyle, setDetectedStyle] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setConvertedImage(null);
      };
      reader.readAsDataURL(file);
      toast.success("Image uploaded successfully!");
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const convertImage = async () => {
    if (!originalImage || !transformPrompt.trim()) {
      toast.error("Please upload an image and describe your desired transformation");
      return;
    }

    // Validate and enhance the prompt for AI transformation
    const promptValidation = validateAndEnhancePrompt(transformPrompt);
    if (!promptValidation.isValid) {
      toast.error("Please provide a more detailed transformation description (e.g., 'convert to Ghibli anime style', 'make it look like a vintage photograph')");
      return;
    }

    setDetectedStyle(promptValidation.category);
    setIsConverting(true);

    // Fallback CSS-based transformation function
    const applyFallbackTransformation = (imageDataUrl: string, style: string): Promise<string> => {
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;

          // Apply different filters based on style
          if (style.toLowerCase().includes('ghibli') || style.toLowerCase().includes('anime')) {
            ctx.filter = 'saturate(1.3) contrast(1.1) brightness(1.05) hue-rotate(5deg)';
          } else if (style.toLowerCase().includes('vintage') || style.toLowerCase().includes('retro')) {
            ctx.filter = 'sepia(0.6) contrast(1.1) brightness(0.9) saturate(0.8)';
          } else if (style.toLowerCase().includes('oil') || style.toLowerCase().includes('painting')) {
            ctx.filter = 'saturate(1.4) contrast(1.2) brightness(1.1)';
          } else if (style.toLowerCase().includes('watercolor')) {
            ctx.filter = 'saturate(1.2) contrast(0.9) brightness(1.1) blur(0.5px)';
          } else {
            ctx.filter = 'saturate(1.2) contrast(1.1) brightness(1.05)';
          }

          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };

        img.src = imageDataUrl;
      });
    };

    // Function to attempt transformation with retries for startup
    const attemptTransformation = async (retryCount = 0): Promise<string> => {
      try {
        // Show progress message for AI processing
        if (retryCount === 0) {
          toast.info("🤗 Attempting AI transformation... Fallback available if needed.", {
            duration: 5000,
          });
        }

        // Use AI transformation instead of canvas filters
        return await transformImageWithAI(originalImage, promptValidation.enhancedPrompt);
      } catch (error) {
        // Check if it's a startup error and we haven't exceeded retries
        if ((error.message.includes("starting up") || error.message.includes("Service Unavailable") || error.message.includes("503")) && retryCount < 2) {
          const waitTime = (retryCount + 1) * 30; // 30, 60 seconds
          toast.info(`🚀 AI Space is starting up... Retrying in ${waitTime} seconds (${retryCount + 1}/2)`, {
            duration: waitTime * 1000
          });

          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
          return attemptTransformation(retryCount + 1);
        }

        // If AI transformation fails after retries, use fallback
        if (retryCount >= 2) {
          toast.info("🎨 AI service unavailable, using fallback transformation...", {
            duration: 3000
          });
          return await applyFallbackTransformation(originalImage, promptValidation.enhancedPrompt);
        }

        // Re-throw other errors
        throw error;
      }
    };

    try {
      // Attempt transformation with automatic retries
      const transformedImageUrl = await attemptTransformation();

      setConvertedImage(transformedImageUrl);

      // Check if it's a data URL (fallback) or external URL (AI)
      if (transformedImageUrl.startsWith('data:')) {
        toast.success(`🎨 Image transformed using fallback processing! Style: ${promptValidation.category}`, {
          duration: 5000
        });
      } else {
        toast.success(`🎨 Image successfully transformed using AI! Style: ${promptValidation.category}`, {
          duration: 5000
        });
      }

    } catch (error) {
      console.error('Transformation error:', error);

      // Provide specific error messages based on error type
      if (error.message.includes("starting up") || error.message.includes("taking longer than expected")) {
        toast.error("🚀 Transformation service is unavailable. Please try again in a few minutes.", {
          duration: 8000,
        });
      } else if (error.message.includes("taking longer")) {
        toast.error("AI transformation is taking longer than expected. Please try again.", {
          duration: 6000,
        });
      } else if (error.message.includes("Connection Error")) {
        toast.error("Proxy server not running. Please start the server and try again.", {
          duration: 8000,
        });
      } else {
        toast.error(`AI transformation failed: ${error.message}`, {
          duration: 6000,
        });
      }
    } finally {
      setIsConverting(false);
    }
  };

  const downloadImage = () => {
    if (!convertedImage) {
      toast.error("No transformed image to download");
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = convertedImage;
      link.download = `transformed-${detectedStyle || 'image'}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error("Failed to download image");
    }
  };

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-purple-600" />
          AI-Powered Image Style Transformation
        </CardTitle>

      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Upload Section */}
        <div className="space-y-3">
          <Label htmlFor="image-upload" className="text-base font-medium">Upload Your Image</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
            </Label>
          </div>
        </div>

        {/* Transformation Prompt */}
        <div className="space-y-3">
          <Label htmlFor="transform-prompt" className="text-base font-medium">Describe Your Transformation</Label>
          <Textarea
            id="transform-prompt"
            placeholder="Convert to Ghibli anime style, make it look like an action hero, apply sepia vintage effect, turn into grayscale, make it more vibrant..."
            value={transformPrompt}
            onChange={(e) => setTransformPrompt(e.target.value)}
            rows={3}
            className="resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400"
          />
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="h-3 w-3" />
            <span>Try: "Ghibli anime style", "vintage photograph", "watercolor painting", "cyberpunk style", "comic book art"</span>
          </div>
        </div>

        {/* Convert Button */}
        <Button
          onClick={convertImage}
          disabled={!originalImage || !transformPrompt.trim() || isConverting || !validateAndEnhancePrompt(transformPrompt).isValid}
          className="w-full h-12 text-base font-medium bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConverting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              AI Processing Image...
            </>
          ) : !originalImage ? (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload Image First
            </>
          ) : !transformPrompt.trim() ? (
            <>
              <Palette className="h-4 w-4 mr-2" />
              Describe Transformation
            </>
          ) : !validateAndEnhancePrompt(transformPrompt).isValid ? (
            <>
              <Palette className="h-4 w-4 mr-2" />
              Prompt Too Short
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Transform with AI
            </>
          )}
        </Button>

        {/* AI Prompt Analysis */}
        {transformPrompt.trim() && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="font-medium text-purple-800">
                AI Transformation Preview
              </span>
            </div>
            {(() => {
              const promptValidation = validateAndEnhancePrompt(transformPrompt);
              if (promptValidation.isValid) {
                return (
                  <div className="space-y-2">
                    <p className="text-sm text-green-700 font-medium">
                      ✓ AI understands your request: {promptValidation.category} style
                    </p>
                    <p className="text-sm text-gray-600">
                      Enhanced prompt: "{promptValidation.enhancedPrompt.substring(0, 100)}..."
                    </p>
                    <div className="mt-2 pt-2 border-t border-purple-200">
                      <p className="text-xs text-purple-600">
                        🤖 Ready for AI transformation! This will use advanced AI models to transform your image.
                      </p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="space-y-2">
                    <p className="text-sm text-amber-700">
                      ⚠ Please provide a more detailed description.
                    </p>
                    <p className="text-xs text-amber-600">
                      Try: "convert to Ghibli anime style", "make it look like a vintage photograph", "transform into watercolor painting"
                    </p>
                  </div>
                );
              }
            })()}
          </div>
        )}

        {/* AI Transformation Examples */}
        {!originalImage && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-gray-800">AI Transformation Examples</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {transformationExamples.map((example, index) => (
                <div key={index} className="bg-white p-3 rounded border">
                  <p className="font-medium text-purple-700 mb-1">"{example.prompt}"</p>
                  <p className="text-gray-600 text-xs">{example.description}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              💡 Upload an image and try any of these prompts, or create your own transformation description!
            </p>
          </div>
        )}

        {/* Image Preview */}
        <div className="grid md:grid-cols-2 gap-4">
          {originalImage && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Original Image</Label>
              <div className="relative rounded-lg overflow-hidden shadow-md">
                <img src={originalImage} alt="Original" className="w-full h-48 object-cover" />
              </div>
            </div>
          )}
          
          {convertedImage && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                AI Transformed ({detectedStyle} style)
              </Label>
              <div className="relative rounded-lg overflow-hidden shadow-md">
                <img src={convertedImage} alt="AI Transformed" className="w-full h-48 object-cover" />
              </div>
              <Button
                onClick={downloadImage}
                variant="outline"
                className="w-full border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Download AI Transformed Image
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageConverter;
