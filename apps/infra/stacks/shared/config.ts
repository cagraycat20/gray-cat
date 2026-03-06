import { GcEnvironment } from 'stacks/shared/environments';

export const GC_CONFIG = {
  ENVIRONMENT: process.env.GC_ENVIRONMENT as GcEnvironment,
  DOMAIN_NAME: process.env.GC_DOMAIN_NAME || '',

  MEDIA_BUCKET_NAME: process.env.GC_MEDIA_BUCKET_NAME || '',
  USER_CONTENT_BUCKET_NAME: process.env.GC_USER_CONTENT_BUCKET_NAME || '',
  ASSETS_BUCKET_NAME: process.env.GC_ASSETS_BUCKET_NAME || '',
} as const;
