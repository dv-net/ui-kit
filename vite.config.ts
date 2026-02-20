import vue from "@vitejs/plugin-vue";
import { glob } from "glob";
import { fileURLToPath } from "node:url";
import { extname, relative, resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgLoader from "vite-svg-loader";

export default defineConfig(({ mode }) => {
  const isDemo = mode === "demo";

  return {
    server: {
      port: 5823
    },
    plugins: [
      vue(),
      dts({
        include: ["./src/lib"],
        tsconfigPath: "./tsconfig-build.json",
        entryRoot: "./src/lib"
      }),
      svgLoader({
        svgoConfig: {
          multipass: true,
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false
                }
              }
            },
            "prefixIds"
          ]
        }
      })
    ],
    build: isDemo
      ? {}
      : {
          copyPublicDir: false,
          rollupOptions: {
            external: ["vue", "vue-router"],
            input: Object.fromEntries(
              glob
                .sync("./src/lib/**/*.{ts,vue}", { ignore: ["./src/lib/**/*.d.ts"] })
                .map((file) => [
                  relative("./src/lib", file.slice(0, file.length - extname(file).length)),
                  fileURLToPath(new URL(file, import.meta.url))
                ])
            ),
            output: {
              assetFileNames: "[name][extname]",
              entryFileNames: "[name].js",

              chunkFileNames: (chunkInfo) => {
                let name = "[name]";

                if (chunkInfo.name?.match(/\s/)?.[0]) {
                  name = chunkInfo.name.replace(/\s/gim, "");
                }

                return `assets/${name}.[hash].js`;
              }
            }
          },
          lib: {
            entry: resolve(__dirname, "./src/lib/index.ts"),
            formats: ["es"],
            cssFileName: "style"
          }
        },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    }
  };
});
