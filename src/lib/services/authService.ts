import { getApiUrl } from '../config';

const API_URL = getApiUrl('');

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

export interface LoginResponse {
  user: AuthUser;
  token: string;
}

// Simple JWT decoder for client-side use
function decodeJWT(token: string): { userId: string; email: string; name?: string; avatar?: string } {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export class AuthService {
  static async register(email: string, password: string, name?: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    return data;
  }

  static async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    return data;
  }

  static async verifyToken(token: string): Promise<AuthUser> {
    try {
      const decoded = decodeJWT(token);
      if (!decoded || !decoded.userId) {
        throw new Error('Invalid token');
      }

      return {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
        avatar: decoded.avatar,
      };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static async getUserById(userId: string): Promise<AuthUser | null> {
    // This would typically make a server call to get user details
    // For now, we'll return null as we don't have this endpoint
    return null;
  }
} 