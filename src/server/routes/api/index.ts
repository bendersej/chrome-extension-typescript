import * as Router from 'koa-router';
import { AppConfig } from '../../config';
import { Context } from 'koa';

export const createApiRoutes = ({ appConfig }: { appConfig: AppConfig }) => {
  const api = new Router({
    prefix: '/api/v1',
  });

  api.get('/config', async (ctx: Context) => {
    return (ctx.body = {
      app: appConfig,
    });
  });

  return api;
};
