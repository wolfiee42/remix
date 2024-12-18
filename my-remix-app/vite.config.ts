import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { flatRoutes } from "remix-flat-routes";
import { json } from "react-router";
declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      // #1 routing system.
      // ignoredRouteFiles: ['**/*'],
      // 	routes: async (defineRoutes) => {
      // 		return flatRoutes('routes', defineRoutes, {
      // 			ignoredRouteFiles: [
      // 				'.*',
      // 				'**/*.css',
      // 				'**/*.test.{js,jsx,ts,tsx}',
      // 				'**/__*.*',
      // 			],
      // 		})
      // 	},

      // #2 routing system
      ignoredRouteFiles: ['**/*'],
      routes: manaRoutes,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,

      },
    }),
    tsconfigPaths(),
  ],
});


async function manaRoutes(defineRoutes) {

  let routes = flatRoutes("routes", defineRoutes)

  routes = {
    ...routes,
    "routes/carrot_+/_index": {
      id: "routes/carrot_+/_index",
      parentId: "root",
      file: "routes/carrot_+/_index.tsx",
    },
  }

  return routes
}