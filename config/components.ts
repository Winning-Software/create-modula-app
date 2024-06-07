import { IComponentDefinition } from '@dannyxcii/modula';
import HomePage from '../src/components/pages/HomePage';
import AppTemplate from '../src/components/AppTemplate';
import AppFooter from '../src/components/partials/AppFooter';
import AppHeader from '../src/components/partials/AppHeader';

const components: IComponentDefinition[] = [
    {
        tag: 'home-page',
        component: HomePage
    },
    {
        tag: 'app-template',
        component: AppTemplate
    },
    {
        tag: 'app-footer',
        component: AppFooter
    },
    {
        tag: 'app-header',
        component: AppHeader
    },
];

export default components;