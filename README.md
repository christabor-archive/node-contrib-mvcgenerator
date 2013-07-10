node-contrib-mvcgenerator
=========================

## A tool to scaffold your MVC project based on a simple JSON config.

### Example config file:

`exports.config = {
  // filename extensions - acceptable formats: js, hbs, html, coffee
	extension: {
		controllers: 'js',
		models: 'js',
		views: 'hbs'
	},

	// define the names of folders for each component
	models: 'models',
	controllers: 'controllers',
	views: 'views',
	partials: 'partials',

	// whether or not we use the standard convention of pluralizing models into collections (e.g. User -> Users)
	pluralize_collections: true,

	// the appended word for semantic consistency
	controller_prefix: 'Controller',

	// file names
	files: {
		models: ['dog', 'animal'],
		views: ['dog', 'pups', 'about'],
		controllers: ['dog', 'animal', 'pups']
	}
};
`
