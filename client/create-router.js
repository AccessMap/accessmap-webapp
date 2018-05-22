import createRouter from 'router5';
import browserPlugin from 'router5/plugins/browser';

import routes from 'routes';

const configureRouter = () => {
  const router = createRouter(routes, { defaultRoute: 'index' })
    .usePlugin(browserPlugin());

  return router;
};

export default configureRouter;
