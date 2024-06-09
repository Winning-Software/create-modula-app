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
            <div>
                <p>Welcome to your new <span class="italic-bold">Modula</span> application.</p>
            </div>
        `;
    }
}