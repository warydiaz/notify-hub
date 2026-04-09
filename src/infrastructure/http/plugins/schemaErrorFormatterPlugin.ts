import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';

export default fp(async (fastify: FastifyInstance) => {
  fastify.setSchemaErrorFormatter((errors) => {
    const error = errors[0];
    if (error.keyword === 'enum' && error.params?.allowedValues) {
      const field = error.instancePath.replace('/', '');
      return new Error(`${field} must be one of: ${(error.params.allowedValues as string[]).join(', ')}`);
    }
    return new Error(error.message ?? 'Validation error');
  });
});
