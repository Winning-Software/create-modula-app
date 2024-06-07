# Create TS App

<!-- Version Badge -->
<img src="https://img.shields.io/badge/Version-1.3.0-blue" alt="Version 1.3.0">

A TypeScript boilerplate project.

#### Table of Contents
- [Installation](#installation)
- [Initial Setup](#initial-setup)
- [Build Process](#build-process)
- [Build Commands](#build-commands)
- [Output](#output)

## Installation

```shell
npx @dannyxcii/create-ts-app@latest my-ts-app
```

This will create a new boilerplate application called `my-ts-app` in your current
working directory.

## Initial Setup

After running the installer, enter your project and run `npm install`:

```shell
cd my-ts-app && npm install
```

This installs required development dependencies, such as `webpack`, `typescript`
and `sass`.

## Build Process

Your app includes a default webpack setup to compile JavaScript, TypeScript, CSS and SCSS files
from your projects `src` directory to `public/assets`.

Two entrypoints are included, and can be found in `webpack.config.js`:

```app
// webpack.config.js
const entries = {
    app: './src/app.ts',
    styles: './src/styles/app.scss'
}
```

> Note: this uses the approach of generating separate JS/CSS files. If you prefer to import your
> stylesheets via scripts in your other entrypoints you can remove the `IgnoreEmitPlugin` entry
> from the plugins array

## Build Commands

Included are three built-in build commands:

```shell
npm run dev
npm run build
npm run watch
```

The `dev` command should be used in development environments. Built assets are not minified,
so overall build time will be shorter.

The `build` command is intended for use on production environments - assets are minified when built,
reducing their filesize.

Finally, the `watch` command can be used during development to watch your `src` files for changes and compile
them on save, reducing the need to repeatedly run build commands.

## Output

The `webpack` build process will output the following files when a build command is ran:

```txt
public/assets/app.js
public/assets/styles/styles.css
```

To change the output directory for your JavaScript files, you can modify the `output` property:

```txt
// webpack.config.js
output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/assets/')
}
```

To change the output directory for your stylesheets you can modify the path passed into the
`MiniCssExtractPlugin` inside the `plugins` array:

```javascript
// webpack.config.js
new MiniCssExtractPlugin({
    filename: 'styles/[name].css',
})
```