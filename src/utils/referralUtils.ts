import axios from 'axios';
import bs58 from 'bs58';

interface SignupResponse {
  success: boolean;
  referralCode: string;
  referredBy?: string;
}

// API
export const referralApi = {
  signup: async (
    signMessage: any,
    publicKey: any,
  ): Promise<SignupResponse> => {
    try {
      if (!publicKey || !signMessage) {
        throw new Error('Public key and signMessage are required');
      }
      // 1. Create message to sign
      const message = JSON.stringify({
        action: 'signup',
        exp: Date.now() + 1000 * 60 * 5,
      });
      
      // 2. Sign the message
      const messageBytes = new TextEncoder().encode(message);
      const signature = await signMessage(messageBytes);
      
      // 3. Encode using bs58 to match backend
      const encodedMessage = bs58.encode(messageBytes);
      const encodedSignature = bs58.encode(signature);

      // 4. Make API call
      const response = await axios.post(
        `${process.env.VUE_APP_API_URL}/signup`,
        {
          headers: {
            'Authorization': `Bearer ${publicKey}.${encodedMessage}.${encodedSignature}`
          }
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to signup');
      }
      throw error;
    }
  },

  login: async (signMessage: any, publicKey: any): Promise<any> => {
    try {
      // 1. Create message to sign
      const message = JSON.stringify({
        action: 'login',
        exp: Date.now() + 1000 * 60 * 5,
      });
      
      // 2. Sign the message
      const messageBytes = new TextEncoder().encode(message);
      const signature = await signMessage(messageBytes);
      
      // 3. Encode using bs58 to match backend
      const encodedMessage = bs58.encode(messageBytes);
      const encodedSignature = bs58.encode(signature);

      // 4. Make API call
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/login`, { publicKey }, {
        headers: {
          'Authorization': `Bearer ${publicKey}.${encodedMessage}.${encodedSignature}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to login');
      }
      throw error;
    }
  },

  getUserInfo: async (publicKey: string): Promise<any> => {
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/user/${publicKey}`);
        
        if (response.status === 200) {
            return response.data.user;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || 'Failed to get user info');
        }
        throw error;
    }
  }
};