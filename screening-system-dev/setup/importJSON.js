var exec = require("child_process").exec;
const fs = require("fs");
var pathModule = require("path");

var directoryPath = pathModule.join(process.cwd(), "sampledata/");

var importcommandUser =
  "mongoimport --jsonArray --db db --collection users --drop --file " +
  directoryPath;

//check if directory exist
if (fs.existsSync(directoryPath)) {
  console.log("Directory path existed!");
  //read files in directory
  fs.readdir(directoryPath, function(err, filenames) {
    if (err) {
      console.log(err);
      return;
    }
    filenames.forEach(function(filename) {
      //var escapedfilename = filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      //console.log(escapedfilename);
      fs.readFile(directoryPath + filename, "utf-8", function(err, content) {
        if (err) {
          console.log(err);
          return;
        }
        if (filename == "sampleUsers.js") {
          console.log("import... " + filename);
          exec(importcommandUser + escapeFileName(filename));
        }
      });
    });
  });
} else {
  console.log("Directory not found");
}

function escapeFileName(filename) {
  var name = "";
  for (var i = 0; i < filename.length; i++) {
    if (filename[i].match(/[^a-z0-9.]/gi)) {
      //console.log(filename[i]);
      name += "\\" + filename[i];
    } else {
      name += filename[i];
    }
  }
  return name;
}
