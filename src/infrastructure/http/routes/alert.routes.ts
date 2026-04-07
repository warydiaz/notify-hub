import type { FastifyInstance } from 'fastify';
import { CreateAlertUseCase } from '../../../application/alert/createAlertUseCase.js';
import { GetAlertsUseCase } from '../../../application/alert/getAlertsUseCase.js';
import { GetAlertByIdUseCase } from '../../../application/alert/getAlertByIdUseCase.js';
import { ResolveAlertUseCase } from '../../../application/alert/resolveAlertUseCase.js';
import { DeleteAlertUseCase } from '../../../application/alert/deleteAlertUseCase.js';
import { MongoAlertRepository } from '../../persistence/alert/mongoAlertRepository.js';

export async function alertRoutes(fastify: FastifyInstance) {
  const alertRepo = new MongoAlertRepository();

  const createAlertUseCase = new CreateAlertUseCase(alertRepo, fastify.eventBus);
  const getAlertsUseCase = new GetAlertsUseCase(alertRepo);
  const getAlertByIdUseCase = new GetAlertByIdUseCase(alertRepo);
  const resolveAlertUseCase = new ResolveAlertUseCase(alertRepo, fastify.eventBus);
  const deleteAlertUseCase = new DeleteAlertUseCase(alertRepo);

  fastify.post('/alerts', async (request, reply) => {
    const { title, message, severity } = request.body as {
      title: string;
      message: string;
      severity: 'low' | 'medium' | 'high';
    };
    const alert = await createAlertUseCase.execute({
      title,
      message,
      severity,
      userId: request.userId,
    });
    return reply.status(201).send(alert);
  });

  fastify.get('/alerts', async (request, reply) => {
    const { severity, resolved, page, limit } = request.query as {
      severity?: 'low' | 'medium' | 'high';
      resolved?: string;
      page?: string;
      limit?: string;
    };
    const result = await getAlertsUseCase.execute(
      {
        severity,
        resolved: resolved !== undefined ? resolved === 'true' : undefined,
      },
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
    );
    return reply.send(result);
  });

  fastify.get('/alerts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const alert = await getAlertByIdUseCase.execute(id);
    return reply.send(alert);
  });

  fastify.patch('/alerts/:id/resolve', async (request, reply) => {
    const { id } = request.params as { id: string };
    const alert = await resolveAlertUseCase.execute(id, request.userId);
    return reply.send(alert);
  });

  fastify.delete('/alerts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await deleteAlertUseCase.execute(id, request.userId);
    return reply.status(204).send();
  });
}
