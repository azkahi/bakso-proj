import { initServer, startServer } from './src/infrastructure/webserver/express';

import { createRouter } from './src/interfaces/routes/routes';

const router = createRouter();

const app = initServer(router);

startServer(app);