var args = process.argv;
console.log(args[2]);
console.log('a');
console.log('b');
if (args[2] === '1') {
  console.log('c1');
}else {
  console.log('c2');
}

console.log('d');
