var file_system = require('fs');
var archiver = require('archiver');

var output = file_system.createWriteStream('./dist/ShaitanDelayLatest.zip');
var archive = archiver('zip');

output.on('close', function () {
    console.log('✨ ' + archive.pointer() + ' total bytes');
    console.log('ZIP-archive was created successfully');
    console.log('');
});

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory('./dist/Shaitan DELAY.vst3', 'Shaitan DELAY.vst3');
archive.directory('./dist-public', false);

archive.finalize();