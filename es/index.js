/* --------------------
 * @overlook/plugin-fs module
 * ESM entry point
 * Re-export CJS with named exports
 * ------------------*/

// Exports

import fsPlugin from '../lib/index.js';

export default fsPlugin;
export const {
	TEMP
} = fsPlugin;
