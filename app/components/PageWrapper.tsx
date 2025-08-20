import { Link } from "react-router";

export function PageWrapper({ children }: { children: React.ReactNode }) {
    return <body className="max-w-[900px] mx-auto">
        <nav>
            <ul className="flex gap-4 py-2 bg-amber-100 px-4 rounded-2xl mt-2">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
        {children}
        <footer>
            Hei, dette er en footer
        </footer>
    </body>
}
