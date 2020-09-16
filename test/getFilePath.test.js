/* --------------------
 * @overlook/plugin-fs module
 * Tests for `[GET_FILE_PATH]()` method
 * ------------------*/

'use strict';

// Modules
const pathJoin = require('path').join,
	Route = require('@overlook/route'),
	fsPlugin = require('@overlook/plugin-fs'),
	{GET_FILE_PATH, File} = fsPlugin;

// Init
require('./support/index.js');

// Tests

const FsRoute = Route.extend(fsPlugin);

describe('`[GET_FILE_PATH]()` method', () => {
	it('returns file path', async () => {
		const route = new FsRoute();
		await route.init();

		const path = pathJoin(__dirname, './fixtures/index.html');
		const file = new File(path);

		expect(route[GET_FILE_PATH](file)).toBe(path);
	});
});
