const btnContainer = document.querySelector(".btn-container");
const screen = document.querySelector(".screen");

let firstNum = 0;
let secondNum = 0;
let currentOperator = null;
let updated = false;

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

const fill = (num) => {
  const text = screen.textContent;

  screen.textContent = text === "0" || updated ? num : text + num;
  updated = false;
};

const updateOperator = (operator) => {
  if (currentOperator) {
    secondNum = Number(screen.textContent);
    const total = operate(firstNum, operator, secondNum);

    firstNum = total;
    secondNum = 0;
    currentOperator = operator;
    updated = true;

    screen.textContent = total;
    return;
  }

  firstNum = Number(screen.textContent);
  currentOperator = operator;
  updated = true;
};

btnContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (!target || target.type != "submit") return;

  // Digit button clicked
  if (target.classList.contains("digit-btn")) fill(target.textContent);

  // Equals button clicked
  if (target.classList.contains("equals-btn")) {
  }

  if (target.classList.contains("operator")) updateOperator(target.textContent);

  // Clear button clicked
  if (target.id == "clear") {
  }

  // Back button clicked
  if (target.id == "back") {
  }
});
