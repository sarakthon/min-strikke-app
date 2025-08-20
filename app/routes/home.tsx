import { PageWrapper } from "~/components/PageWrapper";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Sara sin strikkeapp" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <PageWrapper><h1>Hello, world!</h1></PageWrapper>;
}
