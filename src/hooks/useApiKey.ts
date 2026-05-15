"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "netsec_ai_api_key";
const PROVIDER_KEY = "netsec_ai_provider";

export type AiProvider = "anthropic" | "openai" | "none";

export interface ApiKeyState {
  key: string;
  provider: AiProvider;
  loaded: boolean;
}

export function detectProvider(key: string): AiProvider {
  if (!key.trim()) return "none";
  if (key.startsWith("sk-ant-")) return "anthropic";
  if (key.startsWith("sk-")) return "openai";
  return "none";
}

export function useApiKey() {
  const [state, setState] = useState<ApiKeyState>({
    key: "",
    provider: "none",
    loaded: false,
  });

  useEffect(() => {
    const key = localStorage.getItem(STORAGE_KEY) ?? "";
    const provider = (localStorage.getItem(PROVIDER_KEY) as AiProvider) ?? detectProvider(key);
    setState({ key, provider, loaded: true });
  }, []);

  const saveKey = useCallback((key: string) => {
    const provider = detectProvider(key);
    localStorage.setItem(STORAGE_KEY, key);
    localStorage.setItem(PROVIDER_KEY, provider);
    setState({ key, provider, loaded: true });
  }, []);

  const clearKey = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROVIDER_KEY);
    setState({ key: "", provider: "none", loaded: true });
  }, []);

  return { ...state, saveKey, clearKey };
}

// Read API key directly from localStorage (usable outside React hooks)
export function getStoredApiKey(): { key: string; provider: AiProvider } {
  if (typeof window === "undefined") return { key: "", provider: "none" };
  const key = localStorage.getItem(STORAGE_KEY) ?? "";
  const provider = (localStorage.getItem(PROVIDER_KEY) as AiProvider) ?? detectProvider(key);
  return { key, provider };
}
