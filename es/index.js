/* --------------------
 * @overlook/plugin-fs module
 * ESM entry point
 * Re-export CJS with named exports
 * ------------------*/

// Exports

import fsPlugin from '../lib/index.js';

export default fsPlugin;
export const {
	GET_FILE_PATH,
	READ_FILE,
	WRITE_FILE,
	CREATE_VIRTUAL_PATH,
	FS_FILES,
	File
} = fsPlugin;
