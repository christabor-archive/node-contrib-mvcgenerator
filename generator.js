/*!
 * Node-contrib-mvcgenerator: Node Plugin to generate MVC structure with a simple json config file.
 * (c) 2013 Chris Tabor <dxdstudio@gmail.com>
 * Apache 2.0 Licensed.
 * <3
 * http://github.com/christabor/node-contrib-mvcgenerator
 */

fs = require('fs');
mvc_config = require('./mvc-config');

// internal config
var config = {
    file_defaults: {
        coffee: '',
        js: '(function(){console.log(\'It\'s Alive!\');})();',
        html: '<div><h1>Page Title</h1></div>',
        hbs: '<div>{{ page_title }}</div>'
    }
};

function writeNewDirectory(directory_name, chmod) {
    "use strict";
    fs.mkdir(__dirname+'/'+directory_name, chmod, function(err){
        if(err) {
            return console.log(err);
        }
        console.log('Success! ==> ['+directory_name+'] directory was created.');
    });
    return;
}

function writeNewFile(filename, folder, contents) {
    "use strict";
    // Write a single file, usually blank.
    if(!contents) {
        contents = '';
    }
    fs.writeFile(__dirname+'/'+folder+'/'+filename, contents, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

function writeFileCollection(files, folder, prefix, extra, pluralize) {
    "use strict";
    var contents;
    // pluralize collections
    
    if(pluralize) {
        extra = 's';
    }
    // add some default file contents based on config
    if(prefix === 'js') {
        contents = config.file_defaults.js;
    } else if(prefix === 'coffee') {
        contents = config.file_defaults.coffee;        
    }
    else if(prefix === 'hbs' || prefix === 'html') {
        contents = config.file_defaults.html;
    } else {
        contents = '';
    }

    for(var i = 0; i < files.length; i++) {
        writeNewFile(files[i]+(extra || '')+'.'+prefix, (folder || 'default'), contents);
    }
}

function createFramework() {
    "use strict";
    var conf = mvc_config.config,
    build = 'build',
    models = conf.models,
    controllers = conf.controllers,
    views = conf.views,
    partials = conf.partials;

    writeNewDirectory(build);
    writeNewDirectory(build+'/'+models);
    writeNewDirectory(build+'/'+controllers);
    writeNewDirectory(build+'/'+views);
    // writeNewDirectory(build+'/'+views+'/'+partials);

    // create models
    writeFileCollection(conf.files.models, build+'/'+models, conf.extension.models, '', null);

    // create collections
    writeFileCollection(conf.files.models, build+'/'+models, conf.extension.models, '', conf.pluralize_collections);

    // create views
    writeFileCollection(conf.files.views, build+'/'+views, conf.extension.views, '', null);

    // create controllers
    writeFileCollection(conf.files.controllers, build+'/'+controllers, conf.extension.controllers, conf.controller_prefix, '', null);
}

createFramework();

