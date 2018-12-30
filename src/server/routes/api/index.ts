import * as Router from 'koa-router';
import { AppConfig } from '../../config';

export const createApiRoutes = ({ appConfig }: { appConfig: AppConfig }) => {
  const api = new Router({
    prefix: '/api/v1',
  });

  api.get('/config', async (ctx) => {
    return (ctx.body = {
      app: appConfig,
    });
  });

  return api;
};
