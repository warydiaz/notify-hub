import type { FastifyInstance } from 'fastify';
import { MongoUserRepository } from '../../persistence/user/mongoUserRepository.js';

export async function subscriptionRoutes(fastify: FastifyInstance) {
  const userRepo = new MongoUserRepository();

  fastify.get('/subscriptions', async (request, reply) => {
    const user = await userRepo.findById(request.userId);
    if (!user) return reply.status(404).send({ message: 'Usuario no encontrado' });
    return reply.send({ channels: user.channels });
  });

  fastify.post('/subscriptions/:channel', async (request, reply) => {
    const { channel } = request.params as { channel: 'email' | 'ws' };

    if (!['email', 'ws'].includes(channel)) {
      return reply.status(400).send({ message: 'Canal inválido' });
    }

    const user = await userRepo.findById(request.userId);
    if (!user) return reply.status(404).send({ message: 'Usuario no encontrado' });

    if (user.channels.includes(channel)) {
      return reply.send({ channels: user.channels });
    }

    const updated = await userRepo.updateChannels(request.userId, [...user.channels, channel]);

    fastify.eventBus.publish('user.subscribed', {
      userId: request.userId,
      channel,
    });

    return reply.status(201).send({ channels: updated.channels });
  });

  fastify.delete('/subscriptions/:channel', async (request, reply) => {
    const { channel } = request.params as { channel: 'email' | 'ws' };

    const user = await userRepo.findById(request.userId);
    if (!user) return reply.status(404).send({ message: 'Usuario no encontrado' });

    const updated = await userRepo.updateChannels(
      request.userId,
      user.channels.filter((c) => c !== channel),
    );

    fastify.eventBus.publish('user.unsubscribed', {
      userId: request.userId,
      channel,
    });

    return reply.status(200).send({ channels: updated.channels });
  });
}
