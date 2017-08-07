#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var program = require('commander');
var chalk = require('chalk');
const decompress = require('decompress');
const decompressUnzip = require('decompress-unzip');

/**
 * Usage.
 */

program
	.usage('<command> filename')
	.parse(process.argv);

var args = program.args;

function help () {
	if (program.args.length < 1) 
		return program.help()
}

help()

function run() {
	var filename = program.args[0];

	decompress(filename, './', {
		plugins: [
			decompressUnzip()
		]
	}).then(() => {
		console.log('Files decompressed');
	});
}

run();
