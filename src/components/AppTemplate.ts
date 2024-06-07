import { Component, html } from '@dannyxcii/modula';

export default class AppTemplate extends Component
{
    template(): HTMLElement
    {
        return html`
            <app-header></app-header>
            <main>
                <slot></slot>
            </main>
            <app-footer></app-footer>
        `;
    }
}