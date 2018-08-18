import createRouter from 'router5';
import browserPlugin from 'router5/plugins/browser';

import routes from 'router/routes';

const configureRouter = () => {
  const router = createRouter(routes, {
    defaultRoute: 'root',
  })
    .usePlugin(browserPlugin());

  return router;
};

export default configureRouter;
