
import { Wand, Camera, CloudUpload, Eye, ArrowRight } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <CloudUpload className="h-10 w-10 text-ghibli-500" />,
      title: "Easy Upload",
      description: "Simply upload any image from your device or provide a URL to get started."
    },
    {
      icon: <Wand className="h-10 w-10 text-ghibli-600" />,
      title: "Magical Transformations",
      description: "Choose from Ghibli-style, action figure, or other artistic styles for your transformation."
    },
    {
      icon: <Camera className="h-10 w-10 text-ghibli-700" />,
      title: "High Quality Results",
      description: "Get stunning, high-resolution results powered by the latest GPT Image AI models."
    },
    {
      icon: <Eye className="h-10 w-10 text-actionhero-500" />,
      title: "Instant Preview",
      description: "See a real-time preview of your transformation before downloading."
    }
  ];

  const examples = [
    {
      before: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&crop=face",
      after: "/ChatGPT Image Jun 26, 2025, 01_08_38 PM.png",
      style: "Ghibli Style"
    },
    {
      before: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
      after: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&h=800&fit=crop",
      style: "Action Hero"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transform Images with Advanced AI
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform uses cutting-edge AI models to transform your ordinary photos into extraordinary art.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div id="examples" className="pt-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See the Magic in Action
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Check out these example transformations created with our AI technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {examples.map((example, index) => (
              <div key={index} className="glass-effect rounded-xl overflow-hidden">
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block bg-white/90 backdrop-blur-sm text-sm font-medium px-3 py-1 rounded-full">
                      Original Photo
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                      AI {example.style}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2">
                    <div className="aspect-square relative">
                      <img
                        src={example.before}
                        alt="Before transformation"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="aspect-square relative">
                      <img
                        src={example.after}
                        alt="After transformation"
                        className="w-full h-full object-cover"
                      />
                      {/* Artistic overlay to suggest transformation */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${
                        example.style === "Ghibli Style"
                          ? "from-green-200/20 via-blue-200/20 to-purple-200/20"
                          : "from-red-200/20 via-orange-200/20 to-yellow-200/20"
                      } mix-blend-overlay`}></div>
                    </div>
                  </div>
                  
                  {/* Divider arrow */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white h-10 w-10 rounded-full shadow-lg flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-ghibli-600" />
                  </div>
                </div>
                
                <div className="p-4 bg-white/80">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{example.style} Transformation</h3>
                      <p className="text-sm text-gray-500">
                        {example.style === "Ghibli Style"
                          ? "Anime art with soft colors & whimsical design"
                          : "Dramatic superhero style with bold colors"}
                      </p>
                    </div>
                    <button className="text-sm font-medium text-ghibli-600 hover:text-ghibli-700">
                      Try This Style
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
