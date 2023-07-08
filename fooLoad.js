// To be included in `@overlook/plugin-load`
// or should it be `@overlook/plugin-loaded`?
// Is this even necessary at all?

'use strict';

// Modules
const {existsSync} = require('fs'),
	pathJoin = require('path').join,
	// eslint-disable-next-line node/no-missing-require, import/no-unresolved
	{CREATE_VIRTUAL_PATH, FS_FILES} = require('@overlook/plugin-fs');

// Plugin definition fragment

const SRC_DIR_PATH = Symbol('@overlook/plugin-load.SRC_DIR_PATH'),
	SRC_FILENAME = Symbol('@overlook/plugin-load.SRC_FILENAME');

module.exports = class {
	/**
	 * Creates a file path for a virtual file "next" to route file.
	 * e.g. if `route[SRC_DIR_PATH] = '/path/to/app` and `route[SRC_FILENAME] = 'index'`,
	 * calling `route[CREATE_VIRTUAL_PATH]('jsx')` will return `'/path/to/app/index.jsx'`.
	 * Ensures path is unique - does not clash with an existing file (either real or virtual).
	 * @param {string} ext - File extension
	 * @returns {string} - File path
	 */
	[CREATE_VIRTUAL_PATH](ext) {
		// Delegate to superior if either `[SRC_DIR_PATH]` or `[SRC_FILENAME]` is undefined
		const {[SRC_DIR_PATH]: srcDirPath, [SRC_FILENAME]: name} = this;
		if (!srcDirPath || !name) return super[CREATE_VIRTUAL_PATH](ext);

		// Create unique path for file in same directory as route file
		const files = this[FS_FILES];
		let path;
		for (let i = 0; true; i++) { // eslint-disable-line no-constant-condition
			path = pathJoin(srcDirPath, `${name}${i > 0 ? i : ''}.${ext}`);
			if (!files[path] && !existsSync(path)) break;
		}
		return path;
	}
};
