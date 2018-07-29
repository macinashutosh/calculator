// var fs = require('fs');
// fs.readFile('outputs.txt', function(err, data) {
//    if(err == null){
//       console.log(data);
//    }else{
//      console.log("error is there");
//    }
// });

function createLineReader(fileName,fileStartArr){
    var EM = require("events").EventEmitter
    var ev = new EM()
    var stream = require("fs").createReadStream(fileName)
    var remainder = null;
    stream.on("data",function(data){
        if(remainder != null){//append newly received data chunk
            var tmp = new Buffer(remainder.length+data.length)
            remainder.copy(tmp)
            data.copy(tmp,remainder.length)
            data = tmp;
        }
        var start = 0;
        for(var i=0; i<data.length; i++){
            if(data[i] == 10){ //\n new line
                var line = data.slice(start,i)
                ev.emit("line", line,fileStartArr.push(line.toString().split(',')))
                start = i+1;
            }
        }
        if(start<data.length){
            remainder = data.slice(start);
        }else{
            remainder = null;
        }
    })

    stream.on("end",function(){
        if(null!=remainder){
          ev.emit("line",remainder)
        }else{
          ev.emit("array",fileStartArr)
        }
    })

    return ev
}


//---------main---------------

var fileStartArray = [];
lineReader = createLineReader("outputs.txt",fileStartArray)

lineReader.on("line",function(line){
  var arr = line.toString().split(',');
});
lineReader.on("array",function(array){
  console.log(array);
  var tempConvertFromString = []
  for(var i=0;i<array.length;i++){
    var arr = [];
    for(var j=0;j<array[i].length;j++){
      arr.push(parseInt(array[i][j]))
    }
    tempConvertFromString.push(arr);
  }
  console.log(tempConvertFromString);
});
