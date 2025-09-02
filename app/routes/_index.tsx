import { redirect } from "react-router";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sara sin strikkeapp" },
    { name: "description", content: "Velkommen til min strikkeapp<3" },
  ];
}

export function loader() {
  return redirect("/recipes");
}
