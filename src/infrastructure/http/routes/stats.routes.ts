import type { FastifyInstance } from 'fastify';
import { MongoStatsRepository } from '../../persistence/stats/mongoStatsRepository.js';
import {
  alertsBySeveritySchema,
  notificationRateSchema,
  resolutionTimeSchema,
  topActiveUsersSchema,
} from '../schemas/stats.schemas.js';

export async function statsRoutes(fastify: FastifyInstance) {
  const statsRepo = new MongoStatsRepository();

  fastify.get(
    '/stats/alerts/by-severity',
    { schema: alertsBySeveritySchema },
    async (_request, reply) => {
      const result = await statsRepo.alertsBySeverity();
      return reply.send(result);
    },
  );

  fastify.get(
    '/stats/notifications/rate',
    { schema: notificationRateSchema },
    async (_request, reply) => {
      const result = await statsRepo.notificationSuccessRate();
      return reply.send(result);
    },
  );

  fastify.get(
    '/stats/alerts/resolution-time',
    { schema: resolutionTimeSchema },
    async (_request, reply) => {
      const result = await statsRepo.avgResolutionTimePerSeverity();
      return reply.send(result);
    },
  );

  fastify.get(
    '/stats/users/top-active',
    { schema: topActiveUsersSchema },
    async (_request, reply) => {
      const result = await statsRepo.topActiveUsers();
      return reply.send(result);
    },
  );
}
