var fs = require('fs');
var em = require("events");
var async = require('async');
var EM = em.EventEmitter;
var ev = new EM();
function factorial(number){
    if(number<=1){
      return 1;
    }
    return number * factorial(number - 1)
}
function getCombination(Number){
    var numerator = factorial(Number)
    var denominator = factorial(2)*factorial(Number - 2)
    return numerator/denominator;
}

class Double {
  constructor(diagonal,row){
    this.diagonal = diagonal
    this.row = row
  }
  getInfo(){
    var a = []
    a.push(this.diagonal)
    a.push(this.row)
    return a
  }
}
class CheckNeightbours{
  constructor(){
    neighbour = {}
  }
  addNeightbour(a,b,diff){
    if(diff > 0){
      var nigga = Math.max(a,b)+","+Math.min(a,b)
      if(neighbour.hasOwnProperty(nigga)){
        return false;
      }else{
        neighbour[nigga] = diff;
        return true;
      }
    }else{
      return false;
    }

  }
  returnNeighbour(){
    return neighbour
  }
}

function printAnswer(answer){
  var prevN = 0;
  var differenceArr = []

  for(var j=0;j<answer.length;j++){
    var temp1 = []
    for(var m=0;m<prevN+1;m++){
      temp1.push(" ")

    }
    for(var i=prevN+1;i<answer.length;i++){
      temp1.push(parseInt(answer[i])-parseInt(answer[prevN]))
    }
    differenceArr.push(temp1)
    prevN++;
  }
  var feasible = checkFeasibility(differenceArr);

  return feasible;
}

function appendOutputToFile(array,txtFile){
  if(array !=null){
    if (array.length > 0){
      fs.appendFile(txtFile, "\n"+array.toString(), (err) => {
          if (err) throw err;
          // console.log('Permutation Appended');
      });
    }
  }
}

function permute(permutation,txtFile,endString) { //Need to Change This Function
  var length = permutation.length,
      s1 = permutation.slice(),
      c = new Array(length).fill(0),
      i = 1, k, p;
      appendOutputToFile(s1+endString,txtFile);
        while (i < length) {
          if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            var s = permutation.slice();
            appendOutputToFile(s+endString,txtFile);
          } else {
            c[i] = 0;
            ++i;
          }
        }

}

// Check Feasibility Starts here

function checkFeasibility(differenceArr){ // Returns Nb and Nc with respect to the difference sent
  var map = {};

  for(j=0;j<differenceArr.length;j++){
    var tempDia = 1
    for(k=0;k<differenceArr[0].length;k++){
      if(differenceArr[j][k] == " "){

      }else{
        if (map.hasOwnProperty(differenceArr[j][k])) {
          var a = new Double(tempDia,j+1)
          array = map[differenceArr[j][k]]
          array.push(a)
          map[differenceArr[j][k]] = array
        }else{
          var a = new Double(tempDia,j+1)
          var array = []
          array.push(a)
          map[differenceArr[j][k]] = array
        }
        tempDia++;
      }

    }
  }

  var Nb = 0
  var Nc = 0
  var lengthOfTheArray = 0
  for (var key in map) {
      if (map.hasOwnProperty(key)) {
        if(map[key].length > 1){
          //need to include these in the calculation

          arr = map[key]
          lengthOfTheArray = lengthOfTheArray + getCombination(arr.length)
          var temp = {}
          var isItCheckedAlready = []
          // $("#keys").append("<div>")
          // var keyString = "<div>"
          for (var i =0;i<arr.length;i++){
            info = arr[i].getInfo()
            diagonal = info[0]
            row  = info[1]

            if (temp.hasOwnProperty(row)){
              tempArr = temp[row]
              tempArr.push(i)
              temp[row] = tempArr
            }else{
              tempArr = [i]
              temp[row] = tempArr
            }

            isItCheckedAlready.push(false)
            // console.log(temp)
          }

          var neighbour = new CheckNeightbours();
          for (var i = 0;i<arr.length;i++){
            info = arr[i].getInfo()
            diagonal = info[0]
            row  = info[1]
            difference = row - diagonal
            sum = row + diagonal
            if (difference > 0 && temp.hasOwnProperty(difference)){
              isItCheckedAlready[i] = true
              toCheckTrue = temp[difference]
              for(var j=0;j<toCheckTrue.length;j++){
                isItCheckedAlready[toCheckTrue[j]] = true
                var result = neighbour.addNeightbour(i,toCheckTrue[j],difference)
                if(result == true){

                  var toShow = arr[toCheckTrue[j]].getInfo();

                }
              }

            }
            if (sum >0 && temp.hasOwnProperty(sum)){
              toCheckTrue = temp[sum]
              for(var j=0;j<toCheckTrue.length;j++){
                isItCheckedAlready[toCheckTrue[j]] = true
                var result = neighbour.addNeightbour(i,toCheckTrue[j],sum)
                if(result == true){
                  var toShow = arr[toCheckTrue[j]].getInfo();
                }
              }
            }

          }
          var toprinthash = neighbour.returnNeighbour();
          Nb = Nb + Object.keys(neighbour).length;
          // console.log(neighbour);
          // console.log(key+"-> Nb"+Nb+" Nc"+Nc"
        }else{
          // not required variables
        }

      }
  }

  return [Nb,lengthOfTheArray-Nb]
}

