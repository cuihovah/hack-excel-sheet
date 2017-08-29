#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const zipdir = require('zip-dir');
const decompress = require('decompress');
const decompressUnzip = require('decompress-unzip');
const Thenjs = require('thenjs');
const rm = require('rimraf').sync;

/**
 * Usage.
 */

process = global.process

program
    .usage('<command> srcExcelFile destExcelFile')
    .parse(process.argv);

var args = program.args;

function help () {
    if (program.args.length < 2) 
        return program.help();
}

help();

function proc(done, file) {

	fs.stat(file, function(err, value){
		if(!value.isFile())
			return done(null, null);

		var readStream = fs.createReadStream(file);
		var str = '';
		readStream.on('data', function(buf){
			str += buf.toString();		
		});

		readStream.on('end', function(){
			str = str.replace(/<sheetProtection[^>]+>/g, '');
			fs.writeFile(file, str, function(err){
				done(null, null);	
			});		
		});
	});
}

function run() {
    var filename = program.args[0];
	var destname = program.args[1];

    decompress(filename, 'dist', {
        plugins: [
            decompressUnzip()
        ]
    }).then(() => {
		var basename = path.join('dist', 'xl', 'worksheets');
		fs.readdir(basename, function(err, files){
			Thenjs.each(files, function(cont, value){
				var f = path.join(basename, value);
				proc(cont, f);	
			}).then(function(cont, result){
				zipdir(path.join('dist'), { 
					saveTo: destname
				}, function (err, buffer) {
					cont(err, buffer);
				});
			}).then(function(){
				rm('dist');
			});
		});
    });
}

run();
