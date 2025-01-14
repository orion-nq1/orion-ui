import axios from 'axios';
import { VersionedTransaction, Connection } from '@solana/web3.js';


interface SubscriptionResponse {
  success: boolean;
  amount: number;
  solAmount?: number;
  merchantWallet: string;
  reference: string;
  referralApplied: boolean;
  transaction: string;
}

interface StatusResponse {
  success: boolean;
  isActive: boolean;
  status: 'INACTIVE' | 'ACTIVE' | 'EXPIRED';
  expiresAt: Date;
  paymentHistory: any[];
}

export const subscriptionApi = {
  // Create payment intent
  createIntent: async (
    signMessage: any,
    publicKey: string,
    referralCode?: string,
    payWithSol = false
  ): Promise<SubscriptionResponse> => {
    try {
      const response = await axios.post(
        `${process.env.VUE_APP_API_URL}/subscription/intent`,
        { referralCode, payWithSol, walletAddress: publicKey },
      );
      
      // Clear referral code from localStorage after successful API call
      localStorage.removeItem('referralCode');
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to create payment intent');
      }
      throw error;
    }
  },

  sendTransaction: async (
    serializedTransaction: string,
    walletAddress: string,
    sendTransaction: any,
    connection: Connection
  ): Promise<{ success: boolean; message: string; txid: string }> => {
    try {
      const recoveredTransaction = VersionedTransaction.deserialize(
        Buffer.from(serializedTransaction, 'base64')
      );
      const txid = await sendTransaction(
        recoveredTransaction, 
        connection, 
        { skipPreflight: true, commitment: 'confirmed' },
      );

      await connection.confirmTransaction(txid, 'confirmed');
      console.log('Transaction sent successfully', txid);
      return { success: true, message: 'Transaction sent successfully', txid: txid };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to send transaction');
      }
      throw error;
    }
  },

  // Verify payment
  verifyPayment: async (
    signature: string,
    walletAddress: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      // 4. Make API call
      const response = await axios.post(
        `${process.env.VUE_APP_API_URL}/subscription/verify`,
        { signature, walletAddress }
      );
    
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to verify payment');
      }
      throw error;
    }
  },

  // Get subscription status
  getStatus: async (publicKey: string): Promise<StatusResponse> => {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_API_URL}/subscription/status/${publicKey}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to get subscription status');
      }
      throw error;
    }
  },
};