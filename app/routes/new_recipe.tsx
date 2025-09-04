import { Form, redirect } from "react-router";
import type { Route } from "./+types/new_recipe";
import { PageWrapper } from "~/components/PageWrapper";
import { StyledButton } from "~/components/StyledButton";
import { StyledInput } from "~/components/StyledInput";
import { createRequestContext } from "~/lib/context.server";
import { createRecipe } from "~/lib/recipesController";

// Handles GET requests
export function loader() {}

// Handles POST requests
export async function action({ request }: Route.ActionArgs) {
  // Extract form-data from request:
  const formData = await request.formData();
  const title = formData.get("title");
  const intro = formData.get("intro");
  const image_url = formData.get("image_url");

  const ctx = await createRequestContext(request);
  const newRecipe = await createRecipe(
    {
      title: title as string,
      intro: intro as string,
      image_url: image_url as string,
    },
    ctx
  );

  return redirect(`/recipes/${newRecipe.id}`);
}

export default function NewRecipePage() {
  return (
    <PageWrapper>
      <section className="p-4">
        <h1>Her kan du opprette nye oppskrift.</h1>
        <Form method="POST" className="flex flex-col max-w-[300px] gap-2">
          <StyledInput name="title" placeholder="Tittel" />
          <StyledInput name="intro" placeholder="Intro" />
          <StyledInput name="image_url" placeholder="Bilde URL" />
          <StyledButton>Lagre</StyledButton>
        </Form>
      </section>
    </PageWrapper>
  );
}
