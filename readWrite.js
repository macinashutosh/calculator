var lineReader = require('line-reader');
// lineReader.open('outputs.txt', function(reader) {
//   if (reader.hasNextLine()) {
//     reader.nextLine(function(line) {
//       console.log(line);
//     });
//   }
// });
lineReader.eachLine('outputs.txt', function(line, last) {
  console.log(line);
  if(last){
    // or check if it's the last one
  }
});
