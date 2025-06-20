import { IncomingMessage } from 'node:http';

export const bodyJSON = <T>(req: IncomingMessage): Promise<T> => {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => (raw += chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw || '{}'));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
  });
};
