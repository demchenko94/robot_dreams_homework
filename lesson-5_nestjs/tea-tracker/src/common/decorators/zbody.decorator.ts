import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';

/**
 * Custom decorator for validating request body using Zod schema.
 *
 * @param schema - Zod-схема for validation.
 */
export const ZBody = (schema: z.ZodSchema) =>
  createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ body: unknown }>();
    const body = request.body;

    try {
      const result: unknown = await schema.parseAsync(body);
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        }));

        throw new BadRequestException({
          message: 'Validation failed',
          errors: formattedErrors,
        });
      }
      throw error;
    }
  })();
