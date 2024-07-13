const btnContainer = document.querySelector(".btn-container");
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

btnContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (!target || target.type != "submit") return;

  // Digit button clicked
  if (target.classList.contains("digit-btn")) {
    screen.textContent += target.textContent;
  }

  // Equals button clicked
  if (target.classList.contains("equals-btn")) {
  }

  // Clear button clicked
  if (target.id == "clear") {
  }

  // Back button clicked
  if (target.id == "back") {
  }

  // Divide button clicked
  if (target.id == "divide") {
  }

  // Multiply button clicked
  if (target.id == "multiply") {
  }

  // Add button clicked
  if (target.id == "add") {
  }

  // Subtract button clicked
  if (target.id == "subtract") {
  }
});
