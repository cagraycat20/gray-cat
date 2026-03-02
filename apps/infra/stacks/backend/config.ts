import { GcEnvironment } from 'stacks/shared/environments';
import { validateConfig } from 'stacks/shared/validate-config';

export const BACKEND_CONFIG = {
  ENVIRONMENT: process.env.GC_ENVIRONMENT as GcEnvironment,
  DOMAIN_NAME: process.env.GC_DOMAIN_NAME,
} as const;

validateConfig(BACKEND_CONFIG);
