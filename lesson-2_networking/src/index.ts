import http from 'node:http';
import config from './config';
import { loadRoutes, matchRoute } from './lib/router';
import path from 'node:path';
import { parse } from 'node:url';
import { RouteEntry } from './types/router-entry';

const dirRoutes = path.join(__dirname, './routes');

let routeTable: RouteEntry[] = [];

const startServer = async () => {
  routeTable = await loadRoutes(dirRoutes);

  const server = http.createServer(async (req, res) => {
    const pathname = parse(req.url || '', true).pathname;
    const method = req.method;

    const route = matchRoute(pathname as string, method as string, routeTable);

    if (route) {
      route.handler(req, res, route.params);
    } else {
      res.writeHead(405);
      res.end('Not Found');
    }
  });

  server.listen(config.PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${config.PORT}`);
  });
};

startServer();
