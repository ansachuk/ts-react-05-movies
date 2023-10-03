import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	base: "/ts-react-05-movies",
	plugins: [react()],
});
