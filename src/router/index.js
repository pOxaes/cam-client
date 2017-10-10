import Vue from 'vue';
import _ from 'lodash';
import Router from 'vue-router';
import routes from '@/api/constants/routes.constant';

Vue.use(Router);

const formatRoutes = dirtyRoutes => _.values(dirtyRoutes)
  .map(({ path, name, component, children }) => ({
    path,
    name,
    children: children ? formatRoutes(children) : undefined,
    component: require(`@/components/${component}`), // eslint-disable-line
  }));

export default new Router({
  routes: formatRoutes(routes),
});
