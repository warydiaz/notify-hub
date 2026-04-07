import Fastify from 'fastify'
import eventBusPlugin from './infrastructure/http/plugins/eventBusPlugin.js'
import jwtPlugin from './infrastructure/http/plugins/jwtPlugin.js'
import authMiddleware from './infrastructure/http/plugins/authMiddleware.js'
import { authRoutes } from './infrastructure/http/routes/auth.routes.js'
import { alertRoutes } from './infrastructure/http/routes/alert.routes.js'
import { connectMongo } from './infrastructure/persistence/mongo.js'
import { LoggerSubscriber } from './infrastructure/events/subscribers/loggerSubscriber.js'
import envPlugin from './infrastructure/config/envPlugin.js'

const app = Fastify({ logger: true })

await app.register(envPlugin)
await app.register(eventBusPlugin)
await app.register(jwtPlugin)
await app.register(authMiddleware)

await connectMongo(app.config.MONGODB_URI)

// Subscribers
new LoggerSubscriber(app.eventBus).register()

app.get('/health', { config: { public: true } }, async () => {
  return { status: 'ok' }
})

await app.register(authRoutes)
await app.register(alertRoutes)

await app.listen({ port: app.config.PORT })