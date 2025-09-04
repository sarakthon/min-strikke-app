import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Form, Link } from "react-router";
import type { Route } from "./+types/recipes";
import { PageWrapper } from "~/components/PageWrapper";
import { createRequestContext } from "~/lib/context.server";
import { getRecipes } from "~/lib/recipesController";

export async function loader({ request }: Route.LoaderArgs) {
  const ctx = await createRequestContext(request);
  const recipes = await getRecipes(ctx);

  return {
    recipes,
  };
}

/*
// Deletes recipe from database:
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const _action = formData.get("_action");

  const db = drizzle(process.env.DATABASE_URL!);

  try {
    if (_action === "delete") {
      const recipeId = Number(formData.get("recipeId"));
      if (!recipeId) throw new Response("Missing recipe id", { status: 400 });

      await db.delete(recipesTable).where(eq(recipesTable.id, recipeId));
    }

    if (_action === "update") {
      const id = Number(formData.get("id"));
      if (!id) throw new Response("Missing recipe id", { status: 400 });

      const title = (formData.get("title") ?? "").toString();
      const intro = (formData.get("intro") ?? "").toString();
      const image_url = (formData.get("image_url") ?? "").toString();

      await db
        .update(recipesTable)
        .set({ title, intro, image_url })
        .where(eq(recipesTable.id, id))
        .returning();
    }

    // Tilbake til samme side
    const url = new URL(request.url);
    return redirect(url.pathname);
  } catch (err) {
    console.error(err);
    // Du kan rendere en feilmelding i UI ved å returnere data i stedet om du vil
    const url = new URL(request.url);
    return redirect(url.pathname);
  }
}
*/

export default function RecipePage({ loaderData }: Route.ComponentProps) {
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold mt-12 mb-4 mx-4">Oppskrifter</h1>

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
                className="aspect-square object-center brightness-75 transition-all hover:scale-110"
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

function DeleteButton({ recipeId }: { recipeId: number }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="inline-flex h-[35px] items-center justify-center rounded bg-amber-200 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
          Slett oppskrift
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
          <AlertDialog.Title className="m-0 text-[17px] font-medium text-mauve12">
            Er du helt sikker?
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-normal text-mauve11">
            Denne handlingen kan ikke angres. Oppskriften slettes permanent.
          </AlertDialog.Description>

          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className="inline-flex h-[35px] items-center justify-center rounded bg-mauve4 px-[15px] font-medium leading-none text-mauve11 outline-none outline-offset-1 hover:bg-mauve5 focus-visible:outline-2 focus-visible:outline-mauve7 select-none">
                Avbryt
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <Form method="post" replace>
                <input type="hidden" name="recipeId" value={recipeId} />
                <button
                  type="submit"
                  className="inline-flex h-[35px] items-center justify-center rounded bg-red4 px-[15px] font-medium leading-none text-red11 outline-none outline-offset-1 hover:bg-red5 focus-visible:outline-2 focus-visible:outline-red7 select-none"
                >
                  Yes, delete recipe
                </button>
              </Form>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
