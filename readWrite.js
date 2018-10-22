// var lineReader = require('line-reader');
// lineReader.open('outputs.txt', function(reader) {
//   if (reader.hasNextLine()) {
//     reader.nextLine(function(line) {
//       console.log(line);
//     });
//   }
// });
// lineReader.eachLine('outputs.txt', function(line, last) {
//   console.log(line);
//   if(last){
//     // or check if it's the last one
//   }
// });

// lineReader.open('outputs1.txt', function(err, reader) {
//   if (err) throw err;
//   while(reader.hasNextLine()) {
//
//     reader.nextLine(function(err, line) {
//       if (err) throw err;
//       console.log(reader.hasNextLine());
//       console.log(line);
//     });
//
//   }
// });
// var fs = require('fs');
console.log("prior to line read")
// console.log(fs.readFileSync('outputs1.txt').toString().split('\n'));
var readEachLineSync = require('read-each-line-sync');
readEachLineSync('outputs1.txt', 'utf8', function(line) {
  console.log(line);
});

console.log("after line read");
