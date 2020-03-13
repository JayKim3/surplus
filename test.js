function outer() {
  console.log("외부", name);
  function inner() {
    console.log("내부", name);
  }
  inner();
}

var name = "zero";
outer();
