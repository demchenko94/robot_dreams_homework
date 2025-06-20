import { IncomingMessage, ServerResponse } from 'node:http';

export type MethodHandler = {
  [method: string]: (req: IncomingMessage, res: ServerResponse, params?: Record<string, string>) => void;
};
