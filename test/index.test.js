/* --------------------
 * @overlook/plugin-fs module
 * Tests
 * ------------------*/

'use strict';

// Modules
const Plugin = require('@overlook/plugin'),
	Route = require('@overlook/route'),
	fsPlugin = require('@overlook/plugin-fs');

// Init
require('./support/index.js');

// Tests

describe('Plugin', () => {
	it('is an instance of Plugin class', () => {
		expect(fsPlugin).toBeInstanceOf(Plugin);
	});

	it('when passed to `Route.extend()`, returns subclass of Route', () => {
		const FsRoute = Route.extend(fsPlugin);
		expect(FsRoute).toBeFunction();
		expect(FsRoute).toBeDirectSubclassOf(Route);
	});
});
