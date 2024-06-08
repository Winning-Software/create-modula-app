# Create Modula App

<!-- Version Badge -->
<img src="https://img.shields.io/badge/Version-0.1.1-blue" alt="Version 0.1.1">

Creates a new boilerplate application using the ModulaJS library - a component 
based front end SPA.

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

Components are an integral part of a Modula app and can be incredibly simple to use. All "types" of component
extend `Component`, the definitions below are merely based on how the components can be used.

### Page Components

First of all, *Page* components are components intended to represent a page, or entire view in our application.

> Take a look at `src/components/pages/HomePage.ts` for an example of a page component

A basic page component might look something like this:

```typescript
import { Component, html } from '@dannyxcii/modula';

export default class AboutPage
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

These can be created and defined in the same way as page components, but it is important to make sure your
template component renders a `<slot></slot>` tag - this is where all your pages will be rendered.

> If your template does not render a slot, your template will still work, however pages will be rendered
> outside your template

To make your application use your defined template, you can update the `template` option passed to `Modula`
inside `src/app.ts`:

```typescript
template: MyTemplateComponent
```

### Partial Components

Partial components are components that are intended to be used within other components. These can be created 
and defined in the same way as page or template components and may be used within other components:

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