"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/lib/supabaseClient";

type CreditContextType = {
  credits: number;
  isLoading: boolean;
  getUserCredits: () => Promise<number>;
  hasEnoughCredits: (requiredCredits?: number) => boolean;
  refreshCredits: () => Promise<void>;
};

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export function CreditProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user credits when user changes
  useEffect(() => {
    if (user) {
      refreshCredits();
    } else {
      setCredits(0);
      setIsLoading(false);
    }
  }, [user]);

  const refreshCredits = async () => {
    setIsLoading(true);
    try {
      // No user_id filter needed, RLS handles it
      const { data, error } = await supabase
        .from("credits")
        .select("amount")
        .single();

      if (error) {
        console.error("Error fetching user credits:", error);
        throw error;
      }

      setCredits(data?.amount || 0);
    } catch (err) {
      console.error("Failed to fetch credits:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserCredits = async (): Promise<number> => {
    await refreshCredits();
    return credits;
  };

  const hasEnoughCredits = (requiredCredits: number = 2): boolean => {
    return credits >= requiredCredits;
  };

  const value = {
    credits,
    isLoading,
    getUserCredits,
    hasEnoughCredits,
    refreshCredits,
  };

  return (
    <CreditContext.Provider value={value}>{children}</CreditContext.Provider>
  );
}

export const useCredits = () => {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error("useCredits must be used within a CreditProvider");
  }
  return context;
};

// Example function to fetch transaction history (if needed)
export const fetchCreditTransactions = async () => {
  const { data, error } = await supabase
    .from("credit_transactions")
    .select("*")
    .order("created_at", { ascending: false }); // No user_id filter, RLS handles this
  return { data, error };
};
