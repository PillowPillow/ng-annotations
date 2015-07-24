var config = {};

/*modules*/
var Path = require('path'),
	webpack = require('webpack'),
	pckg = require('../package.json')

/*consts*/
var project = Path.join(__dirname, '..'),
	wdir = Path.join(project, 'src'),
	entryfile = Path.join(wdir, 'app.js'),
	dist = Path.join(project, 'dist'),
	styles = Path.join(wdir, 'styles'),
	node_modules = Path.join(project, 'node_modules'),
	bower_components = Path.join(project, 'bower_components');

config.entryfile = entryfile;
config.devtool = 'source-map';
config.entry = entryfile;

config.cache = true;

config.output = {
	publicPath: '/',
	filename: pckg.name + '.js',
	path: dist,
	chunkFilename: '[chunkhash].bundle.js'
};

config.resolve = {};
config.resolve.extensions = ['', '.js', '.jsx'];
config.resolve.root = wdir;

config.module = {};
config.module.loaders = [
    {
        test: /\.js$/,
        loader: 'babel?experimental&optional=es7',
        exclude: [node_modules, bower_components]
    },
    {
        test: /\.jsx$/,
        loader: 'babel?experimental&optional=es7',
        exclude: [node_modules, bower_components]
    }
];


config.resolve.alias = {
	src: wdir,
	core: entryfile
};

config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
	new webpack.optimize.UglifyJsPlugin({
		minimize: true,
		sourceMap: true,
		compress: { warnings: false },
		mangle: {
			except: ['exports', 'require', 'module']
		}
	})
];

module.exports = config;