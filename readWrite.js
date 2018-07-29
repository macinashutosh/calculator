// var fs = require('fs');
// fs.readFile('outputs.txt', function(err, data) {
//    if(err == null){
//       console.log(data);
//    }else{
//      console.log("error is there");
//    }
// });

// Reading FILE and Setting a part starts here
function createLineReader(fileName){
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
                ev.emit("line", line)
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
          console.log(remainder)
          ev.emit("line",remainder);
        }else{
            printBest(fileArr);
        }
    })

    return ev
}


//---------main---------------

var best = [];
var fileStart = [];
lineReader = createLineReader("outputs.txt",fileStart);
lineReader.on("line",function(line){

});
