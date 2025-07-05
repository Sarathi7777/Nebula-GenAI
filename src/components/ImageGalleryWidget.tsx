
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon, ExternalLink } from "lucide-react";
import { useMongoImages, GeneratedImage } from "@/hooks/useMongoImages";
import { useAuth } from "@/contexts/AuthContext";

const ImageGalleryWidget = () => {
  const [recentImages, setRecentImages] = useState<GeneratedImage[]>([]);
  const { getRecentImages, loading } = useMongoImages();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadRecentImages();
    }
  }, [user]);

  const loadRecentImages = async () => {
    const userImages = await getRecentImages(3);
    setRecentImages(userImages);
  };

  const refreshGallery = () => {
    loadRecentImages();
  };

  if (!user) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Images</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = '/history'}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        ) : recentImages.length === 0 ? (
          <div className="text-center py-8">
            <ImageIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <div className="text-sm text-gray-500">
              <p>No saved images yet</p>
              <p className="text-xs mt-1">MongoDB storage enabled</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {recentImages.map((image) => (
              <div key={image.id} className="flex items-center space-x-3">
                <img
                  src={image.imageUrl}
                  alt={image.prompt}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {image.prompt}
                  </p>
                  <p className="text-xs text-gray-500">
                    {image.createdAt.toDate().toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <Button
          onClick={refreshGallery}
          variant="outline"
          size="sm"
          className="w-full mt-3"
        >
          Refresh
        </Button>
      </CardContent>
    </Card>
  );
};

export default ImageGalleryWidget;
