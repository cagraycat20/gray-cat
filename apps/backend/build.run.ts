import * as esBuild from 'esbuild';
import { readFileSync, statSync } from 'fs';
import path from 'path';

const externalsDepsToExclude = [
  // Knex drivers
  'better-sqlite3',
  'mysql2',
  'pg-query-stream',
  'tedious',
  'mysql',
  'sqlite3',
  'oracledb',
  // aws-sdk is already included in the lambda environment
  'aws-sdk',
];

const LAMBDAS = {
  USER_SETTINGS_LAMBDA: 'user-settings-lambda',
  PRODUCTS_LAMBDA: 'products-lambda',
  IMAGE_SEARCH_LAMBDA: 'image-search-lambda',
  DAYS_LAMBDA: 'days-lambda',
} as const;

const LAMBDA_BUILDERS = Object.fromEntries(
  Object.values(LAMBDAS).map((key) => [key, buildDefaultLambda]),
);

async function buildDefaultLambda(lambdaName: string): Promise<void> {
  await esBuild.build({
    entryPoints: [path.join(__dirname, `./src/${lambdaName}.ts`)],
    platform: 'node',
    bundle: true,
    external: getExternalModules(),
    minify: true,
    outfile: outFile(lambdaName),
  });

  printResults(lambdaName);
}

// Cache to avoid subsequent package.json reads
let externalModulesCache: string[] = [];

/**
 * @returns Dependencies to exclude from the build including devDependencies.
 */
function getExternalModules(): string[] {
  if (externalModulesCache.length) {
    return externalModulesCache;
  }

  const packageJsonPath = path.join(__dirname, '../../package.json');
  const rawPackageJson = readFileSync(packageJsonPath).toString();
  const packageJson = JSON.parse(rawPackageJson);
  const devDependencies = packageJson.devDependencies || {};
  externalModulesCache = [...externalsDepsToExclude, ...Object.keys(devDependencies)];

  return externalModulesCache;
}

function printResults(lambdaName: string): void {
  const stats = statSync(outFile(lambdaName));
  const bytesInMb = 1024 * 1024;
  const sizeInMb = (stats.size / bytesInMb).toFixed(3);

  console.log('✅ Finished building', lambdaName, `(${sizeInMb}MB)`);
}

function outFile(lambdaName: string): string {
  return path.join(__dirname, `./build/${lambdaName}/${lambdaName}.js`);
}

async function run(): Promise<void> {
  const start = performance.now();
  console.log('🚀 Building lambdas');

  const lambdaNames = Object.values(LAMBDAS);
  const lambdaCount = lambdaNames.length;

  const BATCH_SIZE = 5;
  let batch: string[] = [];
  while (lambdaNames.length) {
    batch.push(...lambdaNames.splice(0, BATCH_SIZE));
    await Promise.all(batch.map((func) => LAMBDA_BUILDERS[func](func)));
    batch = [];
  }

  const timeInSeconds = ((performance.now() - start) / 1000).toFixed(3);
  console.log(`✅ Finished building ${lambdaCount} lambdas (${timeInSeconds}s)`);
}

run();
