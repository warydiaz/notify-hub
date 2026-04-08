import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import type { EventBus } from '../../../domain/events/eventBus.js'
import { TypedEventBus } from '../../events/typedEventBus.js'

declare module 'fastify' {
    interface FastifyInstance {
        eventBus: EventBus
    }
}

async function eventBusPlugin(fastify: FastifyInstance) {
    const eventBus = new TypedEventBus()
    fastify.decorate('eventBus', eventBus)
}

export default fp(eventBusPlugin, { name: 'eventBus' })