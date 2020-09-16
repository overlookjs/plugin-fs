/* --------------------
 * @overlook/plugin-fs module
 * Tests for `File` class
 * ------------------*/

'use strict';

// Modules
const {File} = require('@overlook/plugin-fs');

// Init
require('./support/index.js');

// Tests

describe('File class', () => {
	it('is a class', () => {
		expect(File).toBeFunction();
	});

	describe('constructor', () => {
		it('records `path`', () => {
			const file = new File('/a/b/c.js');
			expect(file.path).toBe('/a/b/c.js');
			expect(file.content).toBeUndefined();
		});

		it('records `content`', () => {
			const file = new File(null, 'xyz');
			expect(file.content).toBe('xyz');
			expect(file.path).toBeUndefined();
		});

		it('records `path` and `content`', () => {
			const file = new File('/a/b/c.js', 'xyz');
			expect(file.path).toBe('/a/b/c.js');
			expect(file.content).toBe('xyz');
		});
	});
});
