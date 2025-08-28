
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