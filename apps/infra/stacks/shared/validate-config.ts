export function validateConfig(config: Record<string, any>) {
  const missingVars = Object.entries(config).reduce((result, [key, value]) => {
    if (!value) {
      result.push(key);
    }
    return result;
  }, [] as string[]);

  if (missingVars.length) {
    throw new Error(`👉 The next environment variables are missing: ${missingVars.join(', ')}\n`);
  }
}
