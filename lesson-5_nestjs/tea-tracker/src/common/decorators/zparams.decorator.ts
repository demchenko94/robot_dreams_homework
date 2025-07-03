import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';

export const ZParam = (schema: z.ZodSchema) =>
  createParamDecorator(
    async (data: unknown, ctx: ExecutionContext): Promise<unknown> => {
      const request = ctx.switchToHttp().getRequest<{ params: unknown }>();
      const params: unknown = request.params;

      try {
        const result: unknown = await schema.parseAsync(params);
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
    },
  )();
