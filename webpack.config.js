const path = require('path');
const glob = require('glob');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

let entries = glob.sync('./src/styles/components/**/*.scss').reduce((acc, filePath) => {
	const entry = filePath.replace('src\\styles\\components\\', '')
        .replace('.scss', '');
	acc[entry] = './' + filePath;

    return acc;
}, {});

// Manually add app.ts as an entry point
entries['app'] = './src/app.ts';
entries['appStyles'] = './src/styles/app.scss';

const ignoreFiles = Object.keys(entries).reduce((acc, key) => {
	if (entries[key].endsWith('.scss')) {
		acc.push(`${key}.js`);
	}

	return acc;
}, []);

module.exports = (env, options) => {
	const isProduction = options.mode === 'production';

	return {
		entry: entries,
		module: {
			rules: [
				{
					test: /\.ts?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						'style-loader',
						'css-loader',
						'sass-loader'
					],
					exclude: /node_modules/
				},
			],
		},
		plugins: [
			new IgnoreEmitPlugin(ignoreFiles)
		],
		optimization: isProduction ? {
			minimize: true,
			minimizer: [
				new TerserPlugin(),
				new CssMinimizerPlugin(),
			],
			splitChunks: {
				chunks: 'all',
			}
		} : {},
		resolve: {
			extensions: ['.ts', '.js', '.css', '.scss']
		},
		watchOptions: {
			poll: true,
			ignored: /node_modules/
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'public/assets/')
		}
	}
}