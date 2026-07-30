// @ts-check
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";
import node from '@astrojs/node';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://hamaynk.github.io",
	base: "/hamaynk",
	output: 'static',
	integrations: [],
	vite: {
		plugins: [
			tailwindcss(),
			Icons({
				compiler: "astro",
			}),
		],
	},
});
