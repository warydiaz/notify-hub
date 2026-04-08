import type { FastifyInstance } from 'fastify';
import { MongoStatsRepository } from '../../persistence/stats/mongoStatsRepository.js';
import { GetAlertsBySeverityUseCase } from '../../../application/stats/getAlertsBySeverityUseCase.js';
import { GetNotificationRateUseCase } from '../../../application/stats/getNotificationRateUseCase.js';
import { GetResolutionTimeUseCase } from '../../../application/stats/getResolutionTimeUseCase.js';
import { GetTopActiveUsersUseCase } from '../../../application/stats/getTopActiveUsersUseCase.js';
import {
  alertsBySeveritySchema,
  notificationRateSchema,
  resolutionTimeSchema,
  topActiveUsersSchema,
} from '../schemas/stats.schemas.js';

export async function statsRoutes(fastify: FastifyInstance) {
  const statsRepo = new MongoStatsRepository();
  const getAlertsBySeverity = new GetAlertsBySeverityUseCase(statsRepo);
  const getNotificationRate = new GetNotificationRateUseCase(statsRepo);
  const getResolutionTime = new GetResolutionTimeUseCase(statsRepo);
  const getTopActiveUsers = new GetTopActiveUsersUseCase(statsRepo);

  fastify.get(
    '/stats/alerts/by-severity',
    { schema: alertsBySeveritySchema },
    async (_request, reply) => {
      const result = await getAlertsBySeverity.execute();
      return reply.send(result);
    },
  );

  fastify.get(
    '/stats/notifications/rate',
    { schema: notificationRateSchema },
    async (_request, reply) => {
      const result = await getNotificationRate.execute();
      return reply.send(result);
    },
  );

  fastify.get(
    '/stats/alerts/resolution-time',
    { schema: resolutionTimeSchema },
    async (_request, reply) => {
      const result = await getResolutionTime.execute();
      return reply.send(result);
    },
  );

  fastify.get(
    '/stats/users/top-active',
    { schema: topActiveUsersSchema },
    async (_request, reply) => {
      const result = await getTopActiveUsers.execute();
      return reply.send(result);
    },
  );
}
