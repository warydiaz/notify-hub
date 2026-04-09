import type { FastifyInstance } from 'fastify';
import { validateBody, validateQuery } from '../middlewares/validateDto.js';
import { CreateAlertUseCase } from '../../../application/alert/createAlertUseCase.js';
import { GetAlertsUseCase } from '../../../application/alert/getAlertsUseCase.js';
import { GetAlertByIdUseCase } from '../../../application/alert/getAlertByIdUseCase.js';
import { ResolveAlertUseCase } from '../../../application/alert/resolveAlertUseCase.js';
import { DeleteAlertUseCase } from '../../../application/alert/deleteAlertUseCase.js';
import { MongoAlertRepository } from '../../persistence/alert/mongoAlertRepository.js';
import {
  createAlertSchema,
  getAlertsSchema,
  getAlertByIdSchema,
  resolveAlertSchema,
  deleteAlertSchema,
} from '../schemas/alert.schemas.js';
import { CreateAlertDto } from './dto/alerts/create-alert.dto.js';
import { FiltersGetAlertsDto } from './dto/alerts/filters-get-alerts.dto.js';
import { AlertByIdDto } from './dto/alerts/alert-by-id.dto.js';

export async function alertRoutes(fastify: FastifyInstance) {
  const alertRepo = new MongoAlertRepository();

  const createAlertUseCase = new CreateAlertUseCase(alertRepo, fastify.eventBus);
  const getAlertsUseCase = new GetAlertsUseCase(alertRepo);
  const getAlertByIdUseCase = new GetAlertByIdUseCase(alertRepo);
  const resolveAlertUseCase = new ResolveAlertUseCase(alertRepo, fastify.eventBus);
  const deleteAlertUseCase = new DeleteAlertUseCase(alertRepo);

  fastify.post(
    '/alerts',
    { schema: createAlertSchema, preHandler: validateBody(CreateAlertDto) },
    async (request, reply) => {
      const { title, message, severity } = request.body as CreateAlertDto;
      const alert = await createAlertUseCase.execute({
        title,
        message,
        severity,
        userId: request.userId,
      });
      return reply.status(201).send(alert);
    },
  );

  fastify.get(
    '/alerts',
    { schema: getAlertsSchema, preHandler: validateQuery(FiltersGetAlertsDto) },
    async (request, reply) => {
      const filters = request.query as FiltersGetAlertsDto;
      const result = await getAlertsUseCase.execute(
        {
          severity: filters.severity,
          resolved: filters.resolved,
        },
        filters.page,
        filters.limit,
      );
      return reply.send(result);
    },
  );

  fastify.get(
    '/alerts/:id',
    { schema: getAlertByIdSchema, preHandler: validateQuery(AlertByIdDto) },
    async (request, reply) => {
      const alertDto = request.params as AlertByIdDto;
      const alert = await getAlertByIdUseCase.execute(alertDto.id);
      return reply.send(alert);
    },
  );

  fastify.patch(
    '/alerts/:id/resolve',
    { schema: resolveAlertSchema, preHandler: validateQuery(AlertByIdDto) },
    async (request, reply) => {
      const alertDto = request.params as AlertByIdDto;
      const alert = await resolveAlertUseCase.execute(alertDto.id, request.userId);
      return reply.send(alert);
    },
  );

  fastify.delete(
    '/alerts/:id',
    { schema: deleteAlertSchema, preHandler: validateQuery(AlertByIdDto) },
    async (request, reply) => {
      const alertDto = request.params as AlertByIdDto;
      await deleteAlertUseCase.execute(alertDto.id, request.userId);
      return reply.status(204).send();
    },
  );
}
