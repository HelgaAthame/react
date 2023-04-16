// vite.config.ts
import { defineConfig } from "file:///C:/react/first/helgaathame-JSFE2022Q3/react.component/node_modules/vite/dist/node/index.js";
import svgr from "file:///C:/react/first/helgaathame-JSFE2022Q3/react.component/node_modules/vite-plugin-svgr/dist/index.mjs";
import react from "file:///C:/react/first/helgaathame-JSFE2022Q3/react.component/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "C:\\react\\first\\helgaathame-JSFE2022Q3\\react.component";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  server: {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxyZWFjdFxcXFxmaXJzdFxcXFxoZWxnYWF0aGFtZS1KU0ZFMjAyMlEzXFxcXHJlYWN0LmNvbXBvbmVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxccmVhY3RcXFxcZmlyc3RcXFxcaGVsZ2FhdGhhbWUtSlNGRTIwMjJRM1xcXFxyZWFjdC5jb21wb25lbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3JlYWN0L2ZpcnN0L2hlbGdhYXRoYW1lLUpTRkUyMDIyUTMvcmVhY3QuY29tcG9uZW50L3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIHN2Z3IoKVxyXG4gIF0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiA1MDAwLFxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0BzcmMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgdGVzdDoge1xyXG4gICAgZ2xvYmFsczogdHJ1ZSxcclxuICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXHJcbiAgICBjb3ZlcmFnZToge1xyXG4gICAgICBwcm92aWRlcjogJ2lzdGFuYnVsJyxcclxuICAgIH1cclxuICB9LFxyXG4gIG9wdGltaXplRGVwczogeyBpbmNsdWRlOiBbJ3JlYWN0L2pzeC1kZXYtcnVudGltZSddIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG1pbmlmeTogZmFsc2UsXHJcbiAgfSxcclxuICBlbnZEaXI6ICcuLycsXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFVBQVU7QUFDakIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUp4QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsRUFDUDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFFBQVEsUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDbEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWMsRUFBRSxTQUFTLENBQUMsdUJBQXVCLEVBQUU7QUFBQSxFQUNuRCxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsUUFBUTtBQUNWLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
