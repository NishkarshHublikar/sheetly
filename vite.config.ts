import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  //--- TanStack‑Start integration -------------------------------------------------
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR wrapper)
    server: { entry: "server" },
  },

  //--- Nitro preset for Vercel ---------------------------------------------------
  nitro: {
    preset: "vercel",
  },

  // DELETE the manual build and viteStaticCopy plugin blocks entirely!
  // TanStack Start handles this under the hood.
});