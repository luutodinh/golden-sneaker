import config from '../config';
import * as Pages from '../pages';

const publicRoutes = [{ path: config.routes.Home, component: Pages.Home }];

export { publicRoutes };
