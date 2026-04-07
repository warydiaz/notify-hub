import Fastify from 'fastify';
import eventBusPlugin from './infrastructure/http/plugins/eventBusPlugin.js';
import jwtPlugin from './infrastructure/http/plugins/jwtPlugin.js';
import { authRoutes } from './infrastructure/http/routes/auth.routes.js';
import { connectMongo } from './infrastructure/persistence/mongo.js';
import envPlugin from './infrastructure/config/envPlugin.js';

const app = Fastify({ logger: true });

await app.register(envPlugin);
await app.register(eventBusPlugin);
await app.register(jwtPlugin);

await connectMongo(app.config.MONGODB_URI);

app.get('/health', async () => {
  return { status: 'ok' };
});

await app.register(authRoutes);

await app.listen({ port: app.config.PORT });
