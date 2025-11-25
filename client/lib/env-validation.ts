import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url().optional(),
  VITE_USE_FALLBACK: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  MODE: z.enum(["development", "production", "test"]),
});

export const env = envSchema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_USE_FALLBACK: import.meta.env.VITE_USE_FALLBACK,
  MODE: import.meta.env.MODE,
});

export const isDevelopment = env.MODE === "development";
export const isProduction = env.MODE === "production";

// Logger conditionnel
export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  warn: (...args: any[]) => {
    console.warn(...args);
  },
  error: (...args: any[]) => {
    console.error(...args);
  },
};
