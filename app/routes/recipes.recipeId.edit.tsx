import { Form, Link, redirect } from "react-router";
import type { Route } from "./+types/recipes.recipeId.edit";
import { PageWrapper } from "~/components/PageWrapper";
import { StyledButton } from "~/components/StyledButton";
import { StyledInput } from "~/components/StyledInput";
import { createRequestContext } from "~/lib/context.server";
import { getRecipe, updateRecipe } from "~/lib/recipesController";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

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

export async function action({ params, request }: Route.ActionArgs) {
  const id = Number(params.recipeId);
  if (!id) {
    throw new Response("Ugyldig oppskrifts-ID", { status: 400 });
  }
  const formData = await request.formData();
  const title = formData.get("title") ?? undefined;
  const intro = formData.get("intro") ?? undefined;
  const image_url = formData.get("image_url") ?? undefined;
  const designer = formData.get("designer") ?? undefined;
  const recommended_needle_size =
    formData.get("recommended_needle_size") ?? undefined;
  const yarn = formData.get("yarn") ?? undefined;
  const gauge = formData.get("gauge") ?? undefined;

  const ctx = await createRequestContext(request);
  await updateRecipe(
    id,
    {
      title: title as string | undefined,
      intro: intro as string | undefined,
      image_url: image_url as string | undefined,
      designer: designer as string | undefined,
      recommended_needle_size: recommended_needle_size as string | undefined,
      yarn: yarn as string | undefined,
      gauge: gauge as string | undefined,
    },
    ctx
  );

  return redirect(`/recipes/${id}`);
}

export default function EditRecipePage({ loaderData }: Route.ComponentProps) {
  const { recipe } = loaderData;
  return (
    <PageWrapper>
      <section className="max-w-md mx-auto">
        <Link
          to={`/recipes/${recipe.id}`}
          className={`flex gap-1 items-center text-sm`}
        >
          <ArrowLeftIcon className="size-5" />
          Tilbake
        </Link>
        <h1 className="text-4xl font-bold mt-12 mb-4 mx-4">
          Rediger oppskrift
        </h1>
        <Form method="POST" className="flex flex-col gap-4">
          <StyledInput
            name="image_url"
            defaultValue={recipe.image_url}
            label="Bilde URL"
            className="mx-4"
          />
          <StyledInput
            name="title"
            defaultValue={recipe.title}
            label="Tittel"
            className="mx-4"
          />
          <StyledInput
            name="designer"
            defaultValue={recipe.designer ?? ""}
            label="Designer"
            className="mx-4"
          />
          <StyledInput
            name="intro"
            defaultValue={recipe.intro}
            label="Intro"
            className="mx-4"
          />
          <StyledInput
            name="recommended_needle_size"
            defaultValue={recipe.recommended_needle_size ?? ""}
            label="Anbefalt pinnestørrelse"
            className="mx-4"
          />
          <StyledInput
            name="yarn"
            defaultValue={recipe.yarn ?? ""}
            label="Garn"
            className="mx-4"
          />
          <StyledInput
            name="gauge"
            defaultValue={recipe.gauge ?? ""}
            label="Strikkefasthet"
            className="mx-4"
          />
          <StyledButton type="submit" className="mx-4 mt-4">
            Lagre endringer
          </StyledButton>
        </Form>
      </section>
    </PageWrapper>
  );
}
