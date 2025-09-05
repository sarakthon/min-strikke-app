import { Form, redirect, useActionData } from "react-router";
import type { Route } from "./+types/login";
import { StyledButton } from "~/components/StyledButton";
import { StyledInput } from "~/components/StyledInput";
import { createRequestContext } from "~/lib/context.server";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const ctx = await createRequestContext(request);

  if (
    username === ctx.appSecrets.USERNAME &&
    password === ctx.appSecrets.PASSWORD
  ) {
    return redirect("/recipes", {
      headers: {
        "Set-Cookie": `session=${ctx.appSecrets.SESSION_SECRET}; HttpOnly; Path=/`,
      },
    });
  } else {
    return { success: false, error: "Invalid credentials" };
  }
}

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  return (
    <section className="max-w-lg mx-auto px-4 pt-24">
      <Form method="POST" className="flex flex-col gap-4">
        <h1 className="text-3xl font-medium">Logg inn</h1>
        <h2 className="text-lg mb-6">Min strikkeapp</h2>
        <StyledInput name="username" label="Brukernavn" />
        <StyledInput name="password" label="Passord" />
        <StyledButton type="submit" className="mt-4">
          Login
        </StyledButton>
        {actionData?.error && (
          <p className="text-red-500 mt-2">{actionData.error}</p>
        )}
      </Form>
    </section>
  );
}
