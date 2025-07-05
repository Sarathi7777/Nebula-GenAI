import { getApiUrl } from '../config';

const API_URL = getApiUrl('');

export interface ImageData {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: Date;
  userId: string;
}

export class ImageService {
  static async saveGeneratedImage(
    prompt: string, 
    imageUrl: string, 
    userId: string
  ): Promise<ImageData> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/api/images/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt, imageUrl }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to save image');
    }

    return data.image;
  }

  static async getUserImages(userId: string): Promise<ImageData[]> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/api/images/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch images');
    }

    return data.images;
  }

  static async getRecentImages(userId: string, limit: number = 3): Promise<ImageData[]> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/api/images/recent?limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch recent images');
    }

    return data.images;
  }

  static async deleteImage(imageId: string, userId: string): Promise<boolean> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/api/images/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete image');
    }

    return true;
  }

  static async getImageById(imageId: string, userId: string): Promise<ImageData | null> {
    // This would require a new endpoint on the server
    // For now, we'll get all images and filter
    const images = await this.getUserImages(userId);
    return images.find(img => img.id === imageId) || null;
  }
} 