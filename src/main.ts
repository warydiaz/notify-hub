import Fastify from 'fastify';
import envPlugin from './infrastructure/http/plugins/envPlugin.js';
import eventBusPlugin from './infrastructure/http/plugins/eventBusPlugin.js';
import { connectMongo } from './infrastructure/persistence/mongo.js';

const app = Fastify({ logger: true });

await app.register(envPlugin);
await app.register(eventBusPlugin);

await connectMongo(app.config.MONGODB_URI);

app.get('/health', async () => {
  return { status: 'ok' };
});

await app.listen({ port: app.config.PORT });
