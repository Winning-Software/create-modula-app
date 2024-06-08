import { Component, html } from '@dannyxcii/modula';

export default class AppTemplate extends Component
{
    protected async fetchData(): Promise<any>
    {
        await import('../styles/app.scss');
    }

    protected template(): HTMLElement
    {
        return html`
            <main>
                <app-header></app-header>
                <slot></slot>
            </main>
        `;
    }
}