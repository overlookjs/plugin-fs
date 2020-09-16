/* --------------------
 * @overlook/plugin-fs module
 * Tests
 * Test function to ensure all exports present
 * ------------------*/

/* eslint-disable jest/no-export */

'use strict';

// Exports

module.exports = function itExports(fsPlugin) {
	describe('properties', () => {
		it.each([
			'File'
		])('%s', (key) => {
			expect(fsPlugin[key]).toBeFunction();
		});
	});

	describe('symbols', () => {
		it.each([
			'GET_FILE_PATH',
			'READ_FILE',
			'WRITE_FILE',
			'CREATE_VIRTUAL_PATH',
			'FS_FILES'
		])('%s', (key) => {
			expect(typeof fsPlugin[key]).toBe('symbol');
		});
	});
};
