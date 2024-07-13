const screen = document.querySelector(".screen");

const operate = (a, operator, b) => {
  switch (operator) {
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? "Error" : a / b;
    case "+":
      return a + b;
    case "-":
      return a - b;
    default:
      return "Error";
  }
};
