const test = "test";

if (Number(test) < 0) {
  console.log("0보다 작음");
}

if (Number(test) > 0) {
  console.log("0보다 큼");
}

if (Number(test) === 0) {
  console.log("0");
}
console.log(Number(test) < 0);
console.log(isNaN(Number(test)));
