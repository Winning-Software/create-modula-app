import { IRoute } from '@dannyxcii/modula';
import HomePage from '../src/components/pages/HomePage';

const routes: IRoute[] = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/test',
        component: HomePage
    },
];

export default routes;