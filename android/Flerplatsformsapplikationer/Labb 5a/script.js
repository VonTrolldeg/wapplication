var numbers = [128, 256, 512, 1024, 2048];
var sum = 0;
for (i=0; i < numbers.length; i++){
	sum += numbers[i];
}

var avarage = sum / numbers.length;
numbers.push( avarage )

console.log(numbers)




var countries = ["Sweden", "Denmark", "Finland", "Norway"];

console.log(countries[1].substring(0,3));
var summ = 0
for (i=0; i < countries.length; i++){
	summ += countries[i].length;
}
console.log(summ / countries.length)