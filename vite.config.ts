import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import rsc from "@vitejs/plugin-rsc";

export default defineConfig({
    resolve: {
        tsconfigPaths: true,
    },
    server: {
        port: 3000,
    },
    plugins: [
        tailwindcss(),
        tanstackStart({
            srcDirectory: "src",
            rsc: {
                enabled: true,
            },
        }),
        rsc(),
        viteReact(),
        nitro(),
    ],
});
