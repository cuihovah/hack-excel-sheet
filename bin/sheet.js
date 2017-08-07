#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const zipdir = require('zip-dir');
const decompress = require('decompress');
const decompressUnzip = require('decompress-unzip');
const Thenjs = require('thenjs');

/**
 * Usage.
 */

program
    .usage('<command> filename')
    .parse(process.argv);

var args = program.args;

function help () {
    if (program.args.length < 1) 
        return program.help();
}

help();

function process(done, file) {
    var readStream = fs.createReadStream(file);
    var str = '';
    readStream.on('data', function(buf){
        str += buf.toString();		
    });

    readStream.on('end', function(){
        str = str.replace(/<sheet[^>]>/g, '');
        fs.write(file, str, function(err){
            done();	
        });		
    });
}

function run() {
    var filename = program.args[0];

    decompress(filename, 'dist', {
        plugins: [
            decompressUnzip()
        ]
    }).then(() => {
        Thenjs.each([], function(cont, value){
            process(value, cont);	
        }).then(function(cont, result){
            zipdir(path.join('dist'), { 
                saveTo: './myzip.xlsx' 
            }, function (err, buffer) {
                console.log('123');
            });
        });
    });
}

run();
