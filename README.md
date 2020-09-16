[![NPM version](https://img.shields.io/npm/v/@overlook/plugin-fs.svg)](https://www.npmjs.com/package/@overlook/plugin-fs)
[![Build Status](https://img.shields.io/travis/overlookjs/plugin-fs/master.svg)](http://travis-ci.org/overlookjs/plugin-fs)
[![Dependency Status](https://img.shields.io/david/overlookjs/plugin-fs.svg)](https://david-dm.org/overlookjs/plugin-fs)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookjs/plugin-fs.svg)](https://david-dm.org/overlookjs/plugin-fs)
[![Greenkeeper badge](https://badges.greenkeeper.io/overlookjs/plugin-fs.svg)](https://greenkeeper.io/)
[![Coverage Status](https://img.shields.io/coveralls/overlookjs/plugin-fs/master.svg)](https://coveralls.io/r/overlookjs/plugin-fs)

# Overlook framework file system plugin

Part of the [Overlook framework](https://overlookjs.github.io/).

## Usage

Plugin for access to file system and virtual file system.

### `File` class

Represents a file (either on real file system or virtual file system).

Has properties `.path` and `.content`.

For files on real filesystem:

* `.path` contains absolute path to the file (using system's path separators i.e. `/` on POSIX, `\` on Windows)
* `.content` is `undefined`.

For virtual files created with `[WRITE_FILE]()`:

* `.path` is a pseudo-path - guaranteed to be unique (always using POSIX-style path separators)
* `.content` is content of the virtual file (string)

### Methods

#### `[GET_FILE_PATH]( file )`

Get absolute path for a file.

Method can be extended in Route classes/plugins.

#### `[READ_FILE]( file )`

Read contents of a file (either real or virtual) as a string.

#### `[WRITE_FILE]( ext, content )`

Write a virual file.

File is recorded in virtual file system. The file's `.path` is an opaque pseudo-path, guaranteed to be unique. It will have the extension `ext`.

Returns a `File` object. The contents of the file can be read with `[READ_FILE]()`.

#### `[CREATE_VIRTUAL_PATH](ext)`

Used internally by `[WRITE_FILE]()` to create pseudo-paths for virtual files.

Can be extended by sub-classes/plugins to alter pseudo-paths created by `[WRITE_FILE]()`.

### Properties

#### `[FS_FILES]`

The uppermost route using this plugin will have an `[FS_FILES]` property which is an object holding details of all virtual files. The object is keyed by path, and values are the corresponding `File` objects.

All nested routes using this plugin will reference this same `[FS_FILES]` object as held on the uppermost route.

## Versioning

This module follows [semver](https://semver.org/). Breaking changes will only be made in major version updates.

All active NodeJS release lines are supported (v10+ at time of writing). After a release line of NodeJS reaches end of life according to [Node's LTS schedule](https://nodejs.org/en/about/releases/), support for that version of Node may be dropped at any time, and this will not be considered a breaking change. Dropping support for a Node version will be made in a minor version update (e.g. 1.2.0 to 1.3.0). If you are using a Node version which is approaching end of life, pin your dependency of this module to patch updates only using tilde (`~`) e.g. `~1.2.3` to avoid breakages.

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookjs/plugin-fs/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookjs/plugin-fs/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add tests for new features
* document new functionality/API additions in README
* do not add an entry to Changelog (Changelog is created when cutting releases)
