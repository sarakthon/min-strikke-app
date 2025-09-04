import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("/recipes", "routes/recipes.tsx"),
  route("/recipes/:recipeId", "routes/recipes.recipeId.tsx"),
  route("/recipes/:recipeId/edit", "routes/recipes.recipeId.edit.tsx"),
  route("/new_recipe", "routes/new_recipe.tsx"),
  route("/projects", "routes/projects.tsx"),
  route("/profile", "routes/profile.tsx"),
  route("/edit_project", "routes/edit_project.tsx"),
] satisfies RouteConfig;
