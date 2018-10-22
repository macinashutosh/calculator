var fs = require('fs');
var readEachLineSync = require('read-each-line-sync');

function Reader(line,permuteArray,txtFile,txtFile1,isEnd){
  // console.log(permuteArray)
  if(line != "" && line != "\n"){
    if (permuteArray.length == 1){
      appendOutputToFile(permuteArray.toString()+","+line,txtFile1);
    }else{
      permute(permuteArray,txtFile1,","+line);
    }
  }
}

function fibonacciSeriesIthTerm (ele) {
	// if(ele <= 0){
	// 	return 0;
	// }else{
	// 	var prevTerm = 1;
	// 	var term = 1;
	// 	for(var i=1;i<ele;i++){
	// 		var temp = term + prevTerm;
	// 		prevTerm = term;
	// 		term = temp;
	// 	}
	// 	return term;
	// }
  return 2 * ele;
}

function Reader1(line,permuteArray,txtFile,txtFile1){
  if(line != "" && line != "\n"){
    // console.log("l1")
    if (permuteArray.length == 1){
      appendOutputToFile(permuteArray.toString()+","+line,txtFile);
    }else{
      permute(permuteArray,txtFile,","+line);
    }
  }

};

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

function appendOutputToFile(array,txtFile){
  if(array !=null){
    if (array.length > 0){
      fs.appendFileSync(txtFile, "\n"+array.toString(), (err) => {
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
        // console.log(array[i])
        it_is_file_1 = !it_is_file_1;
        if(it_is_file_1 == true){
          // console.log("File 1");
          readEachLineSync(txtFile1, 'utf8', function(line,end) {
            Reader1(line,array[i],txtFile,txtFile1,);
          });
          fs.writeFileSync(txtFile1, "", function(err) {
              if(err) {
                  return console.log(err);
              }
              // console.log("The file was saved!");
          });
        }else{
          // console.log("File 0");
          readEachLineSync(txtFile, 'utf8', function(line,end) {
            Reader(line,array[i],txtFile,txtFile1);
          });
          fs.writeFileSync(txtFile, "", function(err) {
              if(err) {
                  return console.log(err);
              }
              // console.log("The file was saved!");
          });
        }
      }
  return it_is_file_1;
}
// Check Feasibility Ends Here


function checkFeasibility(differenceArr){
  var map = {};
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
  //map["number"] = [Double]

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

  // console.log(lengthOfTheArray)
  return [Nb,lengthOfTheArray-Nb]
}
//check Feasibility ends here

//PrintAnswer Function Starts here

function printAnswer(answer){
  let prevN = 0;
  let differenceArr = []

  for(j=0;j<answer.length;j++){
    let temp1 = []
    for(let m=0;m<prevN+1;m++){
      temp1.push(" ")

    }
    for(let i=prevN+1;i<answer.length;i++){
      temp1.push(parseInt(answer[i])-parseInt(answer[prevN]))
    }
    differenceArr.push(temp1)
    prevN++;
  }
  let feasible = checkFeasibility(differenceArr);

  return feasible
}

function assignFibbonacciBaseunit(BaseUnit,N){
  var check = true;
	loop1:while(check){
			var iterator = 0;
			var counter = 0;
			while(true){

				if((BaseUnit - fibonacciSeriesIthTerm(iterator)) > 0){
					counter = counter + (BaseUnit - fibonacciSeriesIthTerm(iterator));
					// console.log("B"+iterator+"="+(BaseUnit - fibonacciSeriesIthTerm(iterator)));
					// console.log(counter);
					counter = counter + 1
					if(counter> N-1){
							check = false;
							break;
					}
				}else{
					if (counter > N-2){
						counter++;
					// console.log("yaha aagya")
					}else{
					BaseUnit = BaseUnit + 1;
					// console.log("Change this Mofu")
					continue loop1;
					}
				}

				iterator = iterator + 1;
				// counter = counter + 1;
				if(counter> N-1){
					check = false;
					break;
				}
			}
		}
  return BaseUnit;
}

function assignBaseUnitArray(N,BaseUnit,inputArray){
  var BaseUnitTemp = [];
  var baseunitArray = [];
  counter = 1;
  iterator = 0;
  previousBaseUnit = BaseUnit;
  var checkBase = true
  freq = 0;
  while(counter <= N){

    var k = 0
    var temp = counter;
    var deltaSum = 0
    BaseUnitTemp = []
    var nthValue = fibonacciSeriesIthTerm(iterator);
    while(k < BaseUnit - nthValue){
      BaseUnitTemp.push(inputArray[counter+k-1])
      k = k + 1;
      temp+=1
      if(temp > N){
      checkBase = false;
      break;
      }
    }
    if(checkBase){
      baseunitArray.push(BaseUnitTemp);
      counter = counter + k;
      previousBaseUnit = previousBaseUnit- 2;
    }
    if(counter > N-1){
      break;
    }

    k = 0;
    BaseUnitTemp = []
    BaseUnitTemp.push(inputArray[counter-1])
    baseunitArray.push(BaseUnitTemp)
    counter = counter + 1;

    if(counter > N-1){
      break;
    }
    iterator = iterator + 1;

  }
  return baseunitArray;
}

function calculateAnswer(inputArray){
  var N = inputArray.length+1;
  var BaseUnit = assignFibbonacciBaseunit(5,N);
  console.log("First Base Unit Size Calculated ==>  " + BaseUnit);
  var baseunitArray = [];
  baseunitArray = assignBaseUnitArray(N,BaseUnit,inputArray);
  console.log("Base Unit ArrayAssigned:");
  for (var no=0;no<baseunitArray.length;no++){
    console.log(baseunitArray[no]);
  }

  var it_is_file_0 = create_permutation(baseunitArray);
  // console.log(it_is_file_0);
  var file_to_read_from = "./outputs1.txt"
  var finalSum = -1;
  var finalArray = [];
  var finalSumArray = [];
  if(it_is_file_0) file_to_read_from = "./outputs.txt"
  console.log("Input Permutations is fetched from : " + file_to_read_from );
  readEachLineSync(file_to_read_from, 'utf8', function(line) {
    if(line != "" && line != "\n"){
      var tempArray1 = [];
      var fileArray = line.split(',');
      tempArray1.push(0)
      for (var jtr1=0;jtr1<fileArray.length;jtr1++){
        if(jtr1 === 0){
          tempArray1.push(parseInt(fileArray[jtr1]));
        }else{
          tempArray1.push(parseInt(tempArray1[jtr1])+parseInt(inputArray[jtr1]));
        }

      }
      var nbcArray = printAnswer(tempArray1);
      var tempSum = (3*nbcArray[0]+2*nbcArray[1]); //Nb first Nc later
      if(finalSum == -1 || finalSum < tempSum){
        finalSum = tempSum;
        finalArray = fileArray;
        finalSumArray = tempArray1;
      }
    }
  });
  console.log("FWM  ==>  "+ finalSum);
  console.log("Final Assignment  ==> " + finalArray);
  console.log("Final Summed Assignment ==> " + finalSumArray);
}

calculateAnswer([2,4,6,8,10, 5, 3,5,7, 4, 3])
