const fs = require('fs');

fs.unlink('test.txt', (err) => {
    console.log("Deleted")
}) // delete file

fs.mkdir("testDir", (err) => {
    console.log("Dir Created")
}) // create folder 

fs.writeFile("/testDir/text.txt", 'console.log("done")', (err) => {
  console.log("Data Saved");
}); // create file

fs.readdir("testDir", "utf8", (err, data) => {
    console.log(data)
}) // read folder

fs.readFile("./testDir/text.txt", "utf8", (err, data) => {
  console.log(data);
}); // read file

fs.access("testDir", (err) => {
    if (err) {
      console.log(false);
    } else {
      console.log(true);
    }
}); // check if the folder exists

fs.rmdir('testDir', (err) => {
    console.log('Folder deleted')
}) // delete folder