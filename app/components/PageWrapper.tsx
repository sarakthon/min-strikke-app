import { Link } from "react-router";

export function PageWrapper({ children }: { children: React.ReactNode }) {
    return <main className="max-w-[900px] mx-auto">
        <ul className="flex gap-4 py-2 bg-amber-100 px-4 rounded-2xl mt-2">
            <li><Link to="/">Hjem</Link></li>
            <li><Link to="/about">Om prosjektet</Link></li>
            <li><Link to="/recipes">Oppskrifter</Link></li>
            <li><Link to="/projects">Prosjekter</Link></li>
            <li><Link to="/new_project">Ny oppskrift</Link></li>
            <li><Link to="/delete_project">Slett oppskrift</Link></li>
        </ul>
        {children}
    </main>
}
