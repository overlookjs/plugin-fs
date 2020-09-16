/* --------------------
 * @overlook/plugin-fs module
 * Tests for `[CREATE_VIRTUAL_PATH]()` method
 * ------------------*/

'use strict';

// Modules
const Route = require('@overlook/route'),
	fsPlugin = require('@overlook/plugin-fs'),
	{CREATE_VIRTUAL_PATH} = fsPlugin;

// Init
require('./support/index.js');

// Tests

const FsRoute = Route.extend(fsPlugin);

describe('`[CREATE_VIRTUAL_PATH]()` method', () => {
	it('returns path based on route name and ext', async () => {
		const root = new FsRoute();
		const route1 = new FsRoute({name: 'foo'});
		root.attachChild(route1);
		const route2 = new FsRoute({name: 'bar'});
		root.attachChild(route2);
		await root.init();

		expect(route1[CREATE_VIRTUAL_PATH]('html')).toBe('?/foo.html');
		expect(route2[CREATE_VIRTUAL_PATH]('html')).toBe('?/bar.html');
	});
});
