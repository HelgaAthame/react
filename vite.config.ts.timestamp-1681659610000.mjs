// vite.config.ts
import { defineConfig } from "file:///C:/react/first/helgaathame-JSFE2022Q3/node_modules/vite/dist/node/index.js";
import svgr from "file:///C:/react/first/helgaathame-JSFE2022Q3/node_modules/vite-plugin-svgr/dist/index.mjs";
import react from "file:///C:/react/first/helgaathame-JSFE2022Q3/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import istanbul from "file:///C:/react/first/helgaathame-JSFE2022Q3/node_modules/vite-plugin-istanbul/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\react\\first\\helgaathame-JSFE2022Q3";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    svgr(),
    istanbul({
      cypress: true,
      requireEnv: false
    })
  ],
  server: {
    host: true,
    port: 5e3
  },
  resolve: {
    alias: {
      "@src": resolve(__vite_injected_original_dirname, "src")
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "istanbul"
    }
  },
  optimizeDeps: { include: ["react/jsx-dev-runtime"] },
  build: {
    minify: false
  },
  envDir: "./"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxyZWFjdFxcXFxmaXJzdFxcXFxoZWxnYWF0aGFtZS1KU0ZFMjAyMlEzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxyZWFjdFxcXFxmaXJzdFxcXFxoZWxnYWF0aGFtZS1KU0ZFMjAyMlEzXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9yZWFjdC9maXJzdC9oZWxnYWF0aGFtZS1KU0ZFMjAyMlEzL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3ZncidcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCBpc3RhbmJ1bCBmcm9tIFwidml0ZS1wbHVnaW4taXN0YW5idWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIHN2Z3IoKSxcclxuICAgIGlzdGFuYnVsKHtcclxuICAgICAgY3lwcmVzczogdHJ1ZSxcclxuICAgICAgcmVxdWlyZUVudjogZmFsc2UsXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogdHJ1ZSxcclxuICAgIHBvcnQ6IDUwMDAsXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQHNyYyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXHJcbiAgICB9XHJcbiAgfSxcclxuICB0ZXN0OiB7XHJcbiAgICBnbG9iYWxzOiB0cnVlLFxyXG4gICAgZW52aXJvbm1lbnQ6IFwianNkb21cIixcclxuICAgIGNvdmVyYWdlOiB7XHJcbiAgICAgIHByb3ZpZGVyOiAnaXN0YW5idWwnLFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7IGluY2x1ZGU6IFsncmVhY3QvanN4LWRldi1ydW50aW1lJ10gfSxcclxuICBidWlsZDoge1xyXG4gICAgbWluaWZ5OiBmYWxzZSxcclxuICB9LFxyXG4gIGVudkRpcjogJy4vJyxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sY0FBYztBQUxyQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxZQUFZO0FBQUEsSUFDZCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFFBQVEsUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDbEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWMsRUFBRSxTQUFTLENBQUMsdUJBQXVCLEVBQUU7QUFBQSxFQUNuRCxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsUUFBUTtBQUNWLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
