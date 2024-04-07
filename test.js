const arrayA = [1, 2, 3, 4];
const arrayB = ["a", "b", "c", "d"];

arrayA.map((elementA, index) => {
  const elementB = arrayB[index];
  console.log(`Array A: ${elementA}, Array B: ${elementB}`);
});
