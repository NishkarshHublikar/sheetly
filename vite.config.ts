import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  //--- TanStack‑Start integration -------------------------------------------------
  tanstackStart: {
    server: { entry: "server" },
  },

  //--- Nitro preset for Vercel ---------------------------------------------------
  nitro: {
    preset: "vercel",
  },

  //--- Vite options (Nitro will handle the static output) -----------------------
  vite: {
    // Add other Vite options here if needed (e.g., plugins, alias, etc.)
  },

  // No plugins needed – TanStack Start handles copying if required
});