/* --------------------
 * @overlook/plugin-fs module
 * Tests for `[WRITE_FILE]()` method
 * ------------------*/

'use strict';

// Modules
const Route = require('@overlook/route'),
	fsPlugin = require('@overlook/plugin-fs'),
	{WRITE_FILE, FS_FILES, File} = fsPlugin;

// Init
require('./support/index.js');

// Tests

const FsRoute = Route.extend(fsPlugin);

describe('`[WRITE_FILE]()` method', () => {
	it('returns a promise', async () => {
		const route = new FsRoute();
		await route.init();

		const promise = route[WRITE_FILE]('html', '<h1>Goodbye!</h1>\n');
		expect(promise).toBeInstanceOf(Promise);
		await promise;
	});

	describe('returns a file which', () => {
		let file;
		beforeEach(async () => {
			const root = new FsRoute();
			const route = new FsRoute({name: 'foo'});
			root.attachChild(route);
			await root.init();

			file = await route[WRITE_FILE]('html', '<h1>Goodbye!</h1>\n');
		});

		it('is a File object', () => {
			expect(file).toBeInstanceOf(File);
		});

		it('contains file content', () => {
			expect(file.content).toBe('<h1>Goodbye!</h1>\n');
		});

		it('has pseudo-path', () => {
			expect(file.path).toBe('?/foo.html');
		});
	});

	describe('creates paths', () => {
		it('which are unique for files with same extension on same route', async () => {
			const root = new FsRoute();
			const route = new FsRoute({name: 'foo'});
			root.attachChild(route);
			await root.init();

			const [file1, file2, file3] = await Promise.all([
				route[WRITE_FILE]('html', '<h1>Hello!</h1>\n'),
				route[WRITE_FILE]('html', '<h1>Goodbye!</h1>\n'),
				route[WRITE_FILE]('html', '<h1>Hello again!</h1>\n')
			]);

			expect(file1.content).toBe('<h1>Hello!</h1>\n');
			expect(file2.content).toBe('<h1>Goodbye!</h1>\n');
			expect(file3.content).toBe('<h1>Hello again!</h1>\n');

			expect(file1.path).toBe('?/foo.html');
			expect(file2.path).toBe('?/foo1.html');
			expect(file3.path).toBe('?/foo2.html');
		});

		it('without numbering for files with same extension on differently named routes', async () => {
			const root = new FsRoute();
			const route1 = new FsRoute({name: 'foo'});
			root.attachChild(route1);
			const route2 = new FsRoute({name: 'bar'});
			root.attachChild(route2);
			await root.init();

			const [file1, file2] = await Promise.all([
				route1[WRITE_FILE]('html', '<h1>Hello!</h1>\n'),
				route2[WRITE_FILE]('html', '<h1>Goodbye!</h1>\n')
			]);

			expect(file1.content).toBe('<h1>Hello!</h1>\n');
			expect(file2.content).toBe('<h1>Goodbye!</h1>\n');

			expect(file1.path).toBe('?/foo.html');
			expect(file2.path).toBe('?/bar.html');
		});

		it('which are unique for files with same extension on different routes with same name', async () => {
			const root = new FsRoute();
			const route1 = new FsRoute({name: 'foo'});
			root.attachChild(route1);
			const route2 = new FsRoute({name: 'foo'});
			root.attachChild(route2);
			await root.init();

			const [file1, file2] = await Promise.all([
				route1[WRITE_FILE]('html', '<h1>Hello!</h1>\n'),
				route2[WRITE_FILE]('html', '<h1>Goodbye!</h1>\n')
			]);

			expect(file1.content).toBe('<h1>Hello!</h1>\n');
			expect(file2.content).toBe('<h1>Goodbye!</h1>\n');

			expect(file1.path).toBe('?/foo.html');
			expect(file2.path).toBe('?/foo1.html');
		});
	});

	it('records file in [FS_FILES]', async () => {
		const route = new FsRoute();
		await route.init();

		const file = await route[WRITE_FILE]('html', '<h1>Goodbye!</h1>\n');

		const {path} = file;
		expect(path).toBe('?/anon.html');

		expect(route[FS_FILES][path]).toBe(file);
	});
});
