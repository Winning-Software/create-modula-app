import { Component, html } from '@dannyxcii/modula';

export default class AppFooter extends Component
{
    protected fetchData(): Promise<FooterData>
    {
        return Promise.resolve({
            appName: 'My Modula Application'
        });
    }

    template(): HTMLElement
    {
        return html`
            <footer>
                <p>&copy; Copyright ${new Date().getFullYear()} ${this.data.appName}</p>
            </footer>
        `;
    }
}

interface FooterData
{
    appName: string;
}