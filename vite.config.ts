import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";



export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      react(),
      checker({ typescript: true })
    ],

    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"  // Using the modern Sass API
        }
      }
    },

    build: {
      outDir: "./dist",
      minify: "terser",
      cssMinify: true,
      terserOptions: {
        mangle: true,
        compress: true,
        module: true,
        keep_classnames: false,
        keep_fnames: true,
        format: {
          comments: false
        }
      },

      rollupOptions: {
        output: {
          minifyInternalExports: true,
          inlineDynamicImports: false,
          assetFileNames: "vendor/e/[hash].[ext]",
          entryFileNames: "vendor/h/[hash].js",

          chunkFileNames: ({ exports: data = [], name }) => {
            if (Array.isArray(data) && data.length) {
              return "vendor/" + data
                .slice(0, 8)
                .join("")
                .toLowerCase()
                + "/[hash].js";
            }
            else {
              return "vendor/" + (name?.[3] || "$") + "/[hash].js";
            }
          },

          manualChunks: id => {
            if (id?.includes("node_modules")) {
              const moduleName = id
                .split("node_modules/")[1]
                ?.split("/")[0];

              return moduleName;
            }
            else {
              return null;
            }
          }
        }
      }
    }
  };
});