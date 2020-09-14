/* --------------------
 * @overlook/plugin-fs module
 * Tests
 * CJS export
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin'),
	fsPlugin = require('@overlook/plugin-fs');

// Imports
const itExports = require('./exports.js');

// Tests

describe('CJS export', () => {
	it('is an instance of Plugin class', () => {
		expect(fsPlugin).toBeInstanceOf(Plugin);
	});

	describe('has properties', () => {
		itExports(fsPlugin);
	});
});
