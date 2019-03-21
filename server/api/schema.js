
import { join, relative } from 'path';
import consola from 'consola';
import { walkSync } from 'walk';

export const loadSchema = (schemaDir) => {
  consola.info(`[graphql] - start loading schemas from < ${schemaDir} >.`);
  let typeDefs = [];
  let resolverDefs = {};
  walkSync(schemaDir, {
    followLinks: false,
    listeners: {
      file: (root, fileStats, next) => {
        const filepath = join(root, fileStats.name);
        const { resolvers, types } = require(filepath);
        resolverDefs = Object.assign(resolverDefs, resolvers);
        if (types instanceof Array) {
          typeDefs = [...typeDefs, ...types];
        } else {
          typeDefs.push(types);
        }
        consola.success(`[graphql] - load schema < ${relative(schemaDir, filepath)} >...`);
        next();
      },
      errors: (root, nodeStatsArray, next) => {
        for (const n of nodeStatsArray) {
          consola.error(`[graphql] - error while loading schemas < ${root}->${n.name} >.`);
        }
        next();
      },
      end: () => {
        consola.success('[graphql] - all schemas loaded.');
      }
    }
  });
  return { typeDefs, resolverDefs };
};
