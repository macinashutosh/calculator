
function helloWorld(){
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

  function printIt(arr){
    for(var i=0;i<arr.length;i++){
      console.log(arr[i].toString());
    }
  }

  function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;

    while (i < length) {
      if (c[i] < i) {
        k = i % 2 && c[i];
        p = permutation[i];
        permutation[i] = permutation[k];
        permutation[k] = p;
        ++c[i];
        i = 1;
        result.push(permutation.slice());
      } else {
        c[i] = 0;
        ++i;
      }
    }
    return result;
  }


  var finalB = 0;
  var finalC = 0;
		//check Feasibility is the main Function for the algo
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
	var lengthTotal = 0;
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

	// PrintAnswer Ends here





  function getBestResult(startingValue,inputArray,BaseUnit){
    var best = []
    // var startingValue = [0];
    // var inputArray = [8,10,12,14,16];
    // var BaseUnit = inputArray.length - 1;
    var fwmMargin = 0;
    var N = inputArray.length+1;
        var baseunitArray = [];
      var BaseUnitTemp = [];
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
          while(k<BaseUnit - 2*iterator){
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
        // console.log(baseunitArray)
        // End of Assignment of BaseUnit Arrays

      var permutedBaseunits = []

      for(var itr1=0;itr1<baseunitArray.length;itr1++){
          permutedBaseunits.push(permute(baseunitArray[itr1]))
      }
      // console.log(permutedBaseunits)

      var tempArray1 = [];
      for (var idk=0;idk< startingValue.length;idk++){
        tempArray1.push(startingValue[idk])
      }
      var first = inputArray[0] + startingValue[startingValue.length - 1];
      for (var jtr1=0;jtr1<inputArray.length;jtr1++){
        if(jtr1 === 0){
          tempArray1.push(first);
        }else{
          tempArray1.push(first+inputArray[jtr1]);
          first = first + inputArray[jtr1];

        }

      }

      var temp = printAnswer(tempArray1);
      var currentSum = parseInt(3*temp[0])+parseInt(2*temp[1])
      var finalResults= temp;
      var finalArray=inputArray;
      var finalSummedArray = tempArray1;
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      // console.log("first combination")
      // console.log("First Sum:" + currentSum);
      // console.log("First answer:"+inputArray)
      // console.log("First Answer(summed):" + tempArray1);
      // console.log("First Nb:" + temp[0] );
      // console.log("First Nc:" + temp[1] );
      // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
      var prevSum = currentSum;
      var checkTheForLoop = true;
      for(var itr=0;itr<permutedBaseunits[0].length;itr++){
        var permutedResultsTemp = [];
        var startTemp  = [];
        startTemp.push(permutedBaseunits[0][itr]);

        for(var jtr=1;jtr<permutedBaseunits.length;jtr++){
          if(permutedBaseunits[jtr].length > 1){
            var tempStartBaseunit = []
            for(var ktr=0;ktr<permutedBaseunits[jtr].length;ktr++){

              for(var ltr=0;ltr<startTemp.length;ltr++){
                var tempBaseunit = [];
                for(var i=0;i<startTemp[ltr].length;i++){
                  tempBaseunit.push(startTemp[ltr][i]);
                }
                for(var i1=0;i1<permutedBaseunits[jtr][ktr].length;i1++){
                  tempBaseunit.push(permutedBaseunits[jtr][ktr][i1]);
                }
                tempStartBaseunit.push(tempBaseunit)
              }
            }
            startTemp = tempStartBaseunit
          }else{
            var spacing = permutedBaseunits[jtr][0][0];
            for(var ltr1=0;ltr1<startTemp.length;ltr1++){
              startTemp[ltr1].push(spacing)
            }

          }

        }
        for(var ltr3=0;ltr3<startTemp.length;ltr3++){
          permutedResultsTemp.push(startTemp[ltr3])
        }
        // console.log(permutedResultsTemp.length)
        // console.log(startTemp)
        var permutedResults = [];
        // Permuted temp to Results
        for (var itr2 = 0;itr2<permutedResultsTemp.length;itr2++){
          var tempArray = new Array();
          for (var idk=0;idk< startingValue.length;idk++){
            tempArray.push(startingValue[idk])
          }
          var second = startingValue[startingValue.length - 1];
          for (var jtr1=0;jtr1<permutedResultsTemp[0].length;jtr1++){
            if(jtr === 0){
              tempArray.push(second);
            }else{
              tempArray.push(second+permutedResultsTemp[itr2][jtr1]);
              second  = second + permutedResultsTemp[itr2][jtr1];
            }

          }
          permutedResults.push(tempArray)
        }
        //permutate function ends here

        for (var i =0;i<permutedResults.length;i++){

          temp = printAnswer(permutedResults[i])

          var tempSum = parseInt(3*temp[0])+parseInt(2*temp[1]);
          if(parseInt(tempSum) <= parseInt(currentSum)){

            if (prevSum == currentSum){

              best.push(permutedResults);
            }else{
                prevSum = currentSum;
                best = [];
            }
            currentSum = tempSum;
            finalArray = permutedResults[i];
            finalResults = temp;
            finalB = temp[0];
            finalC = temp[1];
            checkIfTheAnswerChanged = true;
          }
          if (currentSum < fwmMargin){
              checkTheForLoop = false;
              break;
          }

        }
        if(checkTheForLoop == false){
          break;
        }


      }
      return [prevSum,best]
  }






  // Reading FILE and Setting a part starts here
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
    // console.log(array);
    var prevSum = -1;
    var best = []
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    var inputArray = [9,11,13,15, 14, 8,10,13];
    var BaseUnit = 6
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    var tempConvertFromString = []
    for(var i=0;i<array.length;i++){
      var arr = [];
      for(var j=0;j<array[i].length;j++){
        arr.push(parseInt(array[i][j]))
      }
      tempConvertFromString.push(arr);
    }

    for (var i=0;i<tempConvertFromString.length;i++){
        var tempResults = getBestResult(tempConvertFromString[i],inputArray,BaseUnit);
        if (prevSum == -1 && tempResults[1].length > 0){
          prevSum = tempResults[0];
          best = tempResults[1];
        }else if(prevSum == tempResults[0] && tempResults[1].length > 0){
          for( var t =0; t< tempResults[1].length;t++){
            best.push(tempResults[1][t]);
          }
        }else if(prevSum > tempResults[0] && tempResults[1].length > 0){
            prevSum = tempResults[0];
            best = tempResults[1];
        }else{

        }
    }
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log("best sum: "+ prevSum)
    console.log("Number of Best combination:  " + best.length)
    console.log('\n')
    console.log("Best Results:");
    printIt(best)
  });
  // Reading FILE and Setting a part ends here

  	// var inputArray = [8,10,12,14,16,15,9,11,13,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];


    // function Starts here


        // if (checkIfTheAnswerChanged){
        //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        //   console.log("Final Sum:" + currentSum);
    		// 	console.log("Final Answer summed:" + finalArray);
        //   console.log("Final Nb:" + finalB );
        //   console.log("Final Nc:" + finalC );
        //   console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        // }else{
        //   console.log("same as the first combination")
        // }



      return 'success';



};

console.log(helloWorld());
