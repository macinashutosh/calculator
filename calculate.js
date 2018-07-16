// to calculate factorial of a number
function factorial(number){
	if(number<=1){
		return 1;
	}
	return number * factorial(number - 1)
}

// numbe of combinations possible for the number of channels
function getCombination(Number){
	var numerator = factorial(Number)
	var denominator = factorial(2)*factorial(Number - 2)
	console.log(numerator/denominator)
	return numerator/denominator;
}


// knowing the Nb and Nc Values for the given Number of channels

function checkFeasibility(differenceArr){
	
}
