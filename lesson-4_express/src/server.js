import http from 'node:http';
import {createApp} from './app.js';
import {config} from './config/index.js';
import {makeUpperCase} from "./utils/make-capital.js";
import {container} from "./container.js";

const app = createApp();
const server = http.createServer(app);

server.listen(config.port, () =>
    console.log(`🚀 ${makeUpperCase(config.env)} API ready on http://localhost:${config.port}`)
);

async function shutDown() {
    console.log('🔄  Shutting down gracefully...');
    server.close(() => {
        console.log('✅  Closed out remaining connections');
    });

    try {
        // Dispose DI container
        await container.dispose();
        console.log('Container disposed');
    } catch (err) {
        console.error('Error disposing container', err);
    }

    setTimeout(() => process.exit(1), 10_000).unref();
    process.exit(0);
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
