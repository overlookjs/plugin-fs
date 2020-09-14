/* --------------------
 * @overlook/plugin-fs module
 * Tests
 * ESM export
 * ------------------*/

// Modules
import Plugin from '@overlook/plugin';
import fsPlugin, * as namedExports from '@overlook/plugin-fs/es';

// Imports
import itExports from './exports.js';

// Tests

describe('ESM export', () => {
	it('default export is an instance of Plugin class', () => {
		expect(fsPlugin).toBeInstanceOf(Plugin);
	});

	describe('default export has properties', () => {
		itExports(fsPlugin);
	});

	describe('named exports', () => {
		itExports(namedExports);
	});
});
