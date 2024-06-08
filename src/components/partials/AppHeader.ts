import { Component, html } from '@dannyxcii/modula';

export default class AppHeader extends Component
{
    protected async fetchData(): Promise<IAppHeaderData>
    {
        const globals = await import('../../../config/globals').then(data => data.globals);
        await import('../../styles/components/AppHeader.scss');

        return Promise.resolve({
            appName: globals.appName
        });
    }

    protected template(): HTMLElement
    {
        return html`
            <header>
                <h1>${this.data?.appName ?? ''}</h1>
            </header>
        `;
    }
}

interface IAppHeaderData
{
    appName: string;
}