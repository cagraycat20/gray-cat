import { GcEnvironment } from 'stacks/shared/environments';

export const GC_CONFIG = {
  ENVIRONMENT: process.env.GC_ENVIRONMENT as GcEnvironment,
  DOMAIN_NAME: process.env.GC_DOMAIN_NAME || '',

  MEDIA_BUCKET_NAME: process.env.GC_MEDIA_BUCKET_NAME || '',
  USER_CONTENT_BUCKET_NAME: process.env.GC_USER_CONTENT_BUCKET_NAME || '',
  ASSETS_BUCKET_NAME: process.env.GC_ASSETS_BUCKET_NAME || '',

  PRODUCTS_TABLE_NAME: process.env.GC_PRODUCTS_TABLE_NAME || '',
  DAYS_TABLE_NAME: process.env.GC_DAYS_TABLE_NAME || '',
  USERS_TABLE_NAME: process.env.GC_USERS_TABLE_NAME || '',
  SYSTEM_TABLE_NAME: process.env.GC_SYSTEM_TABLE_NAME || '',
} as const;
