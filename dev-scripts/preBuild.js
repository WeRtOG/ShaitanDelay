var fs = require('fs');
var dir = './dist';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log("🐾 The 'dist' folder was created");
} else {
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir);
    console.log("🐱 The 'dist' folder has been cleared up");
}
