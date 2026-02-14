console.log(true ? 1 : 2)
console.log(5>6 ? 'Yes' : 'No')


console.log(true ? 1 : 2)
 console.log( 5>6 ? 'Yes' : 'No')


let number = 0;
while (number <= 10){
	console.log(number);
	number+=2;
}

let numberCount = 0;
let number1 = 0;

while (number != 0){
	number = Number(prompt("Enter No: "));
	numberCount += 1;
	number1+= number;

	console.log(`numberCount is ${numberCount}`);
	console.log(`Sum of number is ${number1}`)

}

