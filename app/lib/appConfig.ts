import z, { type ZodError } from "zod";

const appConfigSchema = z.object({});
export type AppConfig = z.infer<typeof appConfigSchema>;

const appSecretsSchema = z.object({
  SESSION_SECRET: z.string(),
  USERNAME: z.string(),
  PASSWORD: z.string(),
});
export type AppSecrets = z.infer<typeof appSecretsSchema>;

export function getAppConfig() {
  try {
    const config = appConfigSchema.parse(process.env);
    return config;
  } catch (error) {
    throw new Error(
      `Required environment variables not set correctly: ${(
        error as ZodError
      ).issues
        .map((i) => `${i.path} (${i.message})`)
        .join(", ")}`
    );
  }
}

export function getAppSecrets() {
  try {
    const config = appSecretsSchema.parse(process.env);
    return config;
  } catch (error) {
    throw new Error(
      `Required environment variables not set correctly: ${(
        error as ZodError
      ).issues
        .map((i) => `${i.path} (${i.message})`)
        .join(", ")}`
    );
  }
}
