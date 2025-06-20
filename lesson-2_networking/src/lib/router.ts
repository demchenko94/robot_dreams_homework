import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { RouteEntry } from '../types/router-entry';
import { MethodHandler } from '../types/method-handler';

export const loadRoutes = async (dir: string, basePath = ''): Promise<RouteEntry[]> => {
  const routeTable: RouteEntry[] = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      const childRoutes = await loadRoutes(fullPath, join(basePath, entry));
      routeTable.push(...childRoutes);
    } else if (/\.(ts|js)$/.test(entry)) {
      const route = join(basePath, entry.replace(/.(ts|js)$/, ''))
        .replace(/\\/g, '/')
        .replace(/\/route$/, '')
        .replace(/\[([^\]]+)\]/g, ':$1');

      const module = await import(fullPath);
      routeTable.push({ route, handler: module.default || module });
    }
  }

  return routeTable;
};

export const matchRoute = (
  path: string,
  method: string,
  routes: RouteEntry[]
): { handler: MethodHandler[string]; params: Record<string, string> } | null => {
  for (const { route, handler } of routes) {
    const paramNames: string[] = [];

    const regexString =
      '^/' +
      route.replace(/\/$/, '').replace(/:([^/]+)/g, (_, name) => {
        paramNames.push(name);
        return '([^/]+)';
      }) +
      '$';

    const regex = new RegExp(regexString);
    const match = path.match(regex);

    if (match && typeof handler[method] === 'function') {
      const params: Record<string, string> = {};
      paramNames.forEach((name, i) => {
        params[name] = match[i + 1];
      });

      return { handler: handler[method], params };
    }
  }

  return null;
};
