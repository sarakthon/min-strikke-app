import { eq } from "drizzle-orm";
import { Form, redirect } from "react-router";
import type { Route } from "./+types/edit_project";
import { PageWrapper } from "~/components/PageWrapper";
import { recipesTable } from "~/db/schema";
import { createRequestContext } from "~/lib/context.server";

// Handles GET requests
export function loader() {}

// Handles POST requests
export async function action({ request }: Route.ActionArgs) {
  // Extract form-data from request:
  const formData = await request.formData();
  const id = formData.get("id");
  const title = formData.get("title");
  const intro = formData.get("intro");
  const image_url = formData.get("image_url");

  const ctx = await createRequestContext(request);

  const updatedRecipe = await ctx.db
    .update(recipesTable)
    .set({
      title: title as string,
      intro: intro as string,
      image_url: image_url as string,
    })
    .where(eq(recipesTable.id, Number(id)))
    .returning();

  console.log("Oppskrift oppdatert: ", updatedRecipe);

  return redirect("/recipes");
}

export default function Edit_ProjectPage() {
  return (
    <PageWrapper>
      <section className="p-4">
        <h1>Her kan du redigere en eksisterende oppskrift.</h1>
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

function StyledInput({
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={`border-[1px] border-b-gray-500 rounded-sm px-2 ${className}`}
      {...props}
    />
  );
}

function StyledButton({
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`bg-green-300 rounded-sm px-2 py-1 ${className}`}
      {...props}
    />
  );
}
