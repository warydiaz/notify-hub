import { plainToInstance, type ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';
import type { FastifyReply, FastifyRequest } from 'fastify';

async function runValidation<T extends object>(
  DtoClass: ClassConstructor<T>,
  data: unknown,
  reply: FastifyReply,
): Promise<T | null> {
  const dto = plainToInstance(DtoClass, data);
  const errors = await validate(dto);
  if (errors.length > 0) {
    reply.status(400).send({ errors: errors.map((e) => e.constraints) });
    return null;
  }
  return dto;
}

export function validateBody<T extends object>(DtoClass: ClassConstructor<T>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const dto = await runValidation(DtoClass, request.body, reply);
    if (dto) request.body = dto;
  };
}

export function validateQuery<T extends object>(DtoClass: ClassConstructor<T>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const dto = await runValidation(DtoClass, request.query, reply);
    if (dto) request.query = dto as Record<string, unknown>;
  };
}
