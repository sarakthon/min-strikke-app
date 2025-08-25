import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("/about", "routes/about.tsx"), route("/recipes", "routes/recipes.tsx"), route("/projects", "routes/projects.tsx")] satisfies RouteConfig;
