/* --------------------
 * @overlook/plugin-fs module
 * Entry point
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin'),
	assert = require('simple-invariant'),
	{isString, isFullString} = require('is-it-type');

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
		// Validate input
		assert(path == null || isFullString(path), 'File path must be a string if provided');
		assert(content == null || isString(content), 'File content must be a string if provided');
		assert(path || content, 'File must have either path or content defined');
		if (path == null) path = undefined;
		if (content == null) content = undefined;

		// Save props
		this.path = path;
		this.content = content;
	}
}

fsPlugin.File = File;
