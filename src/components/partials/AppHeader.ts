import { Component, html } from '@dannyxcii/modula';

export default class AppHeader extends Component
{
    protected async fetchData(): Promise<HeaderData>
    {
        return Promise.resolve({
            appName: 'My Modula App',
        });
    }

    template(): HTMLElement
    {
        return html`
            <header>
                <h1>${this.data.appName}</h1>
            </header>
        `;
    }
}

interface HeaderData
{
    appName: string;
}