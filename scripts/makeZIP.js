const fs = require('fs');
const archiver = require('archiver');

let output = fs.createWriteStream(
    './dist/ShaitanDelay-build-' + process.platform + '-' + Date.now() + '.zip'
);
let archive = archiver('zip');

output.on('close', function () {
    console.log('✨ ' + archive.pointer() + ' total bytes');
    console.log('ZIP-archive was created successfully');
    console.log('');
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory('./dist/Shaitan DELAY.vst3', 'Shaitan DELAY.vst3');
archive.directory('./dist-public', false);

archive.finalize();
