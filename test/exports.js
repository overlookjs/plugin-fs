/* --------------------
 * @overlook/plugin-fs module
 * Tests
 * Test function to ensure all exports present
 * ------------------*/

/* eslint-disable jest/no-export */

'use strict';

// Exports

module.exports = function itExports(fsPlugin) {
	describe('methods', () => {
		it.each([
			'File'
		])('%s', (key) => {
			expect(fsPlugin[key]).toBeFunction();
		});
	});

	describe.skip('symbols', () => { // eslint-disable-line jest/no-disabled-tests
		it.each([
			'TEMP'
		])('%s', (key) => {
			expect(typeof fsPlugin[key]).toBe('symbol');
		});
	});
};
