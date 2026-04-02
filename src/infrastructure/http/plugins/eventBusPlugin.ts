import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { TypedEventBus } from '../../events/typedEventBus.js'

declare module 'fastify' {
    interface FastifyInstance {
        eventBus: TypedEventBus
    }
}

async function eventBusPlugin(fastify: FastifyInstance) {
    const eventBus = new TypedEventBus()
    fastify.decorate('eventBus', eventBus)
}

export default fp(eventBusPlugin, { name: 'eventBus' })