import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Form, Link, redirect } from "react-router";
import type { Route } from "./+types/recipes.recipeId.edit";
import { PageWrapper } from "~/components/PageWrapper";
import { StyledButton } from "~/components/StyledButton";
import { StyledInput } from "~/components/StyledInput";
import { createRequestContext } from "~/lib/context.server";
import { createRecipe } from "~/lib/recipesController";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const image_url = formData.get("image_url");
  const designer = formData.get("designer");

  const ctx = await createRequestContext(request);
  const result = await createRecipe(
    {
      title: title as string,
      image_url: image_url as string,
      designer: designer as string,
      intro: "",
    },
    ctx
  );

  return redirect(`/recipes/${result.id}`);
}

export default function EditRecipePage() {
  return (
    <PageWrapper>
      <section className="max-w-md mx-auto">
        <Link to={`/recipes`} className={`flex gap-1 items-center text-sm`}>
          <ArrowLeftIcon className="size-5" />
          Tilbake
        </Link>
        <h1 className="text-4xl font-bold mt-12 mb-4 mx-4">Ny oppskrift</h1>
        <Form method="POST" className="flex flex-col gap-4">
          <StyledInput name="image_url" label="Bilde URL" className="mx-4" />
          <StyledInput name="title" label="Tittel" className="mx-4" />
          <StyledInput name="designer" label="Designer" className="mx-4" />
          <StyledButton type="submit" className="mx-4 mt-4">
            Lagre endringer
          </StyledButton>
        </Form>
      </section>
    </PageWrapper>
  );
}
