console.log("Hello from the args file!");
console.log(process.argv);

console.log(process.argv[3]);

const args = process.argv.slice(2);
for (let arg of args) {
  console.log(`Hello, ${arg}!`);
}
