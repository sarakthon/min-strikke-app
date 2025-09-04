import { ArrowLeftIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Link } from "react-router";
import type { Route } from "./+types/recipes.recipeId";
import { PageWrapper } from "~/components/PageWrapper";
import { StyledButton } from "~/components/StyledButton";
import { createRequestContext } from "~/lib/context.server";
import { getRecipe } from "~/lib/recipesController";

export async function loader({ params, request }: Route.LoaderArgs) {
  const id = Number(params.recipeId);
  if (!id) {
    throw new Response("Ugyldig oppskrifts-ID", { status: 400 });
  }
  const ctx = await createRequestContext(request);
  const recipe = await getRecipe(id, ctx);
  if (!recipe) {
    throw new Response("Oppskriften finnes ikke", { status: 404 });
  }
  return { recipe };
}

export default function RecipeContentPage({
  loaderData,
}: Route.ComponentProps) {
  const { recipe } = loaderData;

  return (
    <PageWrapper>
      <div className="mx-auto max-w-4xl px-5 py-2">
        <Link to="/recipes" className={`flex gap-1 items-center text-sm`}>
          <ArrowLeftIcon className="size-5" />
          Tilbake
        </Link>
        <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
          <div>
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="w-full rounded-2xl object-cover shadow"
            />
          </div>

          <aside className="space-y-4">
            <h1 className="text-3xl font-bold">{recipe.title}</h1>
            <p className="text-gray-600">
              {recipe.designer ?? "Ukjent designer"}
            </p>
            {recipe.intro ? (
              <p className="text-base leading-relaxed">{recipe.intro}</p>
            ) : null}
            <Link to={`/recipes/${recipe.id}/edit`}>
              <StyledButton className="flex items-center gap-2">
                <Pencil2Icon className="size-5" /> Rediger oppskrift
              </StyledButton>
            </Link>
          </aside>
        </div>
      </div>
    </PageWrapper>
  );
}
