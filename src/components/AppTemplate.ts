import { html, TemplateComponent } from '@dannyxcii/modula';

export default class AppTemplate extends TemplateComponent
{
    protected async fetchData(): Promise<any>
    {
        await import('../styles/app.scss');
    }

    protected template(): HTMLElement
    {
        return html`
            <app-header></app-header>
            <main>
                <slot></slot>
            </main>
        `;
    }
}