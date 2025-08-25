import { PageWrapper } from "~/components/PageWrapper";
import type { Route } from "./+types/recipes";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { recipesTable } from '~/db/schema';
import { Link } from "react-router";


export async function loader() {
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
        <h1>Her kommer det oppskrifter snart..</h1>
        {loaderData.recipes.map((recipe, _index) => {
            return <div key={recipe.id} className="p-4 rounded bg-amber-100">
                <img src={recipe.image_url} />
                <h3 className="font-bold text-2xl">{recipe.title}</h3>
                <p>{recipe.intro}</p>
                <Link to={`/recipes/${recipe.id}`}>Read more...</Link>
            </div>
        })}
    </PageWrapper>;
}
