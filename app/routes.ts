import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("/about", "routes/about.tsx"), route("/recipes", "routes/recipes.tsx"), route("/projects", "routes/projects.tsx"), route("/new_project", "routes/new_project.tsx"), route("/delete_project", "routes/delete_project.tsx")] satisfies RouteConfig;
