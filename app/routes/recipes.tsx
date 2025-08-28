import { PageWrapper } from "~/components/PageWrapper";
import type { Route } from "./+types/recipes";
import { drizzle } from 'drizzle-orm/node-postgres';
import { recipesTable } from '~/db/schema';
import { Link } from "react-router";


export async function loader({ params }: Route.LoaderArgs) {
    // Connect to SQL server
    const db = drizzle(process.env.DATABASE_URL!);

    // Fetch recipes from SQL server
    const recipes = await db.select().from(recipesTable);

    // Return recipes to frontend
    return {
        recipes
    }
}

export default function RecipePage({
    loaderData,
}: Route.ComponentProps) {
    return <PageWrapper>
        <h1>Her er en oversikt over oppskrifter jeg har laget og har lyst til å lage i framtiden.</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {loaderData.recipes.map((recipe, _index) => {
                return <div key={recipe.id} className="p-4 rounded bg-amber-100">
                    <img src={recipe.image_url} className="size-65" />
                    <h3 className="font-bold text-2xl">{recipe.title}</h3>
                    <p>{recipe.intro}</p>
                    <Link to={`/recipes/${recipe.id}`}>Read more...</Link>
                </div>
            })}
        </div>
    </PageWrapper>;
}
