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

  //--- Vite-specific build options (wrapped under "vite") -----------------------
  vite: {
    build: {
      outDir: ".vercel/output/static",
      emptyOutDir: true,
      rollupOptions: {
        input: "index.html",
      },
    },
  },

  // No plugins needed – TanStack Start handles copying if required
});