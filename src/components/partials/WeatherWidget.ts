import { Component, html } from '@dannyxcii/modula';

export default class WeatherWidget extends Component
{
    protected async fetchData(): Promise<IWeatherData>
    {
        const data = fetch('http://localhost:3001/api/get-weekly-weather-forecast')
            .then(res => {
                return res.json();
            });

        return Promise.resolve(data);
    }

    protected template(): HTMLElement
    {
        if (!this.data) {
            return html`
                <loading-spinner></loading-spinner>
            `;
        }

        let el: HTMLElement = html``;

        console.log(this.data);
        this.data.forEach((day: IWeatherDay) => {
            el.append(html`
                <div class="day">
                    <span class="day-name">${day.name}</span>
                    <span class="low">${day.low} degrees</span>
                    <span class="high">${day.high} degrees</span>
                </div>
            `);
        });

        return el;
    }
}

interface IWeatherData
{
    days: IWeatherDay[];
}

interface IWeatherDay
{
    name: string;
    high: number;
    low: number;
}