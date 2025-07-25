import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  documents: 'src/**/*.ts',
  generates: {
    'src/shared/api/graphql/gql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        documentMode: 'documentNode',
        useTypeImports: true,
      },
    },
  }
};

export default config;
