import { PORT, APP_CONFIG, STATIC_FOLDER } from './config';
import * as koa from 'koa';
import * as serve from 'koa-static';
import * as bodyParser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as logger from 'koa-logger';

import { createApiRoutes } from './routes';

const server = new koa();
const api = createApiRoutes({ appConfig: APP_CONFIG });

server.use(helmet());
server.use(bodyParser());
server.use(logger());
server.use(serve(STATIC_FOLDER));

server.use(api.routes());

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
