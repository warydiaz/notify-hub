import type { FastifyInstance } from 'fastify';
import { MongoUserRepository } from '../../persistence/user/mongoUserRepository.js';
import { GetSubscriptionsUseCase } from '../../../application/subscription/getSubscriptionsUseCase.js';
import { SubscribeChannelUseCase } from '../../../application/subscription/subscribeChannelUseCase.js';
import { UnsubscribeChannelUseCase } from '../../../application/subscription/unsubscribeChannelUseCase.js';
import {
  getSubscriptionsSchema,
  subscribeChannelSchema,
  unsubscribeChannelSchema,
} from '../schemas/subscription.schemas.js';

export async function subscriptionRoutes(fastify: FastifyInstance) {
  const userRepo = new MongoUserRepository();
  const getSubscriptions = new GetSubscriptionsUseCase(userRepo);
  const subscribeChannel = new SubscribeChannelUseCase(userRepo, fastify.eventBus);
  const unsubscribeChannel = new UnsubscribeChannelUseCase(userRepo, fastify.eventBus);

  fastify.get('/subscriptions', { schema: getSubscriptionsSchema }, async (request, reply) => {
    try {
      const channels = await getSubscriptions.execute(request.userId);
      return reply.send({ channels });
    } catch {
      return reply.status(404).send({ message: 'Usuario no encontrado' });
    }
  });

  fastify.post(
    '/subscriptions/:channel',
    { schema: subscribeChannelSchema },
    async (request, reply) => {
      const { channel } = request.params as { channel: 'email' | 'ws' };
      try {
        const channels = await subscribeChannel.execute(request.userId, channel);
        return reply.status(201).send({ channels });
      } catch {
        return reply.status(404).send({ message: 'Usuario no encontrado' });
      }
    },
  );

  fastify.delete(
    '/subscriptions/:channel',
    { schema: unsubscribeChannelSchema },
    async (request, reply) => {
      const { channel } = request.params as { channel: 'email' | 'ws' };
      try {
        const channels = await unsubscribeChannel.execute(request.userId, channel);
        return reply.status(200).send({ channels });
      } catch {
        return reply.status(404).send({ message: 'Usuario no encontrado' });
      }
    },
  );
}
