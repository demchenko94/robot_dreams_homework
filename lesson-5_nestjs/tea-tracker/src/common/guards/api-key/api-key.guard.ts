import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly apiKeyValue = 'im_rd_student';

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ headers: string[] }>();
    const apiKey: unknown = request.headers['x-api-key'];

    if (apiKey && apiKey === this.apiKeyValue) {
      return true;
    }

    throw new ForbiddenException('Invalid or missing API key');
  }
}
