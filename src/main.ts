import Fastify from 'fastify';
import eventBusPlugin from './infrastructure/http/plugins/eventBusPlugin.js';
import { connectMongo } from './infrastructure/persistence/mongo.js';

const app = Fastify({ logger: true })

await app.register(eventBusPlugin)

await connectMongo(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/notify-hub')

app.get('/health', async () => {
    return { status: 'ok' }
})

await app.listen({ port: Number(process.env.PORT ?? 3000) })