// Check Feasibility Ends Here

function createLineReader(fileName,permuteArray,txtFile,txtFile1,eventName){
    var stream = new fs.createReadStream(fileName)
    var remainder = null;
    // console.log(stream)
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
                // console.log("Hello")
                ev.emit(eventName, line,permuteArray,txtFile,txtFile1,false)
                start = i+1;
            }
        }
        if(start<data.length){
            remainder = data.slice(start);
        }else{
            remainder = null;
        }
    });

    stream.on("end",function(){
        if(null!=remainder){
          ev.emit(eventName,remainder,permuteArray,txtFile,txtFile1,false)
        }
    });
    console.log("Line Reader End"+ fileName);
    return ev
}



function create_permutation(array){
  var txtFile = './outputs.txt';
  var txtFile1 = './outputs1.txt';
  fs.writeFileSync(txtFile, "", function(err) {
      if(err) {
          return console.log(err);
      }
      // console.log("The file was saved!");
  });
  fs.writeFileSync(txtFile1, "", function(err) {
      if(err) {
          return console.log(err);
      }
      // console.log("The file was saved!");
  });
  var endString = "";
  var it_is_file_1 = false;
  permute(array[array.length - 1],txtFile1,"");
  for(var i=array.length-2;i>=0;i--){
    console.log(array[i])
    it_is_file_1 = !it_is_file_1;
    if(it_is_file_1 == true){
      console.log("File 1");
      async.eachSeries([txtFile1], function(){
        lineReader1 = createLineReader(txtFile1,array[i],txtFile,txtFile1,"line1")
      });

    }else{
      console.log("File 0");
      async.eachSeries([txtFile], function(){
        lineReader = createLineReader(txtFile,array[i],txtFile,txtFile1,"line")
      });

    }
  }
}


create_permutation([[2,4,6,8,10],[5],[2,4,6]]);


//File read start


lineReader.on("line",function(line,permuteArray,txtFile,txtFile1,isEnd){
  console.log(permuteArray)
  if(line != "" && line != "\n"){
    if (permuteArray.length == 1){
      appendOutputToFile(permuteArray.toString()+","+line,txtFile1);
    }else{
      permute(permuteArray,txtFile1,","+line);
    }
  }
  if(isEnd == true){
    console.log("end");
    if (permuteArray.length == 1){
      appendOutputToFile(permuteArray.toString()+","+line,txtFile1);
    }else{
      permute(permuteArray,txtFile1,","+line);
    }
    fs.writeFileSync(txtFile, "", function(err) {
        if(err) {
            return console.log(err);
        }
        // console.log("The file was saved!");
    });
  }else{

  }
});

lineReader1.on("line1",function(line,permuteArray,txtFile,txtFile1,isEnd){
  console.log(permuteArray);
  if(line != "" && line != "\n"){
    // console.log("l1")
    if (permuteArray.length == 1){
      appendOutputToFile(permuteArray.toString()+","+line,txtFile);
    }else{
      permute(permuteArray,txtFile,","+line);
    }
  }
  if(isEnd == true){
    if (permuteArray.length == 1){
      appendOutputToFile(permuteArray.toString()+","+line,txtFile);
    }else{
      permute(permuteArray,txtFile,","+line);
    }
    console.log("end")
    fs.writeFileSync(txtFile1, "", function(err) {
        if(err) {
            return console.log(err);
        }
        // console.log("The file was saved!");
    });
  }else{

  }
});
