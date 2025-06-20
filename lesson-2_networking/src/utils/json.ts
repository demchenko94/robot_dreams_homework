import { ServerResponse } from 'node:http';

export const json = <T>(res: ServerResponse, status: number, data?: T) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  if (data) res.end(JSON.stringify(data));
  else res.end();
};
