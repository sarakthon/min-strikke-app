import { Form, redirect } from "react-router";
import { PageWrapper } from "~/components/PageWrapper";
import type { Route } from "./+types/new_project";
import { drizzle } from "drizzle-orm/node-postgres";
import { recipesTable } from '~/db/schema';
import { eq } from "drizzle-orm";

// Handles GET requests
export function loader() {

}

// Handles POST requests
export async function action({
    request,
}: Route.ActionArgs) {
    // Extract form-data from request:
    const formData = await request.formData();
    const title = formData.get("title");
    const intro = formData.get("intro");
    const image_url = formData.get("image_url");

    const db = drizzle(process.env.DATABASE_URL!);

    const recipe: typeof recipesTable.$inferInsert = {
        title: title as string,
        intro: intro as string,
        image_url: image_url as string
    };

    // Insert recipe into database:
    const deleteRecipe = await db.delete(recipesTable).where(eq(recipesTable.title, recipe.title));

    console.log("Oppskrift slettet!");

    return redirect("/recipes")
}


export default function New_ProjectPage() {
    return <PageWrapper>
        <section className="p-4">
            <h1>Her kan du slette en oppskrift - foreløpig kun på tittel (ikke lurt i lengden)</h1>
            <Form method="POST" className="flex flex-col max-w-[300px] gap-2">
                <StyledInput name="title" placeholder="Tittel" />
                <StyledButton>Slett</StyledButton>
            </Form>
        </section>
    </PageWrapper>;
}

function StyledInput({ className = '', ...props }: React.ComponentPropsWithoutRef<"input">) {
    return <input className={`border-[1px] border-b-gray-500 rounded-sm px-2 ${className}`} {...props} />
}

function StyledButton({ className = '', ...props }: React.ComponentPropsWithoutRef<"button">) {
    return <button className={`bg-green-300 rounded-sm px-2 py-1 ${className}`} {...props} />
}