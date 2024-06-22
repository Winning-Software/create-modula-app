import { html, PageComponent } from '@dannyxcii/modula';

export default class HomePage extends PageComponent
{
    protected async fetchData(): Promise<any>
    {
        await import('../../styles/components/HomePage.scss');
    }

    protected template(): HTMLElement
    {
        return html`
            <p>Welcome to your new Modula application.</p>
            <p>
                <a href="https://modulajs.com" target="_blank">
                    View the Documentation
                </a>
            </p>
        `;
    }
}