import createRouter from "router5";
import browserPlugin from "router5-plugin-browser";

import routes from "router/routes";

const configureRouter = () => {
  const router = createRouter(routes, {
    defaultRoute: "root"
  });

  router.usePlugin(browserPlugin());

  return router;
};

export default configureRouter;
