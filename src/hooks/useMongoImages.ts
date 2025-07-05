import { useState } from 'react';
import { ImageService, ImageData } from '@/lib/services/imageService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: Date;
  userId: string;
}

export const useMongoImages = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const saveGeneratedImage = async (prompt: string, imageDataUrl: string) => {
    if (!user) {
      console.log('User not logged in, skipping save');
      return;
    }

    setLoading(true);
    try {
      await ImageService.saveGeneratedImage(prompt, imageDataUrl, user.id);
      toast.success('Image saved successfully!');
    } catch (error) {
      console.error('Error saving image:', error);
      toast.error('Failed to save image');
    } finally {
      setLoading(false);
    }
  };

  const getUserImages = async (): Promise<GeneratedImage[]> => {
    if (!user) return [];

    setLoading(true);
    try {
      const images = await ImageService.getUserImages(user.id);
      return images;
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to fetch images');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getRecentImages = async (limit: number = 3): Promise<GeneratedImage[]> => {
    if (!user) return [];

    setLoading(true);
    try {
      const images = await ImageService.getRecentImages(user.id, limit);
      return images;
    } catch (error) {
      console.error('Error fetching recent images:', error);
      toast.error('Failed to fetch recent images');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (imageId: string): Promise<boolean> => {
    if (!user) return false;

    setLoading(true);
    try {
      const success = await ImageService.deleteImage(imageId, user.id);
      if (success) {
        toast.success('Image deleted successfully!');
      } else {
        toast.error('Failed to delete image');
      }
      return success;
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveGeneratedImage,
    getUserImages,
    getRecentImages,
    deleteImage,
    loading,
  };
}; 