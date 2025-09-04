import { FilePlusIcon } from "@radix-ui/react-icons";
import { Link, redirect } from "react-router";
import type { Route } from "./+types/recipes";
import { PageWrapper } from "~/components/PageWrapper";
import { StyledButton } from "~/components/StyledButton";
import { createRequestContext } from "~/lib/context.server";
import { getRecipes } from "~/lib/recipesController";

export async function loader({ request }: Route.LoaderArgs) {
  const ctx = await createRequestContext(request);
  if (ctx.session !== ctx.appSecrets.SESSION_SECRET) {
    return redirect("/login");
  }

  const recipes = await getRecipes(ctx);

  return {
    recipes,
  };
}

export default function RecipePage({ loaderData }: Route.ComponentProps) {
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold mt-12 mb-4 mx-4">Oppskrifter</h1>

      <Link to="/new_recipe" className="inline-block mt-4 mb-4 mx-4">
        <StyledButton className="flex items-center gap-2">
          <FilePlusIcon className="size-5" color="#444444" /> Ny oppskrift
        </StyledButton>
      </Link>
      <div className="grid grid-cols-2 mx-2 sm:grid-cols-2 lg:grid-cols-3">
        {loaderData.recipes.map((recipe) => {
          return (
            <Link
              key={recipe.id}
              to={`/recipes/${recipe.id}`}
              className="relative m-1 aspect-square rounded-2xl overflow-clip"
            >
              <img
                src={recipe.image_url}
                className="aspect-square object-center object-cover brightness-75 transition-all hover:scale-110"
              />
              <div className="absolute text-white bottom-4 left-4 right-4">
                <h2 className="font-semibold text-xl leading-4 mb-1.5">
                  {recipe.title}
                </h2>
                <p className="text-md leading-4">
                  {recipe.designer ?? "Ukjent designer"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </PageWrapper>
  );
}
