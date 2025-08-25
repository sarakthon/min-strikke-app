import { Link } from "react-router";

export function PageWrapper({ children }: { children: React.ReactNode }) {
    return <body className="max-w-[900px] mx-auto">
        <nav>
            <ul className="flex gap-4 py-2 bg-amber-100 px-4 rounded-2xl mt-2">
                <li><Link to="/">Hjem</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/recipes">Oppskrifter</Link></li>
                <li><Link to="/projects">Prosjekter</Link></li>
            </ul>
        </nav>
        {children}

    </body>
}
