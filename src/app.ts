import components from '../config/components';
import { Modula } from '@dannyxcii/modula';
import routes from '../config/routes';

const app: Modula = new Modula({
    routes: routes,
    components: components,
});