// @ts-check
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";
import node from '@astrojs/node';
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://hamaynk.netlify.app/",
  base: "/",
  output: "static",
  integrations: [],
  vite: {
    ssr: {
        external: ['@supabase/supabase-js'],
    },
      plugins: [
          tailwindcss(),
          Icons({
              compiler: "astro",
          }),
      ],
},
  adapter: netlify({
  // Ensure dynamic routes are supported
}),});
