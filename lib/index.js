/* --------------------
 * @overlook/plugin-fs module
 * Entry point
 * ------------------*/

'use strict';

// Modules
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const {readFile} = require('fs').promises,
	Plugin = require('@overlook/plugin'),
	{INIT_PROPS, INIT_ROUTE} = require('@overlook/route'),
	{findParent} = require('@overlook/util-find-parent'),
	assert = require('simple-invariant'),
	{isString, isFullString, isObject} = require('is-it-type');

// Imports
const pkg = require('../package.json');

// Constants
const VIRTUAL_PATH_PREFIX = '?/';

// Exports

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

const fsPlugin = new Plugin(
	pkg,
	{
		symbols: [
			'GET_FILE_PATH', 'READ_FILE', 'WRITE_FILE', 'CREATE_VIRTUAL_PATH', 'FS_FILES'
		]
	},
	(Route, {
		GET_FILE_PATH, READ_FILE, WRITE_FILE, CREATE_VIRTUAL_PATH, FS_FILES
	}) => class FsRoute extends Route {
		[INIT_PROPS]() {
			this[FS_FILES] = undefined;
		}

		async [INIT_ROUTE]() {
			await super[INIT_ROUTE]();

			// Init `[FS_FILES]` - children inherit it from FS root
			const parent = findParent(this, route => route[FS_FILES]);
			if (parent) {
				this[FS_FILES] = parent[FS_FILES];
			} else {
				this[FS_FILES] = Object.create(null);
			}
		}

		/**
		 * Get path of file.
		 * Method can be extended in plugins.
		 * @param {Object} file - File object
		 * @returns {string} - File path
		 */
		[GET_FILE_PATH](file) { // eslint-disable-line class-methods-use-this
			// Validate input
			const path = file && file.path;
			assert(isObject(file) && isFullString(path), 'file must be a File object with a path');
			assert(
				!path.startsWith(VIRTUAL_PATH_PREFIX),
				'Virtual file paths cannot be resolved to absolute paths'
			);

			// Return path
			return path;
		}

		/**
		 * Read content of a file, either from real or virtual file system.
		 * @param {Object} file - File object
		 * @returns {string} - File content
		 */
		async [READ_FILE](file) {
			// Validate input
			assert(isObject(file), 'file must be a File object');

			// Return content if defined
			if (file.content !== undefined) return file.content;

			// Read from filesystem
			const path = this[GET_FILE_PATH](file);
			return await readFile(path, 'utf8'); // eslint-disable-line no-return-await
		}

		/**
		 * Write a file to virtual file system.
		 * File will be given a pseudo-path.
		 * @param {string} ext - File extension
		 * @param {string} content - File content
		 * @returns {Object} - File object
		 */
		async [WRITE_FILE](ext, content) {
			// Validate input
			assert(isFullString(ext), 'ext must be a non-empty string');
			assert(isString(content), 'content must be a string');

			// Create File with pseudo-path
			const path = this[CREATE_VIRTUAL_PATH](ext);
			const file = new File(path, content);
			this[FS_FILES][path] = file;
			return file;
		}

		/**
		 * Create a pseudo-path for virtual file.
		 * Path will be of form `?/index.js`.
		 * Paths are guaranteed to be unique.
		 * Method can be extended in plugins.
		 * @param {string} ext - File extension
		 * @returns {string} - Pseudo-path
		 */
		[CREATE_VIRTUAL_PATH](ext) {
			const name = this.name || 'anon',
				files = this[FS_FILES];
			let path;
			for (let i = 0; true; i++) { // eslint-disable-line no-constant-condition
				path = `${VIRTUAL_PATH_PREFIX}${name}${i > 0 ? i : ''}.${ext}`;
				if (!files[path]) break;
			}
			return path;
		}
	}
);

fsPlugin.File = File;

module.exports = fsPlugin;
