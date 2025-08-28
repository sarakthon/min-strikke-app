import { PageWrapper } from "~/components/PageWrapper";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Sara sin strikkeapp" },
    { name: "description", content: "Velkommen til min strikkeapp<3" },
  ];
}

export default function Home() {
  return <PageWrapper><h1>Hello, world!</h1></PageWrapper>;
}
