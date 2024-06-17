const path = require('path');
const glob = require('glob');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

let entries = glob.sync('./src/styles/components/**/*.scss').reduce((acc, filePath) => {
	const entry = filePath.replace('src\\styles\\components\\', '')
        .replace('.scss', '');
	acc[entry] = './' + filePath;

    return acc;
}, {});

entries['app'] = './src/app.ts';
entries['appStyles'] = './src/styles/app.scss';

const ignoreFiles = Object.keys(entries).reduce((acc, key) => {
	if (entries[key].endsWith('.scss')) {
		acc.push(`${key}.js`);
	}

	return acc;
}, []);

const appConfig = (env, options) => {
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
				new TerserPlugin({
                    terserOptions: {
                        format: {
                            comments: false
                        }
                    },
                    extractComments: false
                }),
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

const apiConfig =  {
	entry: './api/api.ts',
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false
					}
				},
				extractComments: false
			}),
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	externals: [nodeExternals()],
	target: 'node',
	output: {
		filename: 'api.js',
		path: path.resolve(__dirname)
	}
};

module.exports = [appConfig, apiConfig];