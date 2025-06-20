import { IncomingMessage, ServerResponse } from 'node:http';

export type RouteEntry = {
  route: string;
  handler: Record<
    string,
    (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => void
  >;
};
