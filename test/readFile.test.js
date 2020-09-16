/* --------------------
 * @overlook/plugin-fs module
 * Tests for `[READ_FILE]()` method
 * ------------------*/

'use strict';

// Modules
const pathJoin = require('path').join,
	Route = require('@overlook/route'),
	fsPlugin = require('@overlook/plugin-fs'),
	{READ_FILE, File} = fsPlugin;

// Init
require('./support/index.js');

// Tests

const FsRoute = Route.extend(fsPlugin);

describe('`[READ_FILE]()` method', () => {
	it('returns a promise', async () => {
		const route = new FsRoute();
		await route.init();

		const path = pathJoin(__dirname, './fixtures/index.html');
		const file = new File(path);

		const promise = route[READ_FILE](file);
		expect(promise).toBeInstanceOf(Promise);
		await promise;
	});

	it('reads a real file', async () => {
		const route = new FsRoute();
		await route.init();

		const path = pathJoin(__dirname, './fixtures/index.html');
		const file = new File(path);

		const content = await route[READ_FILE](file);
		expect(content).toBe('<h1>Hello!</h1>\n');
	});

	it('reads a virtual file', async () => {
		const route = new FsRoute();
		await route.init();

		const file = new File(null, '<h1>Goodbye!</h1>\n');

		const content = await route[READ_FILE](file);
		expect(content).toBe('<h1>Goodbye!</h1>\n');
	});
});
