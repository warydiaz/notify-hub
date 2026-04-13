import 'reflect-metadata';
import Fastify from 'fastify';
import eventBusPlugin from './infrastructure/http/plugins/eventBusPlugin.js';
import jwtPlugin from './infrastructure/http/plugins/jwtPlugin.js';
import authMiddleware from './infrastructure/http/plugins/authMiddleware.js';
import swaggerPlugin from './infrastructure/http/plugins/swaggerPlugin.js';
import { authRoutes } from './infrastructure/http/routes/auth.routes.js';
import { alertRoutes } from './infrastructure/http/routes/alert.routes.js';
import { createWsRoutes } from './infrastructure/http/routes/ws.routes.js';
import { subscriptionRoutes } from './infrastructure/http/routes/subscription.routes.js';
import { statsRoutes } from './infrastructure/http/routes/stats.routes.js';
import { connectMongo } from './infrastructure/persistence/mongo.js';
import { LoggerSubscriber } from './infrastructure/events/subscribers/loggerSubscriber.js';
import { EmailSubscriber } from './infrastructure/events/subscribers/emailSubscriber.js';
import { WebSocketSubscriber } from './infrastructure/events/subscribers/webSocketSubscriber.js';
import { MongoUserRepository } from './infrastructure/persistence/user/mongoUserRepository.js';
import { MongoEventLogRepository } from './infrastructure/persistence/eventLog/mongoEventLogRepository.js';
import {
  NodemailerEmailSender,
  NodemailerEmailSenderConfig,
} from './infrastructure/email/nodemailerEmailSender.js';
import { WebSocketManager } from './infrastructure/websocket/webSocketManager.js';
import envPlugin from './infrastructure/config/envPlugin.js';
import schemaErrorFormatterPlugin from './infrastructure/http/plugins/schemaErrorFormatterPlugin.js';

const app = Fastify({ logger: true });

await app.register(envPlugin);
await app.register(schemaErrorFormatterPlugin);
await app.register(swaggerPlugin);
await app.register(eventBusPlugin);
await app.register(jwtPlugin);
await app.register(authMiddleware);

await connectMongo(app.config.MONGODB_URI);

// Composition root
const userRepo = new MongoUserRepository();
const config: NodemailerEmailSenderConfig = {
  smtpHost: app.config.SMTP_HOST,
  smtpPort: app.config.SMTP_PORT,
  smtpUser: app.config.SMTP_USER,
  smtpPass: app.config.SMTP_PASS,
  emailFrom: app.config.EMAIL_FROM,
};
const emailSender = new NodemailerEmailSender(config);
const eventLogRepo = new MongoEventLogRepository();
const wsManager = new WebSocketManager();

new LoggerSubscriber(app.eventBus, eventLogRepo).register();
new EmailSubscriber(app.eventBus, userRepo, emailSender).register();
new WebSocketSubscriber(app.eventBus, userRepo, wsManager).register();

app.get('/health', { config: { public: true } }, async () => {
  return { status: 'ok' };
});

await app.register(authRoutes);
await app.register(alertRoutes);
await app.register(createWsRoutes(wsManager));
await app.register(subscriptionRoutes);
await app.register(statsRoutes);

await app.listen({ port: app.config.PORT, host: '0.0.0.0' });
