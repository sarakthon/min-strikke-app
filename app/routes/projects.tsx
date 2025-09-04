import { RocketIcon } from "@radix-ui/react-icons";
import { PageWrapper } from "~/components/PageWrapper";

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <section className="max-w-sm mx-auto flex flex-col items-center gap-8 mt-24">
        <RocketIcon className="size-24" />
        <p>Her har jeg ikke fått gjort noe ennå</p>
        <p>Big plans! Stay tuned!</p>
      </section>
    </PageWrapper>
  );
}
