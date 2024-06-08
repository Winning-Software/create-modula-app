import { IComponentDefinition } from '@dannyxcii/modula';
import AppHeader from '../src/components/partials/AppHeader';
import AppTemplate from '../src/components/AppTemplate';
import HomePage from '../src/components/pages/HomePage';

const components: IComponentDefinition[] = [
    {
        tag: 'app-template',
        component: AppTemplate
    },
    {
        tag: 'app-header',
        component: AppHeader
    },
    {
        tag: 'home-page',
        component: HomePage
    },
];

export default components;