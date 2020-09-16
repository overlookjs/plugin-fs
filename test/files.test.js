/* --------------------
 * @overlook/plugin-fs module
 * Tests for `[FILES]` object
 * ------------------*/

'use strict';

// Modules
const Route = require('@overlook/route'),
	fsPlugin = require('@overlook/plugin-fs'),
	{FS_FILES} = fsPlugin;

// Init
require('./support/index.js');

// Tests

const FsRoute = Route.extend(fsPlugin);

describe('`[FS_FILES]` object', () => {
	it('created as undefined by `[INIT_PROPS]`', () => {
		const route = new FsRoute();
		expect(route).toContainKey(FS_FILES);
		expect(route[FS_FILES]).toBeUndefined();
	});

	describe('created as empty Object by `.init()`', () => {
		let root, child, subChild;
		beforeEach(async () => {
			root = new FsRoute();
			child = new FsRoute();
			root.attachChild(child);
			subChild = new FsRoute();
			child.attachChild(subChild);
			await root.init();
		});

		it('on root', () => {
			expect(root[FS_FILES]).toBeObject();
			expect(root[FS_FILES]).toEqual({});
		});

		it('on child refers to same object', () => {
			expect(child[FS_FILES]).toBe(root[FS_FILES]);
		});

		it('on nested child refers to same object', () => {
			expect(subChild[FS_FILES]).toBe(root[FS_FILES]);
		});
	});
});
