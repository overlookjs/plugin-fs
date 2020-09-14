/* --------------------
 * @overlook/plugin-fs module
 * Entry point
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin');

// Imports
const pkg = require('../package.json');

// Exports

const fsPlugin = new Plugin(
	pkg,
	Route => class FsRoute extends Route {}
);

module.exports = fsPlugin;

class File {
	constructor(path, content) {
		this.path = path;
		this.content = content;
	}
}

fsPlugin.File = File;
