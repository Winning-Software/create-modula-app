# Create Modula App

<!-- Version Badge -->
<img src="https://img.shields.io/badge/Version-0.4.0-blue" alt="Version 0.4.0">

Creates a new boilerplate application using the ModulaJS library - a component 
based front end SPA.

---

### Table of Contents

- [Installation](#installation)
- [Developer Note](#developer-note)
- [The App Instance](#the-app-instance)
- [Routing](#routing)
- [Components](#components)
    - [Page Components](#page-components)
    - [Template Components](#template-components)
    - [Partial Components](#partial-components)
- [Route Parameters](#route-parameters)
- [Component Properties (HTML Attributes)](#component-properties-html-attributes)
- [Data](#data)
- [Styling](#styling)
- [Running Your Modula App](#running-your-modula-app)
- [API Server](#api-server)

## Installation

```shell
npx @dannyxcii/create-modula-app app-name
```

This creates a new Modula project called `app-name` inside your current working 
directory.

---

### Developer Note

Modula is currently in the very early stages of development. While it can be used as
is to build functional applications, please expect possible breaking changes prior to
the 1.0.0 release.

Please report any bugs or other issues using the GitHub issues tab on this repo - thanks 
for trying out my project!

--- 

## The App Instance

Inside your `src/app.ts` file is where your app "runs" - it's intentionally simple
and shouldn't require much editing.

A new instance of `Modula` is created and inside we pass all of our applications `routes`, `components` and
a `template` component. You may wish to also define a custom component which can be passed via the `pageNotFound` 
option - pass the constructor in the same way the existing/example template is passed.

## Routing

All your applications routes can be defined inside `config/routes.ts`. All routes use the `IRoute` interface 
definition:

```typescript
interface IRoute {
    path: string;
    component: new () => Component;
}
```

Take a look at the existing home page route that has been created as an example of how to define a new static route.

You can also define dynamic routes:

```typescript
import MyComponent from '../src/components/pages/MyComponent';

const routes: IRoute[] = [
    // existing routes
    {
        path: '/user/:user/profile',
        component: MyComponent
    },
];
```

In the example above `:user` is a dynamic portion of your route. You can read about accessing dynamic route elements 
in the components section.

## Components

Components are an integral part of a Modula app and can be incredibly simple to use. There are three types of components 
that you can use.

### Page Components

First of all, *Page* components are components intended to represent a page, or entire view in our application.

> Take a look at `src/components/pages/HomePage.ts` for an example of a page component

A basic page component might look something like this:

```typescript
import { PageComponent, html } from '@dannyxcii/modula';

export default class AboutPage extends PageComponent
{
    template()
    {
        return html`
            <h1>About Page</h1>
            <p>...</p>
        `;
    }
}
```

Each component also needs to be defined before we can use it, you can do so inside `config/components.ts`:

```typescript
import AboutPage from '../src/components/pages/AboutPage';

const components: IComponentDefinition[] = [
    // existing elements
    {
        tag: 'about-page',
        component: AboutPage
    },
];
```

Finally, to define a new route that displays your component, inside `config/routes.ts`:

```typescript
import AboutPage from '../src/components/pages/AboutPage';

const routes: IRoute[] = [
    // existing routes
    {
        path: '/about',
        component: AboutPage
    },
];
```

### Template Components

Template components are components that are used to wrap your entire application - great for including
things like headers/footers or other components you may wish to display on every page.

These can be created and defined in the same way as page components, making sure to extend `TemplateComponent` instead 
of `PageComponent`.

It is important to make sure your template component renders a `<slot></slot>` tag - this is where all your pages 
will be rendered.

> If your template does not render a slot, your template will still work, however pages will be rendered
> outside your template

To make your application use your defined template, you can update the `template` option passed to `Modula`
inside `src/app.ts`:

```typescript
template: MyTemplateComponent
```

### Partial Components

Partial components are components that are intended to be used within other components. Partial components are all those
that extend `Component`. Partial components can even be used within other components:

```typescript
template()
{
    return html`
        <my-partial></my-partial>
    `;
}
```

## Route Parameters

When a component is rendered based on a dynamic route, the component is passed the dynamic elements by default.
These can be accessed with `this.params` inside your components `template` method.

```typescript
// route definition
{
    path: '/user/:user/profile',
    component: ProfilePage
}

// ProfilePage component
template()
{
    return html`
        <p>Hello, ${this.params.user}</p>
    `;
}
```

## Component Properties (HTML Attributes)

Components can use custom attributes to pass and receive data.

```typescript
template()
{
    return html`
        <profile-box userId='${this.params.user}'></profile-box>
    `;
}
```

You can then access this data inside your `ProfileBox` component:

```typescript
template()
{
    return html`
        <strong>User ID:</strong> ${this.props.userId}
    `;
}
```

You can explicitly define the interface that your components props will use:

```typescript
export default class MyComponent extends Component<IMyComponentProps>
{
    template()
    {
        return html`
            <h1>${this.props.name}</h1>
        `;
    }
}

interface IMyComponentProps
{
    name: string;
}
```

## Data

You can access other data inside any of your components by overriding the `fetchData` method. This can
be useful for fetching data from a variety of sources, such as an external API or internal config files.

```typescript
import { Component, html } from '@dannyxcii/modula';

export default class TitleComponent extends Component
{
    async fetchData()
    {
        const globals = await import('../../../config/globals')
            .then(data => data.globals);
        
        return Promise.resolve({
            appName: globals.appName
        });
    }
    
    template()
    {
        return html`
            <h1>${this.data?.appName ?? ''}</h1>
        `;
    }
}
```

The above component awaits an import from globals, before setting the components internal `this.data` object to
the result of the promise resolution (i.e. `{appName: globals.appName}`).

The data is then used inside the template method to render the name of your application.

You have probably noticed the null safe check within the `template` method - it's important to note that 
on initial load, your component is rendered *twice* - once before data is available, and again after your data
is available.

For this reason, you may sometimes wish to implement separate return statements based on whether required data 
has finished loading - such as displaying a loading spinner. In other cases, you may be awaiting result of
an authentication call, for example, so may wish to render nothing in the meantime:

```typescript
template()
{
    if (!this.data) {
        return html``;
    }
    
    return html`
        ...
    `;
}
```

See the [API Server](#api-server) section for more examples of fetching and using data withing components.

## Styling

By default, styling your components is done via SCSS stylesheets within the `src/styles/components` directory
and then included in your components within `fetchData`.

```typescript
export default class MyComponent extends Component
{
    async fetchData()
    {
        await import('../../styles/components/MyComponent.scss');
    }
}
```

> If you import your SCSS files outside the fetchData method, you will need to manually reference the import
> variable inside your template method in order for styles to be correctly displayed

In your SCSS, you can keep things scoped by using your newly defined component tag:

```scss
my-component {
  p {
    ...
  }
}
```

> When referencing a custom element in SCSS, you may need to add this component to your IDE's list of custom elements
> just to avoid annoying highlighting - in most IDE's this is as simple as hovering over the element in your SCSS file 
> and selecting the option along the lines of "Add to custom elements"

## Running Your Modula App

When you're ready to compile and run your application, you can run your application with the serve command.

```shell
npm run serve
```

This will start watching Typescript files in your `src` directory for changes, start your application server (usually on
port 3000) and start your API server (on port 3001). You should now be able to visit your application at 
`http://localhost:3000` - or using a different port if 3000 was busy.

Please note, there is currently no built-in support for hot module reloading, so you will need to reload your browser 
pages in order to see changes.

## API Server

> Available from version 0.2.0

Modula now includes an API server out of the box. The API server is a small express server
designed to run parallel to your application.

The purpose of the API server is to provide your application with a way to send 
requests containing sensitive information, in a way that the client can't see it.

For example, you may need to send a request containing a personalised API token. Now, instead
of doing so directly inside your components `fetchData` methods, your components can instead query
your API.

By default, the API server is currently set to run on port 3001, so make sure this is clear
before attempting to start your server.

Here is a more detailed component than previous examples, showing how you might query the API from within a component:

```typescript
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
```

The API server script can be found at `api/api.js`. You can modify this to handle the request sent by the component:

```javascript
apiRouter.get('/get-weekly-weather-forecast', async (req, res) => {
    const weatherData = await fetch(`http://some.weather.api?key=${apiKeys.mySecretApiKey}`)
            .then(res => res.json())
            .then(res => res.response);
    
    res.json(weatherData);
});
```

This will make the `/api/get-weekly-weather-forecast` endpoint available.